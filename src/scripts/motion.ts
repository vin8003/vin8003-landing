/**
 * Page-wide motion. Everything here is opt-in by data attribute and does nothing under
 * prefers-reduced-motion:
 *
 *   data-tilt="6"        pointer-tracked 3D tilt (max degrees) with a glare that follows the cursor
 *   data-pointer-light   writes the cursor position to --gx / --gy for CSS edge and surface light
 *   data-magnetic        the control leans toward the cursor
 *   data-count           numerals count up from zero the first time they are seen
 *   data-marquee         the ticker speeds up and reverses with the reader's scroll
 *   data-parallax="20"   drifts with the pointer by up to that many px (negative moves against it);
 *                        add data-lean="6" to also lean toward the pointer in 3D by up to 6 degrees
 *
 * Tilt uses the individual `rotate` / `scale` properties so it never fights the `transform` that
 * the scroll reveal animates.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* --- Pointer light ------------------------------------------------------------------------- */

function trackPointer(el: HTMLElement) {
  el.addEventListener(
    'pointermove',
    (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--gx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    },
    { passive: true },
  );
}

/* --- Tilt ---------------------------------------------------------------------------------- */

function tilt(el: HTMLElement) {
  const max = Number(el.dataset.tilt) || 6;
  const parent = el.parentElement;
  if (parent && !parent.style.perspective) parent.style.perspective = '1600px';

  const glare = document.createElement('span');
  glare.className = 'tilt-glare';
  glare.setAttribute('aria-hidden', 'true');
  el.appendChild(glare);

  let rx = 0;
  let ry = 0;
  let lift = 0;
  let trx = 0;
  let try_ = 0;
  let tlift = 0;
  let raf = 0;

  const tick = () => {
    rx = lerp(rx, trx, 0.12);
    ry = lerp(ry, try_, 0.12);
    lift = lerp(lift, tlift, 0.12);
    const angle = Math.hypot(rx, ry);
    el.style.rotate = angle < 0.01 ? '' : `${(rx / angle).toFixed(4)} ${(ry / angle).toFixed(4)} 0 ${angle.toFixed(3)}deg`;
    el.style.scale = lift < 0.0005 ? '' : String(1 + lift);
    if (Math.abs(rx - trx) + Math.abs(ry - try_) + Math.abs(lift - tlift) > 0.002) raf = requestAnimationFrame(tick);
    else raf = 0;
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  el.addEventListener(
    'pointermove',
    (e) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      trx = -my * max;
      try_ = mx * max;
      tlift = 0.012;
      el.toggleAttribute('data-tilting', true);
      kick();
    },
    { passive: true },
  );
  el.addEventListener('pointerleave', () => {
    trx = try_ = tlift = 0;
    el.removeAttribute('data-tilting');
    kick();
  });
}

/* --- Magnetic ------------------------------------------------------------------------------ */

function magnetic(el: HTMLElement) {
  const strength = 0.28;
  el.addEventListener(
    'pointermove',
    (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength * 1.3 - 2;
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    },
    { passive: true },
  );
  el.addEventListener('pointerleave', () => (el.style.translate = ''));
}

/* --- Count up ------------------------------------------------------------------------------ */

function countUp(el: HTMLElement) {
  const final = el.textContent ?? '';
  const numbers = [...final.matchAll(/\d[\d,]*/g)].map((m) => ({
    raw: m[0],
    value: Number(m[0].replace(/,/g, '')),
    grouped: m[0].includes(','),
  }));
  if (!numbers.length) return;

  const render = (t: number) => {
    let i = 0;
    el.textContent = final.replace(/\d[\d,]*/g, () => {
      const n = numbers[i++]!;
      const v = Math.round(n.value * t);
      return n.grouped ? v.toLocaleString('en-US') : String(v);
    });
  };

  render(0);
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1500 + Math.min(numbers[0]!.value, 1500) * 0.4;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        render(1 - Math.pow(2, -10 * p));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = final;
      };
      requestAnimationFrame(step);
    },
    { threshold: 0.6 },
  );
  io.observe(el);
}

/* --- Marquee ------------------------------------------------------------------------------- */

function marquee(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track) return;
  // Hand the drift over from CSS to the scroll-aware loop.
  track.removeAttribute('data-anim');
  track.style.animation = 'none';

  let x = 0;
  let dir = 1;
  let velocity = 0;
  let lastY = window.scrollY;
  let raf = 0;
  let last = performance.now();
  const base = 42; // px per second at rest

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const y = window.scrollY;
    const delta = y - lastY;
    lastY = y;
    if (Math.abs(delta) > 0.5) dir = delta > 0 ? 1 : -1;
    velocity = lerp(velocity, delta / Math.max(dt, 0.001), 0.1);

    const half = track.scrollWidth / 2;
    x -= (base * dir + velocity * 0.35) * dt;
    if (half > 0) {
      if (-x >= half) x += half;
      if (x > 0) x -= half;
    }
    track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
  };

  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(raf);
    if (entry?.isIntersecting) {
      last = performance.now();
      lastY = window.scrollY;
      raf = requestAnimationFrame(frame);
    }
  }).observe(root);
}

/* --- Pointer parallax --------------------------------------------------------------------- */

function parallax(elements: HTMLElement[]) {
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const visible = new Set<HTMLElement>();
  let raf = 0;

  for (const el of elements) {
    if (el.dataset.lean && el.parentElement && !el.parentElement.style.perspective) {
      el.parentElement.style.perspective = '1400px';
    }
  }

  const frame = () => {
    pointer.x = lerp(pointer.x, pointer.tx, 0.07);
    pointer.y = lerp(pointer.y, pointer.ty, 0.07);
    for (const el of visible) {
      const depth = Number(el.dataset.parallax) || 0;
      el.style.translate = `${(pointer.x * depth).toFixed(2)}px ${(pointer.y * depth * 0.6).toFixed(2)}px`;
      const lean = Number(el.dataset.lean) || 0;
      if (lean) {
        const rx = -pointer.y * lean;
        const ry = pointer.x * lean;
        const angle = Math.hypot(rx, ry);
        el.style.rotate = angle < 0.01 ? '' : `${(rx / angle).toFixed(4)} ${(ry / angle).toFixed(4)} 0 ${angle.toFixed(3)}deg`;
      }
    }
    const settling = Math.abs(pointer.x - pointer.tx) + Math.abs(pointer.y - pointer.ty) > 0.0005;
    raf = settling && visible.size ? requestAnimationFrame(frame) : 0;
  };
  const kick = () => {
    if (!raf && visible.size) raf = requestAnimationFrame(frame);
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.tx = pointer.ty = 0;
    kick();
  });

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) visible.add(e.target as HTMLElement);
      else visible.delete(e.target as HTMLElement);
    }
    kick();
  });
  elements.forEach((el) => io.observe(el));
}

/* --- Boot ---------------------------------------------------------------------------------- */

if (!reduced) {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach(marquee);

  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-tilt], [data-pointer-light], .spot').forEach(trackPointer);
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(tilt);
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(magnetic);
    const drifting = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    if (drifting.length) parallax(drifting);
  }
}
