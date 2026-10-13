import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  IcosahedronGeometry,
  Line,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
  type Blending,
} from 'three';

/**
 * The hero constellation, in three dimensions.
 *
 * An ember core breathes at the centre, the three assistants ride tilted orbits around it, and work
 * pulses travel from the core out to each one. The product links stay real HTML: each frame the
 * anchors are moved to wherever their node projects on screen, so they remain focusable, readable
 * and clickable while following the 3D scene.
 *
 * The hero index drives it: `setActive(i)` lights one orbit and its node, `setActive(null)` lets
 * all three glow evenly.
 *
 * Only loaded when WebGL exists and the reader has not asked for reduced motion. Renders only while
 * the hero is on screen and the tab is visible.
 */

export interface HeroSceneOptions {
  section: HTMLElement;
  canvas: HTMLCanvasElement;
  box: HTMLElement;
  labelLayer: HTMLElement;
  /** One anchor per orbit, innermost first. */
  labels: HTMLElement[];
}

export interface HeroScene {
  setActive(orbit: number | null): void;
  destroy(): void;
}

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const CORE_VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
varying vec3 vPos;
${NOISE}
void main() {
  float slow = snoise(position * 1.05 + vec3(0.0, uTime * 0.2, uTime * 0.1));
  float fine = snoise(position * 2.6 - vec3(uTime * 0.3));
  float d = slow * uAmp + fine * uAmp * 0.12;
  vec3 displaced = position + normal * d;
  vDisp = d / max(uAmp, 0.001);
  vPos = position;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

// Molten: dark where the surface sinks, ember where it swells, a product-tinted rim, and faint
// contour lines that drift across it.
const CORE_FRAG = /* glsl */ `
uniform vec3 uEmber;
uniform vec3 uDeep;
uniform vec3 uMint;
uniform vec3 uViolet;
uniform vec3 uAmber;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
varying vec3 vPos;
void main() {
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
  vec3 base = mix(uDeep, uEmber, smoothstep(-0.35, 0.9, vDisp) * 0.62);
  float a = atan(vPos.y, vPos.x) + uTime * 0.25;
  vec3 tint = uMint * max(0.0, sin(a)) + uViolet * max(0.0, sin(a + 2.094)) + uAmber * max(0.0, sin(a + 4.189));
  vec3 col = base + fres * mix(uEmber, tint, 0.4) * 1.5;
  float contour = smoothstep(0.965, 1.0, abs(sin(vDisp * 5.0 + uTime * 0.5)));
  col += contour * uEmber * 0.22;
  gl_FragColor = vec4(col, 1.0);
}
`;

const RING_VERT = /* glsl */ `
attribute float aT;
varying float vT;
void main() {
  vT = aT;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const RING_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uHead;
uniform float uBase;
uniform float uDash;
uniform float uFade;
uniform float uBoost;
varying float vT;
void main() {
  float behind = fract(uHead - vT);
  float tail = pow(1.0 - behind, mix(7.0, 3.0, uBoost));
  float alpha = uBase * (1.0 + uBoost * 1.6) + tail * (0.85 + uBoost * 0.15);
  if (uDash > 0.0) alpha *= step(0.5, fract(vT * uDash));
  gl_FragColor = vec4(uColor, alpha * uFade);
}
`;

const POINT_VERT = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
attribute float aAlpha;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * (26.0 / -mv.z);
  vColor = aColor;
  vAlpha = aAlpha * (0.55 + 0.45 * sin(uTime * (0.6 + aPhase) + aPhase * 12.0));
}
`;

const POINT_FRAG = /* glsl */ `
uniform float uFade;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * vAlpha * uFade);
}
`;

const ORBITS = [
  { radius: 0.6, period: 30, start: 3.6, tiltZ: 0.16, tiltX: 0.05 },
  { radius: 0.8, period: 42, start: 1.6, tiltZ: -0.12, tiltX: -0.06 },
  { radius: 1, period: 56, start: -0.4, tiltZ: 0.07, tiltX: 0.03 },
] as const;

const R = 2.4;
const CORE_R = 0.3 * R;
const FOV = 32;

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

/** Offset of `el` from `ancestor`, ignoring CSS transforms (so scroll and reveal motion do not skew it). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function mountHeroScene(opts: HeroSceneOptions): HeroScene | null {
  const { section, canvas, box, labelLayer, labels } = opts;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }

  const small = window.matchMedia('(max-width: 640px)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  const system = new Group();
  system.rotation.x = 0.62;
  scene.add(system);

  // --- Palette, read from the CSS tokens -----------------------------------------------
  const palette = {
    ember: new Color(),
    mint: new Color(),
    violet: new Color(),
    amber: new Color(),
    paper: new Color(),
    deep: new Color(),
  };

  // --- Core -----------------------------------------------------------------------------------
  const coreUniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.08 },
    uEmber: { value: palette.ember },
    uDeep: { value: palette.deep },
    uMint: { value: palette.mint },
    uViolet: { value: palette.violet },
    uAmber: { value: palette.amber },
  };
  const core = new Mesh(
    new IcosahedronGeometry(CORE_R, small ? 20 : 32),
    new ShaderMaterial({ vertexShader: CORE_VERT, fragmentShader: CORE_FRAG, uniforms: coreUniforms }),
  );
  scene.add(core);

  const glowMap = glowTexture();
  const halo = new Sprite(new SpriteMaterial({ map: glowMap, transparent: true, depthWrite: false }));
  halo.scale.setScalar(CORE_R * 4.2);
  scene.add(halo);

  // --- Orbits ---------------------------------------------------------------------------------
  const SEGMENTS = 320;
  const accentKeys = ['amber', 'violet', 'mint'] as const;
  const fade = { value: 0 };

  const rings = ORBITS.map((o, i) => {
    const holder = new Object3D();
    holder.rotation.set(o.tiltX, 0, o.tiltZ);
    system.add(holder);

    const pos = new Float32Array((SEGMENTS + 1) * 3);
    const ts = new Float32Array(SEGMENTS + 1);
    for (let s = 0; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS;
      const a = t * Math.PI * 2;
      pos.set([Math.cos(a) * o.radius * R, 0, Math.sin(a) * o.radius * R], s * 3);
      ts[s] = t;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('aT', new BufferAttribute(ts, 1));
    const color = palette[accentKeys[i]!];
    const uniforms = {
      uColor: { value: color },
      uHead: { value: 0 },
      uBase: { value: 0.3 },
      uDash: { value: 0 },
      uFade: fade,
      uBoost: { value: 0 },
    };
    const line = new Line(
      geo,
      new ShaderMaterial({ vertexShader: RING_VERT, fragmentShader: RING_FRAG, uniforms, transparent: true, depthWrite: false }),
    );
    holder.add(line);

    const node = new Mesh(new SphereGeometry(0.075, 20, 20), new MeshBasicMaterial());
    holder.add(node);
    const nodeGlow = new Sprite(new SpriteMaterial({ map: glowMap, transparent: true, depthWrite: false, opacity: 0.9 }));
    nodeGlow.scale.setScalar(0.5);
    node.add(nodeGlow);

    return { o, holder, uniforms, node, nodeGlow, angle: o.start, boost: 0 };
  });

  // The parked assistant: a dashed outer ring with nothing on it yet.
  {
    const pos = new Float32Array((SEGMENTS + 1) * 3);
    const ts = new Float32Array(SEGMENTS + 1);
    for (let s = 0; s <= SEGMENTS; s++) {
      const a = (s / SEGMENTS) * Math.PI * 2;
      pos.set([Math.cos(a) * R * 1.16, 0, Math.sin(a) * R * 1.16], s * 3);
      ts[s] = s / SEGMENTS;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('aT', new BufferAttribute(ts, 1));
    const parked = new Line(
      geo,
      new ShaderMaterial({
        vertexShader: RING_VERT,
        fragmentShader: RING_FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: palette.paper },
          uHead: { value: 0 },
          uBase: { value: 0.22 },
          uDash: { value: 160 },
          uFade: fade,
          uBoost: { value: 0 },
        },
      }),
    );
    parked.rotation.z = -0.05;
    system.add(parked);
  }

  // --- Particles: a dust disc on the orbital plane plus a far shell ----------------------------
  const pointUniforms = { uTime: { value: 0 }, uPixelRatio: { value: dpr }, uFade: fade };
  const pointMaterial = () =>
    new ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      uniforms: pointUniforms,
      transparent: true,
      depthWrite: false,
    });

  const DUST = small ? 650 : 1500;
  const dustGeo = new BufferGeometry();
  const dustPos = new Float32Array(DUST * 3);
  const dustCol = new Float32Array(DUST * 3);
  const dustSize = new Float32Array(DUST);
  const dustPhase = new Float32Array(DUST);
  const dustAlpha = new Float32Array(DUST);
  const dustTint: number[] = [];
  for (let i = 0; i < DUST; i++) {
    const shell = i % 5 === 0;
    let x: number, y: number, z: number;
    if (shell) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 7 + Math.random() * 9;
      const s = Math.sqrt(1 - u * u);
      x = r * s * Math.cos(th);
      y = r * u;
      z = r * s * Math.sin(th);
    } else {
      const th = Math.random() * Math.PI * 2;
      const r = R * (0.45 + Math.pow(Math.random(), 0.7) * 2.6);
      x = Math.cos(th) * r;
      z = Math.sin(th) * r;
      y = (Math.random() + Math.random() + Math.random() - 1.5) * 0.35 * (r / R);
    }
    dustPos.set([x, y, z], i * 3);
    const roll = Math.random();
    // 0 paper, 1 ember, 2 mint, 3 violet, 4 amber
    dustTint.push(roll < 0.72 ? 0 : roll < 0.88 ? 1 : roll < 0.93 ? 2 : roll < 0.97 ? 3 : 4);
    dustSize[i] = (shell ? 1.6 : 1.1) + Math.random() * (shell ? 2.2 : 1.6);
    dustPhase[i] = Math.random();
    dustAlpha[i] = shell ? 0.35 + Math.random() * 0.35 : 0.45 + Math.random() * 0.5;
  }
  dustGeo.setAttribute('position', new BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('aColor', new BufferAttribute(dustCol, 3));
  dustGeo.setAttribute('aSize', new BufferAttribute(dustSize, 1));
  dustGeo.setAttribute('aPhase', new BufferAttribute(dustPhase, 1));
  dustGeo.setAttribute('aAlpha', new BufferAttribute(dustAlpha, 1));
  const dust = new Points(dustGeo, pointMaterial());
  system.add(dust);

  // --- Work pulses: the core hands jobs out to each assistant ---------------------------------
  const PULSES_PER = 3;
  const PULSES = rings.length * PULSES_PER;
  const pulseGeo = new BufferGeometry();
  const pulsePos = new Float32Array(PULSES * 3);
  const pulseCol = new Float32Array(PULSES * 3);
  const pulseSize = new Float32Array(PULSES).fill(4.2);
  const pulsePhase = new Float32Array(PULSES);
  const pulseAlpha = new Float32Array(PULSES);
  pulseGeo.setAttribute('position', new BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute('aColor', new BufferAttribute(pulseCol, 3));
  pulseGeo.setAttribute('aSize', new BufferAttribute(pulseSize, 1));
  pulseGeo.setAttribute('aPhase', new BufferAttribute(pulsePhase, 1));
  pulseGeo.setAttribute('aAlpha', new BufferAttribute(pulseAlpha, 1));
  const pulses = new Points(pulseGeo, pointMaterial());
  pulses.frustumCulled = false;
  scene.add(pulses);

  const additive: { material: { blending: Blending; needsUpdate: boolean } }[] = [
    halo,
    dust,
    pulses,
    ...rings.map((r) => r.nodeGlow),
  ];

  function readPalette() {
    palette.ember.set(css('--color-ember') || '#ff4d1c');
    palette.mint.set(css('--color-mint') || '#3ddc97');
    palette.violet.set(css('--color-violet') || '#8a7cff');
    palette.amber.set(css('--color-amber') || '#ffb020');
    palette.paper.set(css('--color-paper') || '#efeae1');
    palette.deep.set('#170b07');

    const haloMat = halo.material as SpriteMaterial;
    haloMat.opacity = 0.4;
    haloMat.color.copy(palette.ember);
    rings.forEach((r, i) => {
      const accent = palette[accentKeys[i]!];
      (r.node.material as MeshBasicMaterial).color.copy(accent);
      (r.nodeGlow.material as SpriteMaterial).color.copy(accent);
    });

    const tints = [palette.paper, palette.ember, palette.mint, palette.violet, palette.amber];
    dustTint.forEach((t, i) => dustCol.set(tints[t]!.toArray(), i * 3));
    dustGeo.attributes.aColor!.needsUpdate = true;
    rings.forEach((_, ri) => {
      for (let k = 0; k < PULSES_PER; k++) pulseCol.set(palette[accentKeys[ri]!].toArray(), (ri * PULSES_PER + k) * 3);
    });
    pulseGeo.attributes.aColor!.needsUpdate = true;

    // Glows add light rather than paint over what is behind them.
    for (const obj of additive) {
      obj.material.blending = AdditiveBlending;
      obj.material.needsUpdate = true;
    }
  }
  readPalette();

  // --- Layout: the scene's origin sits on the centre of the constellation box ------------------
  let W = 1;
  let H = 1;
  let baseDistance = 10;
  let boxCenter = { x: 0, y: 0 };

  function layout() {
    W = section.clientWidth;
    H = section.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const off = offsetWithin(box, section);
    const boxSize = Math.min(box.offsetWidth, box.offsetHeight || box.offsetWidth);
    boxCenter = { x: off.x + box.offsetWidth / 2, y: off.y + box.offsetHeight / 2 };
    // Distance at which the outer orbit (plus a margin) spans the box width.
    const pxPerUnitWanted = (boxSize * 1.06) / (2 * R * 1.08);
    baseDistance = H / pxPerUnitWanted / (2 * Math.tan(((FOV / 2) * Math.PI) / 180));
    camera.setViewOffset(W, H, W / 2 - boxCenter.x, H / 2 - boxCenter.y, W, H);
    camera.updateProjectionMatrix();
  }
  layout();
  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(section);
  resizeObserver.observe(box);

  // --- Input ----------------------------------------------------------------------------------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, px: -1e4, py: -1e4, speed: 0 };
  const onPointer = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.speed = Math.min(1, pointer.speed + Math.hypot(nx - pointer.tx, ny - pointer.ty) * 2);
    pointer.tx = nx;
    pointer.ty = ny;
    const rect = section.getBoundingClientRect();
    pointer.px = e.clientX - rect.left;
    pointer.py = e.clientY - rect.top;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let hovering = 0;
  const onEnter = () => (hovering = 1);
  const onLeave = () => (hovering = 0);

  // --- Labels: move the real anchors into the overlay layer -----------------------------------
  const homes = labels.map((el) => ({ el, parent: el.parentElement, next: el.nextSibling }));
  for (const el of labels) {
    el.classList.add('node-label');
    labelLayer.appendChild(el);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focus', onEnter);
    el.addEventListener('blur', onLeave);
  }

  let activeOrbit: number | null = null;

  // --- Loop -----------------------------------------------------------------------------------
  const tmp = new Vector3();
  const coreScreen = new Vector3();
  const camPos = new Vector3();
  let raf = 0;
  let running = false;
  let last = performance.now();
  let time = 0;
  let speedScale = 1;
  let excite = 0;
  const born = performance.now();

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;

    // Scroll: as the hero leaves, the system tips back and the camera pulls away.
    const rect = section.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));

    if (!finePointer) {
      pointer.tx = Math.sin(time * 0.25) * 0.35;
      pointer.ty = Math.cos(time * 0.19) * 0.2;
    }
    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.5);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.5);
    pointer.speed *= Math.pow(0.04, dt);

    speedScale += ((hovering ? 0.08 : 1) - speedScale) * Math.min(1, dt * 3);
    const intro = Math.min(1, (now - born) / 1400);
    fade.value = intro * intro * (3 - 2 * intro) * (1 - p * 0.55);

    system.rotation.x = 0.62 + pointer.y * 0.22 + p * 0.55;
    system.rotation.y = time * 0.03 * speedScale + pointer.x * 0.35;
    system.rotation.z = -pointer.x * 0.05;

    camera.position.set(pointer.x * -0.35, pointer.y * 0.25, baseDistance * (1 + p * 0.45));
    camera.lookAt(0, 0, 0);

    // The core leans toward the pointer and stirs more when the pointer is near it.
    tmp.set(0, 0, 0).project(camera);
    coreScreen.set(((tmp.x + 1) / 2) * W, ((1 - tmp.y) / 2) * H, 0);
    const pxPerUnit = H / (2 * camera.position.z * Math.tan(((FOV / 2) * Math.PI) / 180));
    const near = Math.hypot(pointer.px - coreScreen.x, pointer.py - coreScreen.y) / (CORE_R * pxPerUnit * 2.2);
    const targetExcite = Math.max(0, 1 - near) * 0.8 + pointer.speed * 0.5;
    excite += (targetExcite - excite) * Math.min(1, dt * 3);

    coreUniforms.uTime.value = time;
    coreUniforms.uAmp.value = 0.075 + excite * 0.13 + Math.sin(time * 0.9) * 0.012;
    core.rotation.y = time * 0.12;
    core.rotation.x = pointer.y * 0.3;
    core.scale.setScalar(1 + Math.sin(time * 0.9) * 0.025 + excite * 0.05);
    halo.scale.setScalar(CORE_R * (4.2 + Math.sin(time * 0.9) * 0.25 + excite * 1));

    pointUniforms.uTime.value = time;
    dust.rotation.y = time * 0.012;

    camera.getWorldPosition(camPos);
    const coreDist = camPos.length();

    rings.forEach((r, i) => {
      r.boost += ((activeOrbit === i ? 1 : 0) - r.boost) * Math.min(1, dt * 4);
      r.uniforms.uBoost.value = r.boost;
      r.angle += ((Math.PI * 2) / r.o.period) * dt * speedScale;
      const a = r.angle;
      r.node.position.set(Math.cos(a) * r.o.radius * R, 0, Math.sin(a) * r.o.radius * R);
      r.uniforms.uHead.value = (((a / (Math.PI * 2)) % 1) + 1) % 1;
      r.node.scale.setScalar(1 + r.boost * 0.6);
      r.nodeGlow.scale.setScalar(0.5 + Math.sin(time * 2 + i) * 0.06 + r.boost * 0.35);

      r.node.getWorldPosition(tmp);
      const nodeWorld = tmp.clone();

      // Pulses ride a raised arc from the core surface out to the node.
      for (let k = 0; k < PULSES_PER; k++) {
        const t = (time / (2.2 + i * 0.4) + k / PULSES_PER) % 1;
        const start = nodeWorld.clone().normalize().multiplyScalar(CORE_R * 1.05);
        const mid = start.clone().add(nodeWorld).multiplyScalar(0.5);
        mid.y += 0.55 + i * 0.12;
        const u = 1 - t;
        const x = u * u * start.x + 2 * u * t * mid.x + t * t * nodeWorld.x;
        const y = u * u * start.y + 2 * u * t * mid.y + t * t * nodeWorld.y;
        const z = u * u * start.z + 2 * u * t * mid.z + t * t * nodeWorld.z;
        const idx = i * PULSES_PER + k;
        pulsePos.set([x, y, z], idx * 3);
        pulseAlpha[idx] = Math.sin(t * Math.PI) * (0.95 + r.boost * 0.4);
      }

      // Project the node and carry its HTML label with it.
      const el = labels[i];
      if (!el) return;
      const depth = nodeWorld.distanceTo(camPos);
      tmp.project(camera);
      const sx = ((tmp.x + 1) / 2) * W;
      const sy = ((1 - tmp.y) / 2) * H;
      const occluded =
        depth > coreDist && Math.hypot(sx - coreScreen.x, sy - coreScreen.y) < CORE_R * pxPerUnit * 1.05;
      const scale = Math.min(1.08, Math.max(0.82, coreDist / depth)) * (1 + r.boost * 0.06);
      el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, calc(-100% - 0.9rem)) scale(${scale.toFixed(3)})`;
      const dim = activeOrbit !== null && activeOrbit !== i ? 0.55 : 1;
      el.style.opacity = String((occluded ? 0.18 : depth > coreDist ? 0.72 : 1) * dim * Math.min(1, fade.value * 1.4));
      el.style.zIndex = depth > coreDist ? '1' : '3';
    });
    pulseGeo.attributes.position!.needsUpdate = true;
    pulseGeo.attributes.aAlpha!.needsUpdate = true;

    renderer.render(scene, camera);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  let onScreen = true;
  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = Boolean(entry?.isIntersecting);
    if (onScreen && !document.hidden) start();
    else stop();
  });
  visibility.observe(section);
  const onVisibility = () => (document.hidden || !onScreen ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  function destroy() {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    for (const { el, parent, next } of homes) {
      el.classList.remove('node-label');
      el.style.transform = el.style.opacity = el.style.zIndex = '';
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focus', onEnter);
      el.removeEventListener('blur', onLeave);
      parent?.insertBefore(el, next);
    }
    scene.traverse((obj) => {
      const m = obj as Mesh;
      m.geometry?.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    glowMap.dispose();
    renderer.dispose();
  }

  // A lost context (GPU reset, too many tabs) hands the hero back to the static constellation.
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    box.removeAttribute('data-3d');
    section.removeAttribute('data-3d');
    destroy();
  });

  start();
  return {
    setActive(orbit) {
      activeOrbit = orbit;
      labels.forEach((el, i) => el.toggleAttribute('data-lit', orbit === i));
    },
    destroy,
  };
}
