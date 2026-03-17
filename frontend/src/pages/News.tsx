import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import { supabase } from '../lib/supabase';

const News = () => {
  const [newsItems, setNewsItems] = useState<Array<{ id: string; title: string; excerpt: string | null; date: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error: err } = await supabase
        .from('news')
        .select('id, title, excerpt, published_at, slug')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (err) {
        setError(err.message);
        setNewsItems([]);
      } else {
        setNewsItems(
          (data || []).map((row) => ({
            id: row.id,
            title: row.title,
            excerpt: row.excerpt || '',
            date: row.published_at ? new Date(row.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
            slug: row.slug,
          }))
        );
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <PageHeader title="News & Updates" />
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg">{error}</div>
          )}
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No news yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {newsItems.map((item) => (
                <NewsCard
                  key={item.id}
                  id={item.slug}
                  title={item.title}
                  excerpt={item.excerpt || ''}
                  date={item.date}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
