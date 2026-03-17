import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import type { GalleryRow } from '../lib/supabase';

const BUCKET = 'images';
const GALLERY_PREFIX = 'gallery/';

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchItems = async () => {
    const { data } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const name = `${GALLERY_PREFIX}${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadErr } = await supabase.storage.from(BUCKET).upload(name, file, { upsert: true });
    if (uploadErr) {
      alert(uploadErr.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path);
    await supabase.from('gallery').insert({
      image_url: urlData.publicUrl,
      caption: caption || null,
      category: category || null,
      display_order: displayOrder,
    });
    setCaption('');
    setCategory('');
    setDisplayOrder(items.length);
    fetchItems();
    setUploading(false);
    e.target.value = '';
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    fetchItems();
  };

  const updateOrder = async (id: string, newOrder: number) => {
    await supabase.from('gallery').update({ display_order: newOrder }).eq('id', id);
    fetchItems();
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Gallery</h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <p className="text-sm text-gray-600 mb-2">Upload to bucket: images/gallery/</p>
        <div className="flex flex-wrap gap-4 items-end">
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Category (e.g. events)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Order"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            className="w-20 px-3 py-2 border rounded-md"
          />
          <label className="cursor-pointer">
            <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              {uploading ? 'Uploading...' : 'Choose image'}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={onFileSelect} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-square w-full bg-gray-100">
              <img src={item.image_url} alt={item.caption || ''} className="w-full h-full object-cover" />
            </div>
            <div className="p-2 text-sm text-gray-600 truncate">{item.caption || item.category || '—'}</div>
            <div className="p-2 flex gap-2">
              <input
                type="number"
                defaultValue={item.display_order}
                className="w-14 px-1 py-1 border text-sm"
                onBlur={(e) => updateOrder(item.id, Number(e.target.value))}
              />
              <Button variant="outline" size="sm" onClick={() => remove(item.id)} className="text-red-600">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
