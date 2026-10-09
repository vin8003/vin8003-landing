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

/** Where the demo screenshots are served from. The walkthroughs themselves now
 *  render on vin8003.com/demo — this host only serves the captured screens. */
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
      { label: 'Retailer demo', href: '/demo/#retailer' },
      { label: 'Customer demo', href: '/demo/#customer' },
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
    surfaces: [{ label: 'Walk the demo', href: '/demo/#citebench' }],
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
    primary: { label: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com' },
    surfaces: [{ label: 'Walk the demo', href: '/demo/#gstslip' }],
    note: '10 free documents, then ₹499/month Pro',
  },
];

/** Surfaced in the hero rail. The demo lives on this site; the apps live on their own domains. */
export const liveLinks = [
  { label: 'Product demos', href: '/demo/', note: 'Four guided walkthroughs, right here', status: 'LIVE' as Status, internal: true },
  { label: 'OrderEasy', href: ORDEREASY_HOME, note: 'Shop SaaS · retailer + customer', status: 'LIVE' as Status, accent: 'mint' },
  { label: 'CiteBench', href: 'https://citebench.ordereasy.win', note: 'Case-law research desk', status: 'LIVE' as Status, accent: 'violet' },
  { label: 'GSTSlip', href: 'https://gstslip.vin8003.com', note: 'GST invoice capture', status: 'LIVE' as Status, accent: 'amber' },
] as const;

export type LogEntry = {
  date: string;
  /** Human date shown in the log. */
  label: string;
  project: 'OrderEasy' | 'CiteBench' | 'GSTSlip' | 'vin8003.com' | 'Demos' | 'AI Secretary';
  accent: 'mint' | 'violet' | 'amber' | 'ember';
  /** ship = landed or deployed · open = a PR that has not merged · decision = no link, a call made. */
  kind: 'ship' | 'open' | 'decision';
  line: string;
  link?: { label: string; href: string };
};

const gh = (repo: string) => `https://github.com/vin8003/${repo}`;
const pr = (repo: string, n: number) => ({ label: `${repo} #${n}`, href: `${gh(repo)}/pull/${n}` });
const commit = (repo: string, sha: string) => ({ label: `${repo} @ ${sha}`, href: `${gh(repo)}/commit/${sha}` });

/**
 * BUILD LOG — pulled from the public repos on github.com/vin8003. Every ship
 * maps to a merged PR, a commit on the default branch or a deploy commit on a
 * production build repo, and carries the link. Dates are merge or commit dates.
 * `open` lines are PRs that have not merged and say so. A `decision` line has
 * no link because nothing shipped. Newest first.
 */
export const buildLog: LogEntry[] = [
  {
    date: '2026-10-09',
    label: '09 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'open',
    line: 'Android in-app update prompt for the customer app: a remote version file can nudge or force an update to the Play Store build, with no backend change. Open, not merged.',
    link: pr('customer_ordereasy_njs', 94),
  },
  {
    date: '2026-10-09',
    label: '09 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    line: 'Field note: one month of SuperGrok Heavy and Cursor cloud agents, measured from git — 414 PRs opened, 92 merged.',
    link: { label: 'Read the note', href: '/notes/agent-month/' },
  },
  {
    date: '2026-10-06',
    label: '06 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'open',
    line: '80 small catalogue-field PRs folded into 3 bundles, one review per app — backend, retailer and customer — with the overlaps resolved by hand. Open, not merged.',
    link: pr('RetailerCustomerPlatform', 186),
  },
  {
    date: '2026-09-27',
    label: '27 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Customer web redeployed: no more false out-of-stock button on the product page, and the coupon sheet now clears the bottom nav.',
    link: commit('customer_web_build', '732f02d'),
  },
  {
    date: '2026-09-26',
    label: '26 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Customer app wrapped for Android with Capacitor — Google sign-in works natively and UPI payments open the phone’s UPI apps directly.',
    link: commit('customer_ordereasy_njs', 'e3d0112'),
  },
  {
    date: '2026-09-25',
    label: '25 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Coupon codes end to end: a validation engine and APIs on the platform, coupon creation with visibility toggles for retailers, and apply/remove with an available-coupons sheet for customers. Cashback is worked out on the net item amount, never the delivery fee.',
    link: pr('RetailerCustomerPlatform', 184),
  },
  {
    date: '2026-09-23',
    label: '23 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Inclusive GST with HSN codes merged across POS bills, online orders, purchase invoices and returns, with sale-time rates snapshotted so old bills never change.',
    link: pr('RetailerCustomerPlatform', 103),
  },
  {
    date: '2026-09-23',
    label: '23 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Customer storefront UX, phases 1–3: compact store tags, a hardened checkout payload with address validation, and out-of-stock items hidden from guests.',
    link: commit('customer_ordereasy_njs', 'f98aa64'),
  },
  {
    date: '2026-09-16',
    label: '16 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Modifying an order no longer crashes the inventory log, and items added mid-order carry their GST fields.',
    link: pr('RetailerCustomerPlatform', 102),
  },
  {
    date: '2026-09-14',
    label: '14 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Exact-amount UPI QR live at the retailer POS, split bills included, and printed on thermal receipts behind a per-shop toggle.',
    link: commit('retailer_web_build', '588bfd2'),
  },
  {
    date: '2026-09-14',
    label: '14 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Per-order exact-amount UPI QR live on the customer order screen, in place of the static shop QR.',
    link: commit('customer_web_build', 'a076b95'),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    line: 'Razorpay Checkout live for Pro on gstslip.vin8003.com — ₹499 for 30 days.',
    link: { label: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com' },
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    line: 'Invoices stored server-side, the GST field set widened, and TallyPrime purchase XML export added — plus an admin desk for accounts and Pro.',
    link: commit('gstslip', '53d3c62'),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Wrong stock quantities fixed on the platform.',
    link: pr('RetailerCustomerPlatform', 70),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'AI Secretary',
    accent: 'ember',
    kind: 'decision',
    line: 'Executable plan locked, then re-parked — a US solo and small-law beachhead on Retell + Twilio. Not shipping.',
  },
  {
    date: '2026-09-11',
    label: '11 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Rack display labels for the shelf, in 1:1 and 3:1 layouts sized for thermal label printers.',
    link: commit('retailer_web_build', '3d339e7'),
  },
  {
    date: '2026-09-11',
    label: '11 Sep 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    line: 'Rebuilt this site as a command center — building now, demos, build log, thesis.',
    link: pr('vin8003-landing', 3),
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Production exports of both surfaces from main, after the backend deployment batch merged on the platform.',
    link: pr('RetailerCustomerPlatform', 84),
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'Demos',
    accent: 'ember',
    kind: 'ship',
    line: 'Demo hub densified — four walkthroughs, ten steps each, captured from the real products on seed data.',
    link: { label: 'Walk them here', href: '/demo/' },
  },
  {
    date: '2026-09-09',
    label: '09 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    line: 'First commit of the invoice capture app now live at gstslip.vin8003.com.',
    link: commit('gstslip', '105a547'),
  },
  {
    date: '2026-09-05',
    label: '05 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Barcodes bound into the Print Labels list and TVS LP46NEO label alignment fixed, exported to production; barcode search fixed on the platform.',
    link: pr('retailer_web_build', 4),
  },
  {
    date: '2026-09-04',
    label: '04 Sep 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    line: 'Court case import, court-data adapters and Indian Kanoon search, with an admin switch between data providers.',
    link: commit('nyayasetu', 'd9cf3ad'),
  },
  {
    date: '2026-08-30',
    label: '30 Aug 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    line: 'Research desk redesigned on a shared design system.',
    link: pr('nyayasetu', 11),
  },
  {
    date: '2026-08-22',
    label: '22 Aug 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    line: 'Customer city map and city-wide shop merge previewed against the radius-filtered live list.',
    link: pr('customer_web_build', 6),
  },
];

/** THESIS — the founder line, then the working detail. */
export const thesis = {
  line: 'I want to build an army of AI assistants, each handling one specific piece of work.',
  body: [
    'Not one assistant that claims to do everything. A set of narrow ones, each with its own surface, its own guardrail and its own definition of done. A general assistant is a demo. A narrow one is a colleague.',
    'The products are the first recruits, and each one says plainly what it is not. None of them pretends to do another one’s job.',
    'The build loop is the same shape every time: cloud agents work branches in parallel, an AI planner reviews, and I decide what merges. Django on the backend, TypeScript on the surfaces, everything deployed to Cloudflare. When an assistant can hold a whole job end to end, it stops being a tool and starts being staff.',
  ],
  /** The roster — each product framed as the job it does. */
  roster: [
    { name: 'OrderEasy', role: 'The shop assistant', job: 'Bills the counter, keeps stock and the supplier khata, and takes orders from the customers who already know the shop.', accent: 'mint' },
    { name: 'CiteBench', role: 'The chamber clerk', job: 'Keeps the diary and the matters, and researches case law by facts, question and court — showing only what it actually retrieved.', accent: 'violet' },
    { name: 'GSTSlip', role: 'The accounts clerk', job: 'Reads a tax invoice from a photograph and hands back one clean register row, ready for CSV or Tally.', accent: 'amber' },
  ] as const,
  parked: {
    name: 'AI Secretary',
    status: 'EXPERIMENT' as Status,
    note: 'An AI secretary for business phone lines. The plan exists — a US solo and small-law beachhead on Retell + Twilio — and it stays parked until I unpark it. Not building, not shipped, not sold.',
  },
};

/** ABOUT — short and personal. Not a résumé. */
export const about = {
  lines: [
    'I build products with AI. I write the backend, the surface and the copy, then sit with the support mail. That whole loop is the job I actually wanted.',
    'Ten years of Python and Django before this, across embedded electronics and sensors, fintech and banking, medical systems, casino gaming, image pipelines and AI data work. Different industries, same habit: get the thing into somebody’s hands and watch what breaks.',
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
  { group: 'Surfaces', items: ['React', 'TypeScript', 'Capacitor', 'Astro'] },
  { group: 'Edge & deploy', items: ['Cloudflare Workers', 'Cloudflare Pages'] },
  { group: 'Build loop', items: ['Parallel cloud agents', 'Review-then-merge'] },
];

/** `short` is what the thumb-reach nav shows, where five pills have to fit a
 *  320px screen without wrapping. */
export const nav = [
  { label: 'Building now', short: 'Now', href: '#building' },
  { label: 'Demo', short: 'Demo', href: '#demo' },
  { label: 'Build log', short: 'Log', href: '#log' },
  { label: 'Thesis', short: 'Thesis', href: '#thesis' },
  { label: 'About', short: 'About', href: '#about' },
];
