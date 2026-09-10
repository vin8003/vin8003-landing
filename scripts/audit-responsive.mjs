/**
 * Drives local Chrome across a range of viewports and reports horizontal
 * overflow, offending elements, and tiny tap targets. Dev-only helper.
 *
 *   node scripts/audit-responsive.mjs [url]
 */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const url = process.argv[2] ?? 'http://127.0.0.1:43117/';
const shot = process.argv.includes('--shots');

const viewports = [
  { name: '320-galaxy-fold', width: 320, height: 800 },
  { name: '360-android', width: 360, height: 800 },
  { name: '390-iphone', width: 390, height: 844 },
  { name: '430-iphone-max', width: 430, height: 932 },
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '834-ipad', width: 834, height: 1112 },
  { name: '1024-laptop', width: 1024, height: 768 },
  { name: '1280-desktop', width: 1280, height: 800 },
  { name: '1440-desktop', width: 1440, height: 900 },
  { name: '1920-wide', width: 1920, height: 1080 },
  { name: '2560-ultrawide', width: 2560, height: 1400 },
];

const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome' });
if (shot) await mkdir('/tmp/shots', { recursive: true });

let problems = 0;

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  await page.goto(url, { waitUntil: 'networkidle' });

  // Let reveal animations settle so nothing is measured mid-transform.
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
  });
  await page.waitForTimeout(400);

  const report = await page.evaluate((vw) => {
    const doc = document.documentElement;

    // Ground truth: can a user actually drag the page sideways?
    const before = window.scrollX;
    window.scrollTo(99999, window.scrollY);
    const scrollable = Math.round(window.scrollX);
    window.scrollTo(before, window.scrollY);

    const overflow = Math.max(scrollable, doc.scrollWidth - vw > 1 ? doc.scrollWidth - vw : 0);

    // An element only causes visible overflow if no ancestor clips it.
    const clipped = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox !== 'visible') return true;
      }
      return false;
    };

    const offenders = [];
    if (overflow > 1) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        const style = getComputedStyle(el);
        if (style.position === 'fixed') continue;
        if (r.right <= vw + 1 && r.left >= -1) continue;
        if (clipped(el)) continue;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.toString?.() ?? '').slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          id: el.closest('[id]')?.id ?? '',
        });
      }
    }

    // Interactive elements smaller than a comfortable touch target.
    const small = [];
    for (const el of document.querySelectorAll('a, button')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.height < 24 || r.width < 24) {
        small.push({ text: (el.textContent ?? '').trim().slice(0, 40), h: Math.round(r.height), w: Math.round(r.width) });
      }
    }

    return { overflow, offenders: offenders.slice(0, 8), offenderCount: offenders.length, small: small.slice(0, 6), height: doc.scrollHeight };
  }, vp.width);

  const flag = report.overflow > 1 ? 'OVERFLOW' : 'ok';
  if (report.overflow > 1) problems++;
  console.log(`\n${vp.name.padEnd(18)} ${String(vp.width).padStart(5)}px  ${flag}  (scroll ${report.overflow > 1 ? `+${report.overflow}px` : '0'}, page ${report.height}px)`);

  for (const o of report.offenders) {
    console.log(`   ↳ <${o.tag}> [#${o.id}] ${o.left}..${o.right}  ${o.cls}`);
  }
  if (report.offenderCount > report.offenders.length) {
    console.log(`   ↳ …and ${report.offenderCount - report.offenders.length} more`);
  }
  for (const s of report.small) {
    console.log(`   · small target ${s.w}x${s.h} "${s.text}"`);
  }

  if (shot) {
    await page.screenshot({ path: `/tmp/shots/${vp.name}.png`, fullPage: true });
  }

  await page.close();
}

await browser.close();
console.log(`\n${problems === 0 ? 'No horizontal overflow at any tested width.' : `${problems} viewport(s) overflow.`}`);
