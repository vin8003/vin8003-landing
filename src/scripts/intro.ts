/**
 * The loading ring on the first visit of a session.
 *
 * It counts toward what the page actually needs for its first screen (the fonts and the first
 * capture in the hero index), never takes longer than MAX_MS, and a click skips it. When it is done
 * the ring wipes away line by line and the page underneath starts its reveals.
 *
 * Resolves immediately when there is no intro to play.
 */

const MIN_MS = 1100;
const MAX_MS = 2600;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function playIntro(): Promise<void> {
  const root = document.documentElement;
  const screen = document.querySelector<HTMLElement>('[data-intro-screen]');
  if (!root.hasAttribute('data-intro') || !screen) {
    root.removeAttribute('data-intro');
    return Promise.resolve();
  }

  const arc = screen.querySelector<SVGCircleElement>('[data-intro-arc]');
  const count = screen.querySelector<HTMLElement>('[data-intro-count]');
  const firstShot = document.querySelector<HTMLImageElement>('[data-hero] [data-shot="0"]');

  // Real work, each worth a share of the ring.
  let ready = 0;
  const tasks: Promise<unknown>[] = [
    document.fonts?.ready ?? Promise.resolve(),
    firstShot && !firstShot.complete ? firstShot.decode().catch(() => {}) : Promise.resolve(),
  ];
  tasks.forEach((t) => void t.then(() => ready++));

  return new Promise((resolve) => {
    const started = performance.now();
    let lastFrame = started;
    let shown = 0;
    let skipped = false;
    screen.addEventListener('click', () => (skipped = true), { once: true });

    const finish = async () => {
      screen.setAttribute('data-done', '');
      root.removeAttribute('data-intro');
      resolve();
      await sleep(1100);
      screen.remove();
    };

    const step = (now: number) => {
      const elapsed = now - started;
      const dt = Math.min(now - lastFrame, 100);
      lastFrame = now;
      // Time alone can carry the ring to 70%; finished work earns the rest.
      const byTime = Math.min(elapsed / MIN_MS, 1) * 0.7;
      const byWork = (ready / tasks.length) * 0.3;
      const target = skipped || elapsed > MAX_MS ? 1 : byTime + byWork;
      // Time-based easing, so a slow device does not stretch the intro.
      shown += (target - shown) * (1 - Math.exp(-dt / 110));
      if ((target >= 0.999 && shown > 0.99) || elapsed > MAX_MS + 500) shown = 1;

      const pct = Math.round(shown * 100);
      if (count) count.textContent = `${pct}%`;
      arc?.setAttribute('stroke-dashoffset', String(100 - pct));

      if (shown >= 1) void sleep(220).then(finish);
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
