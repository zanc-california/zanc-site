import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PhotoGallery, { type GalleryPhoto } from '../components/PhotoGallery';
import PhotoCredit from '../components/PhotoCredit';
import { INDEPENDENCE_2026_PHOTOS, INDEPENDENCE_PHOTOGRAPHER } from '../data/independence2026Recap';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

type GalleryItem = GalleryPhoto;

/** `Zambia-US Roadshow 2025 - N.jpg` sources, copied as URL-safe `zambia-us-roadshow-2025-N.jpg`. */
const ZAMBIA_US_ROADSHOW_2025_IDS = [118, 119, 124, 133, 137, 139, 180, 181, 364, 373, 402] as const;

const LOCAL_ROADSHOW_2025_NUMBERED: GalleryItem[] = ZAMBIA_US_ROADSHOW_2025_IDS.map((n) => ({
  id: `local-zambia-us-roadshow-2025-${n}`,
  image_url: `/images/gallery/zambia-us-roadshow-2025-${n}.jpg`,
  caption: `Zambia–US Roadshow 2025 — photo ${n}`,
  category: 'Roadshow',
  tags: ['Roadshow', 'Events'],
}));

/**
 * Images under `public/images` with descriptive filenames (treated as captions).
 * Files live in `frontend/public/images/gallery/` for Vite. Shown first, then Supabase rows.
 */
const LOCAL_GALLERY_ITEMS: GalleryItem[] = [
  ...INDEPENDENCE_2026_PHOTOS,
  {
    id: 'local-community-friends-gathering',
    image_url: '/images/gallery/community-friends-gathering.JPG',
    caption: 'Community friends gathering',
    category: 'Community',
    tags: ['Community', 'Events'],
  },
  {
    id: 'local-roadshow-minister-tayali',
    image_url: '/images/gallery/roadshow-minister-tayali-welcome.JPG',
    caption: 'Minister Tayali welcome — Zambia–US Roadshow',
    category: 'Roadshow',
    tags: ['Roadshow', 'Community'],
  },
  {
    id: 'local-womens-tea-2025',
    image_url: '/images/gallery/womens-tea-party-2025.jpg',
    caption: "Women's tea party (2025)",
    category: 'Events',
    tags: ['Events', 'Community'],
  },
  {
    id: 'local-roadshow-president-speech',
    image_url: '/images/gallery/roadshow-zanc-president-speech-PHOTO-2025-09-10-05-25-18.jpg',
    caption: 'ZANC president address — Roadshow',
    category: 'Roadshow',
    tags: ['Roadshow', 'Events'],
  },
  {
    id: 'local-roadshow-ambassador-group',
    image_url: '/images/gallery/roadshow-ambassador-community-group-image.JPG',
    caption: 'Ambassador with community — Roadshow',
    category: 'Roadshow',
    tags: ['Roadshow', 'Community'],
  },
  {
    id: 'local-womens-tea-may',
    image_url: '/images/gallery/womens-tea-partyPHOTO-2025-05-11-06-49-14.jpg',
    caption: "Women's tea party (May 2025)",
    category: 'Events',
    tags: ['Events', 'Community'],
  },
  {
    id: 'local-roadshow-sept7-a',
    image_url: '/images/gallery/Roadshow-PHOTO-2025-09-07-15-12-18.jpg',
    caption: 'Zambia–US Roadshow — community moment (Sept 7, 2025)',
    category: 'Roadshow',
    tags: ['Roadshow', 'Events'],
  },
  {
    id: 'local-roadshow-sept7-b',
    image_url: '/images/gallery/roadshow-PHOTO-2025-09-07-15-47-16.jpg',
    caption: 'Zambia–US Roadshow — program highlight (Sept 7, 2025)',
    category: 'Roadshow',
    tags: ['Roadshow', 'Events'],
  },
  ...LOCAL_ROADSHOW_2025_NUMBERED,
];

const Gallery = () => {
  useDocumentMeta({
    title: 'Gallery',
    description:
      'Photos from ZANC community events across Northern California — Independence celebrations, the Zambia–US roadshow, socials, and gatherings.',
    path: '/gallery',
  });

  const [remoteItems, setRemoteItems] = useState<GalleryItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedAlbum = searchParams.get('album');
  const activeCategory = requestedAlbum === 'independence-2026' ? 'Independence 2026' : searchParams.get('category') || 'All';
  const selectCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    next.delete('album');
    next.delete('category');
    if (category === 'Independence 2026') next.set('album', 'independence-2026');
    else if (category !== 'All') next.set('category', category);
    setSearchParams(next);
  };

  const items = useMemo(() => [...LOCAL_GALLERY_ITEMS, ...remoteItems], [remoteItems]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error: err } = await supabase
          .from('gallery')
          .select('id, image_url, caption, category')
          .order('display_order', { ascending: true });

        if (err) {
          setRemoteItems([]);
        } else {
          setRemoteItems(data || []);
        }
      } catch {
        setRemoteItems([]);
      }
    };
    fetchGallery();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div>
      <PageHeader title="Gallery" />
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-xl border border-copper/30 bg-white p-6 md:p-8">
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">Latest album · October 24, 2026</p>
            <h2 className="mt-2 text-2xl font-heading font-semibold text-zambia-green">Zambia at 62, together in Woodland</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate">Fourteen moments from our Independence celebration: the people, the shared meal, the performances and the friendships.</p>
            <PhotoCredit credit={INDEPENDENCE_PHOTOGRAPHER} className="mt-3 text-slate" />
            <Link to="/independence" className="mt-3 inline-flex min-h-11 items-center font-medium text-bay-blue underline underline-offset-4">Read the celebration recap →</Link>
          </div>
          <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => selectCategory(c)}
                    aria-pressed={activeCategory === c}
                    className={`px-4 py-2 rounded-full border text-sm font-medium motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] ${
                      activeCategory === c ? 'bg-zambia-green text-white border-zambia-green shadow-sm' : 'bg-white text-slate border-mist hover:bg-cloud'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <PhotoGallery key={activeCategory} photos={filtered} />
              {filtered.length === 0 && <p className="py-8 text-center text-slate">No photos in this category. Choose another album above.</p>}

              <p className="mt-8 text-center text-sm text-slate">
                Share your photos — email <span className="font-medium">zancsac@gmail.com</span>
              </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
