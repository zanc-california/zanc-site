import { useEffect, useState } from 'react';
import { supabase, type SuggestionRow } from '../lib/supabase';
import Button from '../components/Button';

export default function AdminSuggestions() {
  const [items, setItems] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await supabase.from('suggestions').select('*').order('created_at', { ascending: false });
    setItems((data as SuggestionRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const setStatus = async (id: string, status: string) => {
    await supabase.from('suggestions').update({ status }).eq('id', id);
    fetchItems();
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-800">Suggestions</h2>
        <Button variant="outline" onClick={fetchItems}>Refresh</Button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-gray-600">No suggestions yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-primary-800">{s.category}</p>
                  <p className="text-sm text-gray-600">
                    From <span className="font-medium">{s.name}</span> — {s.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(s.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded border bg-gray-50 text-gray-700">{s.status}</span>
                  <Button variant="outline" size="sm" onClick={() => setStatus(s.id, 'reviewed')}>Mark reviewed</Button>
                  <Button variant="outline" size="sm" onClick={() => setStatus(s.id, 'actioned')}>Mark actioned</Button>
                </div>
              </div>
              <p className="mt-3 text-gray-700 whitespace-pre-wrap">{s.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

