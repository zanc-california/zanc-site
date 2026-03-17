import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';

type GalleryItem = { id: string; image_url: string; caption: string | null; category: string | null };

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error: err } = await supabase
          .from('gallery')
          .select('id, image_url, caption, category')
          .order('display_order', { ascending: true });

        if (err) {
          setItems([]);
        } else {
          setItems(data || []);
        }
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div>
      <PageHeader title="Gallery" />
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No images yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <figure key={item.id} className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="aspect-[4/3] w-full bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.caption || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {(item.caption || item.category) && (
                    <figcaption className="p-3 text-sm text-gray-600 bg-gray-50">
                      {item.caption}
                      {item.category && <span className="text-gray-400 ml-1">({item.category})</span>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
