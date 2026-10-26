export const INDEPENDENCE_PHOTOGRAPHER = {
  name: 'Nirav Solanki',
  url: 'https://niravsolanki.com/',
};

export const INDEPENDENCE_RECAP = {
  title: 'Zambia at 62: a community celebration in Woodland',
  excerpt: 'Food, music, cultural performances and friendships brought Zambians and friends of Zambia together on October 24. Revisit the evening through photographs by Nirav Solanki.',
  date: 'October 26, 2026',
  galleryPath: '/gallery?album=independence-2026',
};

const selections = [
  [178, 'Together for Zambia’s 62nd independence anniversary', 'Guests gathered for a group portrait in the decorated celebration room.'],
  [6, 'A table set for celebration', 'Green table runners, orange flowers and miniature Zambian and American flags on a dining table.'],
  [2, 'A warm welcome', 'A framed welcome sign and basket at the entrance to the celebration.'],
  [46, 'Friends of Zambia, together in Woodland', 'Guests posing together beside the green 62 balloons and red, green and orange decorations.'],
  [62, 'An evening shared with our community', 'A wide view of guests at their tables as the evening program gets underway.'],
  [68, 'Music at the heart of the evening', 'A vocalist singing into a microphone during the celebration.'],
  [123, 'Greetings and reflections', 'A guest addressing the gathering from the podium.'],
  [137, 'Friendship across communities', 'A guest speaking in front of the Zambian flag.'],
  [155, 'A moment for conversation', 'A speaker addressing the audience seated around the celebration tables.'],
  [166, 'Together around the shared meal', 'Five people smiling together behind the buffet dishes.'],
  [173, 'Celebrating our heritage', 'A speaker wearing a scarf in Zambia’s national colors at the podium.'],
  [184, 'Culture in motion', 'Dancers performing in bright green and orange outfits with their arms raised.'],
  [202, 'Rhythm, energy and celebration', 'Three dancers performing together in white trousers and patterned tops.'],
  [244, 'The celebration continues on the dance floor', 'Guests smiling and dancing together in the celebration room.'],
] as const;

export const INDEPENDENCE_2026_PHOTOS = selections.map(([number, caption, alt]) => {
  const id = String(number).padStart(3, '0');
  return {
    id: `independence-2026-${id}`,
    image_url: `/images/independence-2026/recap/${id}-1600.webp`,
    thumbnail_url: `/images/independence-2026/recap/${id}-640.webp`,
    caption,
    alt,
    category: 'Independence 2026',
    credit: INDEPENDENCE_PHOTOGRAPHER,
  };
});

export const INDEPENDENCE_RECAP_HERO = INDEPENDENCE_2026_PHOTOS[0];
