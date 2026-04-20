import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NewsFeedCard from '../components/NewsFeedCard';
import NewsArticleModal, { type ModalArticleContent } from '../components/NewsArticleModal';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';
import {
  CALENDAR_2026_THEME,
  CALENDAR_MODAL_SECTIONS,
  COUNTDOWN_MILESTONES,
  ZANC_COMMUNITY_EVENTS,
  type CalendarLane,
  type CommunityEvent,
} from '../data/communityCalendar2026';

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

const LANE_LABELS: Record<CalendarLane, string> = {
  family: 'Family',
  business: 'Business',
  culture: 'Culture',
  sports: 'Sports',
  signature: 'Signature',
};

const UPCOMING_GRID_PAGE_SIZE = 4;

function useNextCountdownMilestone() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    void tick;
    const now = new Date();
    const sorted = [...COUNTDOWN_MILESTONES].sort((a, b) => +new Date(a.at) - +new Date(b.at));
    const next = sorted.find((m) => new Date(m.at) > now);
    if (!next) {
      return { label: 'ZANC 2026', at: null as string | null, days: 0, hours: 0, ended: true };
    }
    const ms = new Date(next.at).getTime() - now.getTime();
    const days = Math.max(0, Math.floor(ms / 86_400_000));
    const hours = Math.max(0, Math.floor((ms % 86_400_000) / 3_600_000));
    return { label: next.label, at: next.at, days, hours, ended: ms <= 0 };
  }, [tick]);
}

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
        {ev.lanes?.map((lane) => (
          <span
            key={lane}
            className="text-[10px] font-heading uppercase tracking-[0.08em] text-redwood bg-copper-glow/50 px-2 py-1 rounded-full border border-copper/25"
          >
            {LANE_LABELS[lane]}
          </span>
        ))}
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
      <p className="text-slate mt-3 text-sm leading-relaxed whitespace-pre-line">{ev.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate">
        <span className="px-2 py-1 rounded-full bg-cloud border border-mist">{ev.location}</span>
      </div>
      {(ev.externalUrl || ev.secondaryExternalUrl) && (
        <div className="mt-4 flex flex-col gap-2">
          {ev.externalUrl && (
            <a
              href={ev.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-bay-blue hover:underline"
            >
              {ev.externalLinkLabel ?? 'Official details (City of Roseville)'}
            </a>
          )}
          {ev.secondaryExternalUrl && (
            <a
              href={ev.secondaryExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-bay-blue hover:underline"
            >
              {ev.secondaryExternalLinkLabel ?? 'More info'}
            </a>
          )}
        </div>
      )}
      <p className="mt-4 pt-4 border-t border-mist text-xs text-slate leading-relaxed">
        <Link to="/membership" className="font-semibold text-copper hover:text-redwood hover:underline">
          ZANC members
        </Link>{' '}
        receive priority access and discounted pricing where noted—join or renew to stay close to the calendar.
      </p>
    </article>
  );
}

function FeaturedSignatureCard({ ev }: { ev: CommunityEvent }) {
  return (
    <article
      id={ev.anchorId}
      className="rounded-2xl border-2 border-copper/50 bg-gradient-to-br from-copper-glow via-white to-cloud shadow-md scroll-mt-24 overflow-hidden mb-8 md:mb-10"
    >
      <div className="px-5 py-4 md:px-8 md:py-5 border-b border-copper/20 bg-zambia-green/5">
        <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">2026 signature anchor</p>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-zambia-green mt-1">{ev.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
            {ev.dateLabel}
          </span>
          {ev.feeNote && (
            <span className="text-xs text-slate bg-white px-2 py-1 rounded border border-mist">{ev.feeNote}</span>
          )}
        </div>
      </div>
      <div className="p-5 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10">
        <p className="text-slate text-sm leading-relaxed whitespace-pre-line">{ev.description}</p>
        <div className="text-sm text-slate space-y-3">
          <p>
            <span className="font-semibold text-zambia-green">Where</span> · {ev.location}
          </p>
          <p className="text-xs leading-relaxed">
            This is the prestige moment that helps neighbors plan their year around ZANC—not just hear about us once, but mark the date.
          </p>
          <p className="pt-2">
            <Link to="/membership" className="font-semibold text-copper hover:underline">
              Members — priority access when details are announced
            </Link>
          </p>
        </div>
      </div>
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
  const [eventLaneFilter, setEventLaneFilter] = useState<CalendarLane | 'all'>('all');
  const [upcomingGridExpanded, setUpcomingGridExpanded] = useState(false);
  const upcomingSectionRef = useRef<HTMLDivElement>(null);
  const countdown = useNextCountdownMilestone();

  const events = ZANC_COMMUNITY_EVENTS;
  const upcomingEvents = useMemo(() => events.filter((e) => e.type === 'upcoming'), [events]);
  const pastEvents = useMemo(() => events.filter((e) => e.type === 'past'), [events]);
  const featuredUpcoming = useMemo(() => upcomingEvents.find((e) => e.featured), [upcomingEvents]);
  const filteredUpcomingGrid = useMemo(() => {
    const rest = upcomingEvents.filter((e) => !e.featured);
    if (eventLaneFilter === 'all') return rest;
    return rest.filter((e) => e.lanes?.includes(eventLaneFilter));
  }, [upcomingEvents, eventLaneFilter]);
  const showFeaturedCard = useMemo(() => {
    if (!featuredUpcoming) return false;
    if (eventLaneFilter === 'all') return true;
    return Boolean(featuredUpcoming.lanes?.includes(eventLaneFilter));
  }, [featuredUpcoming, eventLaneFilter]);

  useEffect(() => {
    setUpcomingGridExpanded(false);
  }, [eventLaneFilter]);

  const focusUpcomingEvents = useCallback(() => {
    setTab('all');
    window.requestAnimationFrame(() => {
      upcomingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

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

  const laneFilterIds = ['all', 'family', 'business', 'culture', 'sports', 'signature'] as const;

  const upcomingEventsBlock = (cardHeading: 'h3' | 'h4') => (
    <>
      {!countdown.ended && (
        <div className="mb-6 rounded-xl border border-mist bg-white p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Next milestone</p>
            <p className="font-heading font-semibold text-zambia-green mt-0.5">{countdown.label}</p>
          </div>
          <div className="flex items-baseline gap-8">
            <div>
              <span className="text-3xl md:text-4xl font-heading font-bold text-zambia-green tabular-nums">{countdown.days}</span>
              <span className="text-sm text-slate ml-1">days</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-heading font-bold text-zambia-green tabular-nums">{countdown.hours}</span>
              <span className="text-sm text-slate ml-1">hours</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center gap-x-2 gap-y-2 mb-5">
        <span className="text-xs font-medium text-slate shrink-0">Lanes:</span>
        <div className="flex flex-wrap gap-2">
          {laneFilterIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setEventLaneFilter(id)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                eventLaneFilter === id
                  ? 'bg-copper text-white border-copper'
                  : 'bg-white text-slate border-mist hover:bg-cloud'
              }`}
            >
              {id === 'all' ? 'All' : LANE_LABELS[id]}
            </button>
          ))}
        </div>
      </div>

      {showFeaturedCard && featuredUpcoming ? <FeaturedSignatureCard ev={featuredUpcoming} /> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
        {(upcomingGridExpanded ? filteredUpcomingGrid : filteredUpcomingGrid.slice(0, UPCOMING_GRID_PAGE_SIZE)).map((ev) => (
          <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} headingLevel={cardHeading} />
        ))}
      </div>
      {filteredUpcomingGrid.length === 0 ? (
        <p className="text-sm text-slate mt-4">Nothing in this lane right now — choose &quot;All&quot; or another category.</p>
      ) : null}
      {filteredUpcomingGrid.length > UPCOMING_GRID_PAGE_SIZE ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => setUpcomingGridExpanded((v) => !v)}
            className="border-mist text-slate hover:bg-cloud"
          >
            {upcomingGridExpanded
              ? 'Show fewer events'
              : `View more (${filteredUpcomingGrid.length - UPCOMING_GRID_PAGE_SIZE} more)`}
          </Button>
        </div>
      ) : null}

      <div className="mt-6 bg-white rounded-xl border border-mist p-6 shadow-sm max-w-2xl">
        <p className="text-slate text-sm">
          Full 2026 pulse, insurance deadlines, and premium dates — open the calendar anytime.
        </p>
        <div className="mt-4">
          <Button variant="accent" onClick={openCalendar}>
            Open calendar
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <PageHeader title="Events & News" />
      <section className="bg-zambia-green text-white border-b border-zambia-green-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <p className="text-xs font-heading uppercase tracking-[0.14em] text-white/75">2026 · ZANC calendar live</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mt-2">2026 ZANC Calendar Now Live</h2>
          <p className="text-white/90 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
            {CALENDAR_2026_THEME} — a living organization with momentum, belonging, and things worth joining. Plan your year with us.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="accent" type="button" onClick={focusUpcomingEvents}>
              Explore events
            </Button>
            <Button
              variant="outline"
              className="!border-2 !border-white/90 !bg-transparent !text-white shadow-sm hover:!bg-white/15 hover:!text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zambia-green"
              type="button"
              onClick={openCalendar}
            >
              Full calendar
            </Button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="min-w-0">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Events &amp; News</h2>
              <p className="text-slate mt-2 max-w-2xl text-sm md:text-base leading-relaxed">
                Upcoming gatherings first — then stories from the community. Save the dates that fit your year; dip into news when you
                want the wider picture.
              </p>
            </div>
            <Button variant="accent" className="shrink-0 self-start sm:self-center" onClick={openCalendar}>
              Review this year’s calendar
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
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
            <div className="space-y-12 md:space-y-16">
              <div ref={upcomingSectionRef} id="upcoming-events" className="scroll-mt-28 pb-10 md:pb-12 border-b border-mist/80">
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Upcoming events</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl leading-relaxed">
                  Social, professional, cultural, and signature moments — filter by lane, then save the dates that fit your story.
                </p>
                {upcomingEventsBlock('h4')}
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Latest updates</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl leading-relaxed">
                  Micro articles and announcements. Tap any card to read the full story in a pop-up.
                </p>
                {newsGrid}
              </div>

              <div id="past-highlights" className="pt-2">
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Past highlights</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl leading-relaxed">Where we’ve already shown up together.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                  {pastEvents.map((ev) => (
                    <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} headingLevel="h4" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'upcoming' && (
            <div className="space-y-6">
              <p className="text-slate text-sm max-w-2xl leading-relaxed">
                The full arc of 2026 — from brunches to the signature gala — with room for recurring programs that keep the rhythm
                going.
              </p>
              <div ref={upcomingSectionRef} id="upcoming-events" className="scroll-mt-28 space-y-1">
                {upcomingEventsBlock('h3')}
              </div>
            </div>
          )}

          {tab === 'past' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              {pastEvents.map((ev) => (
                <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} />
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
                <h3 className="text-lg font-heading font-semibold text-zambia-green">2026 ZANC calendar pulse</h3>
                <button
                  type="button"
                  onClick={closeCalendar}
                  className="text-gray-500 hover:text-gray-800 px-2 py-1 rounded"
                  aria-label="Close calendar"
                >
                  ✕
                </button>
              </div>
              <div className="p-5 max-h-[min(70vh,520px)] overflow-y-auto space-y-4">
                {CALENDAR_MODAL_SECTIONS.map((block) => (
                  <div key={block.title} className="rounded-md border border-mist p-4 bg-cloud">
                    <p className="font-heading font-semibold text-zambia-green capitalize">{block.title}</p>
                    <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc pl-5">
                      {block.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
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
