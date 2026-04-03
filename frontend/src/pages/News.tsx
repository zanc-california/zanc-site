import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NewsFeedCard from '../components/NewsFeedCard';
import NewsArticleModal, { type ModalArticleContent } from '../components/NewsArticleModal';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

type StaticNewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  bodyParagraphs: string[];
};

/** Site-authored micro-articles (shown on News + All tabs). Order = left-to-right (newest dated stories first). */
const STATIC_NEWS_ARTICLES: StaticNewsArticle[] = [
  {
    id: 'local-rev-mubanga-socal-rep',
    title: 'Rev. Stephen Mubanga named ZANC’s Los Angeles (SoCal) area representative',
    excerpt:
      'A step toward stronger NorCal–SoCal ties—so our communities show up as sisters in heritage and purpose, not strangers separated by miles.',
    date: 'March 2026',
    imageUrl: '/images/members/pastor-stephen-mubanga.png',
    bodyParagraphs: [
      'The Zambian Association in Northern California (ZANC) welcomes Rev. Stephen Mubanga as our Los Angeles and Southern California area representative. In this role, he will help coordinate outreach, fellowship, and practical connection for Zambians and friends of Zambia across SoCal.',
      'Partnership between Northern and Southern California has always mattered to our diaspora story. By naming a dedicated SoCal representative, we make that partnership visible: two regions, one extended family—sister communities that share culture, values, and mutual support.',
      'Distance can too easily feel like disconnection. This appointment is meant to grow the opposite—a spirit of connectedness through introductions, shared updates, joint initiatives where they make sense, and steady communication so members in both regions feel part of the same circle.',
      'Rev. Mubanga serves with pastoral care and deep community experience. ZANC invites everyone in Southern California to reach out, say hello, and help shape what this collaboration becomes in the months ahead.',
      'Together, NorCal and SoCal can carry Zambian–American heritage with warmth and clarity in the wider national conversation—and we are grateful to take this step with Rev. Mubanga walking alongside us.',
    ],
  },
  {
    id: 'local-elections-2026',
    title: 'Elections 2026 — new ZANC committee seated',
    excerpt:
      'General elections brought fresh leadership for 2026–2028. Thank you to everyone who voted, volunteered, and helped the process run smoothly.',
    date: 'February 2026',
    imageUrl: '/images/logo.jpg',
    bodyParagraphs: [
      'ZANC recently completed general elections for the 2026–2028 term. Members stepped forward to shape programming, stewardship, and community life—and the association is grateful to everyone who participated, whether on the ballot, behind the scenes, or at the polls.',
      'A new committee is now in place to carry forward ZANC’s mission: preserving Zambian heritage, strengthening ties across Northern California, and welcoming partners near and far.',
      'Election seasons are also a reminder that this organization belongs to its members. Your ideas, feedback, and willingness to serve keep the community vibrant. Watch Events & News and your email for ways to plug in under the new leadership.',
    ],
  },
  {
    id: 'local-open-enrollment-insurance-2026',
    title: 'Open enrollment — Group Life Insurance (June 1 – July 31)',
    excerpt:
      'Mark your calendar: ZANC’s Hartford Group Life Insurance program opens enrollment each summer. Review dates, premiums, and how to apply.',
    date: 'Yearly window',
    imageUrl: '/images/hartford-logo.jpg',
    bodyParagraphs: [
      'ZANC partners with Hartford Insurance to offer a cultural Group Life Insurance program for members and eligible dependents. Each year, open enrollment runs from June 1 through July 31. If you are considering coverage—or renewing or adding dependents—this is the window to complete your paperwork and payment steps with the insurance team.',
      'Premiums are collected on a semi-annual schedule; exact due dates are announced to insured members. Use the Insurance page for current rates, payment options (including Zelle and Venmo), and the downloadable application form.',
      'Not sure where to start? Open the site calendar from this page for key deadlines, or email zancsac@gmail.com with questions. We encourage every eligible household to review the program—coverage is one of the ways we protect families while staying connected as a community.',
    ],
  },
];

type DbNewsRow = { id: string; title: string; excerpt: string | null; date: string; slug: string };

type CommunityEvent = {
  title: string;
  description: string;
  dateLabel: string;
  location: string;
  type: 'past' | 'upcoming';
  category?: string;
  series?: boolean;
  feeNote?: string;
  anchorId?: string;
  /** Optional hero image under `public/` (e.g. `/images/postings/foo.png`). */
  imageUrl?: string;
  /** Official details / registration (opens in new tab). */
  externalUrl?: string;
  externalLinkLabel?: string;
};

function EventProgramCard({ ev, headingLevel = 'h3' }: { ev: CommunityEvent; headingLevel?: 'h3' | 'h4' }) {
  const titleClass =
    headingLevel === 'h3'
      ? 'text-lg font-heading font-semibold text-zambia-green'
      : 'text-base font-heading font-semibold text-zambia-green';
  const imageAlt = ev.imageUrl ? `${ev.title} — featured image` : '';

  return (
    <article
      id={ev.anchorId}
      className="bg-white rounded-xl border border-mist p-6 shadow-sm hover:shadow-md transition-shadow scroll-mt-24 overflow-hidden"
    >
      {ev.imageUrl && (
        <div className="-mx-6 -mt-6 mb-4 border-b border-mist bg-cloud">
          <img
            src={ev.imageUrl}
            alt={imageAlt}
            className="w-full h-44 sm:h-52 object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        {headingLevel === 'h3' ? (
          <h3 className={titleClass}>{ev.title}</h3>
        ) : (
          <h4 className={titleClass}>{ev.title}</h4>
        )}
        <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist shrink-0">
          {ev.dateLabel}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {ev.category && (
          <span className="text-[10px] font-heading uppercase tracking-[0.08em] text-zambia-green bg-cloud px-2 py-1 rounded-full border border-mist">
            {ev.category}
          </span>
        )}
        {ev.series && (
          <span className="text-[10px] font-heading uppercase tracking-[0.08em] text-redwood bg-copper-glow/60 px-2 py-1 rounded-full border border-mist">
            Series
          </span>
        )}
        {ev.feeNote && (
          <span className="text-[10px] text-slate bg-white px-2 py-1 rounded-full border border-mist">{ev.feeNote}</span>
        )}
      </div>
      <p className="text-slate mt-3 text-sm leading-relaxed">{ev.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate">
        <span className="px-2 py-1 rounded-full bg-cloud border border-mist">{ev.location}</span>
      </div>
      {ev.externalUrl && (
        <p className="mt-4">
          <a
            href={ev.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-bay-blue hover:underline"
          >
            {ev.externalLinkLabel ?? 'Official details (City of Roseville)'}
          </a>
        </p>
      )}
    </article>
  );
}

const News = () => {
  const [newsItems, setNewsItems] = useState<DbNewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tab, setTab] = useState<'all' | 'upcoming' | 'past' | 'news'>('all');
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [modalArticle, setModalArticle] = useState<ModalArticleContent | null>(null);

  const events = useMemo(
    (): CommunityEvent[] => [
      {
        title: 'Union Pacific Big Boy No. 4014 — public viewing (Roseville)',
        description:
          'Big Boy No. 4014, the world’s largest steam locomotive, will be on display in downtown Roseville as part of Union Pacific’s coast-to-coast steam tour. Public viewing: Friday, April 10, 1–5 p.m. and Saturday, April 11, 9 a.m.–3 p.m. On Saturday, the city plans extra activities at Vernon Street Town Square (Maker’s Market and live music—see the city’s page for updates). A great NorCal outing for families and rail fans.',
        dateLabel: 'Apr 10–11, 2026',
        location: 'Downtown Roseville, CA',
        type: 'upcoming',
        category: 'Community outing',
        anchorId: 'big-boy-4014-roseville',
        imageUrl: '/images/postings/bigboy-4014.png',
        externalUrl:
          'https://www.roseville.ca.us/news/what_s_happening_in_roseville/roseville_set_to_welcome_big_boy_no4014',
        externalLinkLabel: 'City of Roseville: dates, map & parking',
      },
      {
        title: 'Community Hangouts',
        description:
          'Bi-monthly community gatherings featuring indoor games, casual interaction, and shared space.',
        dateLabel: 'Recurring',
        location: 'Stockton Blvd · NorCal',
        type: 'upcoming',
        category: 'Community Hangouts',
        anchorId: 'community-hangouts',
      },
      {
        title: 'Business & Investment Series',
        description:
          'Structured knowledge and economic engagement — sample topics: What is the Lobito Corridor? Why it matters. Diaspora participation opportunities.',
        dateLabel: 'Series',
        location: 'NorCal',
        type: 'upcoming',
        category: 'Business & Investment Series',
        series: true,
        feeNote: 'Members free · Non-members fee (details TBA)',
        anchorId: 'business-investment-series',
      },
      {
        title: 'Zambia Independence Celebration (October 2024)',
        description:
          'A community celebration featuring time together, cultural pride, and connection for Zambians and friends across California.',
        dateLabel: 'Oct 2024',
        location: 'NorCal',
        type: 'past',
      },
      {
        title: 'Ambassador Event — His Excellency Chibamba Kanyama (July 2024)',
        description:
          'ZANC hosted the Zambian Ambassador to the United States and Embassy officers for a community dialogue on immigration, investment, and business opportunities in Zambia.',
        dateLabel: 'Jul 2024',
        location: 'NorCal',
        type: 'past',
      },
      {
        title: 'Bay FC Match & Tailgate (September 2024)',
        description:
          'ZANC organized a community tailgate at PayPal Park Stadium for the Bay FC vs Orlando Pride match, followed by an after-party featuring performances by Kundananji and Barbra.',
        dateLabel: 'Sep 2024',
        location: 'Bay Area',
        type: 'past',
      },
      {
        title: 'Zambia–CA Investment Innovation Roadshow (2025)',
        description:
          'ZANC co-hosted a gala connecting the Zambian diaspora with investment and innovation opportunities in Zambia, featuring speakers from the Zambian Embassy and business community.',
        dateLabel: '2025',
        location: 'NorCal',
        type: 'past',
        category: 'Business & Investment Series',
      },
      {
        title: 'Zambia 61st Independence Celebration (October 2025)',
        description:
          'A three-day celebration graced by the Hon. Consul for California, Mr. Rajen Ranchhod, and his wife — a weekend of unity, cultural pride, and community connection.',
        dateLabel: 'Oct 2025',
        location: 'NorCal',
        type: 'past',
      },
    ],
    []
  );

  const upcomingEvents = useMemo(() => events.filter((e) => e.type === 'upcoming'), [events]);
  const pastEvents = useMemo(() => events.filter((e) => e.type === 'past'), [events]);

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

  const closeArticleModal = useCallback(() => {
    setArticleModalOpen(false);
    setModalArticle(null);
  }, []);

  const openStaticArticle = useCallback((article: StaticNewsArticle) => {
    setModalArticle({
      title: article.title,
      date: article.date,
      imageUrl: article.imageUrl,
      bodyParagraphs: [...article.bodyParagraphs],
    });
    setArticleModalOpen(true);
  }, []);

  const openDbArticle = useCallback(async (row: DbNewsRow) => {
    setArticleModalOpen(true);
    setModalArticle({
      title: row.title,
      date: row.date,
      loading: true,
    });

    const { data, error: err } = await supabase
      .from('news')
      .select('title, content, cover_image_url, published_at')
      .eq('slug', row.slug)
      .eq('published', true)
      .single();

    if (err || !data) {
      setModalArticle({
        title: row.title,
        date: row.date,
        loading: false,
        error: 'We could not load this article. Please try again later.',
      });
      return;
    }

    const dateStr = data.published_at
      ? new Date(data.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : row.date;

    setModalArticle({
      title: data.title,
      date: dateStr,
      imageUrl: data.cover_image_url,
      htmlContent: data.content,
      loading: false,
    });
  }, []);

  const newsGrid = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATIC_NEWS_ARTICLES.map((article) => (
          <NewsFeedCard
            key={article.id}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
            imageUrl={article.imageUrl}
            onOpen={() => openStaticArticle(article)}
          />
        ))}
        {!loading &&
          newsItems.map((item) => (
            <NewsFeedCard
              key={item.id}
              title={item.title}
              excerpt={item.excerpt || 'Read the full update.'}
              date={item.date}
              imageUrl={null}
              onOpen={() => openDbArticle(item)}
            />
          ))}
      </div>
      {loading ? <p className="text-center text-sm text-slate mt-6">Loading more stories from the community archive…</p> : null}
      {!loading && STATIC_NEWS_ARTICLES.length === 0 && newsItems.length === 0 ? (
        <div className="text-center py-10 text-slate">No news yet. Check back soon!</div>
      ) : null}
    </>
  );

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
              { id: 'all' as const, label: 'All' },
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

          {tab === 'all' && (
            <div className="space-y-14">
              <div>
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Latest updates</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl">
                  Micro articles and announcements in a three-column layout. Tap any card to read the full story in a pop-up.
                </p>
                {newsGrid}
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Upcoming events</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl">
                  Dated outings, recurring programs, and series — we add calendar entries as dates are confirmed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((ev) => (
                    <EventProgramCard key={ev.title} ev={ev} headingLevel="h4" />
                  ))}
                </div>
                <div className="mt-6 bg-white rounded-xl border border-mist p-6 shadow-sm max-w-2xl">
                  <p className="text-slate text-sm">
                    Review the calendar for insurance deadlines and other key dates.
                  </p>
                  <div className="mt-4">
                    <Button variant="accent" onClick={openCalendar}>
                      Open calendar
                    </Button>
                  </div>
                </div>
              </div>

              <div id="past-highlights">
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Past highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastEvents.map((ev) => (
                    <EventProgramCard key={ev.title} ev={ev} headingLevel="h4" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'upcoming' && (
            <div className="space-y-6">
              <p className="text-slate text-sm max-w-2xl">
                Dated outings and recurring programs below — insurance and other deadlines live in the calendar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((ev) => (
                  <EventProgramCard key={ev.title} ev={ev} />
                ))}
              </div>
              <div className="bg-white rounded-xl border border-mist p-6 shadow-sm max-w-2xl">
                <h3 className="text-lg font-heading font-semibold text-zambia-green">Calendar</h3>
                <p className="text-slate mt-2 text-sm">
                  Open enrollment, premiums, and other key dates.
                </p>
                <div className="mt-4">
                  <Button variant="accent" onClick={openCalendar}>Open calendar</Button>
                </div>
              </div>
            </div>
          )}

          {tab === 'past' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((ev) => (
                <EventProgramCard key={ev.title} ev={ev} />
              ))}
            </div>
          )}

          {tab === 'news' && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Latest updates</h3>
              <p className="text-sm text-slate mb-6 max-w-2xl">
                Tap a story to read the full article in a pop-up—no cramped preview cards.
              </p>
              {newsGrid}
            </div>
          )}
        </div>
      </section>

      <NewsArticleModal open={articleModalOpen} onClose={closeArticleModal} article={modalArticle} />

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
