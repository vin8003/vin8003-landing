/**
 * FIELD NOTES — longer write-ups from the build loop.
 *
 * Every number here is measured, not estimated. The agent-month figures were
 * pulled on 9 Oct 2026 from git history (all branches and PR refs, merge
 * commits excluded) and the GitHub API across the vin8003 repos, for 19 Aug to
 * 19 Sep 2026 in IST. The "three weeks later" figures come from Vineet's
 * Delivery Radar board on the same day.
 */

export const agentMonth = {
  slug: 'agent-month',
  href: '/notes/agent-month/',
  date: '2026-10-09',
  label: '09 Oct 2026',
  period: '19 Aug – 19 Sep 2026',
  title: 'One month of SuperGrok Heavy: 414 PRs, 92 merged',
  dek: 'One SuperGrok Heavy seat, a fleet of Cursor cloud agents, and what git says happened.',
  lesson: ['Writing code got cheap.', 'Reviewing it didn’t.'],
  source:
    'git log across all branches and PR refs (merge commits excluded) and the GitHub PR list, 19 Aug – 19 Sep 2026 IST, pulled 9 Oct 2026.',

  stats: [
    { value: '414', label: 'PRs opened', note: 'across 9 repos' },
    { value: '92', label: 'merged', note: 'as of 9 Oct' },
    { value: '1,144', label: 'commits', note: 'across 13 repos' },
    { value: '28/32', label: 'days with commits', note: 'IST' },
    { value: '208', label: 'PRs on 18 Sep', note: 'in a single day' },
    { value: '7', label: 'new repos', note: 'started in the month' },
  ],

  /** What happened to the 414 PRs, as of 9 Oct. */
  outcomes: [
    { label: 'Merged', value: 92, color: 'var(--color-mint)' },
    { label: 'Closed unmerged', value: 239, color: 'var(--color-paper-faint)' },
    { label: 'Still open', value: 83, color: 'var(--color-amber)' },
  ],

  /** Who wrote the 1,144 commits. */
  authors: [
    { label: 'Cursor agents', value: 694, color: 'var(--color-violet)' },
    { label: 'Grok', value: 47, color: 'var(--color-ember)' },
    { label: 'Human accounts', value: 403, color: 'var(--color-mint)' },
  ],

  /** PRs opened on 18 Sep, by surface. */
  spike: [
    { label: 'Retailer web', value: 83 },
    { label: 'Customer app', value: 63 },
    { label: 'Backend', value: 44 },
    { label: 'Delivery partner', value: 14 },
    { label: 'Scanner', value: 4 },
  ],

  /** The write-up itself. `img` blocks point at public/notes/agent-month/. */
  body: [
    { t: 'p', lines: ['414 pull requests in one month.', '92 merged.'] },
    { t: 'p', lines: ['19 Aug to 19 Sep. One SuperGrok Heavy seat.', 'That’s what my GitHub says.'] },
    { t: 'h', text: 'The first 48 hours, Grok wrote the code' },
    { t: 'p', lines: ['Day one, Grok committed straight into my repos.', '43 commits and 13 PRs in two days. Backend, retailer web, customer app, scanner.'] },
    { t: 'p', lines: ['Then the weekly quota was gone.', 'About 36 hours.'] },
    { t: 'p', lines: ['So I split it.', 'Grok bots: PM and review.', 'Cursor cloud agents: code.'] },
    { t: 'img', src: '02-commits-by-author.webp', alt: '1,144 commits per day by author: Cursor agents 694, Grok 47, human accounts 403, with 416 commits on 18 Sep.' },
    { t: 'h', text: 'The month in git' },
    { t: 'p', lines: ['1,144 commits.', '13 repos.', '28 of 32 days.'] },
    { t: 'img', src: '04-month-in-git.webp', alt: 'The month in git: 1,144 commits, 13 repos, 28 of 32 days active, 7 new repos.' },
    { t: 'p', lines: ['675 of those commits came from Cursor agents.'] },
    { t: 'p', lines: ['7 repos that didn’t exist on 18 Aug.', 'A delivery-partner app, a GST slip tool, two landing pages, three side projects.'] },
    { t: 'h', text: '18 Sep' },
    { t: 'p', lines: ['208 PRs opened in one day.'] },
    { t: 'p', lines: ['Retailer web 83. Customer app 63. Backend 44. Delivery partner 14. Scanner 4.'] },
    { t: 'p', lines: ['That’s not a team.', 'That’s a printer.'] },
    { t: 'img', src: '01-prs-per-day.webp', alt: 'PRs opened per day, 19 Aug to 19 Sep, with 208 on 18 Sep.' },
    { t: 'h', text: 'Where the 414 went' },
    { t: 'p', lines: ['92 merged.', '239 closed without merging.', '83 still open.'] },
    { t: 'img', src: '03-where-414-went.webp', alt: 'Where the 414 PRs went: 92 merged, 239 closed without merging, 83 still open.' },
    { t: 'p', lines: ['Most of the month was deciding what not to keep.'] },
    { t: 'h', text: 'Three weeks later' },
    { t: 'p', lines: ['80 small PRs folded into 3 bundles.', '561 review findings on the open board. 47 rated High.', '4 tickets Done. 72 In Review.'] },
    { t: 'h', text: 'Where it landed' },
    { t: 'p', lines: ['Writing code got cheap.', 'Reviewing it didn’t.'] },
    { t: 'p', lines: ['One seat bought the output.', 'It didn’t buy the merge button.'] },
  ] as (
    | { t: 'p'; lines: string[] }
    | { t: 'h'; text: string }
    | { t: 'img'; src: string; alt: string }
  )[],
};
