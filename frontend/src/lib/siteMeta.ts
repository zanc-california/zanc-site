/** Canonical site identity used for titles, canonical URLs, and social previews. */
export const SITE_NAME = 'Zambian Association in Northern California (ZANC)';
export const SITE_SHORT_NAME = 'ZANC';
export const SITE_ORIGIN = 'https://www.zancsac.com';

/** Fallback social preview image. Replace with a purpose-made OG image (1200×630) when one exists. */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/logo.jpg`;

export const DEFAULT_DESCRIPTION =
  'ZANC connects Zambians and friends of Zambia across Northern California — community events, membership, ' +
  'group life insurance, and the annual Zambian Independence celebration.';

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
