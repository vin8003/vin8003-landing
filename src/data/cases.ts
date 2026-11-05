/**
 * CASE STUDIES - one page per product at /work/<id>/.
 *
 * Same rules as site.ts: every claim maps to a merged PR, a default-branch
 * commit or a deploy commit, and carries the link. No usage numbers yet
 * (Vineet, 5 Nov 2026); add `outcomes` only with measured figures he supplies.
 */

type Link = { label: string; href: string };

const gh = (repo: string) => `https://github.com/vin8003/${repo}`;
const pr = (repo: string, n: number): Link => ({ label: `${repo} #${n}`, href: `${gh(repo)}/pull/${n}` });
const commit = (repo: string, sha: string): Link => ({ label: `${repo} @ ${sha}`, href: `${gh(repo)}/commit/${sha}` });

export type CaseStudy = {
  /** Matches the venture id in site.ts. */
  id: 'ordereasy' | 'citebench' | 'gstslip';
  name: string;
  accent: 'mint' | 'violet' | 'amber';
  kind: string;
  /** One line under the title. */
  dek: string;
  /** Who it is for and what was wrong before. */
  problem: string[];
  /** My part. */
  role: string;
  /** The shape of the system. */
  stack: string[];
  /** What got built, each with its proof. */
  built: { line: string; link: Link }[];
  /** Calls that were not obvious, and why. */
  calls: { title: string; body: string; link?: Link }[];
  /** Captures from the demo player: [demo id, image file, alt]. */
  shots: { demo: 'retailer' | 'customer' | 'citebench' | 'gstslip'; image: string; alt: string }[];
  /** Measured results. Empty until there are real numbers to show. */
  outcomes: { value: string; label: string; source: string }[];
  live: Link[];
  demo: string;
};

export const cases: CaseStudy[] = [
  {
    id: 'ordereasy',
    name: 'OrderEasy',
    accent: 'mint',
    kind: 'Retailer + customer shop SaaS',
    dek: 'A billing counter for a neighbourhood shop, and an ordering app for the customers who already know it.',
    problem: [
      'A kirana or general store in India bills at the counter, keeps a credit book for its distributors, and takes phone and WhatsApp orders from regulars. Those three jobs usually live in three places: a billing app, a notebook and a phone.',
      'Marketplaces solve a different problem. They put the shop next to its competitors and take a cut. The shop wanted its own regulars to order from it, with stock and bills that agree.',
    ],
    role: 'Sole builder: the Django platform, the retailer web app and POS, the customer web and Android app, the end-to-end test suite, deploys, the demo captures and the support inbox.',
    stack: ['Python, Django, REST APIs', 'React + TypeScript (retailer and customer)', 'Capacitor for Android', 'Playwright end-to-end suite', 'Cloudflare'],
    built: [
      { line: 'A phone-first POS: single-column bill, camera barcode scanning that stays open between scans, server-side catalogue search.', link: pr('retailer_ordereasy_njs', 145) },
      { line: 'Inclusive GST with HSN codes across POS bills, online orders, purchase invoices and returns, with sale-time rates snapshotted so an old bill never changes.', link: pr('RetailerCustomerPlatform', 103) },
      { line: 'Exact-amount UPI QR per order and per POS bill, split bills included, printed on thermal receipts.', link: commit('retailer_web_build', '588bfd2') },
      { line: 'Distance-based delivery fees: flat or tiered by km, shown to customers by their GPS pin, enforced at checkout.', link: pr('RetailerCustomerPlatform', 200) },
      { line: 'Open shop sign-up with a five-step verification and one admin approval before customers can see the shop.', link: pr('retailer_ordereasy_njs', 158) },
      { line: 'Customer reports for products and shops that go to a review queue, never an automatic takedown.', link: pr('customer_ordereasy_njs', 103) },
      { line: 'The customer app wrapped for Android with native Google sign-in and UPI apps opened directly.', link: commit('customer_ordereasy_njs', 'e3d0112') },
    ],
    calls: [
      {
        title: 'Not a marketplace',
        body: 'Customers open the shop they already know. There is a city list, but no ranking, ads or commission. That keeps the product on the shop’s side and keeps the scope small enough for one person to support.',
      },
      {
        title: 'Snapshot tax at the moment of sale',
        body: 'GST rates and HSN codes are copied onto each line when it is sold. Changing a product’s rate later can’t rewrite last month’s bills, which is what an accountant checks first.',
        link: pr('RetailerCustomerPlatform', 103),
      },
      {
        title: 'Search on the server, not in the browser',
        body: 'The POS first loaded the whole catalogue, and after one deploy the product list timed out in production. The fix moved search to the server with a per-shop cache that clears on every stock or price change, and exact lookups for scanned barcodes.',
        link: pr('retailer_ordereasy_njs', 157),
      },
      {
        title: 'Reports flag, people decide',
        body: 'A customer report or a strike never hides a product or suspends a shop by itself. It goes to a review queue, and the retailer is told what is held and how to fix it. One angry customer can’t take a shop offline.',
        link: pr('customer_ordereasy_njs', 103),
      },
      {
        title: 'A test gate that uses the real storefront',
        body: 'Playwright journeys cover POS bills, the order lifecycle, khata, reports, offers, inventory and delivery fees against a local stack that blocks every live host. The first run found bugs that unit tests had missed.',
        link: pr('RetailerCustomerPlatform', 217),
      },
    ],
    shots: [
      { demo: 'retailer', image: 'retailer-pos-bill.jpg', alt: 'Retailer POS with a server search and a running bill' },
      { demo: 'retailer', image: 'retailer-orders-inbox.jpg', alt: 'Retailer Active Inbox of orders that still need the shop' },
      { demo: 'retailer', image: 'retailer-verification.jpg', alt: 'Five-step shop verification checklist' },
    ],
    outcomes: [],
    live: [
      { label: 'ordereasy.win', href: 'https://ordereasy.win' },
      { label: 'Customer portal', href: 'https://customer.ordereasy.win' },
    ],
    demo: '/demo/#retailer',
  },
  {
    id: 'citebench',
    name: 'CiteBench',
    accent: 'violet',
    kind: 'Case-law research desk',
    dek: 'A chamber’s diary, its matters and its case-law research in one place, built for Indian practice.',
    problem: [
      'A practising advocate’s day runs on hearing dates, a pile of live matters and research that has to hold up in court. The tools are split: a diary, the court’s case-status site, and a search engine for judgments.',
      'Research tools that write fluent answers are a risk here. A citation that was never actually retrieved is worse than no citation.',
    ],
    role: 'Sole builder: backend, court-data adapters, research and Ask, the chamber UI and its design system.',
    stack: ['TypeScript, React, TanStack Start', 'Postgres via Kysely', 'Indian Kanoon and court-data adapters', 'English and Hindi'],
    built: [
      { line: 'Court case import by CNR, court-data adapters and Indian Kanoon search, with an admin switch between data providers.', link: commit('nyayasetu', 'd9cf3ad') },
      { line: 'A chamber built around live cases: Today, Diary, Matters, Inbox, with matter tabs and a welcome flow.', link: commit('nyayasetu', 'ded7307') },
      { line: 'Ask: questions on a case answered with research-grade citations, saved per case beside a briefing sheet.', link: commit('nyayasetu', '6b5ad77') },
      { line: 'Light and dark themes, a ⌘K command palette and keyboard shortcuts, with the Today board in the first HTML.', link: pr('nyayasetu', 14) },
    ],
    calls: [
      {
        title: 'Show only what was retrieved',
        body: 'Research results list the authorities the search actually returned, and suggestions are kept visibly apart from court directions. The guardrail is printed in the product: suggestions are not court directions.',
      },
      {
        title: 'The advocate confirms, then the file changes',
        body: 'Fetch an order by CNR or paste one into the Inbox, and CiteBench reads out the directions. Nothing on the matter updates until the advocate confirms it.',
      },
      {
        title: 'Calls leave from India',
        body: 'Connections to Indian Kanoon kept resetting. The cause was the network path, fixed with an IPv4 lookup, and lookups now run from the Mumbai region.',
        link: pr('nyayasetu', 17),
      },
      {
        title: 'Providers behind an adapter',
        body: 'Court data comes from more than one source, and sources change. Each one sits behind an adapter with an admin switch, so a provider can be replaced without touching the chamber.',
        link: commit('nyayasetu', 'd9cf3ad'),
      },
    ],
    shots: [
      { demo: 'citebench', image: 'citebench-today.jpg', alt: 'CiteBench Today board for a chamber' },
      { demo: 'citebench', image: 'citebench-research.jpg', alt: 'Research by facts, question or court' },
      { demo: 'citebench', image: 'citebench-directions-vs-suggestions.jpg', alt: 'Court directions and suggestions kept apart' },
    ],
    outcomes: [],
    live: [{ label: 'citebench.ordereasy.win', href: 'https://citebench.ordereasy.win' }],
    demo: '/demo/#citebench',
  },
  {
    id: 'gstslip',
    name: 'GSTSlip',
    accent: 'amber',
    kind: 'India GST invoice capture',
    dek: 'Photograph a tax invoice and get back one clean register row, ready for CSV or Tally.',
    problem: [
      'Small businesses and their accountants still type purchase invoices into a register by hand: GSTIN, invoice number, taxable value, each tax head and the HSN lines.',
      'It is slow, it is where input-credit mistakes start, and it is the same few fields every time.',
    ],
    role: 'Sole builder: capture and extraction, the register, exports, billing and the admin desk.',
    stack: ['TypeScript, React, TanStack Start', 'Postgres via Kysely', 'Razorpay Checkout', 'TallyPrime XML export'],
    built: [
      { line: 'First version live at gstslip.vin8003.com: photograph or upload, extracted header fields and line items.', link: commit('gstslip', '105a547') },
      { line: 'A wider GST field set, invoices stored server-side, TallyPrime purchase XML export and an admin desk.', link: commit('gstslip', '53d3c62') },
      { line: 'Paid Pro plan through Razorpay Checkout: 10 free documents, then ₹499 for 30 days.', link: { label: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com' } },
      { line: 'Restyled as a tax desk rather than a template, with the framework pinned to its patched release.', link: commit('gstslip', '98a7173') },
    ],
    calls: [
      {
        title: 'One invoice, one row',
        body: 'The output is a register row, not a document viewer. Defaults the user sets fill the gaps, and the row exports as CSV or as Tally purchase XML, so it lands where the accountant already works.',
      },
      {
        title: 'Priced from day one',
        body: 'A small free allowance, then a flat monthly price. It tests whether the job is worth paying for, rather than whether people will try a free tool.',
      },
    ],
    shots: [
      { demo: 'gstslip', image: 'gstslip-extracted-fields.jpg', alt: 'Header fields extracted from a GST invoice' },
      { demo: 'gstslip', image: 'gstslip-line-items.jpg', alt: 'Line items with HSN codes' },
      { demo: 'gstslip', image: 'gstslip-register-row.jpg', alt: 'One register row per invoice' },
    ],
    outcomes: [],
    live: [{ label: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com' }],
    demo: '/demo/#gstslip',
  },
];

export const caseHref = (id: CaseStudy['id']) => `/work/${id}/`;
