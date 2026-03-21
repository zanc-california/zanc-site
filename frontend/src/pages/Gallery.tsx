import { useMemo, useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';

type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
  category: string | null;
  /** Optional extra labels for storytelling (local items; remote rows may add when DB supports it) */
  tags?: string[] | null;
};

function galleryDisplayTags(item: GalleryItem): string[] {
  if (item.tags?.length) return item.tags;
  if (item.category) return [item.category];
  return [];
}

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
  const [remoteItems, setRemoteItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

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
      } finally {
        setLoading(false);
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
          {loading && items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Loading gallery…</div>
          ) : items.length === 0 ? (
            <div>
              <div className="text-center py-8">
                <h2 className="text-2xl font-heading font-semibold text-zambia-green">Photos coming soon</h2>
                <p className="text-slate mt-2">We’re building the gallery. Check back soon, or share your photos with the community.</p>
                <p className="text-slate mt-3 text-sm">Share your photos — email <span className="font-medium">gallery@zanc.org</span></p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="rounded-xl border border-mist bg-copper-glow/60 h-56 animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] ${
                      activeCategory === c ? 'bg-zambia-green text-white border-zambia-green shadow-sm' : 'bg-white text-slate border-mist hover:bg-cloud'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Masonry-style columns (no extra libs) */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                {filtered.map((item) => (
                  <figure
                    key={item.id}
                    className="mb-6 break-inside-avoid rounded-xl overflow-hidden border border-mist bg-white shadow-sm hover:shadow-md transition-shadow cursor-zoom-in"
                    onClick={() => setLightbox(item)}
                  >
                    <div className="relative aspect-[4/3] w-full bg-copper-glow/40 overflow-hidden">
                      {galleryDisplayTags(item).length > 0 && (
                        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 max-w-[calc(100%-1rem)]">
                          {galleryDisplayTags(item).map((tag) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className="rounded-full bg-black/55 text-white text-[10px] font-medium px-2 py-0.5 backdrop-blur-[2px] shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <img
                        src={item.image_url}
                        alt={item.caption || 'Gallery image'}
                        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      />
                    </div>
                    {item.caption && (
                      <figcaption className="p-3 text-sm text-slate">{item.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-slate">
                Share your photos — email <span className="font-medium">gallery@zanc.org</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setLightbox(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="ui-modal-pop w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl border border-mist">
              <div className="flex items-center justify-between px-4 py-3 border-b border-mist bg-cloud">
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-zambia-green truncate">{lightbox.caption || 'Photo'}</p>
                  {galleryDisplayTags(lightbox).length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {galleryDisplayTags(lightbox).map((tag, ti) => (
                        <span
                          key={`lb-${ti}-${tag}`}
                          className="rounded-full bg-copper-glow text-slate text-[10px] font-medium px-2 py-0.5 border border-mist"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="text-slate hover:text-redwood px-2 py-1 rounded"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="bg-black">
                <img src={lightbox.image_url} alt={lightbox.caption || 'Gallery image'} className="w-full h-auto max-h-[80vh] object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
