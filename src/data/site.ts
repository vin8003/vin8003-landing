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
  claim: 'I make boring software that works.',
  /** Banner thesis - the wordmark's other half. */
  thesisLine: 'One product per job, done properly.',
  identity: 'Builder and founder. Dad of two. Delhi NCR, India.',
  tagline: 'Builder and founder in Delhi NCR. I make boring software that works, one product per job, from backend to support inbox.',
} as const;

export const socials = [
  { label: 'Email', handle: 'vin8003@gmail.com', href: 'mailto:vin8003@gmail.com' },
  { label: 'X', handle: '@vin8003', href: 'https://x.com/vin8003' },
  { label: 'LinkedIn', handle: 'in/vin8003', href: 'https://www.linkedin.com/in/vin8003' },
  { label: 'GitHub', handle: 'vin8003', href: 'https://github.com/vin8003' },
] as const;

/** Where the demo screenshots are served from. The walkthroughs themselves now
 *  render on vin8003.com/demo - this host only serves the captured screens. */
const DEMO_HUB = 'https://oe-product-demos.vin8003.workers.dev';

const ORDEREASY_HOME = 'https://ordereasy.win';
const ORDEREASY_RETAILER = 'https://retailer.ordereasy.win';
const ORDEREASY_CUSTOMER = 'https://customer.ordereasy.win';

export const demoHub = DEMO_HUB;

export type Status = 'LIVE' | 'BUILDING' | 'EXPERIMENT';

/** Status chips are honest labels, not marketing. LIVE means a URL anyone can
 *  open right now; BUILDING means the demos are open but the app is not. */
export const statusNote: Record<Status, string> = {
  LIVE: 'Open the URL. It works today.',
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
  /** Vineet's own boundary line - what it deliberately is not. */
  guardrail: string;
  primary: { label: string; href: string };
  /** Secondary surfaces under the same product. */
  surfaces: { label: string; href: string }[];
  /** Shown as a small mono note under the links. Facts only. */
  note?: string;
  /** Marks the product the section leads with. */
  featured?: boolean;
  /** Recent shipped changes shown on the featured card, newest first. Each links to its merged PR. */
  highlights?: { label: string; line: string; href: string }[];
};

/** BUILDING NOW - the active products, front and centre. */
export const ventures: Venture[] = [
  {
    id: 'ordereasy',
    index: '01',
    name: 'OrderEasy',
    status: 'LIVE',
    kind: 'Retailer + customer shop SaaS',
    accent: 'mint',
    what: 'One shop, two surfaces: the counter that bills and the customer who orders from it. Shops sign up on their own and go live after one verification.',
    guardrail: 'Not a marketplace. Not a delivery company.',
    primary: { label: 'ordereasy.win, product home', href: ORDEREASY_HOME },
    surfaces: [
      { label: 'Case study', href: '/work/ordereasy/' },
      { label: 'Shop sign-up', href: `${ORDEREASY_RETAILER}/signup` },
      { label: 'Customer portal', href: ORDEREASY_CUSTOMER },
      { label: 'Retailer demo', href: '/demo/#retailer' },
      { label: 'Customer demo', href: '/demo/#customer' },
      { label: 'Video tutorials', href: '/writing/ordereasy-video-tutorials/' },
    ],
    note: 'Free for shops for a limited period',
    featured: true,
    highlights: [
      {
        label: '3 Nov',
        line: 'Sign-up photos taken on a phone now upload: big images shrink before they leave the phone.',
        href: 'https://github.com/vin8003/retailer_ordereasy_njs/pull/161',
      },
      {
        label: '1 Nov',
        line: 'Shop verification: five guided steps, then one approval before customers see the shop.',
        href: 'https://github.com/vin8003/retailer_ordereasy_njs/pull/158',
      },
      {
        label: '1 Nov',
        line: 'Customers can report a product or a shop. The team reviews every report; nothing hides on its own.',
        href: 'https://github.com/vin8003/customer_ordereasy_njs/pull/103',
      },
      {
        label: '29 Oct',
        line: 'Orders open on an Active Inbox, and the POS searches the whole catalogue on the server.',
        href: 'https://github.com/vin8003/retailer_ordereasy_njs/pull/156',
      },
      {
        label: '24 Oct',
        line: 'The POS works on a phone and scans barcodes with the camera.',
        href: 'https://github.com/vin8003/retailer_ordereasy_njs/pull/145',
      },
    ],
  },
  {
    id: 'citebench',
    index: '02',
    name: 'CiteBench',
    status: 'LIVE',
    kind: 'Case-law research desk',
    accent: 'violet',
    what: 'A research desk for Indian practice: diary, matters, and authorities in one place.',
    guardrail: 'Suggestions are not court directions.',
    primary: { label: 'citebench.ordereasy.win', href: 'https://citebench.ordereasy.win' },
    surfaces: [
      { label: 'Case study', href: '/work/citebench/' },
      { label: 'Walk the demo', href: '/demo/#citebench' },
    ],
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
    surfaces: [
      { label: 'Case study', href: '/work/gstslip/' },
      { label: 'Walk the demo', href: '/demo/#gstslip' },
    ],
    note: '10 free documents, then ₹499/month Pro',
  },
];

/** Surfaced in the hero rail. The demo lives on this site; the apps live on their own domains. */
export const liveLinks = [
  { label: 'Product demos', href: '/demo/', note: 'Four guided walkthroughs, right here', status: 'LIVE' as Status, internal: true },
  { label: 'OrderEasy', href: ORDEREASY_HOME, note: 'Shop SaaS · shop sign-up open', status: 'LIVE' as Status, accent: 'mint' },
  { label: 'CiteBench', href: 'https://citebench.ordereasy.win', note: 'Case-law research desk', status: 'LIVE' as Status, accent: 'violet' },
  { label: 'GSTSlip', href: 'https://gstslip.vin8003.com', note: 'GST invoice capture', status: 'LIVE' as Status, accent: 'amber' },
] as const;

export type LogCategory = 'feature' | 'design' | 'fix' | 'infra' | 'content' | 'decision';

/** Group order and headings for the build log. */
export const logCategories: { id: LogCategory; label: string; note: string }[] = [
  { id: 'feature', label: 'Features', note: 'New things people can do' },
  { id: 'design', label: 'Design', note: 'Redesigns and layout' },
  { id: 'fix', label: 'Fixes', note: 'Bugs found and closed' },
  { id: 'infra', label: 'Infra & tooling', note: 'CI, deploys, speed, tracking and pipelines' },
  { id: 'content', label: 'Content', note: 'Demos, notes and writing on this site' },
  { id: 'decision', label: 'Decisions', note: 'Calls made, nothing shipped' },
];

export type LogEntry = {
  date: string;
  /** Human date shown in the log. */
  label: string;
  project: 'OrderEasy' | 'CiteBench' | 'GSTSlip' | 'vin8003.com' | 'Demos' | 'AI Secretary' | 'Musical Explainers' | 'ArziDesk';
  accent: 'mint' | 'violet' | 'amber' | 'ember';
  /** ship = landed or deployed · open = a PR that has not merged · decision = no link, a call made. */
  kind: 'ship' | 'open' | 'decision';
  /** What sort of work it was. The log groups entries by this. */
  category: LogCategory;
  line: string;
  link?: { label: string; href: string };
};

const gh = (repo: string) => `https://github.com/vin8003/${repo}`;
const pr = (repo: string, n: number) => ({ label: `${repo} #${n}`, href: `${gh(repo)}/pull/${n}` });
const commit = (repo: string, sha: string) => ({ label: `${repo} @ ${sha}`, href: `${gh(repo)}/commit/${sha}` });

/**
 * BUILD LOG - pulled from the public repos on github.com/vin8003. Every ship
 * maps to a merged PR, a commit on the default branch or a deploy commit on a
 * production build repo, and carries the link. Dates are merge or commit dates.
 * `open` lines are PRs that have not merged and say so. A `decision` line has
 * no link because nothing shipped. Newest first.
 */
export const buildLog: LogEntry[] = [
  {
    date: '2026-11-03',
    label: '3 Nov 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Shop sign-up uploads from a phone camera no longer fail silently: large photos are re-encoded on the phone to fit the 5 MB document limit, and a refused or dropped upload now says what went wrong.',
    link: pr('retailer_ordereasy_njs', 161),
  },
  {
    date: '2026-11-03',
    label: '3 Nov 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'The end-to-end gate got stricter: a smoke subset runs on every change, and new order checks fill the cart through the real storefront, drop stock at checkout and assert the error each failure returns.',
    link: pr('RetailerCustomerPlatform', 226),
  },
  {
    date: '2026-11-01',
    label: '1 Nov 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Shop verification: a five-step checklist (phone, shop name and photo, address and map pin, one business proof with GST optional, owner ID) with a status card on the dashboard, private document uploads, and an admin review dialog with automated checks and full history. Customers see a shop after one approval.',
    link: pr('retailer_ordereasy_njs', 158),
  },
  {
    date: '2026-11-01',
    label: '1 Nov 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Customers can report a product or a shop from its page. Admins get a report inbox and a product review queue, and retailers see why a product is held and how to fix it. Reports and strikes only flag for review; they never hide a product or suspend a shop on their own.',
    link: pr('customer_ordereasy_njs', 103),
  },
  {
    date: '2026-11-01',
    label: '1 Nov 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'design',
    line: 'Retailer forms use the full screen width on phones: profile and operating hours drop the extra padding.',
    link: pr('retailer_ordereasy_njs', 160),
  },
  {
    date: '2026-10-29',
    label: '29 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Retailer orders open on an Active Inbox for what still needs the shop, with All Orders (store and online history) and Delivered one tap away.',
    link: pr('retailer_ordereasy_njs', 156),
  },
  {
    date: '2026-10-29',
    label: '29 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'The POS and product pickers search on the server instead of loading every product, and scanned barcodes are looked up exactly. Search results are cached per shop and cleared on every stock or price change.',
    link: pr('retailer_ordereasy_njs', 157),
  },
  {
    date: '2026-10-29',
    label: '29 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'End-to-end Playwright journeys now cover POS bills, the customer order lifecycle, khata, reports, settings, catalogue, offers, inventory, delivery fees and bundles, against a local stack that blocks every live host.',
    link: pr('RetailerCustomerPlatform', 217),
  },
  {
    date: '2026-10-28',
    label: '28 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Fixes found by the new end-to-end suite: renaming a product onto a name the shop already uses is refused with a clear message, and an order can move from Confirmed straight to Packed.',
    link: pr('RetailerCustomerPlatform', 207),
  },
  {
    date: '2026-10-28',
    label: '28 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'The ten OrderEasy video tutorials are cross-posted under Writing, each embedded from YouTube.',
    link: pr('vin8003-landing', 40),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'The phone POS scans barcodes with the camera: the back camera opens full height and stays on, so each scan adds the product to the bill, and an unknown code opens quick add.',
    link: pr('retailer_ordereasy_njs', 145),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'design',
    line: 'The retailer POS works on a phone by default: a single-column item list with big add and quantity buttons and a sticky bill bar, in place of the old "desktop recommended" warning.',
    link: pr('retailer_ordereasy_njs', 144),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Distance-based delivery fees: retailers set a flat fee or distance tiers with a per-km rate, customers with a GPS pin see the shops that deliver to them with the fee for their distance, and checkout refuses an address outside the shop\'s radius.',
    link: pr('RetailerCustomerPlatform', 200),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Customers can filter past orders by status, date range and order number.',
    link: pr('customer_ordereasy_njs', 98),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Retailers can reset a forgotten password with a one-time code sent to the username, phone or email they log in with. Codes are single use with an attempt cap, and a reset signs out other sessions.',
    link: pr('RetailerCustomerPlatform', 198),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'The POS loads products and the shop profile once per page load instead of on every screen and bill, and takes sold quantities off its own stock list after each sale.',
    link: pr('retailer_ordereasy_njs', 141),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'The POS product list stopped timing out in production after the 24 Oct deploy: product-group siblings are no longer listed on every row unless asked for.',
    link: pr('RetailerCustomerPlatform', 195),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Customer sign-up only replaces a leftover account with the same phone, email or username when that account never verified and never ordered.',
    link: pr('RetailerCustomerPlatform', 193),
  },
  {
    date: '2026-10-24',
    label: '24 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'The three catalogue-field bundles from 6 Oct merged into the backend and both apps, along with fixes found in review: a coupon that no longer applies is refused at checkout instead of silently dropped, and purchase returns follow the bill\'s supplier.',
    link: pr('RetailerCustomerPlatform', 186),
  },
  {
    date: '2026-10-19',
    label: '19 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'Placed orders are now sent to Meta as purchase events through the Conversions API, straight from the backend, with tests.',
    link: pr('RetailerCustomerPlatform', 191),
  },
  {
    date: '2026-10-17',
    label: '17 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'A Writing section on this site for the seven articles first posted on X, each with its own page that points back to the original post.',
    link: pr('vin8003-landing', 35),
  },
  {
    date: '2026-10-17',
    label: '17 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'The open retailer sign-up merged to main: the customer app\'s "join as a retailer" card goes straight to the retailer portal, and the sign-up page links back to login.',
    link: pr('customer_ordereasy_njs', 96),
  },
  {
    date: '2026-10-17',
    label: '17 Oct 2026',
    project: 'ArziDesk',
    accent: 'violet',
    kind: 'ship',
    category: 'fix',
    line: 'ArziDesk production installs build again: the build tools moved out of dev dependencies.',
    link: commit('arzidesk', '35235b8'),
  },
  {
    date: '2026-10-17',
    label: '17 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'Unit tests now run on every pull request to the backend and to the retailer and customer web apps, and the customer app picks the right field when a retailer chip uses an alias.',
    link: pr('RetailerCustomerPlatform', 189),
  },
  {
    date: '2026-10-16',
    label: '16 Oct 2026',
    project: 'ArziDesk',
    accent: 'violet',
    kind: 'ship',
    category: 'feature',
    line: 'ArziDesk started: an assisted filing desk for advocates and e-Mitra and CSC operators, drafting stuck-payment grievances, RTI requests and appeals with deadlines on a timer, and consumer complaints, paid from a prepaid wallet. Built on the CiteBench and GSTSlip stack.',
    link: commit('arzidesk', 'e6878c6'),
  },
  {
    date: '2026-10-15',
    label: '15 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Retailer sign-up opened without an access code. New shops see a verification banner and stay hidden from customers until an admin approves them from a new verification queue.',
    link: commit('retailer_ordereasy_njs', '17ceb91'),
  },
  {
    date: '2026-10-14',
    label: '14 Oct 2026',
    project: 'Demos',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'CiteBench demo screens recaptured on richer seed data, with a new Ask step in the walkthrough.',
    link: pr('vin8003-landing', 32),
  },
  {
    date: '2026-10-13',
    label: '13 Oct 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    category: 'design',
    line: 'GSTSlip restyled as a tax desk instead of a template: a cool sheet, one ballpoint accent and a new typeface, with the framework pinned to its patched release.',
    link: commit('gstslip', '98a7173'),
  },
  {
    date: '2026-10-13',
    label: '13 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'design',
    line: 'This site redesigned: a cloud backdrop behind every page, a 3D constellation and a product index in the hero, line-wipe transitions between screens and pages, demo controls fixed above the screen, and dark only.',
    link: pr('vin8003-landing', 28),
  },
  {
    date: '2026-10-13',
    label: '13 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'design',
    line: 'Research, Ask, Inbox, Diary and sign-in redesigned, with keyboard shortcuts, and a CNR fetch now opens its own matter instead of landing on the first one in the list.',
    link: commit('nyayasetu', 'ffe011f'),
  },
  {
    date: '2026-10-13',
    label: '13 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'design',
    line: 'The chamber redesigned around live cases, with a new design system, a welcome flow and matter tabs, plus order text kept from a CNR fetch and a fixed chat layout.',
    link: commit('nyayasetu', 'ded7307'),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'design',
    line: 'Design pass on this site that keeps the brand: glow, glass and gradient text removed, a shorter hero, real demo captures in place of built mock UIs, and a lighter scroll-progress island.',
    link: pr('vin8003-landing', 22),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'Demos',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'The 10 Oct 2026 demo screens are now hosted on this site, so the walkthroughs load their captures from here.',
    link: pr('vin8003-landing', 20),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'infra',
    line: 'Evidence-driven editorial pipeline optimised, so each script runs on fewer and better-targeted evidence passes.',
    link: pr('musical-explainers', 4),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'infra',
    line: 'Token-efficient repair for Claude calls, a usage ledger and budget guardrails so runs stay inside a set spend.',
    link: pr('musical-explainers', 3),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'ChatGPT added as a switchable subscription provider, with the Node 18 sign-in crypto fixed and clearer request-error diagnostics.',
    link: commit('musical-explainers', 'b744054'),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'infra',
    line: 'Per-step model and effort controls for every Claude call in the explainer pipeline, a pipeline settings config, and a longer topic backlog.',
    link: pr('musical-explainers', 2),
  },
  {
    date: '2026-10-11',
    label: '11 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'Research-first editorial pipeline: research and outline before any script, an editorial review gating each script apart from the fact-check, and configurable, enforced durations for the video and the Short. Not yet run through audio and render.',
    link: pr('musical-explainers', 1),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'Musical Explainers',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'First build of the code-driven explainer pipeline on main: storyboard v2 renderer with 12 scene systems, a staged production pipeline with local audio and optional Blender clips, a fact-check loop that revises flagged claims, and a local admin panel as the production cockpit.',
    link: commit('musical-explainers', '4d87978'),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'feature',
    line: 'Ask chat with research-grade citations and a bring-your-own database, saved by case, laid out as a case index beside a briefing sheet and placed under Research.',
    link: commit('nyayasetu', '6b5ad77'),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'fix',
    line: 'Indian Kanoon connection resets diagnosed and fixed with an IPv4 lookup, and the token is cleaned with header-character failures now reported.',
    link: pr('nyayasetu', 17),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'Customer web build deployed with a privacy policy, clean URLs and the minimum-version setting for the update prompt.',
    link: commit('customer_web_build', '5c30e7a'),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'design',
    line: 'CiteBench redesign: light and dark themes, a sidebar shell, a ⌘K command palette, and the Today board rendered on the server so it arrives in the first HTML.',
    link: pr('nyayasetu', 14),
  },
  {
    date: '2026-10-10',
    label: '10 Oct 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'infra',
    line: 'Better output from every Grok action in CiteBench, and Indian Kanoon lookups now run from the Mumbai region so the calls leave from India.',
    link: pr('nyayasetu', 15),
  },
  {
    date: '2026-10-09',
    label: '09 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'design',
    line: 'Customer app redesign: every screen moved to the OrderEasy palette, mobile-first and responsive to desktop, with a 29 KB logo mark replacing a 4 MB image on the critical path.',
    link: pr('customer_ordereasy_njs', 92),
  },
  {
    date: '2026-10-09',
    label: '09 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Android in-app update prompt for the customer app: a remote version file can nudge or force an update to the Play Store build, with no backend change. Landed on main with OTA web updates.',
    link: pr('customer_ordereasy_njs', 94),
  },
  {
    date: '2026-10-09',
    label: '09 Oct 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'Field note: one month of SuperGrok Heavy and Cursor cloud agents, measured from git: 414 PRs opened, 92 merged.',
    link: { label: 'Read the note', href: '/notes/agent-month/' },
  },
  {
    date: '2026-10-06',
    label: '06 Oct 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'open',
    category: 'infra',
    line: '80 small catalogue-field PRs folded into 3 bundles, one review per app (backend, retailer and customer), with the overlaps resolved by hand. Open, not merged.',
    link: pr('RetailerCustomerPlatform', 186),
  },
  {
    date: '2026-09-27',
    label: '27 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Customer web redeployed: no more false out-of-stock button on the product page, and the coupon sheet now clears the bottom nav.',
    link: commit('customer_web_build', '732f02d'),
  },
  {
    date: '2026-09-26',
    label: '26 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Customer app wrapped for Android with Capacitor. Google sign-in works natively and UPI payments open the phone’s UPI apps directly.',
    link: commit('customer_ordereasy_njs', 'e3d0112'),
  },
  {
    date: '2026-09-25',
    label: '25 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Coupon codes end to end: a validation engine and APIs on the platform, coupon creation with visibility toggles for retailers, and apply/remove with an available-coupons sheet for customers. Cashback is worked out on the net item amount, never the delivery fee.',
    link: pr('RetailerCustomerPlatform', 184),
  },
  {
    date: '2026-09-23',
    label: '23 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Inclusive GST with HSN codes merged across POS bills, online orders, purchase invoices and returns, with sale-time rates snapshotted so old bills never change.',
    link: pr('RetailerCustomerPlatform', 103),
  },
  {
    date: '2026-09-23',
    label: '23 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Customer storefront UX, phases 1-3: compact store tags, a hardened checkout payload with address validation, and out-of-stock items hidden from guests.',
    link: commit('customer_ordereasy_njs', 'f98aa64'),
  },
  {
    date: '2026-09-16',
    label: '16 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Modifying an order no longer crashes the inventory log, and items added mid-order carry their GST fields.',
    link: pr('RetailerCustomerPlatform', 102),
  },
  {
    date: '2026-09-14',
    label: '14 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Exact-amount UPI QR live at the retailer POS, split bills included, and printed on thermal receipts behind a per-shop toggle.',
    link: commit('retailer_web_build', '588bfd2'),
  },
  {
    date: '2026-09-14',
    label: '14 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Per-order exact-amount UPI QR live on the customer order screen, in place of the static shop QR.',
    link: commit('customer_web_build', 'a076b95'),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'Razorpay Checkout live for Pro on gstslip.vin8003.com - ₹499 for 30 days.',
    link: { label: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com' },
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'Invoices stored server-side, the GST field set widened, and TallyPrime purchase XML export added, plus an admin desk for accounts and Pro.',
    link: commit('gstslip', '53d3c62'),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Wrong stock quantities fixed on the platform.',
    link: pr('RetailerCustomerPlatform', 70),
  },
  {
    date: '2026-09-13',
    label: '13 Sep 2026',
    project: 'AI Secretary',
    accent: 'ember',
    kind: 'decision',
    category: 'decision',
    line: 'Executable plan locked, then re-parked: a US solo and small-law beachhead on Retell + Twilio. Not shipping.',
  },
  {
    date: '2026-09-11',
    label: '11 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Rack display labels for the shelf, in 1:1 and 3:1 layouts sized for thermal label printers.',
    link: commit('retailer_web_build', '3d339e7'),
  },
  {
    date: '2026-09-11',
    label: '11 Sep 2026',
    project: 'vin8003.com',
    accent: 'ember',
    kind: 'ship',
    category: 'design',
    line: 'Rebuilt this site as a command center: building now, demos, build log, thesis.',
    link: pr('vin8003-landing', 3),
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'infra',
    line: 'Production exports of both surfaces from main, after the backend deployment batch merged on the platform.',
    link: pr('RetailerCustomerPlatform', 84),
  },
  {
    date: '2026-09-10',
    label: '10 Sep 2026',
    project: 'Demos',
    accent: 'ember',
    kind: 'ship',
    category: 'content',
    line: 'Demo hub densified: four walkthroughs, ten steps each, captured from the real products on seed data.',
    link: { label: 'Walk them here', href: '/demo/' },
  },
  {
    date: '2026-09-09',
    label: '09 Sep 2026',
    project: 'GSTSlip',
    accent: 'amber',
    kind: 'ship',
    category: 'feature',
    line: 'First commit of the invoice capture app now live at gstslip.vin8003.com.',
    link: commit('gstslip', '105a547'),
  },
  {
    date: '2026-09-05',
    label: '05 Sep 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'fix',
    line: 'Barcodes bound into the Print Labels list and TVS LP46NEO label alignment fixed, exported to production; barcode search fixed on the platform.',
    link: pr('retailer_web_build', 4),
  },
  {
    date: '2026-09-04',
    label: '04 Sep 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'feature',
    line: 'Court case import, court-data adapters and Indian Kanoon search, with an admin switch between data providers.',
    link: commit('nyayasetu', 'd9cf3ad'),
  },
  {
    date: '2026-08-30',
    label: '30 Aug 2026',
    project: 'CiteBench',
    accent: 'violet',
    kind: 'ship',
    category: 'design',
    line: 'Research desk redesigned on a shared design system.',
    link: pr('nyayasetu', 11),
  },
  {
    date: '2026-08-22',
    label: '22 Aug 2026',
    project: 'OrderEasy',
    accent: 'mint',
    kind: 'ship',
    category: 'feature',
    line: 'Customer city map and city-wide shop merge previewed against the radius-filtered live list.',
    link: pr('customer_web_build', 6),
  },
];

/** THESIS - the founder line, then the working detail. */
export const thesis = {
  line: 'I want to build many narrow products, each doing one specific piece of work properly.',
  body: [
    'Not one app that claims to do everything. A set of narrow ones, each with its own surface, its own guardrail and its own definition of done. Software that does everything is a demo. Software that does one job is a colleague.',
    'The products are the first recruits, and each one says plainly what it is not. None of them pretends to do another one’s job.',
    'The build loop is the same shape every time: work runs on branches in parallel, every change is reviewed and tested end to end, and I decide what merges. Django on the backend, TypeScript on the surfaces, everything deployed to Cloudflare.',
  ],
  /** The roster - each product framed as the job it does. */
  roster: [
    { name: 'OrderEasy', role: 'The shop assistant', job: 'Bills the counter, keeps stock and the supplier khata, and takes orders from the customers who already know the shop.', accent: 'mint' },
    { name: 'CiteBench', role: 'The chamber clerk', job: 'Keeps the diary and the matters, and researches case law by facts, question and court, showing only what it actually retrieved.', accent: 'violet' },
    { name: 'GSTSlip', role: 'The accounts clerk', job: 'Reads a tax invoice from a photograph and hands back one clean register row, ready for CSV or Tally.', accent: 'amber' },
  ] as const,
  parked: {
    name: 'AI Secretary',
    status: 'EXPERIMENT' as Status,
    note: 'An AI secretary for business phone lines. The plan exists (a US solo and small-law beachhead on Retell + Twilio) and it stays parked until I unpark it. Not building, not shipped, not sold.',
  },
};

/** ABOUT - short and personal. Not a résumé. */
export const about = {
  lines: [
    'I write the backend, the surface and the copy, then sit with the support mail. That whole loop is the job I actually wanted.',
    'Ten years of Python and Django before this, across embedded electronics and sensors, fintech and banking, medical systems, casino gaming, image pipelines and AI data work. Different industries, same habit: get the thing into somebody’s hands and watch what breaks.',
    'Dad of two, in Delhi NCR. That is most of the reason the tooling has to be fast and the scope has to stay honest.',
  ],
  /** Secondary, deliberately not title-first and deliberately unnamed. */
  dayRole: 'Also Lead Software Engineer at a publicly listed Indian NBFC, on flagship product development.',
  notebook:
    'X is a lab notebook, not a brand channel. Progress, dead ends and the occasional rewrite go up as they happen.',
};

/** Career breadth - the site is not niche-locked to retail, law and GST. */
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

/**
 * CAREER - from Vineet's LinkedIn Experience and Skills (screenshots, 5 Nov
 * 2026) and his CV (Feb 2026, private, not published or linked). The current
 * employer stays unnamed, as in `about.dayRole`. No metrics yet.
 */
export type CareerRole = { years: string; role: string; org: string; place: string; work: string[]; tools: string[] };

export const career: CareerRole[] = [
  {
    years: '2026 – now',
    role: 'Lead Software Engineer',
    org: 'A publicly listed Indian NBFC',
    place: 'Gurugram · hybrid',
    work: ['Flagship product development.'],
    tools: ['Python', 'Django'],
  },
  {
    years: '2025 – 2026',
    role: 'Senior Game Developer',
    org: 'Ingenuity Gaming',
    place: 'Jaipur · hybrid',
    work: [
      'Shipped production casino game engines (slots, table and crash games) on the Oddsworks RGS with the LEGA framework.',
      'Turned the maths models behind each game into configurable engine parameters.',
      'Built simulation pipelines that run millions of spins to prove RTP compliance, then made them faster with parallel processing and had them write the RTP reports directly.',
      'Standardised the team’s development workflow and tooling, with unit tests and validation for regulatory sign-off.',
    ],
    tools: ['Python', 'Parallel simulation', 'Unit testing'],
  },
  {
    years: '2022 – 2025',
    role: 'Senior Software Engineer',
    org: 'MERNPLUS Technologies, for an NBFC client',
    place: 'Remote',
    work: [
      'Built core features of a Loan Origination System: loan creation, checker and disbursement.',
      'Led its integrations with Flexcube and partner bank systems: API mapping, data transformation and testing.',
      'Wrote the unit test suite for LOS components, and sped up its database with caching and query tuning.',
      'Worked day to day with product, QA and frontend teams.',
    ],
    tools: ['Django REST Framework', 'Kafka', 'Redis', 'MongoDB', 'AWS'],
  },
  {
    years: '2018 – 2022',
    role: 'Product Development Engineer, then Senior',
    org: 'MEDdelivery',
    place: 'Jaipur',
    work: [
      'Built a central product catalogue from scraped sources, cleaned, normalised and enriched.',
      'Designed cart-less ordering with per-order cutoff times, and mapped vendor product groups to the catalogue.',
      'Core developer of a dispatch centre built from scratch: automated rack assignment and a banking-like ledger for supply-chain cash flow, collections and cash distribution.',
      'As senior: led a plug-and-play module for BNPL providers and payment gateways, automated bank-statement reconciliation with direct Tally export, and built real-time tracking of cash liabilities across the field workforce.',
    ],
    tools: ['Django REST Framework', 'PostgreSQL', 'Pandas', 'Redis', 'GCP', 'Angular'],
  },
  {
    years: '2017 – 2018',
    role: 'Django Developer',
    org: 'Zoimate',
    place: 'Jaipur',
    work: [
      'Built analytics and visualisation for a collision detection system for automobiles.',
      'Machine-to-machine and IoT communication on Raspberry Pi and Arduino, for real-time data and control.',
    ],
    tools: ['Django', 'Django Channels', 'MongoDB', 'IoT'],
  },
  {
    years: '2016',
    role: 'Python Developer',
    org: 'Bit22 Designs',
    place: 'Jaipur',
    work: [
      'Built features for Khabree, a newspaper app: message handling on RabbitMQ, ZeroMQ, MQTT and Redis, and faster image handling.',
    ],
    tools: ['Django', 'Flask', 'RabbitMQ', 'MongoDB', 'MySQL'],
  },
];

export const education = 'B.Tech in Computer Science Engineering, Jaipur, 2016.';

/** Grouped skills: the career plus what the products on this site run on. */
export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'SQL'] },
  { group: 'Backend', items: ['Django', 'Django REST Framework', 'Flask', 'Django Channels', 'REST APIs', 'JWT, OAuth and session auth', 'Microservices'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Pandas', 'Query tuning and caching'] },
  { group: 'Messaging', items: ['Kafka', 'RabbitMQ', 'ZeroMQ', 'MQTT'] },
  { group: 'Frontend', items: ['React', 'TanStack Start', 'Angular', 'Astro', 'Tailwind CSS', 'Capacitor (Android)'] },
  { group: 'Cloud and delivery', items: ['AWS', 'GCP', 'Cloudflare Workers', 'Docker', 'GitHub Actions CI/CD', 'Linux', 'Git'] },
  { group: 'Testing', items: ['Unit testing', 'Playwright end-to-end', 'Simulation-based validation'] },
  { group: 'Integrations', items: ['Flexcube and bank APIs', 'Payment gateways and BNPL', 'UPI', 'Razorpay', 'Tally export', 'Meta Conversions API'] },
  { group: 'Domains', items: ['Lending and loan origination', 'Payments and reconciliation', 'Retail POS and inventory', 'Supply chain', 'Casino gaming and RTP', 'IoT', 'Legal research', 'GST'] },
];
