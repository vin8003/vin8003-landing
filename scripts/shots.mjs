/**
 * Screenshots the built page for visual review. Dev-only helper.
 *
 *   node scripts/shots.mjs [url] [--theme light]
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://127.0.0.1:43117/';
const themeArg = process.argv.indexOf('--theme');
const theme = themeArg > -1 ? process.argv[themeArg + 1] : 'dark';
const out = `/tmp/shots-${theme}`;

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome' });

for (const vp of [
  { name: 'desktop', width: 1440, height: 950 },
  { name: 'phone', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
  await page.addInitScript((t) => localStorage.setItem('vin8003-theme', t), theme);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
    document.querySelectorAll('.reveal-line, .rule-draw').forEach((el) => el.classList.add('is-revealed'));
  });
  await page.waitForTimeout(600);

  await page.screenshot({ path: `${out}/${vp.name}-hero.png` });

  for (const id of ['building', 'lab', 'log', 'thesis', 'about', 'contact']) {
    await page.evaluate((target) => {
      document.querySelector(`#${target}`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }, id);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${vp.name}-${id}.png` });
  }

  await page.close();
}

await browser.close();
console.log(`Wrote ${out}`);
