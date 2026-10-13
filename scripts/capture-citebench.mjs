/**
 * Recaptures the CiteBench demo screens from a locally running build.
 *
 *   node scripts/capture-citebench.mjs [baseUrl]      (default http://127.0.0.1:8080)
 *
 * CiteBench runs on in-memory PGLite with no DATABASE_URL, so nothing real is touched. The script
 * registers a throwaway local account with a random password, loads the seed chamber through a
 * temporary `POST /api/zz-seed` route (kept out of the CiteBench repo), then writes the JPEGs to
 * public/demo/citebench/media/ at 2160x1350, the size of the existing captures.
 *
 * CHROME_PATH overrides the browser. Every party, case number and listing in the seed is invented.
 */
import { chromium } from 'playwright-core';
import { randomBytes } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] ?? 'http://127.0.0.1:8080';
const outDir = fileURLToPath(new URL('../public/demo/citebench/media/', import.meta.url));
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const user = 'adv.meera.rathore@chambers.test';
const password = `${randomBytes(9).toString('hex')}Aa1!`;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chrome });
const ctxOpts = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 };

const settle = async (p, ms = 1200) => {
  await p.waitForFunction(() => !document.querySelector('[class*="skeleton" i]'), null, { timeout: 30000 }).catch(() => {});
  await p.evaluate(() => document.fonts?.ready);
  await p.waitForTimeout(ms);
};
const shoot = async (p, name) => {
  await p.evaluate(() => document.activeElement?.blur());
  await p.mouse.move(1430, 890);
  await p.screenshot({ path: `${outDir}citebench-${name}.jpg`, type: 'jpeg', quality: 84 });
  console.log('wrote', name);
};
const go = async (p, path) => {
  await p.goto(base + path, { waitUntil: 'load' });
  await p.waitForSelector('main', { timeout: 60000 });
  await settle(p);
};
const openMatter = async (p, title) => {
  await go(p, '/matters');
  await p.locator('main a, main button').filter({ hasText: title }).first().click();
  await p.waitForSelector('[role=tab]', { timeout: 30000 });
  await settle(p, 1500);
};

// 1. Sign-in card, before any session exists.
{
  const ctx = await browser.newContext(ctxOpts);
  const p = await ctx.newPage();
  await p.goto(`${base}/login`, { waitUntil: 'load' });
  await p.waitForSelector('input[name=username]', { timeout: 60000 });
  await p.fill('input[name=username]', user);
  await p.fill('input[name=password]', 'placeholder-pass');
  await settle(p, 500);
  await shoot(p, 'sign-in-chamber');
  await ctx.close();
}

// 2. Register, name the account, seed.
const ctx = await browser.newContext(ctxOpts);
const p = await ctx.newPage();
await p.goto(`${base}/login?mode=register`, { waitUntil: 'load' });
await p.waitForSelector('input[name=username]', { timeout: 60000 });
await p.waitForTimeout(800);
await p.fill('input[name=username]', user);
await p.fill('input[name=password]', password);
await p.getByRole('button', { name: 'Create account' }).click();
await p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 });
await p.waitForTimeout(1500);
const seeded = await p.evaluate(async () => {
  await fetch('/api/auth/update-user', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Meera Rathore' }) });
  const r = await fetch('/api/zz-seed', { method: 'POST' });
  return { status: r.status, body: await r.text() };
});
if (seeded.status !== 200) throw new Error(`seed failed: ${seeded.status} ${seeded.body.slice(0, 300)}`);
console.log('seeded', seeded.body.slice(0, 160));

// 3. The screens.
await go(p, '/');
await p.getByText('In court today').waitFor({ timeout: 30000 });
await shoot(p, 'today');

await go(p, '/diary');
await shoot(p, 'diary');

await go(p, '/matters');
await shoot(p, 'matters');

// Papers tab, not Overview: the overview's next-hearing card clips the court room text (a CiteBench CSS bug).
await openMatter(p, 'Kohli Steel Fabricators');
await p.getByRole('tab', { name: /^Papers/ }).click();
await settle(p, 1200);
await shoot(p, 'inside-matter');

await go(p, '/research');
await p.locator('textarea').first().fill(
  'The accused has been in judicial custody since 17 September 2026 in FIR 244/2026, PS Hauz Khas, under BNS 318(4) and 316(2). The complainant paid ₹22 lakh in stages for the interior fit-out of a showroom; about 70% of the work was completed and is recorded in measurement sheets and WhatsApp messages. No chargesheet has been filed and there is no recovery to be made.',
);
await p.getByPlaceholder(/Does anticipatory bail lie/).fill('Is custody justified for a contractual fit-out dispute booked as cheating, and when does default bail arise?');
await p.getByLabel('Practice area').selectOption('criminal');
await p.getByLabel('Side').selectOption('respondent');
await settle(p, 600);
await shoot(p, 'research');

await go(p, '/research');
await p.locator('main a, main button').filter({ hasText: 'Regular bail where' }).first().click();
await p.getByRole('tab', { name: /^Precedents/ }).click();
await settle(p, 1200);
await shoot(p, 'authorities-retrieved');

await openMatter(p, 'Kohli Steel Fabricators');
await p.getByRole('tab', { name: /^Tasks/ }).click();
await settle(p, 1200);
await shoot(p, 'directions-vs-suggestions');

await go(p, '/inbox');
await p.locator('main button, main a').filter({ hasText: 'Kohli Steel' }).first().click();
await p.getByText('Court directions').first().waitFor({ timeout: 15000 });
await settle(p, 800);
await shoot(p, 'inbox');

await go(p, '/ask');
await p.getByText('Default bail dates').first().click();
await p.getByText('60 days').first().waitFor({ timeout: 15000 });
await settle(p, 800);
await shoot(p, 'ask');

// 4. Hindi, from the account menu.
await go(p, '/');
await p.locator('aside button').filter({ hasText: 'Meera' }).first().click();
await p.getByText('हिन्दी').first().click();
await p.waitForTimeout(800);
await p.keyboard.press('Escape');
await settle(p, 1500);
await shoot(p, 'hi-en');

await browser.close();
