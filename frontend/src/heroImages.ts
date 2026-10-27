import { INDEPENDENCE_2026_PHOTOS } from './data/independence2026Recap';

type HeroImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  position: string;
  credit?: { name: string; url: string };
};

const celebrationSlides = [
  ['178', 'Friendship across communities'],
  ['184', 'Culture brings us together'],
  ['166', 'A meal shared. A community connected.'],
] as const;

/** Reuse the optimized recap images and their original photographer credits. */
export const heroImages: HeroImage[] = [
  ...celebrationSlides.map(([number, title]) => {
    const photo = INDEPENDENCE_2026_PHOTOS.find((entry) => entry.id === `independence-2026-${number}`)!;
    return {
      src: photo.image_url,
      srcSet: `${photo.thumbnail_url} 640w, ${photo.image_url} 1600w`,
      width: 1600,
      height: 1143,
      alt: photo.alt,
      title,
      caption: 'Zambia’s 62nd Independence Celebration · Woodland · October 24, 2026',
      position: '50% 50%',
      credit: photo.credit,
    };
  }),
  {
    src: '/images/community/gathering-1280.webp',
    srcSet: '/images/community/gathering-640.webp 640w, /images/community/gathering-1280.webp 1280w',
    width: 1280,
    height: 960,
    alt: 'Community friends gathered together in a living room',
    title: 'A place to belong',
    caption: 'Community friends gathering',
    position: '50% 50%',
  },
];
