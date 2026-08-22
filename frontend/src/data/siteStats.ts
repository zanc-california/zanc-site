/**
 * Site-wide numeric claims — single source of truth.
 *
 * Every value here is displayed publicly, so each one carries its provenance and the date it was
 * last confirmed. Update the value AND `lastConfirmed` together; if a figure can no longer be
 * supported, prefer durable wording (see `DURABLE_*` below) over a guessed number.
 */

export type SiteStat = {
  value: string;
  label: string;
  /** Where the number comes from — keep this honest; it is the reason the claim can stay on the site. */
  source: string;
  /** YYYY-MM — when a human last verified this figure. */
  lastConfirmed: string;
};

/** Year ZANC was founded. Stated on the About page history section. */
export const FOUNDED_YEAR = '2017';

/**
 * States with ZANC members. Mirrored on About ("Our History") and Insurance ("program supports…").
 * The "states reached" stat is derived from this list rather than hard-coded, so the two cannot drift.
 */
export const MEMBER_STATES = [
  'California',
  'Arizona',
  'Nevada',
  'Illinois',
  'Indiana',
  'New York',
  'Connecticut',
] as const;

export const MEMBER_STATES_SENTENCE = MEMBER_STATES.slice(0, -1).join(', ') + ', and ' + MEMBER_STATES[MEMBER_STATES.length - 1];

/**
 * Group Life Insurance enrollment counts.
 * Source: ZANC insurance team roster. NOTE: these are *insured* members, which is not the same as
 * total ZANC membership — do not reuse this number as a membership count.
 */
export const INSURED_MEMBERS = {
  total: 68,
  adults: 51,
  children: 17,
  lastConfirmed: '2026-04',
};

/** Homepage stat band. Keep to figures that can be traced back to something real. */
export const HOME_STATS: SiteStat[] = [
  {
    value: FOUNDED_YEAR,
    label: 'Founded',
    source: 'About page history — ZANC formed in 2017.',
    lastConfirmed: '2026-08',
  },
  {
    value: `${INSURED_MEMBERS.total}`,
    label: 'Insured members',
    source: `Group Life Insurance roster: ${INSURED_MEMBERS.adults} adults + ${INSURED_MEMBERS.children} children.`,
    lastConfirmed: INSURED_MEMBERS.lastConfirmed,
  },
  {
    value: `${MEMBER_STATES.length}`,
    label: 'States reached',
    source: 'Derived from MEMBER_STATES.',
    lastConfirmed: '2026-08',
  },
  {
    value: 'Year-round',
    label: 'Community events',
    source:
      'Durable wording. Replaced a hard-coded "4+ annual events" claim that had no traceable source — ' +
      'see the events calendar for the actual program.',
    lastConfirmed: '2026-08',
  },
];
