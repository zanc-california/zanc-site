import type { CalendarLane } from './communityCalendar2026';

/** External listings are separate from ZANC programs and never become ZANC recaps. */
export type NearbyEvent = {
  id: string;
  title: string;
  organizer: string;
  city: string;
  dateLabel: string;
  timeLabel: string;
  startsAt: string;
  endsAt: string;
  venue: string;
  address?: string;
  admission: string;
  description: string;
  planningNote: string;
  lanes: CalendarLane[];
  kind: 'books' | 'picnic' | 'theatre' | 'run';
  sourceUrl?: string;
  ticketUrl?: string;
  imageUrl?: string;
  saveTheDate?: boolean;
};

// Organizer pages checked October 14, 2026. Picnic supplied directly by the community.
// Keep exact Pacific offsets; Nov–Dec dates fall after the November 1 DST change.
export const NEARBY_EVENTS: NearbyEvent[] = [
  {
    id: 'kids-book-fair-cupertino-2026',
    title: 'Bay Area Kids’ Book Fair',
    organizer: 'Bay Area Festivals',
    city: 'Cupertino',
    dateLabel: 'Saturday, November 7, 2026',
    timeLabel: '10 AM–2 PM',
    startsAt: '2026-11-07T10:00:00-08:00',
    endsAt: '2026-11-07T14:00:00-08:00',
    venue: 'Cupertino High School Field House',
    address: '10100 Finch Avenue, Cupertino',
    admission: 'Free admission & parking',
    description: 'Meet children’s authors and illustrators, enjoy storytelling and try a hands-on family craft at the Silicon Valley edition.',
    planningNote: 'Held indoors. A relaxed outing for young readers and their families.',
    lanes: ['family', 'culture'],
    kind: 'books',
    sourceUrl: 'https://kidfestconcord.com/kids-book-fairs',
  },
  {
    id: 'kids-book-fair-san-ramon-2026',
    title: 'Bay Area Kids’ Book Fair',
    organizer: 'Bay Area Festivals',
    city: 'San Ramon',
    dateLabel: 'Sunday, November 8, 2026',
    timeLabel: '10 AM–2 PM',
    startsAt: '2026-11-08T10:00:00-08:00',
    endsAt: '2026-11-08T14:00:00-08:00',
    venue: 'Pine Valley Middle School',
    address: '3000 Pine Valley Road, San Ramon',
    admission: 'Free admission & parking',
    description: 'The East Bay edition brings authors, booksellers, storytelling and family crafts together for a morning of discovery.',
    planningNote: 'Held indoors. Choose this Sunday edition if the East Bay is closer to home.',
    lanes: ['family', 'culture'],
    kind: 'books',
    sourceUrl: 'https://kidfestconcord.com/kids-book-fairs',
  },
  {
    id: 'fall-into-friendship-2026',
    title: 'A Fall Into Friendship — Ladies Picnic',
    organizer: 'AfroplaySacramento & Coco_C',
    city: 'Location to be announced',
    dateLabel: 'Saturday, November 14, 2026',
    timeLabel: '4 PM',
    startsAt: '2026-11-14T16:00:00-08:00',
    // End time was not supplied; retire the save-the-date after the event day.
    endsAt: '2026-11-15T00:00:00-08:00',
    venue: 'Venue to be announced',
    admission: '$45 per person',
    description: 'An autumn afternoon for women to connect over a picnic, treats, photo moments and an outdoor movie night.',
    planningNote: 'Dress code: fall colors. Venue and RSVP details will be shared when available.',
    lanes: ['culture'],
    kind: 'picnic',
    imageUrl: '/images/postings/fall-into-friendship-2026.png',
    saveTheDate: true,
  },
  {
    id: 'dickens-fair-2026',
    title: 'The Great Dickens Christmas Fair',
    organizer: 'Red Barn Productions & the Patterson Family',
    city: 'Daly City',
    dateLabel: 'November 21–December 20, 2026',
    timeLabel: 'Weekends + Friday, Nov 27 · 10 AM–6 PM',
    startsAt: '2026-11-21T10:00:00-08:00',
    endsAt: '2026-12-20T18:00:00-08:00',
    venue: 'Cow Palace Exhibition Halls',
    address: '2600 Geneva Avenue, Daly City',
    admission: 'Ticketed · children under 5 free',
    description: 'Explore a Victorian holiday village with live theatre, music, shops and activities for children.',
    planningNote: 'Choose a date and buy tickets online in advance. Parking and some activities cost extra.',
    lanes: ['family', 'culture'],
    kind: 'theatre',
    sourceUrl: 'https://dickensfair.com/general-information/',
    ticketUrl: 'https://dickensfair.com/tickets/',
  },
  {
    id: 'run-to-feed-the-hungry-2026',
    title: 'Run to Feed the Hungry',
    organizer: 'Sacramento Food Bank & Family Services',
    city: 'Sacramento',
    dateLabel: 'Thursday, November 26, 2026',
    timeLabel: '10K at 8:15 AM · 5K at 9 AM',
    startsAt: '2026-11-26T08:15:00-08:00',
    endsAt: '2026-11-27T00:00:00-08:00',
    venue: 'J Street, near the Sacramento State entrance',
    address: 'East Sacramento',
    admission: 'Paid registration · see current rates',
    description: 'Start Thanksgiving with a family-friendly run or walk supporting local food assistance. Choose a 5K or 10K route through East Sacramento.',
    planningNote: 'Allow extra time to arrive. Free parking at Sac State; the J Street vehicle entrance closes for the race.',
    lanes: ['family', 'sports'],
    kind: 'run',
    sourceUrl: 'https://www.runtofeedthehungry.com/racedayinfo',
    ticketUrl: 'https://raceroster.com/events/2026/139355/run-to-feed-the-hungry',
  },
];

/** Multi-day listings remain visible through their final date, then leave this section. */
export function getUpcomingNearbyEvents(now = new Date()): NearbyEvent[] {
  return NEARBY_EVENTS.filter((event) => new Date(event.endsAt) > now)
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}
