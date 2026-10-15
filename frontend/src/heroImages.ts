/** Responsive derivatives of existing gallery photos. Originals remain in /images/gallery. */
export const heroImages = [
  { name: 'gathering', width: 1280, alt: 'Community friends gathered together in a living room', title: 'A place to belong', caption: 'Community friends gathering', position: '50% 50%' },
  { name: 'roadshow-music', width: 1000, alt: 'A musician performing with a guitar for guests at the Zambia–US Roadshow', title: 'Culture brings us together', caption: 'Music at the Zambia–US Roadshow · 2025', position: '60% 50%' },
  { name: 'roadshow-community', width: 1280, alt: 'Roadshow guests posing beneath balloons in Zambian flag colors', title: 'Connections that grow', caption: 'Community at the Zambia–US Roadshow · 2025', position: '50% 50%' },
].map((photo) => ({
  ...photo,
  src: `/images/community/${photo.name}-1280.webp`,
  srcSet: `/images/community/${photo.name}-640.webp 640w, /images/community/${photo.name}-1280.webp ${photo.width}w`,
}));
