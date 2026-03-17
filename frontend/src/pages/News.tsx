import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const News = () => {
  const [newsItems, setNewsItems] = useState<Array<{ id: string; title: string; excerpt: string | null; date: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const events = useMemo(
    () => [
      {
        title: 'Zambia Independence Celebration (October 2024)',
        description:
          'A community celebration featuring time together, cultural pride, and connection for Zambians and friends across California.',
      },
      {
        title: 'Ambassador Event — His Excellency Chibamba Kanyama (July 2024)',
        description:
          'ZANC hosted the Zambian Ambassador to the United States and Embassy officers for a community dialogue on immigration, investment, and business opportunities in Zambia.',
      },
      {
        title: 'Bay FC Match & Tailgate (September 2024)',
        description:
          'ZANC organized a community tailgate at PayPal Park Stadium for the Bay FC vs Orlando Pride match, followed by an after-party featuring performances by Kundananji and Barbra.',
      },
      {
        title: 'Zambia–CA Investment Innovation Roadshow (2025)',
        description:
          'ZANC co-hosted a gala connecting the Zambian diaspora with investment and innovation opportunities in Zambia, featuring speakers from the Zambian Embassy and business community.',
      },
      {
        title: 'Zambia 61st Independence Celebration (October 2025)',
        description:
          'A three-day celebration graced by the Hon. Consul for California, Mr. Rajen Ranchhod, and his wife — a weekend of unity, cultural pride, and community connection.',
      },
    ],
    []
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error: err } = await supabase
          .from('news')
          .select('id, title, excerpt, published_at, slug')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (err) {
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
      } catch {
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (searchParams.get('calendar') === '1') {
      setIsCalendarOpen(true);
    }
  }, [searchParams]);

  const openCalendar = () => {
    setIsCalendarOpen(true);
    const next = new URLSearchParams(searchParams);
    next.set('calendar', '1');
    setSearchParams(next, { replace: true });
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
    const next = new URLSearchParams(searchParams);
    next.delete('calendar');
    setSearchParams(next, { replace: true });
  };

  return (
    <div>
      <PageHeader title="News & Updates" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 font-heading">Events</h2>
            <Button variant="primary" onClick={openCalendar}>
              Review this year’s calendar
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => (
              <article key={ev.title} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">{ev.title}</h3>
                <p className="text-gray-700">{ev.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Latest Updates</h2>
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
        </div>
      </section>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeCalendar} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-primary-800">ZANC Calendar (This Year)</h3>
                <button
                  type="button"
                  onClick={closeCalendar}
                  className="text-gray-500 hover:text-gray-800 px-2 py-1 rounded"
                  aria-label="Close calendar"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-md border border-gray-200 p-4">
                  <p className="font-semibold text-primary-800">Open Enrollment (Group Life Insurance)</p>
                  <p className="text-gray-700 text-sm">June 1 – July 31</p>
                </div>
                <div className="rounded-md border border-gray-200 p-4">
                  <p className="font-semibold text-primary-800">Premium Collection</p>
                  <p className="text-gray-700 text-sm">February and August (bi-annually)</p>
                </div>
                <div className="rounded-md border border-gray-200 p-4">
                  <p className="font-semibold text-primary-800">Community Events</p>
                  <p className="text-gray-700 text-sm">
                    Key events and dates will be posted here as the year’s schedule is finalized.
                  </p>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button variant="outline" onClick={closeCalendar}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
