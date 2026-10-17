/**
 * WRITING - Vineet's articles, first published as X Articles.
 *
 * Each entry is copied from the original post on x.com/vin8003/articles and
 * links back to it; the X post stays the canonical source. Text is Vineet's
 * own, unedited apart from layout. Add new ones at the top.
 */

export type ArticleBlock =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'quote'; text: string }
  | { t: 'list'; items: string[] }
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

const entries: Article[] = [];

/** Newest first. */
export const articles = [...entries].sort((a, b) => b.date.localeCompare(a.date));

export const articleHref = (a: Article) => `/writing/${a.slug}/`;

export const readingMinutes = (a: Article) => {
  const words = a.body
    .map((b) => (b.t === 'list' ? b.items.join(' ') : b.t === 'img' ? '' : b.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};
