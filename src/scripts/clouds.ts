/**
 * The cloud layer behind every page.
 *
 * One fragment shader on a fullscreen triangle, in plain WebGL: domain-warped fbm noise (fbm fed back
 * into itself) reads as slow, rolling smoke. It is drawn into a canvas a quarter of the viewport's size
 * and upscaled by the browser, because clouds are soft anyway and that keeps the GPU cost tiny.
 *
 * The tint follows whatever the reader is looking at: any element with `data-atmos="mint"` (or violet,
 * amber, ember, paper) that crosses the middle of the screen takes over, and `data-atmos-intensity`
 * sets how strongly the clouds glow there. The pointer nudges the clouds and their light source, so the
 * whole screen shifts a little with the mouse.
 *
 * Reduced motion: one still frame, re-drawn only when the tint changes.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uTint;
uniform float uIntensity;
uniform vec2 uPointer;
uniform float uScroll;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = r * p * 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  p += uPointer * vec2(0.08, 0.05);
  p.y -= uScroll * 0.35;

  float t = uTime * 0.03;
  vec2 s = p * 1.35;
  vec2 q = vec2(fbm(s + vec2(0.0, t)), fbm(s + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(s + 3.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(s + 3.2 * q + vec2(8.3, 2.8) - t * 0.8));
  float f = fbm(s + 3.0 * r);

  float density = smoothstep(0.28, 0.92, f);
  float body = smoothstep(0.2, 0.75, length(q));

  // A soft light source, upper right, that drifts toward the pointer.
  vec2 lp = vec2(0.62, 0.22) + uPointer * vec2(0.12, -0.08);
  float glow = exp(-2.4 * length(p - lp));

  vec3 smoke = mix(uBase, uTint * 0.62, 0.55 + body * 0.45);
  vec3 col = mix(uBase, smoke, density * uIntensity);
  col += uTint * glow * (0.18 + density * 0.4) * uIntensity;
  col += vec3(pow(density, 3.0) * 0.07 * uIntensity);

  float vig = smoothstep(1.2, 0.2, length((uv - 0.5) * vec2(1.15, 1.0)));
  col = mix(uBase, col, mix(0.45, 1.0, vig));
  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];

const parse = (value: string): RGB => {
  const v = value.trim();
  if (v.startsWith('#')) {
    const hex = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join('') : v.slice(1, 7);
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as RGB;
  }
  const nums = v.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
  return [nums[0]! / 255, nums[1]! / 255, nums[2]! / 255];
};

export function mountClouds(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return false;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u('uRes');
  const uTime = u('uTime');
  const uBase = u('uBase');
  const uTint = u('uTint');
  const uIntensity = u('uIntensity');
  const uPointer = u('uPointer');
  const uScroll = u('uScroll');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // --- Palette ------------------------------------------------------------------------------
  const palette: Record<string, RGB> = {};
  let base: RGB = [0, 0, 0];
  const readPalette = () => {
    const cs = getComputedStyle(document.documentElement);
    base = parse(cs.getPropertyValue('--color-ink-900') || '#08080a');
    for (const name of ['ember', 'mint', 'violet', 'amber', 'paper']) {
      palette[name] = parse(cs.getPropertyValue(`--color-${name}`) || '#ff4d1c');
    }
    dirty = true;
  };

  // --- What the reader is looking at --------------------------------------------------------
  let current: HTMLElement | null = null;
  const watched = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) watched.add(e.target as HTMLElement);
        else watched.delete(e.target as HTMLElement);
      }
      // The deepest element wins, so a card inside a section overrides the section.
      let best: HTMLElement | null = null;
      for (const el of watched) if (!best || best.contains(el)) best = el;
      current = best;
      dirty = true;
    },
    { rootMargin: '-48% 0px -48% 0px' },
  );
  const observeAll = () => document.querySelectorAll<HTMLElement>('[data-atmos]').forEach((el) => io.observe(el));
  observeAll();

  const tint: RGB = [0.2, 0.06, 0.03];
  let intensity = 0;
  let dirty = true;

  // --- Size ---------------------------------------------------------------------------------
  const SCALE = 0.25;
  const resize = () => {
    const w = Math.max(160, Math.round(window.innerWidth * SCALE));
    const h = Math.max(120, Math.round(window.innerHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    dirty = true;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // --- Pointer ------------------------------------------------------------------------------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  if (finePointer) {
    window.addEventListener(
      'pointermove',
      (e) => {
        pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true },
    );
  }

  readPalette();

  // --- Loop ---------------------------------------------------------------------------------
  let raf = 0;
  let last = performance.now();
  let time = Math.random() * 100;
  let skip = false;

  const draw = () => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform3f(uBase, base[0], base[1], base[2]);
    gl.uniform3f(uTint, tint[0], tint[1], tint[2]);
    gl.uniform1f(uIntensity, intensity);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uScroll, window.scrollY / Math.max(window.innerHeight, 1));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;

    const name = current?.dataset.atmos ?? 'ember';
    const target = palette[name] ?? palette.ember!;
    const targetIntensity = Number(current?.dataset.atmosIntensity ?? 0.55);
    const k = reduced ? 1 : Math.min(1, dt * 1.6);
    let moving = false;
    for (let i = 0; i < 3; i++) {
      const d = target[i]! - tint[i]!;
      tint[i]! += d * k;
      if (Math.abs(d) > 0.002) moving = true;
    }
    const di = targetIntensity - intensity;
    intensity += di * k;
    if (Math.abs(di) > 0.002) moving = true;

    if (reduced) {
      if (dirty || moving) draw();
      dirty = false;
      return;
    }

    if (!finePointer) {
      pointer.tx = Math.sin(now / 6000) * 0.4;
      pointer.ty = Math.cos(now / 7600) * 0.3;
    }
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.2);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.2);
    time += dt;

    // Clouds move slowly, so every other frame is plenty.
    skip = !skip;
    if (skip && !moving) return;
    draw();
  };

  const start = () => {
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', () => (document.hidden ? cancelAnimationFrame(raf) : start()));
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    document.documentElement.removeAttribute('data-clouds');
  });

  draw();
  start();
  document.documentElement.setAttribute('data-clouds', '');
  return true;
}
