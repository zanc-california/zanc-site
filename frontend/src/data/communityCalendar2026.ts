/**
 * ZANC 2026 community calendar — Events & News page.
 * Theme: A Year of Connection, Growth & Celebration
 *
 * This file is the single source of truth for events across the site (home spotlight, Events & News,
 * the calendar modal, and the Independence event page). Add or update an event here and every
 * surface follows.
 */

import {
  ENROLLMENT_WINDOW_LABEL,
  PREMIUM_DUE_DATES_LABEL,
  getEnrollmentStatus,
} from './insuranceProgram';

export type CalendarLane = 'family' | 'business' | 'culture' | 'sports' | 'signature';

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
  type: 'past' | 'upcoming';
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

/** Milestones for countdown widget — only firm dates; first future date wins. */
export const COUNTDOWN_MILESTONES: { at: string; label: string }[] = [
  { at: '2026-09-27T15:00:00-07:00', label: 'ZANC Matchday — Bay FC vs Orlando Pride' },
  { at: '2026-10-24T00:00:00-07:00', label: 'Zambian Independence Celebration — Woodland' },
];

/**
 * Where an event sits in its lifecycle right now.
 *
 * Authored `type: 'past'` always wins. Otherwise a dated event flips to 'past' once `endsAt`
 * (falling back to `countdownAt`) is behind us, so events age out on their own instead of being
 * dropped from the site. Undated (TBA) events stay 'upcoming' until someone gives them a date.
 */
export function getEventStatus(ev: CommunityEvent, now: Date = new Date()): 'upcoming' | 'past' {
  if (ev.type === 'past') return 'past';
  const overAt = ev.endsAt ?? ev.countdownAt;
  if (overAt && new Date(overAt) <= now) return 'past';
  return 'upcoming';
}

/** True for events that belong in the Upcoming list / home spotlight. */
export function shouldShowInUpcomingList(ev: CommunityEvent, now: Date = new Date()): boolean {
  return getEventStatus(ev, now) === 'upcoming';
}

/** True for an event that has concluded but was authored as upcoming — render it with a “Held” badge. */
export function hasConcluded(ev: CommunityEvent, now: Date = new Date()): boolean {
  return ev.type === 'upcoming' && getEventStatus(ev, now) === 'past';
}

/**
 * Past events, most recently concluded first: events that just aged out lead, then the authored
 * archive in its curated order. Nothing is ever silently dropped from the site.
 */
export function getPastEvents(now: Date = new Date()): CommunityEvent[] {
  const justEnded = ZANC_COMMUNITY_EVENTS.filter((e) => hasConcluded(e, now)).sort(
    (a, b) => +new Date(b.endsAt ?? b.countdownAt ?? 0) - +new Date(a.endsAt ?? a.countdownAt ?? 0)
  );
  const archive = ZANC_COMMUNITY_EVENTS.filter((e) => e.type === 'past');
  return [...justEnded, ...archive];
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
    title: 'September',
    lines: ['ZANC Matchday — Bay FC vs Orlando Pride — Sun, Sep 27'],
  },
  {
    title: 'October (flagship)',
    lines: [
      'Zambian Independence Celebration — Sat, Oct 24',
      'Fairfield by Marriott Inn & Suites Sacramento Airport Woodland',
      'Program, timing and ticketing — more details coming soon',
    ],
  },
  {
    title: 'November',
    lines: ['Thanksgiving Community Mixer — date TBA'],
  },
  {
    title: 'December',
    lines: ['Year-End Reflection & Toy Drive — date TBA'],
  },
  {
    title: 'Still to be scheduled',
    lines: [
      'Golf Outing — date TBA',
      'ZANC Summer Picnic & Family Day — date TBA',
      'ROOTS & RISE: Skills Exchange + Signature Gala — date TBA',
    ],
  },
  {
    title: 'Recurring programs',
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
      'Good vibes, good music, good people — a community day party with Amapiano and Afrobeats (DJ Leone). Denim and white dress code; 21+.\n\n' +
      'Saturday, July 4, 2026 · 4:00 PM – 9:00 PM · 2614 Marigold Lane. Tickets on Eventbrite; VIP tables available — contact organizers for bottle service.',
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
    title: 'Golf Outing (TBA)',
    description:
      'A relaxed golf outing to connect, laugh, and enjoy NorCal together. Course, date and time, format, pricing, and RSVP are still to be announced.\n\n' +
      'Stay tuned here and in your ZANC email; we’ll share full details as soon as they’re set.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Social / Family',
    feeNote: 'TBA',
    anchorId: 'golf-outing-tba',
    imageUrl: '/images/postings/golf-event.png',
    lanes: ['family', 'sports'],
  },
  {
    title: 'ZANC Summer Picnic & Family Day',
    description:
      'A relaxed summer gathering—BBQ / potluck, kids’ games, soccer, dominoes and cards, music, and introductions for new members.\n\n' +
      'Bring a dish, bring a friend, bring the energy. Date and venue to be announced.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Community Social',
    feeNote: 'TBA',
    anchorId: 'summer-picnic-2026',
    lanes: ['family', 'culture', 'sports'],
  },
  {
    title: 'ROOTS & RISE: ZANC Signature Gala + Skills Exchange',
    description:
      'Our prestige anchor for 2026—two movements in one day (times TBA).\n\n' +
      'Skills Exchange Forum — short member-led presentations and conversations: home buying in California, careers in healthcare, starting a business, tech & AI opportunities, financial literacy, shipping / diaspora trade, and more.\n\n' +
      'Gala mixer + Taste of Zambia showcase — an elegant evening around the theme “What Is Zambian Cuisine?” Community-contributed dishes representing regions, tribes, and modern interpretations—with labels, dish stories, soft music, light awards, and networking.\n\n' +
      'Date, venue, schedule, and ticket tiers will be announced here.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Signature Event',
    feeNote: 'TBA',
    anchorId: 'roots-rise-gala-2026',
    lanes: ['signature', 'culture', 'business'],
    // NOTE FOR ZANC: this was pencilled in for August and no date was ever confirmed. It is kept
    // listed as TBA rather than deleted — confirm whether it is still planned for 2026 or should
    // move to 2027, then either give it a date or retire the listing.
  },
  {
    title: 'ZANC Matchday: Bay FC vs Orlando Pride',
    description:
      'Sunday, September 27, 2026 — Zambian talent on both sides, so Zambia wins regardless of score. Rally with ZANC: meet at the stadium or join a premium Sprinter van experience from Sacramento (flags, group photos, coordinated seating).\n\n' +
      'Individual ticket link will be posted here; email zancsac@gmail.com to reserve interest for the van.',
    dateLabel: 'Sep 27, 2026',
    location: 'Bay Area stadium · details TBA',
    type: 'upcoming',
    category: 'Sports & Community',
    feeNote: 'TBA',
    anchorId: 'bay-fc-matchday-2026',
    lanes: ['sports', 'family'],
    externalUrl: 'mailto:zancsac@gmail.com?subject=Bay%20FC%20Matchday%202026%20-%20tickets%20%2F%20van',
    externalLinkLabel: 'Email ZANC — tickets / van interest',
    countdownAt: '2026-09-27T15:00:00-07:00',
    endsAt: '2026-09-28T00:00:00-07:00',
  },
  {
    title: 'Zambian Independence Celebration 2026',
    description:
      'One flagship Saturday celebration in Woodland — a formal, cultural, and social evening marking Zambian Independence, and the moment the ZANC community comes together in full.\n\n' +
      'Members and friends from Northern California, Southern California, and out of town are all warmly encouraged to attend. Hotel rooms are available at the host hotel, where a special ZANC Independence group rate has been arranged.\n\n' +
      'Program, timing, and ticketing are still being finalized — more details coming soon.',
    dateLabel: 'Sat, Oct 24, 2026',
    location: 'Woodland, CA',
    type: 'upcoming',
    category: 'Flagship Event',
    feeNote: 'Ticketing TBA',
    anchorId: 'independence-2026',
    detailPath: '/independence',
    lanes: ['culture', 'signature'],
    featured: true,
    // Day-level only: no start time has been confirmed, so the countdown targets the start of the
    // day and `endsAt` keeps the event listed as upcoming for the whole of Oct 24.
    countdownAt: '2026-10-24T00:00:00-07:00',
    endsAt: '2026-10-25T00:00:00-07:00',
    // SAVE THE DATE ARTWORK: drop the file in frontend/public/images/postings/ and set
    // imageUrl below (e.g. '/images/postings/independence-2026-save-the-date.png'). The page and
    // its social preview pick it up automatically — see Independence.tsx.
    // imageUrl: '/images/postings/independence-2026-save-the-date.png',
    venueName: 'Fairfield by Marriott Inn & Suites Sacramento Airport Woodland',
    venueAddress: '2100 Freeway Drive, Woodland, CA 95776',
    accommodation: {
      hotelName: 'Fairfield by Marriott Inn & Suites Sacramento Airport Woodland',
      address: '2100 Freeway Drive, Woodland, CA 95776',
      groupRate: '$99 USD/night',
      bookingDeadline: 'October 22, 2026',
      bookingUrl: 'https://app.marriott.com/resview2?id=1787092104701&key=GRP&app=resvlink',
      note: 'Rates and available nights are shown and confirmed by the hotel at booking.',
    },
    workstreams: [
      {
        title: 'Cooking team',
        status: 'Now forming',
        body:
          'Before looking at outside catering, ZANC is first inviting community members who would like to be part of the Independence cooking team. Members who take on defined major cooking responsibilities may be compensated for that work.',
        ctaLabel: 'Email ZANC about cooking',
        ctaHref:
          'mailto:zancsac@gmail.com?subject=Independence%202026%20-%20cooking%20team&body=I%27d%20like%20to%20help%20with%20cooking%20for%20Independence%202026.%0A%0AName%3A%0APhone%3A%0ADishes%20or%20area%20I%27d%20like%20to%20take%20on%3A%0A',
      },
      {
        title: 'Décor team',
        status: 'Now forming',
        body:
          'We are looking for community members interested in helping shape the look and feel of the celebration. Members who take on defined décor responsibilities may be compensated for that work.',
        ctaLabel: 'Email ZANC about décor',
        ctaHref:
          'mailto:zancsac@gmail.com?subject=Independence%202026%20-%20d%C3%A9cor%20team&body=I%27d%20like%20to%20help%20with%20d%C3%A9cor%20for%20Independence%202026.%0A%0AName%3A%0APhone%3A%0AWhat%20I%27d%20like%20to%20take%20on%3A%0A',
      },
      {
        title: 'Music and DJ requests',
        status: 'Details coming soon',
        body:
          'Community members have already expressed interest in submitting DJ and music requests. We are still working out how requests will be collected — watch this page.',
        pending: true,
      },
      {
        title: 'Volunteering, entertainment, and sponsorship',
        status: 'Details coming soon',
        body:
          'There will be more ways to take part as planning progresses, including volunteering on the day, entertainment, and sponsorship. Details will be published here as they are confirmed.',
        pending: true,
      },
    ],
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
