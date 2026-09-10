/**
 * Every string here is either Vineet's own product copy (pulled from the live
 * demo hub / live apps) or plain biography. Nothing is embellished, and there
 * are deliberately no usage numbers anywhere on this site.
 */

export const person = {
  name: 'Vineet Sharma',
  handle: 'vin8003',
  role: 'Builder & founder',
  location: 'Delhi NCR, India',
  email: 'vin8003@gmail.com',
  tagline: 'I build products for the shop counter, the law chamber, and the GST file.',
  bio: 'Builder and founder. Ten years of Python and Django on the backend, now shipping AI-shaped SaaS end to end — design, code, deploy, support. Dad of two, based in Delhi NCR, India.',
} as const;

export const socials = [
  { label: 'Email', handle: 'vin8003@gmail.com', href: 'mailto:vin8003@gmail.com' },
  { label: 'X', handle: '@vin8003', href: 'https://x.com/vin8003' },
  { label: 'LinkedIn', handle: 'in/vin8003', href: 'https://www.linkedin.com/in/vin8003' },
  { label: 'GitHub', handle: 'vin8003', href: 'https://github.com/vin8003' },
] as const;

// Stable target (vin8003 account): https://oe-product-demos.vin8003.workers.dev — not live yet (404).
// Interim densified hub: product-demos-hub on eager-turkey (verified 200, subpaths OK).
const DEMO_HUB = 'https://product-demos-hub.eager-turkey.workers.dev';

export const demoHub = DEMO_HUB;

export type Step = { n: string; name: string; note: string };

export type Product = {
  id: string;
  index: string;
  name: string;
  kind: string;
  accent: 'mint' | 'violet' | 'amber';
  headline: string;
  blurb: string;
  /** Vineet's own boundary line for the product — what it deliberately is not. */
  guardrail: string;
  facts: string[];
  links: { label: string; href: string; primary?: boolean }[];
  /** Live demo URL that can be framed inline. Absent = link-out only. */
  embed?: string;
  steps?: Step[];
  seed?: string;
};

export const products: Product[] = [
  {
    id: 'ordereasy-retailer',
    index: '01',
    name: 'OrderEasy',
    kind: 'Retailer journey',
    accent: 'mint',
    headline: 'Run one shop — counter, stock, suppliers, and incoming orders.',
    blurb:
      'A single product surface for the person behind the counter. Bill on POS with cash, UPI, credit or a split. Fix stock so the shelf matches the book. Keep the supplier khata straight. Take orders that come in from customers, set a simple offer, set today’s hours.',
    guardrail: 'Small shop is fine — start with a few products and the first bill.',
    seed: 'GreenCart Mini Mart',
    facts: ['POS · cash / UPI / credit / split', 'Stock correction', 'Supplier khata', 'Incoming customer orders'],
    embed: `${DEMO_HUB}/retailer/`,
    links: [
      { label: 'Open retailer demo', href: `${DEMO_HUB}/retailer/`, primary: true },
      { label: 'All demos', href: `${DEMO_HUB}/` },
    ],
    steps: [
      { n: '01', name: 'Sign in', note: 'Sign in to your shop.' },
      { n: '02', name: 'Overview', note: 'See how the day looks from Overview.' },
      { n: '03', name: 'Products', note: 'Find a product by name or barcode.' },
      { n: '04', name: 'Fix stock', note: 'Fix the stock so the shelf matches the book.' },
      { n: '05', name: 'Purchases', note: 'Record what came in from a supplier.' },
      { n: '06', name: 'Supplier khata', note: 'Open supplier khata — who owes what.' },
      { n: '07', name: 'POS bill', note: 'Bill at the counter — cash, UPI, credit, or split.' },
      { n: '08', name: 'Incoming order', note: 'Take an order that came in from a customer.' },
      { n: '09', name: 'Simple offer', note: 'Set a simple offer when you want one.' },
      { n: '10', name: 'Open/close hours', note: 'Set today’s open and close hours.' },
    ],
  },
  {
    id: 'ordereasy-customer',
    index: '02',
    name: 'OrderEasy',
    kind: 'Customer journey',
    accent: 'mint',
    headline: 'Order from the shop you already know. Not a mall.',
    blurb:
      'The other half of the same product. Pick your area, open the shop you already buy from, browse that shop’s catalogue and fill a bag. Choose delivery or pickup, place the order, track it under My Orders, and message the shop directly if something needs saying.',
    guardrail: 'Not a marketplace. Not a delivery company.',
    seed: 'GreenCart Mini Mart',
    facts: ['Shop-first, area-scoped', 'Bag → delivery or pickup', 'My Orders tracking', 'Message the shop'],
    embed: `${DEMO_HUB}/customer/`,
    links: [
      { label: 'Open customer demo', href: `${DEMO_HUB}/customer/`, primary: true },
      { label: 'All demos', href: `${DEMO_HUB}/` },
    ],
    steps: [
      { n: '01', name: 'Shop list', note: 'Open OrderEasy and go to the shop list.' },
      { n: '02', name: 'Area', note: 'Choose your area.' },
      { n: '03', name: 'Pick known shop', note: 'Pick the shop you already buy from.' },
      { n: '04', name: 'Browse + bag', note: 'Browse that shop’s catalogue and add to bag.' },
      { n: '05', name: 'Bag', note: 'Check your bag.' },
      { n: '06', name: 'Delivery/pickup', note: 'Choose delivery or pickup, then how you’ll pay.' },
      { n: '07', name: 'Place order', note: 'Place the order.' },
      { n: '08', name: 'My Orders', note: 'Track it under My Orders.' },
      { n: '09', name: 'Message shop', note: 'Message the shop from the order if you need to.' },
      { n: '10', name: 'Help', note: 'Help points you back to the shop and your orders.' },
    ],
  },
  {
    id: 'citebench',
    index: '03',
    name: 'CiteBench',
    kind: 'Legal research desk',
    accent: 'violet',
    headline: 'What needs you today — diary, matters, and research for Indian practice.',
    blurb:
      'A case-law research desk built around how a chamber actually runs. Start on Today, work the Diary, open a matter as a proceeding rather than a checklist — orders, file and clocks in one place. Research by facts, legal question and court, then read the authorities the search actually retrieved.',
    guardrail: 'Suggestions are not court directions.',
    facts: ['Chamber diary & matters', 'Research by facts, question, court', 'Retrieved authorities, shown as retrieved', 'Multilingual briefs'],
    embed: `${DEMO_HUB}/citebench/`,
    links: [
      { label: 'Open CiteBench live', href: 'https://citebench.ordereasy.win', primary: true },
      { label: 'Guided demo', href: `${DEMO_HUB}/citebench/` },
    ],
    steps: [
      { n: '01', name: 'Sign in / chamber', note: 'Sign in and open the chamber.' },
      { n: '02', name: 'Today', note: 'Start on Today — what needs you now.' },
      { n: '03', name: 'Diary', note: 'Check the Diary for the day’s list.' },
      { n: '04', name: 'Matters', note: 'Open Matters — a proceeding, not a checklist.' },
      { n: '05', name: 'Inside matter', note: 'Orders, file, and clocks in one place.' },
      { n: '06', name: 'Research', note: 'Research: facts, legal question, court.' },
      { n: '07', name: 'Authorities', note: 'Read the authorities the search actually retrieved.' },
      { n: '08', name: 'Directions', note: 'Keep court directions and CiteBench suggestions distinct.' },
      { n: '09', name: 'Inbox', note: 'Skim Inbox when something new lands.' },
      { n: '10', name: 'Language', note: 'Switch language when the brief needs it.' },
    ],
  },
  {
    id: 'gstslip',
    index: '04',
    name: 'GSTSlip',
    kind: 'India GST invoice capture',
    accent: 'amber',
    headline: 'Photograph a GST invoice. Get a clean register row.',
    blurb:
      'Point a camera at a tax invoice — or upload a few JPEG, PNG or PDF pages of the same one. GSTSlip extracts invoice fields, line items, addresses and IRN, fills missing header fields from your defaults, and gives you a register you can export as CSV or Tally purchase XML.',
    guardrail:
      'GSTSlip does not connect to Tally or the live NIC IRP. Tally XML is a file you import. IRN lookup uses a GSP sandbox.',
    facts: ['Fields, line items, addresses, IRN', 'Your defaults fill the gaps', 'CSV + Tally purchase XML export', 'Fields stay on device until you export'],
    links: [
      { label: 'Open GSTSlip', href: 'https://gstslip.grok.me', primary: true },
    ],
  },
];

/** Vineet's own guardrails, lifted verbatim from the product surfaces. */
export const houseRules = [
  { rule: 'One product surface. No invented metrics.', source: 'Every demo, footer' },
  { rule: 'Not a marketplace. Not a delivery company.', source: 'OrderEasy Customer' },
  { rule: 'Suggestions are not court directions.', source: 'CiteBench' },
  { rule: 'Fields stay on this device until you export CSV.', source: 'GSTSlip' },
  { rule: 'Small shop is fine — start with a few products and the first bill.', source: 'OrderEasy Retailer' },
  { rule: 'IRN lookup uses a GSP sandbox — not the live NIC IRP.', source: 'GSTSlip' },
];

export const stack = [
  { group: 'Backend', items: ['Python', 'Django', 'REST APIs'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'TanStack Start', 'Astro'] },
  { group: 'Edge & deploy', items: ['Cloudflare Workers', 'Cloudflare Pages'] },
  { group: 'Build loop', items: ['Multi-agent desk', 'Cursor Cloud Agents'] },
];

export const method = [
  {
    n: '01',
    title: 'Ship the surface, not the deck',
    body: 'Each product gets one real surface a user can open. The demo hub is the pitch — ten screens, in order, the way the work actually happens.',
  },
  {
    n: '02',
    title: 'Write the guardrail first',
    body: 'Before a feature lands, the line describing what it is not gets written. Those lines stay in the product UI, not just in my notes.',
  },
  {
    n: '03',
    title: 'Run a multi-agent desk',
    body: 'Cursor Cloud Agents work branches in parallel while I review. Backend in Django, product surfaces in TypeScript, everything deployed to Cloudflare.',
  },
  {
    n: '04',
    title: 'Build in the open',
    body: 'X is a lab notebook, not a brand channel. Progress, dead ends and the occasional rewrite go up as they happen.',
  },
];

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Method', href: '#method' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
