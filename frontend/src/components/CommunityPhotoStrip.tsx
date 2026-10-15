import { Link } from 'react-router-dom';

const moments = [
  { name: 'womens-tea', caption: 'Women’s tea party · 2025', alt: 'Women posing together at an outdoor tea party' },
  { name: 'roadshow-music', caption: 'Roadshow music · 2025', alt: 'Guitar performance at the Zambia–US Roadshow' },
  { name: 'roadshow-community', caption: 'Roadshow connections · 2025', alt: 'Community guests together at the Zambia–US Roadshow' },
];

export default function CommunityPhotoStrip() {
  return (
    <section className="border-t border-mist bg-cloud py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">From our photo album</p>
            <h2 className="mt-2 text-2xl font-heading font-semibold text-zambia-green">Moments we share</h2>
          </div>
          <Link to="/gallery" className="inline-flex min-h-11 items-center font-medium text-zambia-green underline underline-offset-4">Explore the gallery →</Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          {moments.map((photo) => (
            <figure key={photo.name} className="overflow-hidden rounded-xl border border-mist bg-white">
              <img src={`/images/community/${photo.name}-640.webp`} alt={photo.alt} width={640} height={480} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="px-2 py-3 text-xs leading-relaxed text-slate-600 sm:px-4 sm:text-sm">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
