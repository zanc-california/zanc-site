/** Seasonal July 4, 2026 (250th) hero + community note — active Jul 4–10 Pacific, reverts Jul 11. */

export const JULY_FOURTH_2026_HERO = {
  src: '/images/4th-july-26.png',
  alt: 'Happy Fourth of July 2026 — 250 years of freedom, community and opportunity from ZANC',
} as const;

const JULY_FOURTH_WEEK_START = new Date('2026-07-04T00:00:00-07:00');
const JULY_FOURTH_WEEK_END = new Date('2026-07-11T00:00:00-07:00');

export function isJulyFourthWeek(now: Date = new Date()): boolean {
  return now >= JULY_FOURTH_WEEK_START && now < JULY_FOURTH_WEEK_END;
}
