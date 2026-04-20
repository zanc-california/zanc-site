/**
 * ZANC 2026 community calendar — Events & News page.
 * Theme: A Year of Connection, Growth & Celebration
 */

export type CalendarLane = 'family' | 'business' | 'culture' | 'sports' | 'signature';

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
  externalUrl?: string;
  externalLinkLabel?: string;
  secondaryExternalUrl?: string;
  secondaryExternalLinkLabel?: string;
  /** Filter chips: Family, Business, Culture, Sports, Signature */
  lanes?: CalendarLane[];
  /** Hero treatment (e.g. August gala). */
  featured?: boolean;
  /** ISO start time for “next milestone” countdown (Pacific). */
  countdownAt?: string;
};

/** Milestones for countdown widget — only firm dates; first future date wins. */
export const COUNTDOWN_MILESTONES: { at: string; label: string }[] = [
  { at: '2026-05-02T13:00:00-07:00', label: "Mother's Day Mimosa Brunch" },
  { at: '2026-09-27T15:00:00-07:00', label: 'ZANC Matchday — Bay FC vs Orlando Pride' },
];

export const CALENDAR_2026_THEME = 'A Year of Connection, Growth & Celebration';

/** Rows for the modal calendar (insurance + 2026 pulse). */
export const CALENDAR_MODAL_SECTIONS: { title: string; lines: string[] }[] = [
  {
    title: '2026 theme',
    lines: [CALENDAR_2026_THEME],
  },
  {
    title: 'May',
    lines: ["Mother's Day Mimosa Brunch — May 2", 'Community Conversations (Virtual) — date TBA'],
  },
  {
    title: 'June',
    lines: ["Father's Day Golf Outing — TBA", 'Youth Achievement Spotlight — TBA'],
  },
  {
    title: 'July',
    lines: ['ZANC Summer Picnic & Family Day — date TBA'],
  },
  {
    title: 'August (signature)',
    lines: [
      'ROOTS & RISE: Skills Exchange + Signature Gala & Taste of Zambia — date & times TBA',
      'Pricing TBA',
    ],
  },
  {
    title: 'September',
    lines: ['ZANC Matchday — Bay FC vs Orlando Pride — Sep 27'],
  },
  {
    title: 'October',
    lines: ['Zambia Independence Celebration 2026 — date TBA'],
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
      'Open enrollment — June 1 – July 31',
      'Premium due dates — January 25 & July 25 (confirm with the insurance team)',
    ],
  },
];

export const ZANC_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    title: 'Mother’s Day Mimosa Brunch',
    description:
      'A toast to amazing moms—join ZANC for mimosas, brunch, music, and great company. Saturday, May 2, 2026 · 1:00–5:00 PM PT. Limited to 30 guests; the exact location is sent after you RSVP.\n\n' +
      'Pricing: $50 per person. The first 10 moms who are paid up get the ZANC rate of $45. RSVP closes Friday, April 24, 2026.\n\n' +
      'How to pay:\n' +
      '• Zelle ZANC at zancsac@gmail.com (include your name and “Mother’s Day brunch” in the memo).\n' +
      '• Or pay through Partiful (hosted payment link — use the second link below).\n\n' +
      'Dress code: soft pink, orange, green, and yellow.',
    dateLabel: 'May 2, 2026',
    location: 'NorCal · address after RSVP',
    type: 'upcoming',
    category: 'Social / Family',
    feeNote: '$50 · first 10 paid moms $45',
    anchorId: 'mothers-day-brunch-2026',
    imageUrl: '/images/postings/mothers-day.jpeg',
    externalUrl: 'https://partiful.com/e/ZiMg6og66YLmYuqVk1LO',
    externalLinkLabel: 'RSVP on Partiful',
    secondaryExternalUrl: 'https://partiful.com/e/ZiMg6og66YLmYuqVk1LO?c=kE6t2yDW',
    secondaryExternalLinkLabel: 'Pay on Partiful (ZANC link)',
    lanes: ['family', 'culture'],
    countdownAt: '2026-05-02T13:00:00-07:00',
  },
  {
    title: 'Community Conversations (Virtual)',
    description:
      'Open Zoom-style forum for members—ideas, needs, introductions, feedback, and “how can ZANC serve you better?” First 2026 session kicks off a quarterly rhythm of town-hall-style check-ins.\n\n' +
      'Date, link, and time TBA via email and this page.',
    dateLabel: 'TBA',
    location: 'Virtual (Zoom)',
    type: 'upcoming',
    category: 'Community Forum',
    feeNote: 'TBA',
    anchorId: 'community-conversations-virtual-may',
    lanes: ['business', 'family'],
  },
  {
    title: 'Father’s Day Golf Outing',
    description:
      'After we celebrate the moms, we’re looking forward to time on the course for dads and father figures—a relaxed golf outing to connect, laugh, and enjoy NorCal together. Course, date and time, format, pricing, and RSVP are still to be announced.\n\n' +
      'Stay tuned here and in your ZANC email; we’ll share full details as soon as they’re set.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Social / Family',
    feeNote: 'TBA',
    anchorId: 'fathers-day-golf-tba',
    imageUrl: '/images/postings/golf-event.png',
    lanes: ['family', 'sports'],
  },
  {
    title: 'Youth Achievement Spotlight',
    description:
      'Celebrate graduates, scholarships, and young people’s wins—stories, photos, and encouragement from the whole community.\n\n' +
      'Families: watch your inbox for how to nominate a spotlight once date and format are set.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Youth & Family',
    feeNote: 'TBA',
    anchorId: 'youth-achievement-spotlight-2026',
    lanes: ['family', 'culture'],
  },
  {
    title: 'ZANC Summer Picnic & Family Day',
    description:
      'A relaxed summer gathering—BBQ / potluck, kids’ games, soccer, dominoes and cards, music, and introductions for new members. Aiming for July 4 weekend when confirmed.\n\n' +
      'Bring a dish, bring a friend, bring the energy.',
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
    featured: true,
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
  },
  {
    title: 'Zambia Independence Celebration 2026',
    description:
      'Our flagship cultural weekend—anthem, speeches, dinner, dance, performances, state-of-ZANC update, and sponsor recognition. The heart of who we are in NorCal.\n\n' +
      'Date, venue, sponsorship, and ticketing TBA.',
    dateLabel: 'TBA',
    location: 'TBA',
    type: 'upcoming',
    category: 'Flagship Event',
    feeNote: 'TBA',
    anchorId: 'independence-2026',
    lanes: ['culture', 'signature'],
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
    lanes: ['business', 'family'],
  },
  {
    title: 'Union Pacific Big Boy No. 4014 — public viewing (Roseville)',
    description:
      'Big Boy No. 4014, the world’s largest steam locomotive, was on display in downtown Roseville as part of Union Pacific’s coast-to-coast steam tour. Public viewing ran Friday, April 10, 1–5 p.m. and Saturday, April 11, 9 a.m.–3 p.m., with extra activities at Vernon Street Town Square on Saturday. A memorable NorCal outing for families and rail fans.',
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
    title: 'Zambia Independence Celebration (October 2024)',
    description:
      'A community celebration featuring time together, cultural pride, and connection for Zambians and friends across California.',
    dateLabel: 'Oct 2024',
    location: 'NorCal',
    type: 'past',
    lanes: ['culture'],
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
