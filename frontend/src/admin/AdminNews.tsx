import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import type { NewsRow } from '../lib/supabase';
import { sanitizeRichText } from '../utils/sanitizeRichText';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function AdminNews() {
  const [posts, setPosts] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsRow | null>(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', excerpt: '', cover_image_url: '', published: false });

  const fetchPosts = async () => {
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', slug: '', content: '', excerpt: '', cover_image_url: '', published: false });
  };

  const openEdit = (row: NewsRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt || '',
      cover_image_url: row.cover_image_url || '',
      published: row.published,
    });
  };

  const save = async () => {
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      content: sanitizeRichText(form.content),
      excerpt: form.excerpt || null,
      cover_image_url: form.cover_image_url || null,
      published: form.published,
      updated_at: new Date().toISOString(),
      ...(form.published && { published_at: new Date().toISOString() }),
    };
    if (editing) {
      await supabase.from('news').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('news').insert(payload);
    }
    setEditing(null);
    fetchPosts();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('news').delete().eq('id', id);
    fetchPosts();
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-800">News</h2>
        <Button variant="primary" onClick={openNew}>New post</Button>
      </div>

      {editing !== null || (editing === null && (form.title || form.content)) ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 space-y-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) }))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            placeholder="Slug (URL)"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <textarea
            placeholder="Excerpt (preview)"
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
          />
          <textarea
            placeholder="Content (basic formatting only; unsafe HTML is stripped)"
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            rows={8}
          />
          <p className="text-xs text-gray-500">
            Scripts, embeds, and unsafe markup are removed before articles go live.
          </p>
          <input
            placeholder="Cover image URL"
            value={form.cover_image_url}
            onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published
          </label>
          <div className="flex gap-2">
            <Button variant="primary" onClick={save}>Save</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setForm({ title: '', slug: '', content: '', excerpt: '', cover_image_url: '', published: false }); }}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200">
            <div>
              <span className="font-medium">{p.title}</span>
              {!p.published && <span className="ml-2 text-xs text-amber-600">Draft</span>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEdit(p)}>Edit</Button>
              <Button variant="outline" size="sm" onClick={() => remove(p.id)} className="text-red-600">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
