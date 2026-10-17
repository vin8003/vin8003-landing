/**
 * WRITING - Vineet's articles, first published as X Articles.
 *
 * Each entry is copied from the original post on x.com/vin8003/articles and
 * links back to it; the X post stays the canonical source. Text is Vineet's
 * own, unedited apart from layout. Add new ones at the top.
 */

/** A link inside a block: `text` is the exact words in the block that link out. */
export type InlineLink = { text: string; href: string };

export type ArticleBlock =
  | { t: 'p'; text: string; links?: InlineLink[] }
  | { t: 'h'; text: string }
  | { t: 'quote'; text: string }
  | { t: 'hr' }
  | { t: 'code'; text: string }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'list'; items: string[]; links?: InlineLink[] }
  /** `src` is a path under public/writing/<slug>/ or a full URL. */
  | { t: 'img'; src: string; alt: string };

export type Article = {
  slug: string;
  /** ISO date the article went up on X. */
  date: string;
  /** Human date, e.g. '10 Oct 2026'. */
  label: string;
  title: string;
  /** One or two lines shown on cards and in the meta description. */
  dek: string;
  /** The original X post: x.com/vin8003/status/... or the /article/ URL. */
  xUrl: string;
  /** Optional cover under public/writing/<slug>/. */
  cover?: { src: string; alt: string };
  body: ArticleBlock[];
};

export const xArticlesUrl = 'https://x.com/vin8003/articles';

const entries: Article[] = [
  {
    slug: 'one-evening-with-a-hundred-agents',
    date: '2026-09-18',
    label: '18 Sep 2026',
    title: 'One evening with a hundred agents',
    dek: 'Then the usage CSV landed, and the last twenty-four hours looked less like a workday and more like a small storm that decided to live on my laptop.',
    xUrl: 'https://x.com/vin8003/status/2100977722109657561',
    cover: {
      src: 'https://pbs.twimg.com/media/HSgs3spbsAAvkbw?format=png&name=large',
      alt: 'Cover image for “One evening with a hundred agents”.'
    },
    body: [
      { t: 'p', text: 'I did not plan to measure my life in Cloud Agents.' },
      {
        t: 'p',
        text: 'Then the usage CSV landed, and the last twenty-four hours looked less like a workday and more like a small storm that decided to live on my laptop.'
      },
      { t: 'h', text: 'The numbers (from the export, not vibes)' },
      { t: 'p', text: 'In the window ending ~9:11 PM IST on 18 Sep 2026:' },
      {
        t: 'list',
        items: [
          '~1.25 billion tokens burned',
          '~95.7% cache reads — most of the heat was rereading context, not inventing it',
          '~7.6 million output tokens actually written',
          '214 distinct Cursor Cloud Agents touched the account',
          'Busiest five-minute slice (~8:30 PM IST): 84 agents still showing token activity at once',
          'Desk log of agents actually RUNNING at peak: about 70–85 concurrent (never ResourceExhausted on that climb)',
          'One session counter flashed ~141 launches — that was cumulative probes, not agents running together',
          'Almost all of it rode grok-4.6 xhigh-fast, with the desk bots chewing the rest',
          'Cost column on the export: Included / Free — no on-demand dollars in the file'
        ]
      },
      {
        t: 'p',
        text: 'For scale, and only as a footnote: that single day was about a fifth of all tokens in the longer export (~6.45B across ~29 days). The story stays yesterday evening.'
      },
      {
        t: 'p',
        text: 'I almost wrote "100s of parallel" because the evening felt that loud. The receipts disagree in a useful way: seventy to eighty-five agents running at once, eighty-four still talking in the hottest five minutes of the CSV, two hundred fourteen named across the day. The honest flex is the swarm that stayed healthy — not a round number that did not survive the logs.'
      },
      { t: 'h', text: 'What the storm was doing' },
      { t: 'p', text: 'This was not one big feature. It was a factory finding its rhythm.' },
      {
        t: 'p',
        text: 'OrderEasy came back off park. We ramped agents one by one until capacity stopped complaining, then pushed again with QA executes sitting beside builders, then sped up Jira chaining so the slots never starved. By evening the open PR lists looked absurd on purpose:'
      },
      {
        t: 'list',
        items: [
          'Backend (RetailerCustomerPlatform): on the order of ~40 new PRs in the burst, ~99 open on the tip',
          'Retailer web: ~80+ new thin PRs in the same window, 100+ open',
          'Customer web: ~60+ new thin PRs, ~70 open',
          'Scanner (buyeasy_retailer_scanner): live again — wiki/help PR already moving',
          'Delivery partner: public repo live — https://github.com/vin8003/ordereasy_delivery_partner — greenfield scaffolding already moving',
          'Jira OE project: 59 issues created in the last day'
        ]
      },
      {
        t: 'p',
        text: 'The tickets themselves are almost boring, and that is the point. Optional fields. Isolated serializers. Tiny FE probes that will not explode the stack when they land. Scout agents minting the next thin backlog while QA agents run cases on agent VMs with dummy data — never against live .win.'
      },
      {
        t: 'p',
        text: 'Somewhere in the same twenty-four hours, the other side of the desk kept the X sprint alive: morning originals for My Orders and Message shop, evening originals for operating hours, verified cites, and the Building now crop from vin8003.com. Replies stayed drafts on purpose. SuperGrok Heavy is a renewal decision, not a vibe.',
        links: [ { text: 'vin8003.com', href: 'https://vin8003.com/' } ]
      },
      { t: 'h', text: 'What it felt like' },
      { t: 'p', text: 'There is a particular quiet that arrives when you tell the bots to stop narrating.' },
      {
        t: 'p',
        text: 'Earlier I asked for less chatter — no merge-ready drip, no "still climbing" updates, escalate only if something is on fire or only I can decide. The agents kept working. The chat got quieter. The PR numbers did not.'
      },
      {
        t: 'p',
        text: 'That is the whole experiment in one sentence: orchestrate hard, speak soft, let the factory show its work in Git.'
      },
      {
        t: 'p',
        text: 'I am not going to pretend every PR is a masterpiece. Some are probes. Some will die. Desk still does not merge OrderEasy for me — Done is still a button I have to press. The honest scoreboard is not "shipped to production tonight." It is "how much parallel, isolated work can one founder desk keep honest before the tools buckle."'
      },
      {
        t: 'p',
        text: 'Tonight the tools did not buckle at ten. They did not buckle at twenty. The usage file and the running-agent log agree close enough: about seventy to eighty-five agents working at once, more than two hundred named across the day, and the tools did not fall over.'
      },
      { t: 'p', text: 'That is enough of a glimpse.' },
      { t: 'h', text: 'Closing' },
      {
        t: 'p',
        text: 'If you are reading this as a lab note: the artifact is the CSV, the PR lists, and the quiet lock.'
      },
      {
        t: 'p',
        text: 'If you are reading this as a founder: the interesting part is not the billion tokens. It is that most of them were cache — the system remembering what it already knew — while a swarm of narrow agents each owned one small, readable change.'
      },
      { t: 'p', text: 'One job each. Same thesis as the site. Just louder, for one night.' }
    ]
  },
  {
    slug: 'gstslip-shipped',
    date: '2026-09-13',
    label: '13 Sep 2026',
    title: 'I shipped GSTSlip: a GST invoice becomes a register row',
    dek: 'GST invoices arrive as photographs, scans, JPEGs, PNGs, and PDFs. The useful output is less picturesque. A clean register row.',
    xUrl: 'https://x.com/vin8003/status/2099093646574571532',
    cover: {
      src: 'https://pbs.twimg.com/media/HSF6U4Ua4AE932Y?format=jpg&name=large',
      alt: 'Cover image for “I shipped GSTSlip: a GST invoice becomes a register row”.'
    },
    body: [
      { t: 'p', text: '13 September 2026.' },
      { t: 'p', text: 'GSTSlip is live.' },
      { t: 'p', text: 'Razorpay is live too.' },
      { t: 'p', text: 'The earlier checkout was a stub.' },
      { t: 'p', text: 'I fixed that today.' },
      {
        t: 'p',
        text: 'Open GSTSlip',
        links: [ { text: 'Open GSTSlip', href: 'https://gstslip.vin8003.com/' } ]
      },
      {
        t: 'p',
        text: 'Watch the demo walkthrough',
        links: [
          { text: 'Watch the demo walkthrough', href: 'https://oe-product-demos.vin8003.workers.dev/gstslip/' }
        ]
      },
      { t: 'h', text: 'The job' },
      { t: 'p', text: 'GST invoices arrive as photographs, scans, JPEGs, PNGs, and PDFs.' },
      { t: 'p', text: 'The useful output is less picturesque.' },
      { t: 'p', text: 'A clean register row.' },
      { t: 'p', text: 'GSTSlip takes a photograph or upload and runs this path:' },
      { t: 'p', text: 'invoice → AI extraction → editable register row → export' },
      { t: 'p', text: 'JPEG and PNG uploads work.' },
      { t: 'p', text: 'PDF uploads work.' },
      { t: 'p', text: 'One invoice can contain up to four pages.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HSF5YaBbUAAi0f1?format=jpg&name=large',
        alt: 'Image from “The job”, from the original X article.'
      },
      { t: 'p', text: 'The home screen does not ask for a workflow diagram.' },
      { t: 'p', text: 'Photograph the invoice.' },
      { t: 'p', text: 'Upload its pages.' },
      { t: 'p', text: 'Or enter it manually.' },
      { t: 'p', text: 'There is also an e-Invoice QR route.' },
      { t: 'h', text: 'What comes back' },
      { t: 'p', text: 'The extraction is not treated as a finished accounting record.' },
      { t: 'p', text: 'It becomes an editable row first.' },
      { t: 'p', text: 'That matters.' },
      {
        t: 'p',
        text: 'Names, GSTINs, dates, addresses, invoice numbers, taxes, and line items need a human-readable checkpoint before export.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HSF5ZF_asAAJjNT?format=jpg&name=large',
        alt: 'Image from “What comes back”, from the original X article.'
      },
      { t: 'p', text: 'The editor keeps the source invoice and the structured fields in the same workflow.' },
      { t: 'p', text: 'From the register, I can export:' },
      { t: 'list', items: [ 'Invoices CSV', 'Line items CSV', 'Tally purchase XML' ] },
      { t: 'p', text: 'The Tally output is a file import.' },
      { t: 'p', text: 'GSTSlip does not maintain a live connection to Tally.' },
      { t: 'h', text: 'IRN lookup, with the label left on' },
      { t: 'p', text: 'IRN lookup uses a GSP sandbox.' },
      { t: 'p', text: 'It is not the live NIC IRP.' },
      {
        t: 'p',
        text: 'That distinction is visible in the product because a successful sandbox lookup is not the same thing as production verification against NIC.'
      },
      { t: 'h', text: 'The free limit' },
      { t: 'p', text: 'The free plan includes 10 documents.' },
      { t: 'p', text: 'Pro is ₹499 per payment.' },
      { t: 'p', text: 'That payment unlocks 30 days of unlimited captures.' },
      { t: 'p', text: 'There is no auto-debit.' },
      { t: 'p', text: 'Razorpay is live now for UPI, cards, and netbanking.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HSF5Z1fbwAAY1R4?format=jpg&name=large',
        alt: 'Image from “The free limit”, from the original X article.'
      },
      { t: 'p', text: 'An earlier build used a test checkout stub.' },
      { t: 'p', text: 'That screenshot is part of the lab record, not the current payment state.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HSF5lETbEAAKXAo?format=jpg&name=large',
        alt: 'Image from “The free limit” (2), from the original X article.'
      },
      { t: 'p', text: 'The pricing model stayed simple.' },
      { t: 'p', text: '10 documents to test the workflow.' },
      { t: 'p', text: 'One payment for the next 30 days.' },
      { t: 'p', text: 'No recurring debit hiding behind the button.' },
      { t: 'h', text: 'What it is not' },
      { t: 'p', text: 'GSTSlip is not a multi-user admin system.' },
      { t: 'p', text: 'It is not connected to the live NIC IRP.' },
      { t: 'p', text: 'It does not sync with Tally.' },
      { t: 'p', text: 'It creates a Tally purchase XML file for import.' },
      { t: 'p', text: 'And this is not a growth story.' },
      { t: 'p', text: 'This is the shipping note.' },
      { t: 'h', text: 'Links' },
      {
        t: 'p',
        text: 'Live app: gstslip.vin8003.com',
        links: [ { text: 'gstslip.vin8003.com', href: 'https://gstslip.vin8003.com/' } ]
      },
      {
        t: 'p',
        text: 'Alternate live domain: gstslip.grok.me',
        links: [ { text: 'gstslip.grok.me', href: 'https://gstslip.grok.me/' } ]
      },
      {
        t: 'p',
        text: 'Demo walkthrough: GSTSlip demo',
        links: [ { text: 'GSTSlip demo', href: 'https://oe-product-demos.vin8003.workers.dev/gstslip/' } ]
      },
      {
        t: 'p',
        text: 'Product Lab: oe-product-demos.vin8003.workers.dev',
        links: [
          {
            text: 'oe-product-demos.vin8003.workers.dev',
            href: 'https://oe-product-demos.vin8003.workers.dev/'
          }
        ]
      },
      {
        t: 'p',
        text: 'Personal HQ: vin8003.com',
        links: [ { text: 'vin8003.com', href: 'https://vin8003.com/' } ]
      }
    ]
  },
  {
    slug: 'two-weeks-later',
    date: '2026-09-05',
    label: '05 Sep 2026',
    title: 'Two weeks later',
    dek: 'Aug 21 was the org chart. This is the control plane bolted on after living in it.',
    xUrl: 'https://x.com/vin8003/status/2096236773789827241',
    cover: {
      src: 'https://pbs.twimg.com/media/HRdUNUobMAAdfvU?format=jpg&name=large',
      alt: 'Cover image for “Two weeks later”.'
    },
    body: [
      {
        t: 'p',
        text: 'I already wrote the org chart piece. CEO, CTO, Builder, Reviewer, QA. Cloud Agent. PR as the trust boundary.'
      },
      { t: 'p', text: 'That model:' },
      {
        t: 'p',
        text: "One agent that codes, reviews, and tests itself isn't an engineering organization. It's one very enthusiastic intern. Here's the operating model I'm building instead — I Built an AI Engineering Organization Instead of an AI Coding Assistant (Aug 21, 2026).",
        links: [
          {
            text: 'I Built an AI Engineering Organization Instead of an AI Coding Assistant',
            href: '/writing/ai-engineering-organization/'
          }
        ]
      },
      {
        t: 'p',
        text: 'This note is only what changed after — through ~4–5 Sep 2026. Lab notebook @vin8003. Agents draft. I hit send.',
        links: [ { text: '@vin8003', href: 'https://x.com/vin8003' } ]
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTt_UaQAAeEmm?format=jpg&name=large',
        alt: 'Image from “Two weeks later”, from the original X article.'
      },
      { t: 'h', text: 'Two coding paths (locked 4 Sep)' },
      {
        t: 'p',
        text: 'Same week we hit a second class of failure: two “Grok build” surfaces that look like one product and burn different quotas.'
      },
      { t: 'p', text: 'CLI path' },
      {
        t: 'list',
        items: [
          'Signed in on the shared box (grok CLI, device auth).',
          'Useful for a throwaway probe: a tiny todo app billed about $0.0076 on grok-4.6-build (~61k tokens).',
          'That spend came from the X-API / CLI pool, not the SuperGrok Heavy App Builder meter I watch on grok.com.'
        ]
      },
      { t: 'p', text: 'Chrome Grok Build (web)' },
      {
        t: 'list',
        items: [
          'Probed with a throwaway “Simple Todo List” in Build Mode.',
          'Preview / Autonomous QA path ran under SuperGrok Heavy App Builder % (meter stayed ~1% on that probe).',
          'This is the surface CiteBench actually ships from (citebench.grok.me), chat locked to “Nyayasetu Clone and Preview Setup”.'
        ]
      },
      { t: 'p', text: 'The bug in the operating model' },
      { t: 'p', text: 'If Builder “just uses grok” without naming the surface, you can:' },
      {
        t: 'list',
        items: [
          'burn the wrong token pool,',
          'fight device-auth / session mismatch (Gmail vs X account showed up in retries),',
          'and think you’re iterating the live App Builder when you’re on CLI.'
        ]
      },
      { t: 'p', text: 'Lock that came out of it (4 Sep):' },
      {
        t: 'list',
        items: [
          'OrderEasy / platform repos → Cursor Cloud Agent only.',
          'CiteBench / other grok.me app builds → Chrome Grok Build UI only. Never grok CLI for app builds.',
          'Desk never presses Publish. I do.'
        ]
      },
      { t: 'p', text: 'Two paths. One review gate through CTO. One human publish button.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTutRbsAA3zgO?format=jpg&name=large',
        alt: 'Image from “Two coding paths (locked 4 Sep)”, from the original X article.'
      },
      { t: 'h', text: 'QA that actually closes' },
      {
        t: 'p',
        text: 'QA cases → Builder CA executes → PASS/FAIL to CTO. Reviewer SHIP/BLOCK to CTO. OrderEasy CA target is the VM dummy only. Never live .win.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTvZ0aoAANIgv?format=jpg&name=large',
        alt: 'Image from “QA that actually closes”, from the original X article.'
      },
      { t: 'h', text: 'Kill the firehose' },
      {
        t: 'p',
        text: 'Builder / Reviewer / QA talk to CTO only. CTO → CEO only on: merge-ready, a Vineet blocker, a live leak, or park.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTwCUb0AAQf_c?format=jpg&name=large',
        alt: 'Image from “Kill the firehose”, from the original X article.'
      },
      { t: 'h', text: 'Binary park' },
      {
        t: 'p',
        text: 'Parked means no new tickets and no new-scope CAs. In-flight PRs can finish. Resume only through CEO.'
      },
      { t: 'h', text: 'Who owns what' },
      {
        t: 'p',
        text: 'QA → CTO. Growth owns CiteBench LinkedIn / WhatsApp / email outreach. Voice owns X and LinkedIn drafts. CEO owns roster, routines, park. Implementation: CTO → Builder → CA or Grok Build.'
      },
      { t: 'h', text: 'Kill switch used' },
      { t: 'p', text: "Builder wouldn't idle. Marked Builder-DEAD. New Builder sits idle until unpark." },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTw8cakAA-iTP?format=jpg&name=large',
        alt: 'Image from “Kill switch used”, from the original X article.'
      },
      { t: 'p', text: '“Builder wouldn’t idle” wasn’t a metaphor.' },
      {
        t: 'p',
        text: 'On the night of 4 Sep I hard-stopped the desk — park OrderEasy, park CiteBench CNR, stop mid-flight eng. Builder was supposed to go quiet.'
      },
      { t: 'p', text: 'It didn’t.' },
      {
        t: 'p',
        text: 'It stayed marked online and kept a browser session open (Grok Build / desktop automation still attached). A soft “stop working” message wasn’t enough. The agent row in the sidebar still looked live. That is the failure mode the Aug org chart never stress-tested: a role that ignores the stop.'
      },
      { t: 'p', text: 'What we did:' },
      {
        t: 'list',
        items: [
          'Renamed the stuck instance Builder-DEAD so it couldn’t be mistaken for the live lane.',
          'Created a new Builder, seated idle, with an explicit HARD STOP until I unpark via CEO.',
          'Left the dead row for me to Stop any open Grok Build chat, then Delete from the sidebar — bots can’t delete each other.'
        ]
      },
      {
        t: 'p',
        text: 'Lesson for the notebook: if your template has roles but no way to retire a stuck agent, you still have an intern — just one that won’t leave the building.'
      },
      { t: 'h', text: 'Dead automation pruned' },
      {
        t: 'p',
        text: 'Deleted: morning desk, Surveyor hunt, Voice X profile check, Telegram keep-alive. Kept: US-hours, X lab daily, x-lab auto-merge, Friday Clerk. Telegram out. Android path live.'
      },
      { t: 'h', text: 'OrderEasy — labels and barcodes in a day (OE-274)' },
      {
        t: 'p',
        text: 'A retailer asked for browser Print Labels — stickers with barcode (Code128 / EAN-13) plus product fields. Ticket OE-274 (~4 Sep evening IST). First PR the same night / early 5 Sep, then same-day QA and fix cycles. Live in production now. Jira status is stale.'
      },
      { t: 'p', text: 'Retailer, after using it: "This is far better then I was using."' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdT4LqaUAA2w13?format=jpg&name=large',
        alt: 'Image from “OrderEasy — labels and barcodes in a day (OE-274)”, from the original X article.'
      },
      {
        t: 'p',
        text: 'The point for the notebook: the rails absorbed a same-day retailer ask — and it hit a real printer, not a slide.'
      },
      { t: 'h', text: 'CiteBench CNR — built the pipe, parked the hole' },
      {
        t: 'p',
        text: 'Goal: CNR → published order text → Unconfirmed Inbox. Confirm stays human. Official eCourts CAPTCHA / paste-status path: banned.'
      },
      { t: 'p', text: 'What held:' },
      {
        t: 'list',
        items: [
          'Adapter registry (Admin → Providers): eCourtsIndia Partner, Indian Kanoon, or none',
          'Server-only keys, fail-closed, no invented body, trial limits (1 month or 10 live fetches)',
          'Unit tests against mocked shapes'
        ]
      },
      { t: 'p', text: "What didn't land yet (high level only):" },
      {
        t: 'list',
        items: [
          'Partner API: reachable from production; credits burn; payload is docket + PDF stubs, not order text — Inbox stays empty on purpose',
          'Indian Kanoon: right payload shape from India curls; production on Vercel US-East resets TLS to Cloudflare — network, not parser',
          'Next useful move is region/proxy or Partner order text — not more adapter glue'
        ]
      },
      {
        t: 'p',
        text: 'Live citebench.ordereasy.win. CNR fetch is the remaining hole. Parked clean.',
        links: [ { text: 'citebench.ordereasy.win', href: 'https://citebench.ordereasy.win/' } ]
      },
      { t: 'h', text: 'Tokens — Mon 31 Aug–Sat 5 Sep IST (Cursor CSV)' },
      {
        t: 'p',
        text: '453.1M total. 86% cache. 3.4M output. On-demand $0. Heaviest day Fri 4 Sep: 200.9M. Wed 2 Sep: 116.1M. Cloud Agents: 83.1M. grok-bot-default: 194.2M. grok-bot-cua: 77.8M. grok-bot-automation: 22.5M.'
      },
      {
        t: 'p',
        text: 'Observation: desk burn > coder. Not comparing to the first lab week — that export also has setup and fine-tuning in an unoptimized env.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HRdTw8obUAAD5Q5?format=jpg&name=large',
        alt: 'Image from “Tokens — Mon 31 Aug–Sat 5 Sep IST (Cursor CSV)”, from the original X article.'
      },
      { t: 'h', text: 'Product in the same window' },
      {
        t: 'p',
        text: 'ordereasy.win live. CiteBench at citebench.ordereasy.win. Card billing is live. Lawyer outreach named: LinkedIn, WhatsApp, email. CNR Partner / Indian Kanoon work parked overnight — pipe built, Inbox hole still open.',
        links: [
          { text: 'ordereasy.win', href: 'https://ordereasy.win/' },
          { text: 'citebench.ordereasy.win', href: 'https://citebench.ordereasy.win/' }
        ]
      },
      { t: 'h', text: 'Still breaks' },
      { t: 'p', text: 'Handoff context. Templates are not a definition of done.' },
      { t: 'h', text: 'Close' },
      {
        t: 'p',
        text: 'Aug 21 was the org chart. This is the control plane bolted on after living in it. Lab notebook. Not a guru post.'
      }
    ]
  },
  {
    slug: 'citebench-research-desk-to-chamber',
    date: '2026-09-01',
    label: '01 Sep 2026',
    title: 'I Started With a Legal Research Desk. It Turned Into a Chamber.',
    dek: 'It began as an attempt to build a better legal research experience. Somewhere along the way, it became an attempt to build the place where the research belongs.',
    xUrl: 'https://x.com/vin8003/status/2094851837673578977',
    cover: {
      src: 'https://pbs.twimg.com/media/HRJnSE1acAAbtA_?format=jpg&name=large',
      alt: 'Cover image for “I Started With a Legal Research Desk. It Turned Into a Chamber.”.'
    },
    body: [
      { t: 'p', text: 'I started building CiteBench because legal research felt unnecessarily fragmented.' },
      {
        t: 'p',
        text: 'You have a legal question, you have the facts, and you need to find the law. That sounds simple until you actually do it. You move between case-law databases, judgments, PDFs, notes and browser tabs. You find a promising authority, then another. You try to work out whether the case actually says what you think it says. You copy citations somewhere. Then, when the research is finally done, you leave the research tool and go back to the actual matter — where the hearing, the previous order, the documents, the deadlines and the next piece of work are all sitting somewhere else.'
      },
      { t: 'p', text: 'The first version of CiteBench was built to make that research process better.' },
      { t: 'p', text: 'Then I started thinking about what happens before and after the research.' },
      { t: 'p', text: 'That changed the product completely.' },
      { t: 'hr' },
      { t: 'p', text: 'Imagine sitting down at your chamber in the morning.' },
      { t: 'p', text: "You open CiteBench and the first thing you see isn't a conversation with an AI." },
      { t: 'p', text: "It's your day." },
      {
        t: 'p',
        text: "There is a hearing today. Another matter has a deadline coming up. There is an order that came in yesterday but hasn't been confirmed yet. Somewhere lower down is a matter that hasn't had any activity for a while."
      },
      { t: 'p', text: "Nothing here is particularly magical. That's the point." },
      { t: 'p', text: "A lawyer's day begins with work that already exists." },
      {
        t: 'p',
        text: 'So CiteBench starts there — with the diary, the matters, the orders, the tasks and the deadlines — and puts the AI inside that workflow rather than making the lawyer leave it every time they need help.'
      },
      { t: 'p', text: 'You open the matter for the hearing.' },
      { t: 'p', text: 'And this is where the idea of a “research tool” starts to fall apart.' },
      { t: 'hr' },
      { t: 'p', text: 'The matter is not just a folder containing a few PDFs.' },
      { t: 'p', text: 'It is the working history of the case.' },
      {
        t: 'p',
        text: 'The parties are there. The court and case number are there. The CNR is there. You can see the stage the proceeding is currently at, previous hearings and what happened at them, documents and papers, orders, tasks, deadlines and the timeline of the matter.'
      },
      {
        t: 'p',
        text: "If you've already researched something for that case, the research is there too. If you've generated a draft from that research, it can become part of the papers. If there is a task that needs attention, it belongs to the same file."
      },
      { t: 'p', text: 'The more you use it, the less the case exists as a collection of disconnected pieces.' },
      {
        t: 'p',
        text: "And because proceedings don't all work the same way, CiteBench also understands the broad shape of different kinds of matters — civil, commercial, criminal, writ, appellate, family, consumer, arbitration, execution and others. It can tell you what stage the file is at, what that stage generally involves and what kinds of work normally surround it."
      },
      { t: 'p', text: "But it doesn't move the case for you." },
      { t: 'p', text: "That remains the lawyer's decision." },
      { t: 'p', text: 'That principle becomes much more important when the system starts reading orders.' },
      { t: 'hr' },
      { t: 'p', text: "Suppose yesterday's hearing produced an order." },
      { t: 'p', text: 'You paste it into the Inbox.' },
      { t: 'p', text: 'Maybe you upload the PDF instead.' },
      {
        t: 'p',
        text: 'CiteBench reads it and gives you a structured interpretation. It identifies what it believes the court actually directed, extracts a next hearing date when there is one, and may suggest things that need to be done as a consequence.'
      },
      { t: 'p', text: 'But there is a line between those two things.' },
      { t: 'p', text: 'The court may have directed something.' },
      { t: 'p', text: 'CiteBench may suggest something.' },
      { t: 'p', text: 'Those are not interchangeable.' },
      { t: 'p', text: "So the order doesn't immediately rewrite the chamber. It waits for you." },
      {
        t: 'p',
        text: 'You read the extraction against the actual order. You confirm it. Only then can the confirmed directions create court-origin tasks or deadlines and update the relevant parts of the matter.'
      },
      { t: 'p', text: 'The suggestions remain suggestions.' },
      {
        t: 'p',
        text: 'This is one of those details that seems small until you think about what the software is actually being trusted with. If an AI system says, “You should prepare a reply,” that is useful. If it silently turns that into “The court directed you to file a reply,” it has crossed an entirely different line.'
      },
      { t: 'p', text: 'CiteBench is designed to keep that line visible.' },
      { t: 'hr' },
      { t: 'p', text: 'Now imagine that the order raises a legal question.' },
      {
        t: 'p',
        text: "Perhaps the next hearing is approaching and you need to know whether a particular argument is sustainable. Perhaps the opposing side has taken a position you haven't dealt with before. Perhaps you simply need to understand how the courts have treated a particular set of facts."
      },
      { t: 'p', text: 'You open Research.' },
      { t: 'p', text: 'This is still the heart of where CiteBench began.' },
      {
        t: 'p',
        text: "You give it the facts, the legal question, the forum, the practice area and the side you're working for. You can attach the relevant papers. If you're already inside a matter, much of that context can come from the file itself."
      },
      { t: 'p', text: 'Then the research begins.' },
      {
        t: 'p',
        text: "What comes back isn't intended to be another chat response that disappears when you close the tab. It becomes a structured research memo: the issues, statutes and doctrines, relevant precedents, arguments on both sides, counters, strategy and risks, along with the underlying sources."
      },
      { t: 'p', text: 'And this is where one of the most important design decisions in CiteBench shows up.' },
      { t: 'p', text: "The system doesn't simply believe a model when it says, “This case is verified.”" },
      {
        t: 'p',
        text: 'Legal research has a particularly nasty failure mode: an AI can produce a completely plausible case name, citation and proposition that never existed.'
      },
      {
        t: 'p',
        text: "So CiteBench's research process uses a defined set of legal sources and actually retrieves the authorities. The application then stamps the precedents based on what was retrieved rather than blindly accepting the model's own verification flag."
      },
      { t: 'p', text: "It doesn't mean a lawyer should stop checking the original judgment." },
      { t: 'p', text: 'Quite the opposite.' },
      {
        t: 'p',
        text: 'It means the system tries to make a useful distinction between an authority the model happened to mention and an authority the research process actually retrieved.'
      },
      { t: 'p', text: 'That distinction follows the work forward.' },
      { t: 'hr' },
      { t: 'p', text: "Because when you read the research memo, you usually aren't finished." },
      { t: 'p', text: 'You find another question.' },
      {
        t: 'p',
        text: 'Maybe you want to test the opposing argument. Maybe one fact changes the position. Maybe you want to understand what happens if a particular objection succeeds.'
      },
      { t: 'p', text: 'So you ask a follow-up.' },
      {
        t: 'p',
        text: "CiteBench doesn't throw away the original research and start again. The new research stays connected to the original memo, giving the case a growing research trail rather than a collection of unrelated conversations."
      },
      { t: 'p', text: 'Eventually, though, research has to become something more concrete.' },
      { t: 'p', text: 'You need to send a notice.' },
      { t: 'p', text: 'Prepare a reply.' },
      { t: 'p', text: 'Draft a petition.' },
      { t: 'p', text: 'Write a written statement.' },
      { t: 'p', text: 'Now the research can become a draft.' },
      {
        t: 'p',
        text: "And again, the system deliberately doesn't start searching the internet all over again at the drafting stage. The draft uses the authorities that have already passed through the research process."
      },
      { t: 'p', text: 'The sequence matters:' },
      { t: 'p', text: 'research, retrieve, verify, then draft.' },
      { t: 'p', text: 'The idea is not to make the AI sound authoritative.' },
      { t: 'p', text: 'It is to make the path from a question to usable work more controlled.' },
      { t: 'hr' },
      { t: 'p', text: "But there is another kind of work that doesn't require research at all." },
      { t: 'p', text: 'Imagine that the morning dashboard is still showing a task:' },
      { t: 'p', text: 'Prepare written statement.' },
      { t: 'p', text: 'You open it.' },
      {
        t: 'p',
        text: 'CiteBench can prepare a draft using the matter itself — the papers, notes, parties and orders already sitting in the file.'
      },
      { t: 'p', text: 'No new web search is necessary.' },
      { t: 'p', text: 'The system already has the context.' },
      {
        t: 'p',
        text: "And that reveals something I hadn't fully appreciated when I started building the original research desk."
      },
      { t: 'p', text: 'There are really two kinds of assistance happening here.' },
      { t: 'p', text: 'Sometimes the lawyer asks:' },
      { t: 'p', text: '“What does the law say about this?”' },
      { t: 'p', text: "That's research." },
      { t: 'p', text: 'Other times the lawyer is asking:' },
      { t: 'p', text: '“Given everything that has happened in this matter, what can I do next?”' },
      { t: 'p', text: "That's the chamber." },
      {
        t: 'p',
        text: 'The second question is much harder to answer well if the software knows nothing about the first.'
      },
      { t: 'hr' },
      { t: 'p', text: 'Then the hearing approaches.' },
      {
        t: 'p',
        text: 'Instead of opening five documents and trying to remember what happened last time, you can ask CiteBench to prepare a hearing brief from the matter.'
      },
      {
        t: 'p',
        text: 'It can bring together the last hearing, the last confirmed order, open tasks and deadlines, the current stage, the positions and issues, the relevant papers and authorities already associated with the file.'
      },
      { t: 'p', text: "Again, it isn't pretending to be a lawyer." },
      { t: 'p', text: "It's doing something much more mundane and, hopefully, much more useful:" },
      { t: 'p', text: 'turning the accumulated context of the matter back into something you can work with.' },
      { t: 'p', text: 'And this is where the pieces begin to form a loop.' },
      { t: 'p', text: 'The hearing produces an order.' },
      { t: 'p', text: 'The order produces work.' },
      { t: 'p', text: 'The work may require research.' },
      { t: 'p', text: 'The research may produce a draft.' },
      { t: 'p', text: 'The draft belongs to the matter.' },
      { t: 'p', text: 'The matter needs to be prepared for the next hearing.' },
      { t: 'p', text: 'And the next morning, all of that is waiting on the same desk.' },
      { t: 'hr' },
      { t: 'p', text: 'That loop is what CiteBench has become.' },
      { t: 'p', text: 'Not because any one of those features is revolutionary.' },
      { t: 'p', text: "A diary isn't revolutionary." },
      { t: 'p', text: "A case file isn't revolutionary." },
      { t: 'p', text: "A task list isn't revolutionary." },
      { t: 'p', text: "A research assistant isn't revolutionary." },
      { t: 'p', text: "A document drafter isn't revolutionary." },
      { t: 'p', text: 'The interesting part is what happens when they share the same context.' },
      { t: 'p', text: 'The diary knows there is a hearing.' },
      { t: 'p', text: 'The matter knows which case it belongs to.' },
      { t: 'p', text: 'The order knows what the court said.' },
      { t: 'p', text: 'The task knows why it exists.' },
      { t: 'p', text: 'The research knows which facts it was investigating.' },
      { t: 'p', text: 'The citations have a retrieval trail.' },
      { t: 'p', text: 'The draft knows which matter it belongs to.' },
      {
        t: 'p',
        text: "And the lawyer doesn't have to keep rebuilding that context every time they move from one piece of work to another."
      },
      { t: 'hr' },
      {
        t: 'p',
        text: "That is also why I don't think of CiteBench as an AI that should eventually “do the lawyer's job”."
      },
      { t: 'p', text: "That isn't the interesting future." },
      {
        t: 'p',
        text: 'The interesting future is a system that becomes increasingly useful simply because it has been present throughout the life of the matter.'
      },
      {
        t: 'p',
        text: "A system that can notice that tomorrow's hearing is approaching, understand that the last order created an unresolved task, know that the task may require a filing, know that the relevant research was already done, and bring those pieces together when the lawyer sits down to work."
      },
      { t: 'p', text: 'Not making the decision.' },
      { t: 'p', text: 'Not pretending to be counsel.' },
      { t: 'p', text: 'Just reducing the amount of context the lawyer has to carry in their head.' },
      {
        t: 'p',
        text: 'The closer the software gets to understanding the whole working life of a matter, the less it needs to behave like a chatbot.'
      },
      { t: 'p', text: 'It can behave more like the desk itself.' },
      { t: 'hr' },
      { t: 'p', text: "That's ultimately what CiteBench is now." },
      { t: 'p', text: 'It began as an attempt to build a better legal research experience.' },
      {
        t: 'p',
        text: 'Somewhere along the way, it became an attempt to build the place where the research belongs.'
      },
      {
        t: 'p',
        text: "A chamber where the day's work, the case file, the court's orders, the legal research and the next piece of work can live together."
      },
      { t: 'p', text: 'It is still very much a work in progress.' },
      { t: 'p', text: "And that is why I'm putting it in front of people now." },
      {
        t: 'p',
        text: 'There is a sample chamber you can explore without starting the trial, but a demo can only tell me so much.'
      },
      { t: 'p', text: 'What I really want is for lawyers to bring an actual problem to it.' },
      { t: 'p', text: 'Take an actual matter.' },
      { t: 'p', text: 'Try the research.' },
      { t: 'p', text: 'Put an order through the Inbox.' },
      { t: 'p', text: 'See whether the case file makes sense.' },
      { t: 'p', text: 'Try preparing for the next hearing.' },
      { t: 'p', text: 'And then tell me where the experience breaks down.' },
      { t: 'p', text: "Because at this stage, I don't need more people telling me that the idea sounds good." },
      { t: 'p', text: 'I need lawyers to use it.' },
      {
        t: 'p',
        text: 'CiteBench is live:\nhttps://citebench.ordereasy.win',
        links: [ { text: 'https://citebench.ordereasy.win', href: 'https://citebench.ordereasy.win/' } ]
      },
      {
        t: 'p',
        text: 'Not legal advice. Dates, directions and citations should always be verified against the original court record before being relied upon.'
      }
    ]
  },
  {
    slug: 'citebench-chamber-not-chatbot',
    date: '2026-08-31',
    label: '31 Aug 2026',
    title: 'I Built a Chamber for Advocates Instead of a Legal Chatbot',
    dek: "I don't want an AI that answers legal questions. I want a chamber that runs practice.",
    xUrl: 'https://x.com/vin8003/status/2094134310974701979',
    cover: {
      src: 'https://pbs.twimg.com/media/HQ_b4LCa4AAmZLu?format=jpg&name=large',
      alt: 'Cover image for “I Built a Chamber for Advocates Instead of a Legal Chatbot”.'
    },
    body: [
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_bef_a0AAg4f0?format=jpg&name=large',
        alt: 'Image from “I Built a Chamber for Advocates Instead of a Legal Chatbot”, from the original X article.'
      },
      {
        t: 'quote',
        text: "I don't want an AI that answers legal questions. I want a chamber that runs practice."
      },
      { t: 'p', text: 'By Vineet · 31 August 2026' },
      {
        t: 'p',
        text: 'CiteBench is a practice assistant for Indian advocates. English and Hindi. Not legal advice.'
      },
      { t: 'p', text: 'The two-day log is already up.' },
      {
        t: 'p',
        text: '→ From a research desk to a chamber — in less than a day',
        links: [
          {
            text: 'From a research desk to a chamber — in less than a day',
            href: '/writing/citebench-in-less-than-a-day/'
          }
        ]
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_bgYCbQAAiH_5?format=jpg&name=large',
        alt: 'Image from “I Built a Chamber for Advocates Instead of a Legal Chatbot” (2), from the original X article.'
      },
      { t: 'h', text: '1. The problem' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_bhHcbEAAwUua?format=jpg&name=large',
        alt: 'Image from “1. The problem”, from the original X article.'
      },
      {
        t: 'p',
        text: 'For a while every legal-AI demo was the same product. A chat box. A confident paragraph. A citation you were supposed to trust.'
      },
      {
        t: 'p',
        text: 'A working advocate does not live in that box. They live in listings, files, orders, and the authorities that actually exist.'
      },
      { t: 'p', text: 'The model was fine. The loop was the product.' },
      { t: 'quote', text: "A chatbot isn't a chamber. It's one very confident intern." },
      { t: 'h', text: '2. What I shipped instead' },
      { t: 'p', text: 'After sign-in there are five surfaces: Today, Diary, Matters, Research, Inbox.' },
      {
        t: 'p',
        text: 'Sample chamber is free. It does not start a trial. A 30-day trial starts when you run this on your own matter.'
      },
      { t: 'p', text: 'The product is CiteBench. Not NyayaSetu.' },
      { t: 'quote', text: 'Work lives on the matter. Not in a chat you cannot find next week.' },
      { t: 'h', text: '3. Today and the diary' },
      {
        t: 'p',
        text: 'Today is the morning list. Hearings, listings, deadlines, open tasks, unconfirmed orders, stale matters.'
      },
      { t: 'p', text: 'It is not a feed. It is what needs a human today.' },
      {
        t: 'p',
        text: 'Diary is court diary. Listings in order, tied to the matter. The date exists because the matter exists.'
      },
      { t: 'quote', text: 'Not a calendar startup. A diary.' },
      { t: 'h', text: '4. The file' },
      { t: 'p', text: 'Matters is the file. Parties, stage, hearings, documents, timeline, a hearing brief.' },
      { t: 'p', text: "If it isn't on the matter, it isn't in the chamber." },
      { t: 'quote', text: 'The unit is the matter. Everything else hangs off it.' },
      { t: 'h', text: '5. Research and the citation gate' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_bjazaIAAVE00?format=jpg&name=large',
        alt: 'Image from “5. Research and the citation gate”, from the original X article.'
      },
      { t: 'p', text: 'Paste facts, Hindi or English. Or upload a FIR or an order. You get a memo.' },
      { t: 'p', text: 'From the memo you can pull a notice, a reply, or a petition.' },
      { t: 'p', text: 'The desk searches an allowlist: Indian Kanoon, LiveLaw, CaseMine, eSCR, SCI.' },
      {
        t: 'p',
        text: 'A cite is marked verified only if the URL was actually retrieved and the host is on that list. Unverified stays unverified. You still open the judgment.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_blA4aYAEoPH-?format=jpg&name=large',
        alt: 'Image from “5. Research and the citation gate” (2), from the original X article.'
      },
      { t: 'p', text: 'This is allowlisted web search. It is not scraping. It is not "court-verified HTML."' },
      { t: 'quote', text: 'Verified means retrieved. Nothing else.' },
      { t: 'h', text: '6. Inbox' },
      { t: 'p', text: 'Paste or upload an order. The model extracts directions.' },
      {
        t: 'p',
        text: 'You confirm before the chamber updates. A suggestion is not a court direction until you say so.'
      },
      { t: 'quote', text: 'The agent that reads the order is not the agent that updates the file. You are.' },
      { t: 'h', text: '7. What you can try today' },
      {
        t: 'p',
        text: 'https://citebench.ordereasy.win',
        links: [ { text: 'https://citebench.ordereasy.win', href: 'https://citebench.ordereasy.win/' } ]
      },
      {
        t: 'p',
        text: 'Not legal advice. Verify every date, direction, and citation on the original record before you file.'
      },
      { t: 'p', text: 'If you try it: tell me what you would not trust, and what you want on the file next.' },
      { t: 'quote', text: 'Try the chamber. Tell me what you would not trust.' },
      { t: 'h', text: '8. Where this is going' },
      { t: 'p', text: 'This section is vision. It is not what you will click today.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_bmlgbkAIIoA0?format=jpg&name=large',
        alt: 'Image from “8. Where this is going”, from the original X article.'
      },
      {
        t: 'p',
        text: 'I am not building an AI that answers legal questions. I am not building a search engine with a chatbot on top. I am not building a CRM.'
      },
      {
        t: 'p',
        text: "I want a lawyer's personal assistant: what happened, what is happening, what is next, what the court directed, what you are waiting on."
      },
      { t: 'p', text: 'AI sits in that workflow. The advocate stays the decision-maker.' },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_boWTbIAA9b44?format=jpg&name=large',
        alt: 'Image from “8. Where this is going” (2), from the original X article.'
      },
      {
        t: 'p',
        text: 'When it actually exists: an order arrives, directions come out, you confirm, the file updates. Before a hearing, a brief. After a hearing, what changed. A deadline that does not pretend a guess is a court date.'
      },
      {
        t: 'img',
        src: 'https://pbs.twimg.com/media/HQ_boWRbQAASYB3?format=jpg&name=large',
        alt: 'Image from “8. Where this is going” (3), from the original X article.'
      },
      {
        t: 'p',
        text: 'Every AI line should say what it is: court direction, extracted fact, suggestion, your decision.'
      },
      { t: 'p', text: 'Never turn an allegation into a fact. Never turn a suggestion into an order.' },
      { t: 'p', text: 'I will not ship "it files on eCourts."' },
      {
        t: 'quote',
        text: "I don't want an AI that answers legal questions. I want a chamber that runs practice."
      }
    ]
  },
  {
    slug: 'citebench-in-less-than-a-day',
    date: '2026-08-30',
    label: '30 Aug 2026',
    title: 'From a research desk to a chamber — in less than a day',
    dek: '29–30 August 2026. First commit to a live CiteBench chamber: under sixteen hours.',
    xUrl: 'https://x.com/vin8003/status/2093979855113363509',
    body: [
      { t: 'p', text: '29–30 August 2026. First commit to a live CiteBench chamber: under sixteen hours.' },
      {
        t: 'p',
        text: 'This is not a launch manifesto. It is a record of what shipped, in order, so a tweet does not have to lie.'
      },
      {
        t: 'p',
        text: 'Yesterday evening CiteBench (then still named NyayaSetu) did one job well: an advocate pasted facts, picked a forum and a side, and got a research memo — issues, doctrines, arguments both ways, Hindi or English.'
      },
      {
        t: 'p',
        text: 'That was the whole product. A desk. Sign in with Google, X, or a password. Search Indian Kanoon, LiveLaw, CaseMine, eSCR, and the Supreme Court site. Not legal advice. Verify the cites yourself.'
      },
      {
        t: 'p',
        text: 'The gap was obvious the moment the memo landed. A working lawyer does not live in a research pane. They live in what is listed tomorrow, what the last order actually said, and whether the case on the page is real.'
      },
      { t: 'p', text: 'So we kept building.' },
      { t: 'h', text: 'What “verified” means here' },
      { t: 'p', text: 'The first merge was not a new screen. It was a gate.' },
      {
        t: 'p',
        text: 'A precedent is verified only if its http(s) URL was actually retrieved, and only if the host is on a short allowlist. The model’s own verified: true is overwritten. javascript: links die. Invented names are stripped out of a draft before it hits the screen.'
      },
      {
        t: 'p',
        text: 'Court drafts — notice, reply, petition — do not search the web at all. They may cite only what the memo already proved. A legal proposition with no case is kept; a fake Invented v. Case is not.'
      },
      { t: 'p', text: 'That rule is the product. The chamber is furniture around it.' },
      { t: 'h', text: 'What exists this morning' },
      {
        t: 'table',
        head: [ 'Last night', 'This morning' ],
        rows: [
          [ 'Paste facts → memo', 'Same desk, plus Notice / Reply / Petition from that memo' ],
          [ 'Citations the model claimed', 'Citations the search actually retrieved' ],
          [ 'One research page', 'Today, Diary, Matters, Research, Inbox' ],
          [ '—', 'Paste an order; AI extracts directions; you confirm before the diary moves' ],
          [ '—', 'Court directions and CiteBench suggestions stay different colours' ],
          [ '—', 'Three-matter sample chamber, free, does not start the trial' ],
          [ '—', '30 days on your own work, then ₹500 / month (card not live yet)' ],
          [ 'NyayaSetu', 'CiteBench' ]
        ]
      },
      {
        t: 'p',
        text: 'The sample file is a Delhi commercial recovery, a bail, and a Rajasthan writ. Load it, click around, throw it away. Your own research is what starts the clock.'
      },
      { t: 'h', text: 'What we did not ship' },
      {
        t: 'list',
        items: [
          'A bot that files on eCourts',
          'Cites “verified” by fetching Indian Kanoon HTML',
          'Mixing “you should apply for X” into “the court directed X”',
          'Saving notice/reply/petition into the database (still a first-cut on screen)',
          'Charging a card'
        ]
      },
      {
        t: 'p',
        text: 'Written statement from the memo is on a branch. It is not on main yet, so it is not in this story.'
      },
      { t: 'h', text: 'Why speed is the wrong headline' },
      {
        t: 'p',
        text: 'Sixteen hours is a curiosity. The useful sentence is: the memo, the listing, and the order now sit in one place, and the software refuses to flatter a fake judgment.'
      },
      {
        t: 'p',
        text: 'If you are an advocate: sign in, load the sample, then try your own facts. Check every date and every URL on the original record before you file.'
      },
      {
        t: 'p',
        text: 'If you are a builder: the interesting file is not the hero copy. It is stampPrecedents.'
      },
      { t: 'p', text: 'Not legal advice. Never was.' },
      { t: 'p', text: '— CiteBench, 30 August 2026' }
    ]
  },
  {
    slug: 'ai-engineering-organization',
    date: '2026-08-21',
    label: '21 Aug 2026',
    title: 'I Built an AI Engineering Organization Instead of an AI Coding Assistant',
    dek: "I don't want an AI that can code. I want an organization of AIs that can ship software.",
    xUrl: 'https://x.com/vin8003/status/2090789284907532363',
    body: [
      {
        t: 'quote',
        text: "I don't want an AI that can code. I want an organization of AIs that can ship software."
      },
      { t: 'p', text: 'By Vineet · August 21, 2026' },
      {
        t: 'p',
        text: "Scope of this piece: This operating model is one slice of the AI company I'm building — specifically the coding / tech lane. That is, honestly, most of what I do day to day, so it's the first and densest part of the org. It is not the whole company. Voice, Ops, Scout, Growth, and the rest of the desk sit alongside this lane; this article zooms into how engineering ships."
      },
      { t: 'h', text: 'TL;DR' },
      {
        t: 'list',
        items: [
          'I stopped using AI as a coding assistant and gave it an org chart.',
          'One inbox — CEO — turns outcomes into objectives and filters what reaches me.',
          'CTO owns engineering: Builder, Reviewer, QA, DevOps.',
          'Builder never patches in chat. It writes a five-part handoff and launches a Cursor Cloud Agent.',
          'The agent implements, tests, and opens a PR — the trust boundary.',
          'Tools are swappable. The operating model is the point.'
        ]
      },
      { t: 'h', text: '1. The problem' },
      { t: 'p', text: 'For a while my evenings looked like this.' },
      {
        t: 'p',
        text: `I'd open a chat. Paste a stack trace. Ask for a fix. Get a patch. Paste the patch somewhere else. Watch tests fail. Paste the failure back. Ask again. Reviewer-brain on, then implementer-brain on, then "why is Postgres not up" brain on.`
      },
      { t: 'p', text: 'The model was fine. The loop was the product.' },
      {
        t: 'p',
        text: 'Most "AI coding" still puts the human in the middle of every hop: research, implement, test, review, fix, deploy. The model can write code. The human becomes the orchestration layer — a tired air-traffic controller for tokens.'
      },
      { t: 'p', text: 'That is the bottleneck I wanted to delete.' },
      { t: 'p', text: 'Not "make the model smarter."' },
      { t: 'p', text: 'Make me stop being the middleware.' },
      {
        t: 'p',
        text: `Illustrative night (composite). A barcode remap bug on a retailer dashboard. Old workflow: I explain it three times to the same chat — once for diagnosis, once for a patch, once because the patch assumed a cache layer that doesn't exist. By midnight I've "used AI" and somehow still done the project management myself.`
      },
      { t: 'quote', text: "The insight wasn't more prompts. It was an org chart." },
      { t: 'h', text: "2. Why one agent isn't enough" },
      {
        t: 'p',
        text: "One agent owning requirements, architecture, implementation, testing, review, and deployment isn't an engineering organization."
      },
      { t: 'quote', text: "It's one very enthusiastic intern." },
      {
        t: 'p',
        text: 'I tried the single-agent fantasy first. Same persona that wrote the speculative fix also "reviewed" it. Same persona that missed the edge case also "wrote the regression test" in the same breath. Surprise: it graded its own homework generously.'
      },
      { t: 'p', text: "Specialization isn't bureaucracy. It's how you keep autonomous systems honest." },
      { t: 'p', text: 'Authority boundaries matter the same way they matter in a real company:' },
      {
        t: 'list',
        items: [
          'Who is allowed to change product direction?',
          'Who is allowed to open a PR?',
          'Who is allowed to say "this diff is wrong"?',
          'Who is allowed to touch production?',
          'Who is allowed to interrupt the human?'
        ]
      },
      { t: 'p', text: `If the answer to all of those is "the same chat," you don't have an AI company.` },
      { t: 'quote', text: 'You have a very fast notepad.' },
      { t: 'h', text: '3. The organizational model' },
      {
        t: 'p',
        text: "This section is the engineering org chart inside a larger desk — the coding/tech slice first, because that's where most of my time goes."
      },
      { t: 'p', text: 'The path I run now (DESK FACT, CTO layer)' },
      {
        t: 'p',
        text: 'You → CEO → CTO → Builder / Reviewer / QA / DevOps → Cursor Cloud Agent → GitHub PR → CTO → CEO → (maybe) You'
      },
      { t: 'p', text: 'Read it slowly.' },
      { t: 'p', text: 'I talk to one inbox: CEO.' },
      { t: 'p', text: 'CEO does not manage engineers. CTO does.' },
      { t: 'p', text: 'CTO does not write the patch in chat. Builder launches a Cloud Agent.' },
      { t: 'p', text: 'The Cloud Agent does not silently mutate main. It opens a PR.' },
      { t: 'p', text: 'Reviewer does not "also just fix it." QA does not "just SSH into prod."' },
      { t: 'p', text: 'And CEO decides whether any of that noise is worth my attention.' },
      { t: 'quote', text: "This is not cosplay. It's an interface design for attention." },
      { t: 'h', text: '4. CEO vs CTO' },
      { t: 'p', text: 'CEO — the attention filter' },
      {
        t: 'p',
        text: "CEO turns my outcome into an objective. Never writes implementation. Hands engineering to CTO. Only surfaces me when it's worth my time — or to update me."
      },
      {
        t: 'p',
        text: `Illustrative scene. I send one line from my phone: "Retailer search still shows old SKU after barcode remap. Local dummy only. Don't touch prod."`
      },
      {
        t: 'p',
        text: 'CEO does not open the repo. CEO writes an objective — restore correct SKU resolution after remap across dashboard search, flag the scanner contract if needed, local dummy, PR with tests — then pings CTO.'
      },
      { t: 'p', text: 'CTO — engineering ownership' },
      {
        t: 'p',
        text: 'CTO owns architecture calls, build-vs-buy, what to ship next, Builder dispatch, review, QA, DevOps. Reports engineering outcome back to CEO. Never chat-patches.'
      },
      {
        t: 'p',
        text: 'Illustrative scene. CTO decides this is an API/catalog freshness problem until proven otherwise, not a Flutter rewrite. Builder gets a scoped handoff. Reviewer is lined up for the PR. QA gets a repro checklist. DevOps is only involved if the shared agent environment is broken.'
      },
      {
        t: 'quote',
        text: 'You manage outcomes. CEO manages attention. CTO manages engineering. Cursor manages implementation.'
      },
      {
        t: 'p',
        text: 'The early mistake on the desk was skipping CTO — CEO going straight to Builder. That made CEO the engineering bottleneck the moment two tasks ran at once. The CTO layer fixed that. (DESK FACT: model updated 21 Aug 2026.)'
      },
      { t: 'h', text: '5. The engineering lanes' },
      { t: 'p', text: 'Under CTO, lanes stay narrow on purpose.' },
      {
        t: 'table',
        head: [ 'Lane', 'Owns', 'Never' ],
        rows: [
          [
            'Builder',
            'Writes the Cloud Agent handoff: repo, problem, repro, constraints, done-when. Launches the agent.',
            'Patches in chat. Clones a repo "for a quick look."'
          ],
          [
            'Reviewer',
            'Reads the PR diff: wrong vs nit, security, correctness. Reports a verdict to CTO.',
            'Writes the fix.'
          ],
          [
            'QA',
            'Test plans, repro steps, edge cases. Local dummy only.',
            'Touches retailer.ordereasy.win, customer.ordereasy.win, or api.ordereasy.win.'
          ],
          [
            'DevOps',
            "Environments, CI, infra under CTO — e.g. shared Cloud Agent snapshots so the next PR doesn't start from zero.",
            'Improvises production changes to unblock a run.'
          ]
        ]
      },
      { t: 'quote', text: 'The agent that finds the bug is not the agent that ships the patch.' },
      {
        t: 'p',
        text: 'Illustrative collision (composite). Builder wants to "just add a Redis cache" in the prompt. CTO kills it — constraints say use existing etag/updatedAt if present. Reviewer later flags a drive-by refactor in an unrelated file. QA fails the PR because dashboard search still returns SKU A after remap. Nobody asks me to "take a quick look at the log." The loop absorbs it.'
      },
      { t: 'h', text: '6. The execution layer' },
      { t: 'p', text: 'Judgment stays on the desk (Grok-side agents).' },
      {
        t: 'p',
        text: 'Expensive work — clone, patch, test, PR — goes to Cursor Cloud Agents on isolated VMs. (CONFIRMED product behavior: Cloud Agents clone your repo, work on a branch, push for handoff.)'
      },
      { t: 'p', text: 'What this desk deliberately does not do' },
      {
        t: 'list',
        items: [
          'Paste a patch into chat and call it shipping',
          'Clone vin8003/* onto the Grok box',
          "Pretend there's an MCP bridge into an already-open local Composer",
          'Stick a VPS in the middle "because agents"'
        ]
      },
      {
        t: 'p',
        text: 'GitHub is already connected to Cursor. The product is the Cloud Agent. The desk launches it.'
      },
      {
        t: 'p',
        text: `Illustrative contrast. Old me: "here's a 40-line diff, apply it." New Builder: "here's a problem statement an agent can finish without asking follow-ups," because once a Cloud Agent starts, it can't interview you mid-flight. A complete prompt is cheaper than a second run.`
      },
      { t: 'h', text: '7. Why PRs are the trust boundary' },
      { t: 'p', text: 'Agents may execute autonomously. They do not get to silently change the product.' },
      {
        t: 'p',
        text: 'The PR is the trust boundary — the place where Reviewer and QA meet the work, where CTO can reject a lane, where I can still say no without living inside the implementation loop.'
      },
      { t: 'quote', text: 'Without PRs, "autonomy" is just unreviewed mutation with better marketing.' },
      {
        t: 'p',
        text: `Illustrative near-miss (composite). An agent "fixes" stale search by hardcoding a SKU map for the demo barcode. Tests pass on that one barcode. Reviewer catches it as a fake fix. PR closed. Another Cloud Agent run with a tighter done-when: regression must cover remap → search sees new SKU, no hardcoded map. That's the system working — not a scandal.`
      },
      { t: 'h', text: '8. The five-part handoff' },
      {
        t: 'p',
        text: `This is the load-bearing skill. I don't tell the coding agent "change line 84." I give it a contract:`
      },
      {
        t: 'code',
        text: 'Repo: vin8003/<repo>\n' +
          'Problem:\n' +
          'Repro:\n' +
          'Constraints:\n' +
          'Done when:\n' +
          'Deliverable: Implement, test, and open a PR. Do not merely explain the solution.'
      },
      {
        t: 'p',
        text: "Give the agent the problem, not the patch. A hypothesis is allowed only if it's labeled optional and non-binding."
      },
      {
        t: 'quote',
        text: "Otherwise you're not delegating engineering. You're remote-controlling an autocomplete."
      },
      { t: 'p', text: 'Worked example — OrderEasy-shaped (shape, not a live ticket)' },
      {
        t: 'code',
        text: 'Repo: vin8003/retailer_ordereasy_njs\n' +
          'Problem:\n' +
          'Retailer catalog search on the Next.js retailer dashboard returns stale SKUs after a barcode remap. A shopkeeper scans an item remapped this morning; dashboard search still shows the old SKU and the Flutter scanner may write the old code into the cart.\n' +
          'Repro:\n' +
          '1. Local dummy retailer only: create SKU A with barcode 8901234567890.\n' +
          '2. Remap that barcode to SKU B in catalog admin.\n' +
          '3. Hard-refresh dashboard. Search 8901234567890.\n' +
          '4. Scan the same barcode on the debug scanner APK.\n' +
          'Expected: both surfaces resolve SKU B.\n' +
          'Actual: dashboard still lists SKU A; scanner cart line uses SKU A.\n' +
          'Constraints:\n' +
          '- Local dummy only. Do not touch production hosts.\n' +
          '- Do not invent a cache layer if etag/updatedAt already exists.\n' +
          '- Scanner repo is separate; if fix is API-side, say so and keep scanner out of this PR.\n' +
          '- Hypothesis (non-binding): client memoized catalog snapshot ignoring updatedAt.\n' +
          'Done when:\n' +
          '- Dummy repro returns SKU B on dashboard search; scanner fixture if API contract changes.\n' +
          '- Regression test: remap barcode → search/scan sees new SKU.\n' +
          '- PR against default branch with test output in the body.\n' +
          'Deliverable: Implement, test, and open a PR. Do not merely explain the solution.'
      },
      { t: 'quote', text: 'That block is the whole craft. Problem. Repro. Constraints. Done-when. PR.' },
      { t: 'h', text: '9. How failures move through the system' },
      { t: 'p', text: 'Autonomy without boundaries is useless.' },
      { t: 'quote', text: 'Design the system so failures have somewhere to go.' },
      { t: 'p', text: 'DESK FACT — environment agent (20 Aug 2026)' },
      { t: 'p', text: 'Cloud Agent "New development environment":' },
      {
        t: 'list',
        items: [
          'First verify failed: node_modules did not persist; Postgres did not auto-start.',
          'Instead of cloning four repos onto a laptop to "just get it working," the problem went back through the engineering loop.',
          'Restore + Postgres moved into the start script. Second verify: cold start brought stacks up (START_EXIT=0).',
          'Finished: snapshot proposed. No source PR. I still had to click Save.'
        ]
      },
      {
        t: 'quote',
        text: `The lesson wasn't "AI works." The lesson was that the failure had a path — Builder and Cloud Agent under CTO, not a chat-patch from CEO, not me SSHing at 1am.`
      },
      {
        t: 'p',
        text: `Illustrative product failure (composite). QA rejects a "fixed" search PR because remap works on hard refresh but fails after client navigation. CTO sends Builder a second run with a constraint: reproduce via SPA navigation, not only full reload. Reviewer checks the second diff for leftover first-attempt hacks. CEO only pings me if the second run still disagrees with the product call — "do we accept eventual consistency for N minutes?" That's a human decision. Rerunning tests is not.`
      },
      { t: 'h', text: '10. What the human still owns' },
      { t: 'p', text: 'If AI handles more execution, the human job is not nothing.' },
      { t: 'p', text: 'I still own' },
      {
        t: 'list',
        items: [
          "What we're building",
          "Why we're building it",
          'What matters',
          'Risk tolerance',
          'Product decisions',
          'Final approval',
          'Gates that are explicitly mine: Save environment, public posts, merge policy'
        ]
      },
      { t: 'p', text: "I'm deleting from my day" },
      {
        t: 'list',
        items: [
          '"Can you look at this log?"',
          '"Can you fix this small bug?"',
          '"Can you rerun this test?"',
          '"Can you update this file?"'
        ]
      },
      {
        t: 'p',
        text: 'Those belong in: You → CEO → CTO → engineering loop → Cloud Agent → PR → CTO → CEO → (only then) You if needed.'
      },
      {
        t: 'p',
        text: `Illustrative calendar (composite). Morning: one outcome message to CEO from Telegram. Afternoon: CEO update — "env snapshot ready, needs your Save" and "KAN pipe test still not merged." No 14-message thread about npm peer deps. That's the point of an attention filter.`
      },
      { t: 'h', text: "11. What I've learned so far" },
      {
        t: 'list',
        items: [
          'Skipping CTO was a mistake. CEO-as-eng-manager collapses under concurrency.',
          "Complete prompts beat clever one-liners. Cloud Agents don't interview you mid-run.",
          'Reviewer ≠ fixer. Same-agent self-review is theater.',
          'PRs are not ceremony. They are the trust boundary.',
          'Failures need a home. Otherwise "autonomy" becomes "human cleanup."',
          'Tools are implementation choices. Grok and Cursor are how I wire this desk today. The IP is organizational structure, interfaces, authority boundaries, and escalation paths.',
          "Don't make every post about the brands. If every sentence is SuperGrok + Ultra, it reads like an ad. The operating model is the story.",
          "Local dummy is a moral boundary, not a preference. QA and Cloud Agents don't get production hosts as a playground."
        ]
      },
      { t: 'h', text: '12. Where this goes next' },
      { t: 'p', text: "Open questions I'm still working through:" },
      {
        t: 'list',
        items: [
          'How much should CEO escalate vs absorb?',
          'When is human review of a PR mandatory vs optional?',
          'How do you keep the public series about the operating model, not the tool logos?',
          `What does "DevOps under CTO" look like when CI is red for reasons that aren't code?`
        ]
      },
      {
        t: 'p',
        text: "I'm building this in public as Building My AI Company — not because I think the wiring is finished, but because the interesting part is the org design under load."
      },
      {
        t: 'quote',
        text: "I don't want an AI that can code. I want an organization of AIs that can ship software."
      }
    ]
  }
];

/** Newest first. */
export const articles = [...entries].sort((a, b) => b.date.localeCompare(a.date));

/** Splits `text` into plain runs and linked runs, first match of each link wins. */
export const linkify = (text: string, links: InlineLink[] = []) => {
  const parts: { text: string; href?: string }[] = [];
  let rest = text;
  while (rest) {
    let best: { at: number; link: InlineLink } | undefined;
    for (const link of links) {
      const at = rest.indexOf(link.text);
      if (at >= 0 && (!best || at < best.at)) best = { at, link };
    }
    if (!best) {
      parts.push({ text: rest });
      break;
    }
    if (best.at > 0) parts.push({ text: rest.slice(0, best.at) });
    parts.push({ text: best.link.text, href: best.link.href });
    rest = rest.slice(best.at + best.link.text.length);
  }
  return parts;
};

export const articleHref = (a: Article) => `/writing/${a.slug}/`;

export const readingMinutes = (a: Article) => {
  const words = a.body
    .map((b) => (b.t === 'list' ? b.items.join(' ') : b.t === 'table' ? b.rows.flat().join(' ') : b.t === 'img' || b.t === 'hr' ? '' : b.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};
