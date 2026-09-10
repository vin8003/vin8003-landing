/**
 * Renders the social card to public/og.png.
 *
 * Run with `npm run og`. Needs the brand fonts visible to fontconfig — see the
 * README section on regenerating the OG image.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200;
const H = 630;

const products = [
  { name: 'OrderEasy', note: 'retailer SaaS', color: '#3DDC97' },
  { name: 'CiteBench', note: 'legal desk', color: '#8A7CFF' },
  { name: 'GSTSlip', note: 'GST capture', color: '#FFB020' },
];

const chips = products
  .map((p, i) => {
    const x = 80 + i * 356;
    return `
      <g transform="translate(${x}, 452)">
        <rect width="316" height="98" rx="16" fill="#101014" stroke="#2A2A35"/>
        <circle cx="26" cy="34" r="5" fill="${p.color}"/>
        <text x="44" y="40" font-family="Instrument Sans" font-size="25" font-weight="600" fill="#EFEAE1">${p.name}</text>
        <text x="26" y="72" font-family="JetBrains Mono" font-size="15" letter-spacing="1.6" fill="#7D7970">${p.note.toUpperCase()}</text>
      </g>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.2" cy="0.05" r="0.85">
      <stop offset="0%" stop-color="#FF4D1C" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#FF4D1C" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#08080A"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g transform="translate(80, 92)">
    <circle cx="5" cy="-5" r="5" fill="#3DDC97"/>
    <text x="24" y="1" font-family="JetBrains Mono" font-size="17" letter-spacing="2.8" fill="#B9B3A8">BUILDER &amp; FOUNDER — DELHI NCR, INDIA</text>
  </g>

  <text x="80" y="210" font-family="Fraunces" font-size="80" fill="#EFEAE1">I build products</text>
  <text x="80" y="292" font-family="Fraunces" font-size="80" fill="#EFEAE1">end to end —</text>
  <text x="80" y="362" font-family="Fraunces" font-size="44" fill="#B9B3A8">sensors, fintech, AI, and what is live now.</text>

  ${chips}

  <line x1="80" y1="588" x2="1120" y2="588" stroke="#2A2A35"/>
  <text x="80" y="617" font-family="JetBrains Mono" font-size="17" letter-spacing="2" fill="#EFEAE1">VIN8003.COM</text>
  <text x="1120" y="617" text-anchor="end" font-family="JetBrains Mono" font-size="17" letter-spacing="2" fill="#7D7970">@VIN8003</text>
</svg>`;

const out = resolve(root, 'public/og.png');
await mkdir(dirname(out), { recursive: true });
await sharp(Buffer.from(svg), { density: 144 })
  .resize(W, H, { fit: 'fill' })
  .png({ compressionLevel: 9 })
  .toFile(out);
await writeFile(resolve(root, 'public/og.svg'), svg);
console.log(`Wrote ${out}`);

// Raster icons for platforms that will not take the SVG favicon.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#08080A"/>
  <path d="M13 18 L24.5 46 L36 18" fill="none" stroke="#EFEAE1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="47" cy="42" r="5" fill="#FF4D1C"/>
</svg>`;

for (const size of [180, 512]) {
  const file = resolve(root, `public/icon-${size}.png`);
  await sharp(Buffer.from(icon), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
  console.log(`Wrote ${file}`);
}
