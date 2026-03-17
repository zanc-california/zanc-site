import { useEffect, useState } from 'react';
import { supabase, type OpportunityRow } from '../lib/supabase';
import Button from '../components/Button';

const emptyForm = {
  title: '',
  category: 'jobs',
  description: '',
  location: '',
  link: '',
  posted_by: 'Admin',
  active: true,
};

export default function AdminOpportunities() {
  const [items, setItems] = useState<OpportunityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<OpportunityRow | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const fetchItems = async () => {
    const { data } = await supabase.from('opportunities').select('*').order('created_at', { ascending: false });
    setItems((data as OpportunityRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
  };

  const openEdit = (row: OpportunityRow) => {
    setEditing(row);
    setForm({
      title: row.title,
      category: row.category,
      description: row.description,
      location: row.location || '',
      link: row.link || '',
      posted_by: row.posted_by || 'Admin',
      active: row.active,
    });
  };

  const save = async () => {
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      location: form.location || null,
      link: form.link || null,
      posted_by: form.posted_by || null,
      active: form.active,
    };
    if (editing) {
      await supabase.from('opportunities').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('opportunities').insert(payload);
    }
    setEditing(null);
    setForm({ ...emptyForm });
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this opportunity?')) return;
    await supabase.from('opportunities').delete().eq('id', id);
    fetchItems();
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-800">Opportunities</h2>
        <Button variant="primary" onClick={openNew}>New</Button>
      </div>

      {editing !== null || (editing === null && (form.title || form.description)) ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 space-y-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              title="Category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="jobs">jobs</option>
              <option value="housing">housing</option>
              <option value="scholarships">scholarships</option>
              <option value="services">services</option>
              <option value="other">other</option>
            </select>
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            rows={5}
          />
          <input
            placeholder="External link (optional)"
            value={form.link}
            onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <input
              placeholder="Posted by (optional)"
              value={form.posted_by}
              onChange={(e) => setForm((f) => ({ ...f, posted_by: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              Active
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={save}>Save</Button>
            <Button variant="outline" onClick={() => { setEditing(null); setForm({ ...emptyForm }); }}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <ul className="space-y-2">
        {items.map((o) => (
          <li key={o.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-4 rounded-lg border border-gray-200">
            <div className="min-w-0">
              <span className="font-medium text-primary-800">{o.title}</span>
              {!o.active && <span className="ml-2 text-xs text-amber-600">Inactive</span>}
              <div className="text-sm text-gray-600">{o.category}{o.location ? ` • ${o.location}` : ''}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEdit(o)}>Edit</Button>
              <Button variant="outline" size="sm" onClick={() => remove(o.id)} className="text-red-600">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

