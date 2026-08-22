/**
 * ZANC Group Life Insurance (Hartford) — program facts and the annual enrollment window.
 *
 * Single source of truth so the Home page, Events & News and the Insurance page can never disagree
 * about whether enrollment is currently open.
 */

/** Open enrollment runs June 1 – July 31 every year. */
export const ENROLLMENT_WINDOW_LABEL = 'June 1 – July 31';

/** Semi-annual premium collection dates. Members should always confirm amounts with the team. */
export const PREMIUM_DUE_DATES_LABEL = 'January 25 and July 25';

export type EnrollmentStatus = {
  isOpen: boolean;
  /** Year of the window this status refers to. */
  year: number;
  /** Short status line, e.g. “2026 enrollment is closed”. */
  statusLabel: string;
  /** Where the next opportunity falls, in plain language. */
  nextWindowLabel: string;
};

/**
 * Whether open enrollment is live right now. Before June 1 the current year's window is still
 * ahead; after July 31 the next opportunity is next year's window.
 */
export function getEnrollmentStatus(now: Date = new Date()): EnrollmentStatus {
  const year = now.getFullYear();
  const opens = new Date(year, 5, 1); // June 1
  const closes = new Date(year, 6, 31, 23, 59, 59); // July 31
  const isOpen = now >= opens && now <= closes;

  if (isOpen) {
    return {
      isOpen: true,
      year,
      statusLabel: `${year} open enrollment is open`,
      nextWindowLabel: `Closes July 31, ${year}.`,
    };
  }

  const beforeWindow = now < opens;
  return {
    isOpen: false,
    year,
    statusLabel: beforeWindow ? `${year} open enrollment has not opened yet` : `${year} open enrollment is closed`,
    nextWindowLabel: beforeWindow
      ? `Opens June 1, ${year}.`
      : `The next open enrollment window is ${ENROLLMENT_WINDOW_LABEL}, ${year + 1}.`,
  };
}
