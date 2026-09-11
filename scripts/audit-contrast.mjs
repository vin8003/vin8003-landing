/**
 * Walks every text node on the built page and reports WCAG AA failures against
 * the actual computed colours, in both themes. Dev-only helper.
 *
 *   node scripts/audit-contrast.mjs [url]
 */
import { chromium } from 'playwright-core';

const url = process.argv[2] ?? 'http://127.0.0.1:43117/';

const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome' });
let failures = 0;

for (const theme of ['dark', 'light']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript((t) => localStorage.setItem('vin8003-theme', t), theme);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
    document.querySelectorAll('.reveal-line, .rule-draw').forEach((el) => el.classList.add('is-revealed'));
  });
  await page.waitForTimeout(400);

  const report = await page.evaluate(() => {
    // Chrome serialises color-mix() results as oklab(), so parsing the string
    // is not enough. Painting the colour and reading it back always lands in
    // sRGB, whatever notation the computed style used.
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    ctx.canvas.width = ctx.canvas.height = 1;

    const parse = (value) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };

    const lum = ({ r, g, b }) =>
      [r, g, b]
        .map((c) => c / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
        .reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);

    const over = (fg, bg) => ({
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1,
    });

    // Composite every translucent layer up to the first opaque ancestor.
    const backdrop = (el) => {
      const stack = [];
      for (let node = el; node; node = node.parentElement) {
        const bg = parse(getComputedStyle(node).backgroundColor);
        if (bg.a === 0) continue;
        stack.push(bg);
        if (bg.a === 1) break;
      }
      return stack.reduceRight((acc, layer) => over(layer, acc), { r: 8, g: 8, b: 10, a: 1 });
    };

    const results = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent?.trim();
      if (!text) continue;
      const el = node.parentElement;
      if (!el || el.closest('.sr-only, [aria-hidden="true"]')) continue;

      const style = getComputedStyle(el);
      if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) < 0.1) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const bg = backdrop(el);
      const fg = over(parse(style.color), bg);
      const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
      const ratio = (hi + 0.05) / (lo + 0.05);

      const px = parseFloat(style.fontSize);
      const large = px >= 24 || (px >= 18.66 && Number(style.fontWeight) >= 700);
      const need = large ? 3 : 4.5;

      if (ratio < need) {
        results.push({
          text: text.slice(0, 52),
          ratio: Math.round(ratio * 100) / 100,
          need,
          px: Math.round(px),
          cls: el.className?.toString?.().slice(0, 70) ?? '',
        });
      }
    }
    return results;
  });

  console.log(`\n${theme}: ${report.length === 0 ? 'no AA failures' : `${report.length} AA failure(s)`}`);
  for (const r of report) {
    console.log(`   ${r.ratio} (needs ${r.need}) ${r.px}px  "${r.text}"  ${r.cls}`);
  }
  failures += report.length;
  await page.close();
}

await browser.close();
process.exit(failures === 0 ? 0 : 1);
