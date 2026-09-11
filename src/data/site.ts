/**
 * Every string here is either Vineet's own product copy (pulled from the live
 * demo hub / live apps), a plain biographical fact, or a build-log entry that
 * maps to a real dated commit, PR or repo. Nothing is embellished, and there
 * are deliberately no usage numbers anywhere on this site.
 */

export const person = {
  name: 'Vineet Sharma',
  handle: 'vin8003',
  role: 'Builder & founder',
  location: 'Delhi NCR, India',
  email: 'vin8003@gmail.com',
  /** The line the whole site hangs off. */
  claim: 'I build products with AI.',
  /** Banner thesis — the wordmark's other half. */
  thesisLine: 'Building an army of AI assistants.',
  identity: 'Builder and founder. Dad of two. Delhi NCR, India.',
  tagline: 'Builder and founder. I build products with AI — an army of assistants, each handling one job.',
} as const;

export const socials = [
  { label: 'Email', handle: 'vin8003@gmail.com', href: 'mailto:vin8003@gmail.com' },
  { label: 'X', handle: '@vin8003', href: 'https://x.com/vin8003' },
  { label: 'LinkedIn', handle: 'in/vin8003', href: 'https://www.linkedin.com/in/vin8003' },
  { label: 'GitHub', handle: 'vin8003', href: 'https://github.com/vin8003' },
] as const;

/** Stable demo hub. Every guided walkthrough lives under it — do not repoint. */
const DEMO_HUB = 'https://oe-product-demos.vin8003.workers.dev';

const ORDEREASY_HOME = 'https://ordereasy.win';
const ORDEREASY_RETAILER = 'https://retailer.ordereasy.win';
const ORDEREASY_CUSTOMER = 'https://customer.ordereasy.win';

export const demoHub = DEMO_HUB;

export type Status = 'LIVE' | 'BUILDING' | 'EXPERIMENT';

/** Status chips are honest labels, not marketing. LIVE means a URL anyone can
 *  open right now; BUILDING means the demos are open but the app is not. */
export const statusNote: Record<Status, string> = {
  LIVE: 'Open the URL — it works today.',
  BUILDING: 'Demos are open; the app is not public yet.',
  EXPERIMENT: 'Designed, parked, not sold.',
};

export type Venture = {
  id: string;
  index: string;
  name: string;
  status: Status;
  kind: string;
  accent: 'mint' | 'violet' | 'amber';
  /** One line: what it is. */
  what: string;
  /** Vineet's own boundary line — what it deliberately is not. */
  guardrail: string;
  primary: { label: string; href: string };
  /** Secondary surfaces under the same product. */
  surfaces: { label: string; href: string }[];
  /** Shown as a small mono note under the links. Facts only. */
  note?: string;
};

/** BUILDING NOW — the active products, front and centre. */
export const ventures: Venture[] = [
  {
    id: 'ordereasy',
    index: '01',
    name: 'OrderEasy',
    status: 'LIVE',
    kind: 'Retailer + customer shop SaaS',
    accent: 'mint',
    what: 'One shop, two surfaces — the counter that bills and the customer who orders from it.',
    guardrail: 'Not a marketplace. Not a delivery company.',
    primary: { label: 'ordereasy.win — product home', href: ORDEREASY_HOME },
    surfaces: [
      { label: 'Retailer portal', href: ORDEREASY_RETAILER },
      { label: 'Customer portal', href: ORDEREASY_CUSTOMER },
      { label: 'Retailer guided demo', href: `${DEMO_HUB}/retailer/` },
      { label: 'Customer guided demo', href: `${DEMO_HUB}/customer/` },
    ],
  },
  {
    id: 'citebench',
    index: '02',
    name: 'CiteBench',
    status: 'LIVE',
    kind: 'Case-law research desk',
    accent: 'violet',
    what: 'A research desk for Indian practice — diary, matters, and authorities in one place.',
    guardrail: 'Suggestions are not court directions.',
    primary: { label: 'citebench.ordereasy.win', href: 'https://citebench.ordereasy.win' },
    surfaces: [{ label: 'Guided demo', href: `${DEMO_HUB}/citebench/` }],
  },
  {
    id: 'gstslip',
    index: '03',
    name: 'GSTSlip',
    status: 'LIVE',
    kind: 'India GST invoice capture',
    accent: 'amber',
    what: 'Photograph a tax invoice, get a clean register row you can export.',
    guardrail: 'Fields stay on the device until you export.',
    // gstslip.vin8003.com also resolves to this same app (checked 2026-09-11),
    // so the product-under-domain pattern is ready whenever Vineet wants it
    // promoted to primary.
    primary: { label: 'gstslip.grok.me', href: 'https://gstslip.grok.me' },
    surfaces: [{ label: 'Guided demo', href: `${DEMO_HUB}/gstslip/` }],
    note: '10 free documents, then paid',
  },
];

/** External live demos and apps — surfaced in the hero rail. */
export const liveLinks = [
  { label: 'Demo hub', href: `${DEMO_HUB}/`, note: 'Four guided walkthroughs', status: 'LIVE' as Status },
  { label: 'OrderEasy', href: ORDEREASY_HOME, note: 'Product home · retailer + customer portals', status: 'LIVE' as Status, dot: 'bg-mint' },
  { label: 'CiteBench', href: 'https://citebench.ordereasy.win', note: 'Case-law research desk', status: 'LIVE' as Status, dot: 'bg-violet' },
  { label: 'GSTSlip', href: 'https://gstslip.grok.me', note: 'GST invoice capture', status: 'LIVE' as Status, dot: 'bg-amber' },
] as const;

export type Step = { n: string; name: string; note: string };

export type LabWalk = {
  id: string;
  index: string;
  name: string;
  kind: string;
  accent: 'mint' | 'violet' | 'amber';
  headline: string;
  blurb: string;
  guardrail: string;
  facts: string[];
  links: { label: string; href: string; primary?: boolean }[];
  /** Live demo URL that can be framed inline. Absent = link-out only. */
  embed?: string;
  steps?: Step[];
  seed?: string;
};

/** LAB — the guided journeys that actually exist on the hub. No fake UIs. */
export const lab: LabWalk[] = [
  {
    id: 'lab-ordereasy-retailer',
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
      { label: 'Open guided demo', href: `${DEMO_HUB}/retailer/`, primary: true },
      { label: 'Retailer portal', href: ORDEREASY_RETAILER },
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
    id: 'lab-ordereasy-customer',
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
      { label: 'Open guided demo', href: `${DEMO_HUB}/customer/`, primary: true },
      { label: 'Customer portal', href: ORDEREASY_CUSTOMER },
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
    id: 'lab-citebench',
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
    id: 'lab-gstslip',
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
    embed: `${DEMO_HUB}/gstslip/`,
    links: [
      { label: 'Open guided demo', href: `${DEMO_HUB}/gstslip/`, primary: true },
      { label: 'Open GSTSlip live', href: 'https://gstslip.grok.me' },
    ],
    steps: [
      { n: '01', name: 'Drop zone', note: 'Photograph a tax invoice or drop JPEG, PNG or PDF pages.' },
      { n: '02', name: 'Capture', note: 'GSTSlip reads the pages of the same invoice.' },
      { n: '03', name: 'Header fields', note: 'Seller, buyer, invoice number, date, place of supply, totals.' },
      { n: '04', name: 'Line items', note: 'Description, HSN, quantity and amount per line.' },
      { n: '05', name: 'Defaults', note: 'Missing header fields fall back to your defaults.' },
      { n: '06', name: 'Register', note: 'One clean register row from the capture.' },
      { n: '07', name: 'CSV', note: 'Export the register as CSV.' },
      { n: '08', name: 'Tally XML', note: 'Export Tally purchase XML — a file you import, not a live link.' },
      { n: '09', name: 'IRN sandbox', note: 'Look up IRN through a GSP sandbox — not the live NIC IRP.' },
      { n: '10', name: 'Pricing', note: 'See how GSTSlip is priced.' },
    ],
  },
];

export type LogEntry = {
  date: string;
  /** Human date shown in the log. */
  label: string;
  project: string;
  accent: 'mint' | 'violet' | 'amber' | 'ember';
  line: string;
  link?: { label: string; href: string };
};

/**
 * BUILD LOG — every entry maps to a real dated commit, merged PR or repo on
 * github.com/vin8003. Dates are the merge/commit dates, not estimates. Add new
 * entries at the top; do not write a line you cannot link.
 */
export const buildLog: LogEntry[] = [
  {
    date: '2026-09-11',
    label: '11 Sep 2026',
    project: 'vin8003.com',
    accent: 'ember',
    line: 'Rebuilt this site as a command center — building now, lab, build log, thesis.',
    link: { label: 'vin8003-landing', href: 'https://github.com/vin8003/vin8003-landing' },
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'vin8003.com',
    accent: 'ember',
    line: 'Landing shipped on Cloudflare Workers, with a GitHub Actions deploy on deploy/prod.',
    link: { label: 'PR #2', href: 'https://github.com/vin8003/vin8003-landing/pull/2' },
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    line: 'Production export of the customer surface from main.',
    link: { label: 'customer_web_build #7', href: 'https://github.com/vin8003/customer_web_build/pull/7' },
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    line: 'Production export of the retailer surface from main.',
    link: { label: 'retailer_web_build #5', href: 'https://github.com/vin8003/retailer_web_build/pull/5' },
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    line: 'Backend deployment batch merged on the platform repo.',
    link: { label: 'RetailerCustomerPlatform #84', href: 'https://github.com/vin8003/RetailerCustomerPlatform/pull/84' },
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'Demo hub',
    accent: 'ember',
    line: 'Landing repointed at the densified hub — four walkthroughs, ten steps each.',
    link: { label: 'Open the hub', href: `${DEMO_HUB}/` },
  },
  {
    date: '2026-09-09',
    label: '09 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    line: 'Repo opened for the invoice capture app now live at gstslip.grok.me.',
    link: { label: 'gstslip', href: 'https://github.com/vin8003/gstslip' },
  },
  {
    date: '2026-09-05',
    label: '05 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    line: 'Retailer barcode binding fix and TVS LP46NEO print alignment exported to production.',
    link: { label: 'retailer_web_build #4', href: 'https://github.com/vin8003/retailer_web_build/pull/4' },
  },
  {
    date: '2026-08-30',
    label: '30 Aug 2026',
    project: 'CiteBench',
    accent: 'violet',
    line: 'Research desk redesigned on a shared design system.',
    link: { label: 'nyayasetu #11', href: 'https://github.com/vin8003/nyayasetu/pull/11' },
  },
  {
    date: '2026-08-22',
    label: '22 Aug 2026',
    project: 'OrderEasy',
    accent: 'mint',
    line: 'Customer city map and city-wide shop merge previewed against the radius-filtered live list.',
    link: { label: 'customer_web_build #6', href: 'https://github.com/vin8003/customer_web_build/pull/6' },
  },
];

/** THESIS — the founder line, then the working detail. */
export const thesis = {
  line: 'I want to build an army of AI assistants, each handling a specific piece of work.',
  body: [
    'Not one assistant that claims to do everything. A set of narrow ones, each with its own surface, its own guardrail, and its own definition of done. A general assistant is a demo. A narrow one is a colleague.',
    'The products are the first recruits. OrderEasy runs a shop — the counter and the customer ordering from it. CiteBench works a chamber’s case law. GSTSlip reads a tax invoice and hands back a register row. None of them pretends to do another one’s job, and each carries the line saying what it is not.',
    'The build loop is the same shape every time. Cloud agents work branches in parallel while I review; Django on the backend, TypeScript on the surfaces, everything deployed to Cloudflare. The moment an assistant can hold a whole job end to end, it stops being a tool and starts being staff.',
  ],
  parked: {
    name: 'AI Secretary',
    status: 'EXPERIMENT' as Status,
    note: 'An AI secretary for business phone lines. Designed, then parked until the three above are done. Not shipped, not sold — it is here because the log should include the things that are waiting.',
  },
};

/** ABOUT — short and personal. Not a résumé. */
export const about = {
  lines: [
    'I build products with AI. I write the backend, the surface and the copy, then sit with the support mail. That whole loop is the job I actually wanted.',
    'Ten years of Python and Django before this, through embedded electronics and sensors, fintech and banking, medical systems, casino gaming, image pipelines and AI data work. Different industries, same habit: get the thing into somebody’s hands and watch what breaks.',
    'Dad of two, in Delhi NCR. That is most of the reason the tooling has to be fast and the scope has to stay honest.',
  ],
  /** Secondary, deliberately not title-first and deliberately unnamed. */
  dayRole: 'Also Lead Software Engineer at a publicly listed Indian NBFC, on flagship product development.',
  notebook:
    'X is a lab notebook, not a brand channel. Progress, dead ends and the occasional rewrite go up as they happen.',
};

/** Career breadth — the site is not niche-locked to retail, law and GST. */
export const breadth = [
  'Embedded electronics',
  'Sensors',
  'Fintech',
  'Banking',
  'Medical systems',
  'Casino gaming',
  'Image pipelines',
  'Data science',
  'AI assistants',
  'Retailer POS',
  'Case-law research',
  'GST capture',
];

export const stack = [
  { group: 'Backend', items: ['Python', 'Django', 'REST APIs'] },
  { group: 'Surfaces', items: ['React', 'TypeScript', 'TanStack Start', 'Astro'] },
  { group: 'Edge & deploy', items: ['Cloudflare Workers', 'Cloudflare Pages'] },
  { group: 'Build loop', items: ['Multi-agent desk', 'Cursor Cloud Agents'] },
];

/** `short` is what the thumb-reach nav shows, where five pills have to fit a
 *  320px screen without wrapping. */
export const nav = [
  { label: 'Building now', short: 'Now', href: '#building' },
  { label: 'Lab', short: 'Lab', href: '#lab' },
  { label: 'Build log', short: 'Log', href: '#log' },
  { label: 'Thesis', short: 'Thesis', href: '#thesis' },
  { label: 'About', short: 'About', href: '#about' },
];
