# vin8003.com

Personal landing page and product demo hub for **Vineet Sharma** — builder and founder, Delhi NCR, India.

It is a single static page that introduces Vineet and then hands the visitor straight into the real
products: **OrderEasy** (retailer + customer shop SaaS), **CiteBench** (case-law research desk for Indian
practice) and **GSTSlip** (India GST invoice capture).

Every product section carries a hand-built preview of that product's surface, a set of deep links into the
individual steps of the real guided demo, and a button that loads the actual demo inline in an iframe.

## Stack

| Piece      | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | [Astro](https://astro.build) 7, static output, zero UI framework |
| Styling    | Tailwind CSS v4 via `@tailwindcss/vite`, tokens in `src/styles/global.css` |
| Fonts      | Fraunces (soft) / Instrument Sans / JetBrains Mono, self-hosted from `public/fonts` |
| Motion     | `IntersectionObserver` + CSS keyframes, fully gated on `prefers-reduced-motion` |
| Hosting    | Cloudflare Workers static assets (Cloudflare Pages also works) |

There is no client-side framework and no tracking. The only JavaScript is a few dozen lines for scroll
reveals, the nav progress bar and the inline demo embeds.

## Running it locally

```bash
npm install
npm run dev            # http://localhost:4321
```

Other scripts:

```bash
npm run build          # static build into dist/
npm run preview        # serve the built output
npm run check          # astro type + template check
npm run og             # regenerate public/og.png and the app icons
npm run fonts          # re-copy the latin woff2 subsets into public/fonts
npm run audit          # responsive sweep across 11 viewports (needs the dev server running)
npm run deploy         # build, then wrangler deploy
```

`npm run audit` drives local Chrome through widths from 320px to 2560px and reports any horizontal
overflow along with the elements responsible. Run it after layout changes:

```bash
npm run dev &
npm run audit -- http://localhost:4321/
```

### Fonts

The three typefaces are committed as latin-only `woff2` files in `public/fonts`, declared with plain
`@font-face` rules in `src/styles/global.css`, and the two used above the fold are preloaded. Importing
the Fontsource stylesheets directly would pull every unicode subset and both slants — roughly double the
bytes for glyphs this site never renders. `npm run fonts` re-copies them from the Fontsource packages,
which are kept as dependencies purely as the source of those files.

### Regenerating the social card

`npm run og` renders `public/og.png` with `sharp`. It draws real type, so the three brand fonts have to be
visible to fontconfig on the machine running it. Fontsource only ships `woff2`, so convert them once:

```bash
pip install fonttools brotli
python3 - <<'PY'
from fontTools.ttLib import TTFont
import os
srcs = {
  'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-soft-normal.woff2': 'Fraunces-Soft.ttf',
  'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2': 'InstrumentSans-Variable.ttf',
  'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2': 'JetBrainsMono-Variable.ttf',
}
os.makedirs(os.path.expanduser('~/.fonts'), exist_ok=True)
for src, out in srcs.items():
    f = TTFont(src); f.flavor = None
    f.save(os.path.expanduser('~/.fonts/' + out))
PY
fc-cache -f
```

The generated `og.png` is committed, so you only need this if you change the card.

## Editing the content

Nearly all copy lives in one file: **`src/data/site.ts`**.

- `person`, `socials` — name, bio, contact links. The phone number is deliberately not on this site.
- `products` — the four product sections. Each has `headline`, `blurb`, `guardrail`, `facts`, `links`,
  an optional `embed` URL (used for the inline iframe and the step deep links) and the `steps` array that
  mirrors the real guided demo.
- `houseRules` — quotes lifted verbatim from the live product surfaces.
- `method`, `stack`, `nav`.

Adding a product means adding an entry to `products`, writing a preview component in
`src/components/mocks/`, and rendering one more `<ProductSection>` in `src/pages/index.astro`.

### Where the product links point

| Surface                    | URL                                                             |
| -------------------------- | --------------------------------------------------------------- |
| Demo hub                   | `https://oe-product-demos.vin8003.workers.dev/`        |
| OrderEasy — retailer demo  | `https://oe-product-demos.vin8003.workers.dev/retailer/` |
| OrderEasy — customer demo  | `https://oe-product-demos.vin8003.workers.dev/customer/` |
| CiteBench — guided demo    | `https://oe-product-demos.vin8003.workers.dev/citebench/` |
| CiteBench — live app       | `https://citebench.ordereasy.win`                                 |
| GSTSlip — live app         | `https://gstslip.grok.me`                                         |

The step chips deep-link to `#step-1` … `#step-10` on the demo pages, which is the anchor scheme the demo
hub already uses. If the demo hub is redeployed to a different `workers.dev` subdomain, change `DEMO_HUB`
in `src/data/site.ts` — everything else follows from it.

## Deploying to Cloudflare

The project builds to plain static files in `dist/`, so either Cloudflare product works. `wrangler.jsonc`
is set up for **Workers static assets**, which is the recommended path.

### Option A — Workers (configured here)

```bash
npx wrangler login       # once, on your machine
npm run deploy           # astro build && wrangler deploy
```

That publishes the Worker as `vin8003-com` and serves `dist/` from it. You get a
`vin8003-com.<your-subdomain>.workers.dev` URL immediately, which is useful for checking the deploy before
DNS is pointed anywhere.

`not_found_handling` is set to `404-page`, so unknown paths render the styled `/404.html`.

### Option B — Pages

If you would rather connect the Git repo and get preview deployments per branch:

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick this repository and the branch you deploy from.
3. Build command: `npm run build`. Build output directory: `dist`. Framework preset: Astro.
4. Save and deploy.

`public/_headers` is respected by both Pages and Workers static assets, so the caching and security headers
carry over either way.

## Pointing vin8003.com at it

DNS for `vin8003.com` is already on Cloudflare, which makes this short. Do the deploy first so there is
something to attach.

### If you deployed to Workers (Option A)

1. Cloudflare dashboard → **Workers & Pages** → **vin8003-com** → **Settings** → **Domains & Routes**.
2. **Add** → **Custom domain**.
3. Enter `vin8003.com`, add it, then repeat for `www.vin8003.com`.
4. Cloudflare creates the proxied DNS records and issues the certificate itself. No manual `CNAME` needed.

You can also declare the domains in `wrangler.jsonc` so they are part of the deploy rather than dashboard
state:

```jsonc
"routes": [
  { "pattern": "vin8003.com", "custom_domain": true },
  { "pattern": "www.vin8003.com", "custom_domain": true }
]
```

### If you deployed to Pages (Option B)

1. Cloudflare dashboard → the Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `vin8003.com`, then repeat for `www.vin8003.com`.
3. Because the zone is already on Cloudflare, it offers to create the records for you — accept.

### Redirect www → apex

So the site has one canonical address (the `<link rel="canonical">` in the page points at the apex):

1. Cloudflare dashboard → the `vin8003.com` zone → **Rules** → **Redirect Rules** → **Create rule**.
2. Condition: `Hostname equals www.vin8003.com`.
3. Action: **Dynamic redirect**, status **301**, expression
   `concat("https://vin8003.com", http.request.uri.path)`, preserve query string.

### Check it worked

```bash
curl -sI https://vin8003.com | head -n 1          # expect HTTP/2 200
curl -sI https://www.vin8003.com | head -n 1      # expect HTTP/2 301
```

Certificates are usually live within a couple of minutes of adding the custom domain; if the site serves
but the certificate is not ready yet, give it a little longer before debugging.

## Notes on the content

- No usage numbers, revenue figures or testimonials appear anywhere. The demo previews are labelled as seed
  or sample data, and the seed shop is GreenCart Mini Mart — the same one used in the real OrderEasy demos.
- The "House rules" quotes are Vineet's own product copy, taken from the live surfaces.
- Contact is email and social only. The phone number is intentionally absent.
