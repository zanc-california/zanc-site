import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CommunityPhotoStrip from '../components/CommunityPhotoStrip';
import NewsFeedCard from '../components/NewsFeedCard';
import CommunityCalendarModal from '../components/CommunityCalendarModal';
import NearbyEventCard from '../components/NearbyEventCard';
import { getUpcomingNearbyEvents } from '../data/nearbyEvents2026';
import NewsArticleModal, { type ModalArticleContent } from '../components/NewsArticleModal';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';
import {
  CALENDAR_2026_THEME,
  COUNTDOWN_MILESTONES,
  getArchivedPlans,
  getPastEvents,
  getUpcomingEvents,
  hasConcluded,
  type CalendarLane,
  type CommunityEvent,
} from '../data/communityCalendar2026';
import { ENROLLMENT_WINDOW_LABEL, getEnrollmentStatus } from '../data/insuranceProgram';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { WOODLAND_PRESS_RELEASE } from '../data/woodlandPressRelease2026';
import { INDEPENDENCE_RECAP, INDEPENDENCE_RECAP_HERO } from '../data/independence2026Recap';

type StaticNewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  bodyParagraphs: string[];
  articlePath?: string;
};

/** Site-authored micro-articles (News + All tabs): latest recap, related updates, then the archive. */
const STATIC_NEWS_ARTICLES: StaticNewsArticle[] = [
  {
    id: 'independence-2026-recap',
    title: INDEPENDENCE_RECAP.title,
    excerpt: INDEPENDENCE_RECAP.excerpt,
    date: `${INDEPENDENCE_RECAP.date} · Photos: Nirav Solanki`,
    imageUrl: INDEPENDENCE_RECAP_HERO.image_url,
    bodyParagraphs: [],
    articlePath: '/independence',
  },
  {
    id: WOODLAND_PRESS_RELEASE.slug,
    title: WOODLAND_PRESS_RELEASE.title,
    excerpt: WOODLAND_PRESS_RELEASE.subtitle,
    date: `Press release · ${WOODLAND_PRESS_RELEASE.publishedDate}`,
    imageUrl: '/images/brand/zanc-mark-512.jpg',
    bodyParagraphs: [],
    articlePath: WOODLAND_PRESS_RELEASE.path,
  },
  {
    id: 'sacramento-lusaka-visit-2026',
    title: 'Opening a conversation between Sacramento and Lusaka',
    excerpt: 'ZANC and Zambia’s Honorary Consul met with Vice Mayor Karina Talamantes’ office to introduce Zambia and explore opportunities for cooperation.',
    date: 'September 28, 2026',
    imageUrl: '/images/postings/sacramento-visit-2026-09-28.png',
    bodyParagraphs: [
      'On September 28, ZANC President Mabvuto Kaela and Rajen Ranchhod, Honorary Consul of the Republic of Zambia in California, visited Sacramento City Hall for a 30-minute introductory discussion with Vice Mayor Karina Talamantes’ office.',
      'The conversation introduced Zambia, its strengths and its regional context, and explored the proposed Sacramento–Lusaka capital-to-capital initiative. Areas raised included agriculture and food systems, education and youth exchange, trade and investment, tourism and culture, and cooperation between public institutions.',
      'The proposal suggests exploring a suitable cooperation framework, identifying a city point of contact and bringing regional partners together for a roundtable. It also raises the possibility of a Sacramento–Zambia Business, Agriculture & Investment Forum in 2027. These remain proposals for further discussion; no formal partnership or forum has been agreed.',
      'The visit also opened a connection with the Vice Mayor’s team ahead of our October 24 Independence celebration. Thank you to the office for making time to learn about Zambia and meet with our community representatives.',
    ],
  },
  {
    id: 'sf-flag-raising-community-2026',
    title: 'Zambia’s flag at San Francisco City Hall: a moment to remember',
    excerpt: 'Our October 23 flag raising marked Zambia’s 62nd independence anniversary, followed by a proclamation recognizing Zambian-American friendship and heritage on October 24, 2026.',
    date: 'Recap · October 23, 2026',
    bodyParagraphs: [
      'Zambians and friends of Zambia gathered at San Francisco City Hall on Friday, October 23, 2026 for a civic flag raising marking Zambia’s 62nd independence anniversary.',
      'A City proclamation designated October 24, 2026 as “Zambian-American Friendship and Heritage Day” in San Francisco. It recognized the contributions of Zambians and Zambian-Americans and the friendship between our communities.',
      'Thank you to Honorary Consul Rajen Ranchhod, the City’s Protocol Office and everyone who joined the occasion. The flag raising preceded Saturday’s community celebration in Woodland.',
    ],
  },
  {
    id: 'global-sacramento-launch-2026',
    title: 'Global Sacramento: connecting our community with the wider world',
    excerpt: 'Attending the September 22 launch at the Crocker Art Museum opened conversations about cultural diplomacy, education and trade between Zambia and Greater Sacramento.',
    date: 'September 22, 2026',
    imageUrl: '/images/postings/global-sacramento-launch-2026.png',
    bodyParagraphs: [
      'ZANC was represented at Global Sacramento’s launch celebration at the Crocker Art Museum on September 22, 2026. The evening brought international dialogue, culture and community together, with a panel themed “Sacramento Meets the World: Diplomacy, Culture & Commerce.”',
      'For our community, the launch was a reminder that international connections can begin close to home. Sharing Zambian food, music and heritage gives people a reason to meet, ask questions and learn about one another. Those encounters can also open conversations about education, tourism, agriculture, technology and trade.',
      'Zambians living in Northern California bring knowledge, professional experience and relationships in both places. ZANC can help make introductions, share community perspectives and identify people interested in practical exchanges that would benefit Zambia and the Sacramento region. Attendance at the launch is an opening for that work, with any future collaboration to be developed through further discussion.',
      'Thank you to the Global Sacramento organizers and everyone who contributed to the launch. We look forward to staying engaged and helping more members of our community take part in the region’s international conversations.',
    ],
  },
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
    imageUrl: '/images/brand/zanc-mark-512.jpg',
    bodyParagraphs: [
      'ZANC recently completed general elections for the 2026–2028 term. Members stepped forward to shape programming, stewardship, and community life—and the association is grateful to everyone who participated, whether on the ballot, behind the scenes, or at the polls.',
      'A new committee is now in place to carry forward ZANC’s mission: preserving Zambian heritage, strengthening ties across Northern California, and welcoming partners near and far.',
      'Election seasons are also a reminder that this organization belongs to its members. Your ideas, feedback, and willingness to serve keep the community vibrant. Watch Events & News and your email for ways to plug in under the new leadership.',
    ],
  },
  {
    id: 'local-open-enrollment-insurance-2026',
    title: `Group Life Insurance — open enrollment runs ${ENROLLMENT_WINDOW_LABEL}`,
    excerpt: `ZANC’s Hartford Group Life Insurance program opens enrollment each summer. ${
      getEnrollmentStatus().statusLabel
    }. ${getEnrollmentStatus().nextWindowLabel}`,
    date: 'Yearly window',
    imageUrl: '/images/hartford-logo.jpg',
    bodyParagraphs: [
      `ZANC partners with Hartford Insurance to offer a cultural Group Life Insurance program for members and eligible dependents. Each year, open enrollment runs from June 1 through July 31. ${getEnrollmentStatus().statusLabel} — ${getEnrollmentStatus().nextWindowLabel}`,
      'If you are considering coverage—or renewing or adding dependents—the open enrollment window is when you complete your paperwork and payment steps with the insurance team. Existing coverage is not affected outside that window.',
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
        <div className="-mx-6 -mt-6 mb-4 border-b border-mist bg-zambia-green/10">
          <img
            src={ev.imageUrl}
            alt={imageAlt}
            className={`w-full object-center ${ev.heroImageTall ? 'h-64 sm:h-72 object-contain' : 'h-44 sm:h-52 object-cover'}`}
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-3">
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
        {hasConcluded(ev) && (
          <span className="text-[10px] font-heading uppercase tracking-[0.08em] text-slate bg-mist/60 px-2 py-1 rounded-full border border-mist">
            Past date
          </span>
        )}
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
      {ev.venueAddress && <p className="mt-2 text-xs text-slate">{ev.venueAddress}</p>}
      {ev.galleryImages && ev.galleryImages.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-heading uppercase tracking-[0.08em] text-copper mb-2">Event photos</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ev.galleryImages.map((img, i) => (
              <a
                key={i}
                href={img}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg overflow-hidden border border-mist bg-copper-glow/30 hover:opacity-90 transition-opacity"
              >
                <img
                  src={img}
                  alt={`${ev.title} — photo ${i + 1}`}
                  className="w-full h-28 object-cover"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      )}
      {ev.videoUrl && (
        <div className="mt-4">
          <p className="text-xs font-heading uppercase tracking-[0.08em] text-copper mb-2">Event video</p>
          <video
            src={ev.videoUrl}
            controls
            preload="metadata"
            className="w-full rounded-lg border border-mist"
            style={{ maxHeight: '320px' }}
          >
            Your browser does not support the video element.
          </video>
        </div>
      )}
      {ev.detailPath && (
        <div className="mt-4">
          <Link
            to={ev.detailPath}
            className="inline-flex items-center gap-1 text-sm font-semibold text-copper hover:text-redwood hover:underline"
          >
            {ev.type === 'past' ? 'Read the recap →' : 'Full event details, hotel & how to take part →'}
          </Link>
        </div>
      )}
      {(ev.externalUrl || ev.secondaryExternalUrl) && (
        <div className="mt-4 flex flex-col gap-2">
          {ev.externalUrl && (
            <a
              href={ev.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-bay-blue hover:underline"
            >
              {ev.externalLinkLabel ?? 'Official details'}
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
      {ev.communityOrganized ? (
        <p className="mt-4 pt-4 border-t border-mist text-[11px] text-slate/75 italic leading-relaxed">
          Community-organized event — shared for visibility only; not directly sponsored by ZANC.
        </p>
      ) : null}
    </article>
  );
}

function FeaturedSignatureCard({ ev }: { ev: CommunityEvent }) {
  return (
    <article id={ev.anchorId} className="rounded-2xl border border-copper/40 bg-white shadow-sm scroll-mt-28 overflow-hidden">
      <img src="/images/postings/independence-2026-banner.png" alt="Celebrating 62 years of Zambian independence" width="1774" height="887" className="w-full h-auto" />
      <div className="p-5 sm:p-7">
        <p className="text-xs font-heading uppercase tracking-widest text-copper">ZANC Independence celebration</p>
        <h4 className="mt-2 text-2xl font-heading font-bold text-zambia-green">{ev.title}</h4>
        <p className="mt-3 text-sm leading-relaxed text-slate">An evening of Zambian heritage, music and community in Woodland. Families and friends of Zambia are warmly welcome.</p>
        <div className="mt-5 space-y-3 text-sm text-slate">
          <p className="font-semibold text-zambia-green">{ev.dateLabel} · doors open 5:30 PM</p>
          <p>{ev.venueName}<span className="block mt-1 text-xs">{ev.venueAddress}</span></p>
          <p className="rounded-lg bg-copper-glow/60 p-3">{ev.feeNote}<span className="block mt-1 text-xs">Advance reservations requested for everyone, including children.</span></p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {ev.externalUrl && <a href={ev.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-zambia-green px-5 py-3 text-sm font-semibold !text-white hover:bg-redwood">Reserve your place ↗</a>}
          {ev.detailPath && <Link to={ev.detailPath} className="text-sm font-semibold text-copper hover:underline">Full details &amp; hotel →</Link>}
        </div>
      </div>
    </article>
  );
}

const News = () => {
  const navigate = useNavigate();
  useDocumentMeta({
    title: 'Events & News',
    description:
      'The ZANC community calendar — upcoming events, Independence 2026 photos and celebration highlights, ' +
      'past event recaps, community programmes, and association news.',
    path: '/news',
  });

  const [newsItems, setNewsItems] = useState<DbNewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tab, setTab] = useState<'all' | 'upcoming' | 'past' | 'news'>('all');
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [modalArticle, setModalArticle] = useState<ModalArticleContent | null>(null);
  const [eventLaneFilter, setEventLaneFilter] = useState<CalendarLane | 'all'>('all');
  const upcomingSectionRef = useRef<HTMLDivElement>(null);
  const countdown = useNextCountdownMilestone();

  const allUpcomingEvents = getUpcomingEvents();
  const upcomingEvents = allUpcomingEvents.filter((event) => event.countdownAt);
  const plannedEvents = allUpcomingEvents.filter((event) => !event.countdownAt);
  const nearbyEvents = getUpcomingNearbyEvents().filter((event) => eventLaneFilter === 'all' || event.lanes.includes(eventLaneFilter));
  const archivedPlans = getArchivedPlans();
  // Includes events that have aged out of "upcoming" on their own, so nothing vanishes from the site.
  const allPastEvents = getPastEvents();
  const pastEvents = allPastEvents.filter((event) => event.type === 'past');
  const earlierListings = allPastEvents.filter((event) => event.type !== 'past');
  const earlierListingsBlock = earlierListings.length > 0 ? (
    <details className="mt-6 rounded-xl border border-mist bg-white p-5 sm:p-6">
      <summary className="cursor-pointer font-heading font-semibold text-zambia-green">Earlier calendar listings ({earlierListings.length})</summary>
      <p className="mt-3 text-sm leading-relaxed text-slate">These dates have passed. The listings are kept for reference; they are separate from our completed-event recaps.</p>
      <div className="mt-4 divide-y divide-mist">
        {earlierListings.map((event) => (
          <article key={event.anchorId} id={event.anchorId} className="scroll-mt-28 py-4 first:pt-0 last:pb-0">
            <h4 className="font-semibold text-zambia-green">{event.title}</h4>
            <p className="mt-1 text-xs text-slate">{event.dateLabel} · {event.location}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">{event.description}</p>
          </article>
        ))}
      </div>
    </details>
  ) : null;
  const archivedPlansBlock = (
    <details id="archived-plans" className="rounded-xl border border-mist bg-white p-5 sm:p-6">
      <summary className="cursor-pointer font-heading font-semibold text-zambia-green">
        Archived 2026 plans — not held ({archivedPlans.length})
      </summary>
      <p className="mt-3 text-sm text-slate leading-relaxed">
        These plans did not go ahead. Any future edition will be announced separately once confirmed.
      </p>
      <div className="mt-4 divide-y divide-mist">
        {archivedPlans.map((ev) => (
          <article key={ev.anchorId} id={ev.anchorId} className="py-4 first:pt-0 last:pb-0">
            <h4 className="font-semibold text-zambia-green">{ev.title}</h4>
            <p className="mt-2 text-sm text-slate leading-relaxed">{ev.description}</p>
          </article>
        ))}
      </div>
    </details>
  );
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
            imageFit={[WOODLAND_PRESS_RELEASE.slug, 'sf-flag-raising-community-2026', 'local-elections-2026', 'local-open-enrollment-insurance-2026'].includes(article.id) ? 'contain' : 'cover'}
            onOpen={() => article.articlePath ? navigate(article.articlePath) : openStaticArticle(article)}
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

    </>
  );

  const laneFilterIds = ['all', 'family', 'business', 'culture', 'sports', 'signature'] as const;

  const upcomingEventsBlock = (cardHeading: 'h3' | 'h4') => (
    <>
      {!countdown.ended && (
        <div className="mb-6 rounded-xl border border-mist bg-white p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
        <span className="text-xs font-medium text-slate shrink-0">Explore:</span>
        <div className="flex flex-wrap gap-2">
          {laneFilterIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setEventLaneFilter(id)}
              aria-pressed={eventLaneFilter === id}
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

      {(showFeaturedCard || filteredUpcomingGrid.length > 0) && (
        <section aria-label="ZANC community gatherings">
          <p className="mb-4 text-xs font-heading uppercase tracking-widest text-copper">With our ZANC community</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {showFeaturedCard && featuredUpcoming && <FeaturedSignatureCard ev={featuredUpcoming} />}
            {filteredUpcomingGrid.map((ev) => <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} headingLevel={cardHeading} />)}
          </div>
        </section>
      )}

      {nearbyEvents.length > 0 && (
        <section aria-labelledby="nearby-events-heading" className="mt-10 sm:mt-12">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-heading uppercase tracking-widest text-copper">Around Northern California</p>
            <h3 id="nearby-events-heading" className="mt-2 text-2xl font-heading font-semibold text-zambia-green">More ways to get together</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">Local outings to enjoy between ZANC gatherings. These events are run by the hosts named on each card; ZANC is sharing them for the community.</p>
            <p className="mt-2 text-xs text-slate">Organizer listings checked October 14, 2026. Visit their pages for current details. The ladies’ picnic is a community-supplied save-the-date.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nearbyEvents.map((event) => <NearbyEventCard key={event.id} event={event} />)}
          </div>
        </section>
      )}
      {!showFeaturedCard && filteredUpcomingGrid.length === 0 && nearbyEvents.length === 0 && (
        <div className="rounded-xl bg-white border border-mist p-6 text-sm text-slate" role="status">No confirmed upcoming events in this category yet. Choose All to explore the calendar.</div>
      )}
      {plannedEvents.length > 0 && (
        <details className="mt-8 rounded-xl border border-mist bg-white p-5 sm:p-6">
          <summary className="cursor-pointer font-heading font-semibold text-zambia-green">ZANC programs awaiting dates ({plannedEvents.length})</summary>
          <p className="mt-3 text-sm text-slate">These ideas and recurring programs are still being planned. We’ll add them to the calendar when dates and arrangements are confirmed.</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate">
            {plannedEvents.map((event) => <li id={event.anchorId} key={event.anchorId} className="scroll-mt-28 border-t border-mist pt-3">{event.title}</li>)}
          </ul>
        </details>
      )}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-mist p-5 sm:p-6 bg-cloud">
        <div><p className="font-heading font-semibold text-zambia-green">Keep the community calendar close</p><p className="mt-1 text-sm text-slate">ZANC dates, program plans and insurance deadlines in one place.</p></div>
        <Button variant="outline" onClick={openCalendar} className="shrink-0">Open calendar</Button>
      </div>
    </>
  );

  return (
    <div>
      <section className="bg-zambia-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-10 md:pb-12">
          <p className="text-xs font-heading uppercase tracking-[0.14em] text-white/75">Gather, celebrate, stay connected</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold font-heading">Events &amp; News</h1>
          <div className="text-left">
            <p className="text-white/90 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
              {CALENDAR_2026_THEME}. Find your next gathering and catch up on community news.
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
        </div>
      </section>
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Browse events and community news</h2>
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
                aria-pressed={tab === t.id}
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
                  Confirmed ZANC gatherings and community outings across Northern California. Find a date, bring a friend and make a day of it.
                </p>
                {upcomingEventsBlock('h4')}
              </div>

              <div id="latest-updates" className="scroll-mt-28">
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Latest updates</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl leading-relaxed">
                  Stories, announcements and updates from our community.
                </p>
                {newsGrid}
              </div>

              <div id="past-highlights" className="pt-2">
                <h3 className="text-lg font-heading font-semibold text-zambia-green mb-2">Past highlights</h3>
                <p className="text-sm text-slate mb-6 max-w-2xl leading-relaxed">Past gatherings and earlier community calendar listings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                  {pastEvents.map((ev) => (
                    <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} headingLevel="h4" />
                  ))}
                </div>
              </div>
              {earlierListingsBlock}
              {archivedPlansBlock}
            </div>
          )}

          {tab === 'upcoming' && (
            <div className="space-y-6">
              <p className="text-slate text-sm max-w-2xl leading-relaxed">
                Explore confirmed ZANC gatherings, local outings and community save-the-dates. All event times are Pacific.
              </p>
              <div ref={upcomingSectionRef} id="upcoming-events" className="scroll-mt-28 space-y-1">
                {upcomingEventsBlock('h3')}
              </div>
            </div>
          )}

          {tab === 'past' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {pastEvents.map((ev) => (
                  <EventProgramCard key={ev.anchorId ?? ev.title} ev={ev} />
                ))}
              </div>
              {earlierListingsBlock}
              {archivedPlansBlock}
            </div>
          )}

          {tab === 'news' && (
            <div>
              <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Latest updates</h3>
              <p className="text-sm text-slate mb-6 max-w-2xl">
                Catch up on community life, civic connections and association news.
              </p>
              {newsGrid}
            </div>
          )}
        </div>
      </section>

      <CommunityPhotoStrip />

      <NewsArticleModal open={articleModalOpen} onClose={closeArticleModal} article={modalArticle} />

      <CommunityCalendarModal open={isCalendarOpen} onClose={closeCalendar} />

    </div>
  );
};

export default News;
