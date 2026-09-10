/**
 * Copies the three latin woff2 files the site actually uses out of the
 * Fontsource packages and into public/fonts/.
 *
 * The packages ship every subset and both slants; importing their CSS pulls all
 * of it. Serving three fixed filenames from public/ instead keeps the payload
 * to what is used and makes the files preloadable by a stable name.
 *
 * Run with `npm run fonts` after bumping a Fontsource dependency.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dest = resolve(root, 'public/fonts');

const files = {
  'instrument-serif-400.woff2':
    'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2',
  'instrument-sans-var.woff2':
    'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
  'jetbrains-mono-var.woff2':
    'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
};

await mkdir(dest, { recursive: true });
for (const [out, src] of Object.entries(files)) {
  await copyFile(resolve(root, src), resolve(dest, out));
  console.log(`fonts/${out}`);
}
