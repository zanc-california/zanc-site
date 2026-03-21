/**
 * Paid-member benefits (NorCal / SoCal only) — keep in sync with `/membership-details.md`
 * “ZANC Membership Benefits (Paid Members)” section.
 */
export const paidMemberBenefitsIntro =
  'The benefits below apply to paid members who are Northern or Southern California residents. They do not apply to Nationwide / out-of-state membership. Benefits are only as listed.';

export type PaidBenefitSection = {
  title: string;
  bullets: string[];
  subsections?: { title?: string; bullets: string[] }[];
};

export const paidMemberBenefitSections: PaidBenefitSection[] = [
  {
    title: 'Scholarship Raffle',
    bullets: [
      'Paid members can nominate eligible students from their families or communities—either in Northern California or Zambia—for a $500 scholarship raffle.',
      'The winner will be drawn at the annual Independence Day celebration, promoting education and community growth.',
    ],
  },
  {
    title: 'Discounted Event Entry',
    bullets: ['Enjoy discounted entry to ZANC’s major annual events, including:'],
    subsections: [
      {
        bullets: [
          'Independence Day Celebration',
          '4th of July Picnic',
          'Other cultural and community events.',
        ],
      },
    ],
  },
  {
    title: 'Free Participation in Community Activities',
    bullets: [
      'Participate in community-building activities and cultural events at no cost, fostering a stronger sense of connection and belonging.',
    ],
  },
  {
    title: 'Support During Hardship',
    bullets: ['Funerals or Catastrophic Illness:', 'For paid members:'],
    subsections: [
      {
        bullets: [
          'ZANC will take the lead at the family’s request, assisting with arrangements and community outreach.',
          'ZANC will contribute to a bereavement for nuclear family (father, mother, children, siblings, spouse) an amount of $500.',
        ],
      },
    ],
  },
  {
    title: 'Exclusive Membership Discounts (In Progress)',
    bullets: [
      'ZANC is working on securing exclusive discounts and benefits with local businesses and service providers to bring added value to your membership.',
    ],
  },
  {
    title: 'Quarterly Community Mailers',
    bullets: ['ZANC will distribute quarterly mailers featuring:'],
    subsections: [
      {
        bullets: [
          'Community activities and updates',
          'Upcoming events',
          'A business showcase for any paid member who wishes to be featured, providing a platform to promote their services or initiatives.',
        ],
      },
    ],
  },
];

export const paidMemberBenefitsClosing =
  'These additions underscore ZANC’s commitment to fostering community engagement and supporting the endeavors of its members.';
