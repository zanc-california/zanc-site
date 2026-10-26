/**
 * ZANC 2026 community calendar — Events & News page.
 * Theme: A Year of Connection, Growth & Celebration
 *
 * This file is the single source of truth for events across the site (home spotlight, Events & News,
 * the calendar modal, and the Independence event page). Add or update an event here and every
 * surface follows.
 */

import { INDEPENDENCE_RECAP, INDEPENDENCE_RECAP_HERO } from './independence2026Recap';

import {
  ENROLLMENT_WINDOW_LABEL,
  PREMIUM_DUE_DATES_LABEL,
  getEnrollmentStatus,
} from './insuranceProgram';

export type CalendarLane = 'family' | 'business' | 'culture' | 'sports' | 'signature';

/** Confirmed for Friday, and separately confirmed for Saturday by the organizer October 20. */
export const FLAG_RAISING_CONFIRMED_GUESTS = [
  {
    name: 'Brigadier General Oliver Musonda',
    title: 'Military Advisor',
    imageUrl: '/images/guests/oliver-musonda.jpg',
  },
  {
    name: 'Moses Jere',
    title: 'Cyber/Digital Expert',
    imageUrl: '/images/guests/moses-jere.jpg',
  },
];

/** Host-hotel / travel block shown on event pages. Only fill fields the hotel actually confirms. */
export type EventAccommodation = {
  hotelName: string;
  address?: string;
  /** e.g. '$99 USD/night' — exactly as displayed by the booking system. */
  groupRate?: string;
  /** e.g. 'October 22, 2026' — the deadline the booking system shows. */
  bookingDeadline?: string;
  bookingUrl?: string;
  /** Anything that needs qualifying (which nights are covered, etc.). */
  note?: string;
};

/**
 * A way for members to take part in planning an event. Add entries as planning progresses —
 * cooking, décor, volunteers, music, entertainment, sponsors, ticketing, program.
 */
export type EventWorkstream = {
  title: string;
  body: string;
  /** Omit both CTA fields when no intake mechanism has been agreed yet. */
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Short status chip shown beside the title, e.g. 'Now forming'. Use it to make the workstreams
   * that are actively taking names visually distinct from the ones still being planned.
   */
  status?: string;
  /** Renders a “More details coming soon” note instead of a CTA. */
  pending?: boolean;
};

export type CommunityEvent = {
  title: string;
  description: string;
  dateLabel: string;
  location: string;
  type: 'past' | 'upcoming' | 'archived';
  /** Program tag shown on cards (e.g. Community Forum). */
  category?: string;
  series?: boolean;
  feeNote?: string;
  anchorId?: string;
  imageUrl?: string;
  /** Taller hero strip when the art is wide/horizontal (e.g. virtual meeting illustration). */
  heroImageTall?: boolean;
  externalUrl?: string;
  externalLinkLabel?: string;
  secondaryExternalUrl?: string;
  secondaryExternalLinkLabel?: string;
  /** Filter chips: Family, Business, Culture, Sports, Signature */
  lanes?: CalendarLane[];
  /** Hero treatment — the one flagship card at the top of Events & News. */
  featured?: boolean;
  /** ISO start time for “next milestone” countdown (Pacific). */
  countdownAt?: string;
  /**
   * ISO time after which the event is over and moves to “Past”. Defaults to `countdownAt`.
   * Set this for all-day events with no confirmed start time so they stay listed for the whole day.
   */
  endsAt?: string;
  /** Internal route with a full event page (e.g. '/independence'). */
  detailPath?: string;
  /** Venue name + street address, when confirmed. */
  venueName?: string;
  venueAddress?: string;
  /** Host-hotel / travel information for events people travel to. */
  accommodation?: EventAccommodation;
  /** Community planning workstreams people can join (cooking, décor, volunteers, sponsors…). */
  workstreams?: EventWorkstream[];
  /** Optional gallery stills (e.g. past event recap). */
  galleryImages?: string[];
  videoUrl?: string;
  /** Community-led listing — not a ZANC-sponsored program. */
  communityOrganized?: boolean;
};

export const INDEPENDENCE_RESERVATION_URL =
  'https://www.eventbrite.com/e/zambias-62nd-independence-celebration-registration-2002341560509';

export const INDEPENDENCE_COMMUNITY_FLYER = '/images/independence-2026/community-update-oct20.png';

export const INDEPENDENCE_CONFIRMED_GUESTS = [
  { name: 'Rajen Ranchhod', title: 'Honorary Consul of the Republic of Zambia', affiliation: 'California', imageUrl: '/images/independence-2026/rajen-ranchhod.jpg' },
  ...FLAG_RAISING_CONFIRMED_GUESTS.map((guest) => ({ ...guest, affiliation: 'Permanent Mission of the Republic of Zambia to the United Nations' })),
  { name: 'Catherine Bonnefoy', title: 'Honorary Consul of France', affiliation: 'Sacramento', imageUrl: '/images/independence-2026/catherine-bonnefoy.jpg' },
  { name: 'Ognian Gavrilov', title: 'Honorary Consul of Bulgaria', affiliation: 'Sacramento · Northern California', imageUrl: '/images/independence-2026/ognian-gavrilov.png' },
  { name: 'John Shea', title: 'President & CEO', affiliation: 'World Trade Center Northern California', imageUrl: '/images/independence-2026/john-shea.jpg' },
  { name: 'Eduardo Madrid Moreno', title: 'District Director', affiliation: 'Office of Sacramento Vice Mayor Karina Talamantes', imageUrl: '/images/independence-2026/eduardo-madrid-moreno.jpg' },
];

export const INDEPENDENCE_FEATURES = [
  { name: 'Robotics, food & heritage', role: 'Evening highlights', description: 'Explore robotics and the future of food, enjoy a vegetarian dish prepared with the help of kitchen automation as part of the buffet, and join a moment of Zambian cultural history and fun facts.', imageUrl: '/images/postings/robotics-culture-2026.png' },
  { name: 'Jean Nangwala', role: 'Zambian Afro Pop artist', description: 'A contemporary Zambian musical voice joins our Independence celebration.', imageUrl: '/images/postings/jean-nangwala-2026.png' },
  { name: 'Dj LittyRocket', role: 'On the decks', description: 'Our community member brings the music for an evening together.', imageUrl: '/images/postings/dj-littyrocket-2026.png' },
];

/** Milestones for countdown widget — only firm dates; first future date wins. */
export const COUNTDOWN_MILESTONES: { at: string; label: string }[] = [
  { at: '2026-09-27T15:00:00-07:00', label: 'ZANC Matchday — Bay FC vs Orlando Pride' },
  { at: '2026-10-23T11:30:00-07:00', label: 'Zambia flag raising — San Francisco City Hall' },
  { at: '2026-10-24T18:00:00-07:00', label: 'Zambian Independence Celebration — Woodland' },
];

/**
 * Where an event sits in its lifecycle right now.
 *
 * Archived plans remain separate from held events. Authored `type: 'past'` stays past.
 * Otherwise a dated event flips to 'past' once `endsAt`
 * (falling back to `countdownAt`) is behind us, so events age out on their own instead of being
 * dropped from the site. Undated plans stay upcoming until dated or explicitly archived.
 */
export function getEventStatus(ev: CommunityEvent, now: Date = new Date()): CommunityEvent['type'] {
  if (ev.type === 'archived') return 'archived';
  if (ev.type === 'past') return 'past';
  const overAt = ev.endsAt ?? ev.countdownAt;
  if (overAt && new Date(overAt) <= now) return 'past';
  return 'upcoming';
}

/** True for events that belong in the Upcoming list / home spotlight. */
export function shouldShowInUpcomingList(ev: CommunityEvent, now: Date = new Date()): boolean {
  return getEventStatus(ev, now) === 'upcoming';
}

/** Confirmed dates lead; undated plans retain their curated order at the end. */
export function getUpcomingEvents(now: Date = new Date()): CommunityEvent[] {
  return ZANC_COMMUNITY_EVENTS.filter((e) => shouldShowInUpcomingList(e, now)).sort(
    (a, b) => (a.countdownAt ? +new Date(a.countdownAt) : Infinity) -
      (b.countdownAt ? +new Date(b.countdownAt) : Infinity)
  );
}

/** Plans not held, kept separate from completed-event highlights. */
export function getArchivedPlans(): CommunityEvent[] {
  return ZANC_COMMUNITY_EVENTS.filter((e) => e.type === 'archived');
}

/** True when a scheduled date has passed; this alone does not confirm attendance or that it was held. */
export function hasConcluded(ev: CommunityEvent, now: Date = new Date()): boolean {
  return ev.type === 'upcoming' && getEventStatus(ev, now) === 'past';
}

/**
 * Past events, most recent dated entries first, followed by the undated historical archive.
 * Explicitly held recaps and elapsed scheduled dates retain their distinct authored status.
 */
export function getPastEvents(now: Date = new Date()): CommunityEvent[] {
  return ZANC_COMMUNITY_EVENTS.filter((event) => getEventStatus(event, now) === 'past').sort(
    (a, b) => +new Date(b.endsAt ?? b.countdownAt ?? 0) - +new Date(a.endsAt ?? a.countdownAt ?? 0)
  );
}

/**
 * The “Next up” card on the home page: the soonest dated upcoming event that does not already have
 * its own home-page feature block. Events with a `detailPath` (currently Independence) get a full
 * banner of their own, so they are excluded here to avoid showing the same event twice.
 *
 * Returns null when no dated events remain — the caller then falls back to a generic Events card.
 */
export function getNextUpcomingEvent(now: Date = new Date()): CommunityEvent | null {
  return (
    ZANC_COMMUNITY_EVENTS.filter((e) => shouldShowInUpcomingList(e, now) && e.countdownAt && !e.detailPath).sort(
      (a, b) => +new Date(a.countdownAt!) - +new Date(b.countdownAt!)
    )[0] ?? null
  );
}

export const CALENDAR_2026_THEME = 'A Year of Connection, Growth & Celebration';

/** Evaluated once per page load — accurate for a SPA session. */
const enrollmentStatus = getEnrollmentStatus();

/** The Independence celebration — resolved by anchor so callers never re-declare its details. */
export function getIndependenceEvent(): CommunityEvent | undefined {
  return ZANC_COMMUNITY_EVENTS.find((e) => e.anchorId === 'independence-2026');
}

/** Civic flag raising at San Francisco City Hall, the day before the Woodland celebration. */
export function getFlagRaisingEvent(): CommunityEvent | undefined {
  return ZANC_COMMUNITY_EVENTS.find((e) => e.anchorId === 'sf-flag-raising-2026');
}

/** Rows for the modal calendar (insurance + 2026 pulse). */
export const CALENDAR_MODAL_SECTIONS: { title: string; lines: string[] }[] = [
  {
    title: '2026 theme',
    lines: [CALENDAR_2026_THEME],
  },
  {
    title: 'Earlier this year (held)',
    lines: [
      'Big Boy No. 4014 public viewing, Roseville — April',
      "Mother's Day Mimosa Brunch — May 2",
      'Denim and White Day Party — Jul 4 (community-organized)',
    ],
  },
  {
    title: 'Earlier calendar listing',
    lines: ['ZANC Matchday — Bay FC vs Orlando Pride — September 27 (past date)'],
  },
  {
    title: 'October celebrations (held)',
    lines: [
      'Zambia flag raising — San Francisco City Hall — Fri, Oct 23, 11:30 AM',
      'Zambian Independence Celebration — Sat, Oct 24 · Woodland',
      'Celebration recap and photographs: zancsac.com/independence',
    ],
  },
  {
    title: 'ZANC plans awaiting dates',
    lines: ['Thanksgiving Community Mixer — not yet scheduled', 'Year-End Reflection & Toy Drive — not yet scheduled'],
  },
  {
    title: 'Archived 2026 plans — not held',
    lines: [
      'Golf Outing, Summer Picnic & Family Day, and ROOTS & RISE did not take place as planned in 2026.',
      'These ideas are archived. Any future edition will be announced separately once confirmed.',
    ],
  },
  {
    title: 'Recurring programs — next dates to be confirmed',
    lines: [
      'Community Hangouts — bi-monthly',
      'Business & Investment Series — quarterly',
      'Community Conversations — quarterly virtual',
    ],
  },
  {
    title: 'Group Life Insurance',
    lines: [
      `Open enrollment — ${ENROLLMENT_WINDOW_LABEL} each year`,
      `${enrollmentStatus.statusLabel}. ${enrollmentStatus.nextWindowLabel}`,
      `Premium due dates — ${PREMIUM_DUE_DATES_LABEL} (confirm with the insurance team)`,
    ],
  },
];

export const ZANC_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    title: 'Mother’s Day Mimosa Brunch',
    description:
      'What a beautiful afternoon. On Saturday, May 2, ZANC members and friends gathered in NorCal for mimosas, brunch, music, and warm company—a celebration of the amazing moms in our community.\n\n' +
      'The room was filled with soft pink, orange, green, and yellow, just as the dress code invited. Laughter, conversation, and a shared sense of gratitude made the afternoon feel like exactly what a community should be: present, generous, and glad to be together.\n\n' +
      'Thank you to everyone who came, contributed, and helped make this first 2026 social gathering a genuine success. These are the moments that remind us why ZANC exists—not just for events, but for the connections that carry through the year.',
    dateLabel: 'May 2, 2026',
    location: 'NorCal',
    type: 'past',
    category: 'Social / Family',
    anchorId: 'mothers-day-brunch-2026',
    imageUrl: '/images/postings/mothers-day-2026-hero.png',
    galleryImages: [
      '/images/postings/mothers-day-2026-group1.png',
      '/images/postings/mothers-day-2026-group2.png',
      '/images/postings/mothers-day-2026-group3.png',
    ],
    videoUrl: '/images/postings/mothers-day-2026-decor.mp4',
    lanes: ['family', 'culture'],
  },
  {
    title: 'Denim and White Day Party',
    description:
      'A community-organized July 4 day party was listed with Amapiano and Afrobeats by DJ Leone, a denim-and-white dress code and 21+ admission. This is an earlier calendar listing; current tickets and reservations are no longer offered here.',
    dateLabel: 'Jul 4, 2026',
    location: '2614 Marigold Lane',
    type: 'upcoming',
    category: 'Community Social',
    feeNote: '21+',
    anchorId: 'denim-white-day-party-july-2026',
    imageUrl: '/images/postings/other-events.png',
    heroImageTall: true,
    // Ticket link removed once the event had passed — the placeholder Eventbrite URL never resolved
    // to a real listing. If this becomes an annual event, add the real link with the next edition.
    lanes: ['family', 'culture'],
    communityOrganized: true,
    countdownAt: '2026-07-04T21:00:00-07:00',
  },
  {
    title: 'Golf Outing',
    description:
      'The proposed community golf outing did not take place in 2026. The plan is archived; no replacement date is confirmed.',
    dateLabel: '2026 plan · not held',
    location: 'Not scheduled',
    type: 'archived',
    category: 'Social / Family',
    anchorId: 'golf-outing-tba',
    imageUrl: '/images/postings/golf-event.png',
    lanes: ['family', 'sports'],
  },
  {
    title: 'ZANC Summer Picnic & Family Day',
    description:
      'The proposed summer picnic and family day did not take place in 2026. The plan is archived; a future gathering will be announced if confirmed.',
    dateLabel: '2026 plan · not held',
    location: 'Not scheduled',
    type: 'archived',
    category: 'Community Social',
    anchorId: 'summer-picnic-2026',
    lanes: ['family', 'culture', 'sports'],
  },
  {
    title: 'ROOTS & RISE: ZANC Signature Gala + Skills Exchange',
    description:
      'The proposed skills exchange and gala did not take place in 2026. The concept is archived; no future date, venue or ticketing is confirmed. The October 24 Independence celebration remains a separate event.',
    dateLabel: '2026 plan · not held',
    location: 'Not scheduled',
    type: 'archived',
    category: 'Signature Event',
    anchorId: 'roots-rise-gala-2026',
    lanes: ['signature', 'culture', 'business'],
    // Organizer confirmed on September 29 that these three plans never materialized.
  },
  {
    title: 'ZANC Matchday: Bay FC vs Orlando Pride',
    description:
      'The September 27 calendar listing proposed a Bay FC matchday and shared travel from Sacramento. The scheduled date has passed; no current ticket or van reservations are offered here.',
    dateLabel: 'September 27, 2026',
    location: 'Bay Area',
    type: 'upcoming',
    category: 'Sports & Community',
    anchorId: 'bay-fc-matchday-2026',
    lanes: ['sports', 'family'],
    countdownAt: '2026-09-27T15:00:00-07:00',
    endsAt: '2026-09-28T00:00:00-07:00',
  },
  {
    title: 'Zambia Flag Raising — San Francisco City Hall',
    description:
      'Zambians and friends of Zambia gathered at San Francisco City Hall on Friday, October 23 to mark Zambia’s 62nd independence anniversary. A City proclamation designated October 24, 2026 as “Zambian-American Friendship and Heritage Day” in San Francisco. Thank you to Honorary Consul Rajen Ranchhod, the City’s Protocol Office and everyone who joined us.',
    dateLabel: 'October 23, 2026',
    location: 'San Francisco City Hall',
    type: 'past',
    category: 'Civic ceremony',
    anchorId: 'sf-flag-raising-2026',
    detailPath: '/independence#flag-raising',
    lanes: ['family', 'culture', 'signature'],
    countdownAt: '2026-10-23T11:30:00-07:00',
    endsAt: '2026-10-24T00:00:00-07:00',
    venueName: 'San Francisco City Hall',
    venueAddress: '1 Dr. Carlton B. Goodlett Place, San Francisco, CA 94102',
  },
  {
    title: 'Zambian Independence Celebration 2026',
    description: INDEPENDENCE_RECAP.excerpt + '\n\nThank you to the community, volunteers, performers, American Hospitality Services, the Ranchhod family and the hotel team for making the celebration possible. Photography by Nirav Solanki.',
    dateLabel: 'October 24, 2026',
    location: 'Woodland, CA',
    type: 'past',
    category: 'Flagship Event',
    anchorId: 'independence-2026',
    detailPath: '/independence',
    imageUrl: INDEPENDENCE_RECAP_HERO.image_url,
    lanes: ['family', 'culture', 'signature'],
    countdownAt: '2026-10-24T18:00:00-07:00',
    endsAt: '2026-10-25T00:00:00-07:00',
    venueName: 'Fairfield by Marriott Inn & Suites Sacramento Airport Woodland',
    venueAddress: '2100 Freeway Drive, Woodland, CA 95776',
  },
  {
    title: 'Community Hangout / Thanksgiving Mixer',
    description:
      'A small gratitude gathering before the holidays—food, reflection, and easy fellowship.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Community Hangout',
    feeNote: 'TBA',
    anchorId: 'thanksgiving-mixer-2026',
    lanes: ['family'],
  },
  {
    title: 'ZANC End of Year Reflection & Toy Drive',
    description:
      'Close the year together: a family social plus a simple way to give back (toy / gift drive details TBA).',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Holiday / Service',
    feeNote: 'TBA',
    anchorId: 'year-end-toy-drive-2026',
    lanes: ['family', 'culture'],
  },
  {
    title: 'Community Hangouts',
    description:
      'Bi-monthly indoor games, shared space, and networking—Stockton Blvd venue or rotating locations. The steady pulse of “show up as you are.”',
    dateLabel: 'Recurring · dates TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Community Hangouts',
    series: true,
    feeNote: 'TBA',
    anchorId: 'community-hangouts',
    lanes: ['family'],
  },
  {
    title: 'Business & Investment Series',
    description:
      'Quarterly deep dives: Lobito Corridor, Zambia investment opportunities, shipping and trade, diaspora wealth building, entrepreneurship, and more. Per-session details announced when scheduled.',
    dateLabel: 'Quarterly · dates TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Business & Investment Series',
    series: true,
    feeNote: 'TBA',
    anchorId: 'business-investment-series',
    lanes: ['business'],
  },
  {
    title: 'Community Conversations (Quarterly Virtual)',
    description:
      'Town-hall-style member check-ins on Zoom—same spirit as the kickoff forum, repeated across the year. Dates announced per quarter.',
    dateLabel: 'Quarterly · Virtual · dates TBA',
    location: 'Zoom',
    type: 'upcoming',
    category: 'Community Forum',
    series: true,
    feeNote: 'TBA',
    anchorId: 'community-conversations-quarterly',
    imageUrl: '/images/postings/zoom-image-generic.png',
    heroImageTall: true,
    lanes: ['business', 'family'],
  },
  {
    title: 'Union Pacific Big Boy No. 4014 — public viewing (Roseville)',
    description:
      'Big Boy No. 4014, the world\u2019s largest steam locomotive, was on display in downtown Roseville as part of Union Pacific\u2019s coast-to-coast steam tour. Public viewing ran Friday, April 10, 1\u20135 p.m. and Saturday, April 11, 9 a.m.\u20133 p.m., with extra activities at Vernon Street Town Square on Saturday. A memorable NorCal outing for families and rail fans.',
    dateLabel: 'Apr 2026',
    location: 'Downtown Roseville, CA',
    type: 'past',
    category: 'Community outing',
    anchorId: 'big-boy-4014-roseville',
    imageUrl: '/images/postings/bigboy-4014.png',
    externalUrl:
      'https://www.roseville.ca.us/news/what_s_happening_in_roseville/roseville_set_to_welcome_big_boy_no4014',
    externalLinkLabel: 'City of Roseville (recap)',
    lanes: ['family'],
  },
  {
    title: 'Ambassador Event — His Excellency Chibamba Kanyama (July 2024)',
    description:
      'ZANC hosted the Zambian Ambassador to the United States and Embassy officers for a community dialogue on immigration, investment, and business opportunities in Zambia.',
    dateLabel: 'Jul 2024',
    location: 'NorCal',
    type: 'past',
    lanes: ['business', 'culture'],
  },
  {
    title: 'Bay FC Match & Tailgate (September 2024)',
    description:
      'ZANC organized a community tailgate at PayPal Park Stadium for the Bay FC vs Orlando Pride match, followed by an after-party featuring performances by Kundananji and Barbra.',
    dateLabel: 'Sep 2024',
    location: 'Bay Area',
    type: 'past',
    lanes: ['sports', 'family'],
  },
  {
    title: 'Zambia–CA Investment Innovation Roadshow (2025)',
    description:
      'ZANC co-hosted a gala connecting the Zambian diaspora with investment and innovation opportunities in Zambia, featuring speakers from the Zambian Embassy and business community.',
    dateLabel: '2025',
    location: 'NorCal',
    type: 'past',
    category: 'Business & Investment Series',
    lanes: ['business', 'signature'],
  },
  {
    title: 'Zambia 61st Independence Celebration (October 2025)',
    description:
      'A three-day celebration graced by the Hon. Consul for California, Mr. Rajen Ranchhod, and his wife — a weekend of unity, cultural pride, and community connection.',
    dateLabel: 'Oct 2025',
    location: 'NorCal',
    type: 'past',
    lanes: ['culture', 'signature'],
  },
];
