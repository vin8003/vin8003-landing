/**
 * The four guided product journeys, rendered natively on vin8003.com/demo.
 *
 * Every screen is a real capture of the product running on seed data, served
 * from the demo hub's media folder. Titles and captions are the hub's own copy;
 * CiteBench bodies are Vineet's step notes from the same walkthrough. Nothing
 * here is a mockup of a plan.
 */

import { demoHub } from './site';

export type DemoStep = {
  /** Short label for the step rail. */
  name: string;
  /** Stage the step belongs to, shown above the title. */
  stage?: string;
  title: string;
  body: string;
  /** File name inside `${demoHub}/<id>/media/`. */
  image: string;
};

export type Demo = {
  id: 'retailer' | 'customer' | 'citebench' | 'gstslip';
  product: string;
  journey: string;
  accent: 'mint' | 'violet' | 'amber';
  device: 'browser' | 'phone';
  /** What the address bar shows on browser captures. */
  host?: string;
  headline: string;
  summary: string;
  guardrail: string;
  seed?: string;
  live?: { label: string; href: string };
  steps: DemoStep[];
};

export const demoMedia = (demo: Demo, step: DemoStep) => `${demoHub}/${demo.id}/media/${step.image}`;
export const demoSource = (demo: Demo) => `${demoHub}/${demo.id}/`;

export const demos: Demo[] = [
  {
    id: 'retailer',
    product: 'OrderEasy',
    journey: 'Retailer',
    accent: 'mint',
    device: 'browser',
    host: 'retailer.ordereasy.win',
    headline: 'Run one shop: counter, stock, suppliers and incoming orders.',
    summary:
      'The surface for the person behind the counter. Bill at POS, book the distributor bill, keep the supplier khata straight, take the orders customers send in, and set the hours the shop takes them.',
    guardrail: 'Small shop is fine. Start with a few products and the first bill.',
    seed: 'GreenCart Mini Mart',
    live: { label: 'Retailer portal', href: 'https://retailer.ordereasy.win' },
    steps: [
      {
        name: 'Sign in',
        stage: 'Open the shop',
        title: 'One shop, one login',
        body: 'A plain username-and-password card: no store picker, no workspace chooser. The account is the shop, so signing in lands straight on that shop’s dashboard.',
        image: 'retailer-sign-in.jpg',
      },
      {
        name: 'Overview',
        stage: 'Open the shop',
        title: 'The shop’s day in four numbers',
        body: 'Four KPIs for the selected range (orders, revenue, active products and average order value) with a cash-versus-digital split and a POS-versus-online split underneath.',
        image: 'retailer-overview.jpg',
      },
      {
        name: 'POS billing',
        stage: 'The counter',
        title: 'Bill a walk-in without touching the mouse',
        body: 'The counter screen is a scan box, a product grid and a running cart. Cash, UPI, credit or a split, all from the same panel.',
        image: 'retailer-pos-bill.jpg',
      },
      {
        name: 'Products',
        stage: 'The counter',
        title: 'Every item in the unit the shop buys in',
        body: 'The catalogue sorts by stock state first: All, Low Stock, Out of Stock and Negative Stock each get a filter card. Every row carries a selling price against a struck-through MRP.',
        image: 'retailer-products.jpg',
      },
      {
        name: 'Purchases',
        stage: 'Stock & suppliers',
        title: 'Book the distributor bill that filled the shelves',
        body: 'Inward stock is recorded as a purchase invoice, with what is listed and what is still unpaid side by side. The unpaid figure is the same one the khata carries.',
        image: 'retailer-purchases-supplier-bill.jpg',
      },
      {
        name: 'Supplier khata',
        stage: 'Stock & suppliers',
        title: 'The credit book, by distributor',
        body: 'The same outstanding amount seen on Purchases, now arranged by who is owed, with each distributor’s contact on the row.',
        image: 'retailer-supplier-khata.jpg',
      },
      {
        name: 'Orders',
        stage: 'The storefront',
        title: 'Online and store orders in one queue',
        body: 'Every order sits in one list, tagged Online or Store and filterable by stage from Pending through Delivered. The sidebar badge counts what still needs the shop.',
        image: 'retailer-incoming-customer-order.jpg',
      },
      {
        name: 'Offers',
        stage: 'The storefront',
        title: 'Offers are typed, not free text',
        body: 'A cart-value rule, a percentage and a flat amount: three offers, three different shapes, each with its dates and its redemptions on the card.',
        image: 'retailer-simple-offer.jpg',
      },
      {
        name: 'Hours',
        stage: 'The storefront',
        title: 'When the shop takes orders',
        body: 'Each weekday gets a toggle and an opens/closes pair, so late Fridays and a short Sunday are a setting, not a sign on the door.',
        image: 'retailer-open-close-hours.jpg',
      },
      {
        name: 'Customers',
        stage: 'Catalogue & customers',
        title: 'Two customers, two relationships',
        body: 'A walk-in with no account history next to an app user with orders, spend, last activity and a credit balance carried on the shop’s own books.',
        image: 'retailer-customers.jpg',
      },
      {
        name: 'Categories',
        stage: 'Catalogue & customers',
        title: 'The shelves the catalogue hangs off',
        body: 'Categories ship with the store. Renaming a generic one creates a private version for this shop, so one shop’s wording never moves anyone else’s shelves.',
        image: 'retailer-categories.jpg',
      },
    ],
  },
  {
    id: 'customer',
    product: 'OrderEasy',
    journey: 'Customer',
    accent: 'mint',
    device: 'phone',
    headline: 'Order from the shop you already know. Not a mall.',
    summary:
      'The other half of the same product. Pick your city, open the shop you already buy from, fill a cart from its shelves, choose delivery or pickup, and message the shop on the order itself.',
    guardrail: 'Not a marketplace. Not a delivery company.',
    seed: 'GreenCart Mini Mart',
    live: { label: 'Customer portal', href: 'https://customer.ordereasy.win' },
    steps: [
      {
        name: 'City',
        title: 'Pick your city',
        body: 'The app opens on a location check. GPS is offered first; when it cannot confirm a service city, a city list takes over.',
        image: 'customer-area.jpg',
      },
      {
        name: 'Shops',
        title: 'See the shops in your city',
        body: 'Every shop is listed with its delivery and pickup badges. It is a directory of shops, not one merged storefront: you order from one shop at a time.',
        image: 'customer-shop-list.jpg',
      },
      {
        name: 'Shop home',
        title: 'Open the shop you already know',
        body: 'The shop’s own home: its address, open or closed state, offers and categories. The header keeps the shop visible the whole time.',
        image: 'customer-pick-known-shop.jpg',
      },
      {
        name: 'Browse',
        title: 'Browse the shop’s own shelves',
        body: 'Offers, Best Selling and Buy Again, with unit, price, struck-through MRP and the shop’s cart-offer badge. Add and quantity controls sit on the tile.',
        image: 'customer-browse-bag.jpg',
      },
      {
        name: 'Cart',
        title: 'Check the cart',
        body: 'Quantity steppers, then the totals: subtotal, what the shop’s cart offer saved, and the amount payable.',
        image: 'customer-bag.jpg',
      },
      {
        name: 'Checkout',
        title: 'Delivery or pickup, address, payment',
        body: 'One screen carries all three choices. If the shop is closed, the order is scheduled rather than refused.',
        image: 'customer-delivery-pickup-pay.jpg',
      },
      {
        name: 'Order',
        title: 'Place the order',
        body: 'The order is created against the shop, not a platform: the shop’s name, phone and street address sit above the per-line amounts.',
        image: 'customer-place-order.jpg',
      },
      {
        name: 'My Orders',
        title: 'Find it again in My Orders',
        body: 'Past and active orders stack up with status, the shop they were placed with and the amount. Each row opens the same order screen.',
        image: 'customer-my-orders.jpg',
      },
      {
        name: 'Chat',
        title: 'Message the shop',
        body: 'Chat is attached to the order, so the shop already knows which one you mean. Quick replies cover the questions people actually ask.',
        image: 'customer-message-shop.jpg',
      },
      {
        name: 'Help',
        title: 'Help that points back into the product',
        body: 'FAQs and a feedback tab in one sheet. The answers route you to Orders for tracking, order chat for missing items, and Profile for addresses.',
        image: 'customer-help.jpg',
      },
    ],
  },
  {
    id: 'citebench',
    product: 'CiteBench',
    journey: 'Chamber',
    accent: 'violet',
    device: 'browser',
    host: 'citebench.ordereasy.win',
    headline: 'What needs you today: diary, matters and research for Indian practice.',
    summary:
      'A case-law research desk built around how a chamber actually runs. Start on Today, work the diary, open a matter as a proceeding, then research by facts, legal question and court.',
    guardrail: 'Suggestions are not court directions.',
    live: { label: 'Open CiteBench', href: 'https://citebench.ordereasy.win' },
    steps: [
      {
        name: 'Chamber',
        title: 'Sign in and open your chamber',
        body: 'The chamber is the workspace: one sign-in and the whole practice is on the desk.',
        image: 'citebench-sign-in-chamber.jpg',
      },
      {
        name: 'Today',
        title: 'See what needs you today',
        body: 'Start on Today, the short list of what needs attention now, before anything else.',
        image: 'citebench-today.jpg',
      },
      {
        name: 'Diary',
        title: 'Your diary for hearings and dates',
        body: 'The day’s list of hearings and dates, checked first thing.',
        image: 'citebench-diary.jpg',
      },
      {
        name: 'Matters',
        title: 'Every active matter',
        body: 'Matters are proceedings, not checklists: each one moves through its own stages.',
        image: 'citebench-matters.jpg',
      },
      {
        name: 'Inside a matter',
        title: 'Work inside a single matter',
        body: 'Orders, the file and the clocks that run on it, all in one place.',
        image: 'citebench-inside-matter.jpg',
      },
      {
        name: 'Research',
        title: 'Research by facts, question or court',
        body: 'Describe the facts, frame the legal question, pick the court, and search.',
        image: 'citebench-research.jpg',
      },
      {
        name: 'Authorities',
        title: 'Read what the search actually retrieved',
        body: 'Authorities are shown as retrieved, with their source, so nothing is invented between the search and the screen.',
        image: 'citebench-authorities-retrieved.jpg',
      },
      {
        name: 'Directions',
        title: 'Directions and suggestions, kept apart',
        body: 'Court directions and CiteBench suggestions are shown separately. Suggestions are not court directions.',
        image: 'citebench-directions-vs-suggestions.jpg',
      },
      {
        name: 'Inbox',
        title: 'Messages and items waiting for you',
        body: 'Skim the inbox when something new lands on a matter.',
        image: 'citebench-inbox.jpg',
      },
      {
        name: 'हि / EN',
        title: 'Switch between Hindi and English',
        body: 'Change language when the brief needs it, without leaving the screen.',
        image: 'citebench-hi-en.jpg',
      },
    ],
  },
  {
    id: 'gstslip',
    product: 'GSTSlip',
    journey: 'Invoice capture',
    accent: 'amber',
    device: 'browser',
    host: 'gstslip.vin8003.com',
    headline: 'Photograph a GST invoice. Get a clean register row.',
    summary:
      'Point a camera at a tax invoice or upload its pages. GSTSlip reads the header, line items, addresses and IRN, fills gaps from your defaults, and hands back a register you can export as CSV or Tally purchase XML.',
    guardrail: 'GSTSlip does not connect to Tally or the live NIC IRP. Tally XML is a file you import. IRN lookup uses a GSP sandbox.',
    live: { label: 'Open GSTSlip', href: 'https://gstslip.vin8003.com' },
    steps: [
      {
        name: 'Drop zone',
        title: 'Photograph or upload',
        body: 'Photograph a GST tax invoice, upload JPEG, PNG or PDF pages, try a sample, scan an e-Invoice QR, or enter it by hand.',
        image: 'gstslip-home.jpg',
      },
      {
        name: 'Capture',
        title: 'Capture another invoice',
        body: 'Add more pages or start the next invoice. Up to four pages per invoice; line items are read from the table.',
        image: 'gstslip-capture-zone.jpg',
      },
      {
        name: 'Header',
        title: 'Extracted header fields',
        body: 'Invoice number, date, supplier and buyer GSTIN, addresses, place of supply and totals, read from the photograph.',
        image: 'gstslip-extracted-fields.jpg',
      },
      {
        name: 'Line items',
        title: 'Line items and HSN',
        body: 'Description, HSN/SAC, quantity, taxable value and the CGST/SGST/IGST split per line. Edit or add lines before saving.',
        image: 'gstslip-line-items.jpg',
      },
      {
        name: 'Defaults',
        title: 'Your defaults fill the gaps',
        body: 'Set your buyer GSTIN, place of supply and other defaults. Missing header fields on a new invoice use them.',
        image: 'gstslip-field-defaults.jpg',
      },
      {
        name: 'Register',
        title: 'One row per invoice',
        body: 'Invoice number, parties, HSN, taxable value, tax split and total on a single row. Tap a row to edit it.',
        image: 'gstslip-register-row.jpg',
      },
      {
        name: 'CSV',
        title: 'Export the register as CSV',
        body: 'An invoices CSV or a separate line-items CSV. Data leaves the device only when you export.',
        image: 'gstslip-csv-export.jpg',
      },
      {
        name: 'Tally XML',
        title: 'Tally purchase XML',
        body: 'A file you import into Tally. GSTSlip does not connect to Tally directly.',
        image: 'gstslip-tally-xml.jpg',
      },
      {
        name: 'IRN',
        title: 'IRN lookup through a GSP sandbox',
        body: 'IRN and e-Invoice details can be filled from a sandbox GSP lookup, not the live NIC IRP. QR scan and manual entry work too.',
        image: 'gstslip-irn-sandbox.jpg',
      },
      {
        name: 'Pricing',
        title: '10 free documents, then ₹499 a month',
        body: 'Start with 10 free documents. Pro is ₹499 a month with Tally XML and IRN included.',
        image: 'gstslip-pricing.jpg',
      },
    ],
  },
];
