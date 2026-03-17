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
  const [tab, setTab] = useState<'upcoming' | 'past' | 'news'>('upcoming');

  const events = useMemo(
    () => [
      {
        title: 'Zambia Independence Celebration (October 2024)',
        description:
          'A community celebration featuring time together, cultural pride, and connection for Zambians and friends across California.',
        dateLabel: 'Oct 2024',
        location: 'NorCal',
        type: 'past' as const,
      },
      {
        title: 'Ambassador Event — His Excellency Chibamba Kanyama (July 2024)',
        description:
          'ZANC hosted the Zambian Ambassador to the United States and Embassy officers for a community dialogue on immigration, investment, and business opportunities in Zambia.',
        dateLabel: 'Jul 2024',
        location: 'NorCal',
        type: 'past' as const,
      },
      {
        title: 'Bay FC Match & Tailgate (September 2024)',
        description:
          'ZANC organized a community tailgate at PayPal Park Stadium for the Bay FC vs Orlando Pride match, followed by an after-party featuring performances by Kundananji and Barbra.',
        dateLabel: 'Sep 2024',
        location: 'Bay Area',
        type: 'past' as const,
      },
      {
        title: 'Zambia–CA Investment Innovation Roadshow (2025)',
        description:
          'ZANC co-hosted a gala connecting the Zambian diaspora with investment and innovation opportunities in Zambia, featuring speakers from the Zambian Embassy and business community.',
        dateLabel: '2025',
        location: 'NorCal',
        type: 'past' as const,
      },
      {
        title: 'Zambia 61st Independence Celebration (October 2025)',
        description:
          'A three-day celebration graced by the Hon. Consul for California, Mr. Rajen Ranchhod, and his wife — a weekend of unity, cultural pride, and community connection.',
        dateLabel: 'Oct 2025',
        location: 'NorCal',
        type: 'past' as const,
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
      <PageHeader title="Events & News" />
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Events &amp; News</h2>
              <p className="text-slate mt-1">Upcoming events, past highlights, and community updates.</p>
            </div>
            <Button variant="accent" onClick={openCalendar}>Review this year’s calendar</Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'upcoming' as const, label: 'Upcoming Events' },
              { id: 'past' as const, label: 'Past Events' },
              { id: 'news' as const, label: 'News' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  tab === t.id ? 'bg-zambia-green text-white border-zambia-green' : 'bg-white text-slate border-mist hover:bg-cloud'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'upcoming' && (
            <div className="bg-white rounded-xl border border-mist p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Upcoming Events</h3>
              <p className="text-slate mt-2">
                Upcoming dates will be published as the year’s schedule is finalized. In the meantime, review the calendar for key deadlines.
              </p>
              <div className="mt-4">
                <Button variant="accent" onClick={openCalendar}>Open calendar</Button>
              </div>
            </div>
          )}

          {tab === 'past' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events
                .filter((e) => e.type === 'past')
                .map((ev) => (
                  <article key={ev.title} className="bg-white rounded-xl border border-mist p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-heading font-semibold text-zambia-green">{ev.title}</h3>
                      <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                        {ev.dateLabel}
                      </span>
                    </div>
                    <p className="text-slate mt-3 leading-relaxed">{ev.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate">
                      <span className="px-2 py-1 rounded-full bg-cloud border border-mist">{ev.location}</span>
                    </div>
                  </article>
                ))}
            </div>
          )}

          {tab === 'news' && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Latest Updates</h3>
              {loading ? (
                <div className="text-center py-12 text-slate">Loading...</div>
              ) : newsItems.length === 0 ? (
                <div className="text-center py-12 text-slate">No news yet. Check back soon!</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsItems.map((item) => (
                    <NewsCard key={item.id} id={item.slug} title={item.title} excerpt={item.excerpt || ''} date={item.date} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeCalendar} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden border border-mist">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-heading font-semibold text-zambia-green">ZANC Calendar (This Year)</h3>
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
                <div className="rounded-md border border-mist p-4 bg-cloud">
                  <p className="font-heading font-semibold text-zambia-green">Open Enrollment (Group Life Insurance)</p>
                  <p className="text-gray-700 text-sm">June 1 – July 31</p>
                </div>
                <div className="rounded-md border border-mist p-4 bg-cloud">
                  <p className="font-heading font-semibold text-zambia-green">Premium Collection</p>
                  <p className="text-gray-700 text-sm">February and August (bi-annually)</p>
                </div>
                <div className="rounded-md border border-mist p-4 bg-cloud">
                  <p className="font-heading font-semibold text-zambia-green">Community Events</p>
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
