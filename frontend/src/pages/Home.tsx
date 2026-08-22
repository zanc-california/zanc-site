import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import FeaturedCommunitySpotlight from '../components/FeaturedCommunitySpotlight';
import LandingEventSpotlightModal from '../components/LandingEventSpotlightModal';
import SubscribeModal from '../components/SubscribeModal';
import { getIndependenceEvent, getNextUpcomingEvent } from '../data/communityCalendar2026';
import { isJulyFourthWeek, JULY_FOURTH_2026_HERO } from '../data/julyFourth2026';
import { HOME_STATS } from '../data/siteStats';
import { heroImages } from '../heroImages';
import JulyFourthCommunityNote from '../components/JulyFourthCommunityNote';
import Reveal from '../components/Reveal';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

function eventCardExcerpt(description: string, maxLen = 158) {
  const first = description.split(/\n\n/)[0]?.trim() ?? description.trim();
  if (first.length <= maxLen) return first;
  return `${first.slice(0, maxLen - 1)}…`;
}

/** NorCal / SoCal region chips — fixed footprint so all eight match. */
function RegionMiniCard({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="group bg-white rounded-lg border border-mist shadow-sm flex h-[7.5rem] sm:h-[8rem] w-full flex-col items-center justify-center gap-2 px-2 py-3 ui-card-motion ui-card-motion-hover ui-card-motion-active motion-safe:hover:scale-[1.02]">
      <span className="text-2xl shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110" aria-hidden>
        {icon}
      </span>
      <span className="text-xs sm:text-sm font-heading font-semibold text-zambia-green text-center leading-tight line-clamp-2">
        {label}
      </span>
    </div>
  );
}

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [spotlightModalOpen, setSpotlightModalOpen] = useState(false);
  const independence = getIndependenceEvent();

  const landingSpotlightEvent = getNextUpcomingEvent();

  const julyFourthActive = isJulyFourthWeek();
  const hero = julyFourthActive ? JULY_FOURTH_2026_HERO : heroImages[currentHero];
  const heroOutlineButtonClass =
    '!w-full sm:!w-auto !justify-center !bg-transparent !text-white border-white/80 hover:!bg-white/10 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zambia-green';

  useDocumentMeta({ path: '/' });

  useEffect(() => {
    if (julyFourthActive) return;
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [julyFourthActive]);

  return (
    <div className="bg-fog">
      <section className={`relative overflow-hidden ${julyFourthActive ? 'min-h-[min(72vh,640px)]' : ''}`}>
        <div className="absolute inset-0">
          <img
            src={hero.src}
            alt={hero.alt}
            className={`w-full h-full object-cover ${julyFourthActive ? 'object-center' : ''}`}
          />
          <div
            className={
              julyFourthActive
                ? 'absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent'
                : 'absolute inset-0 bg-gradient-to-r from-zambia-green/90 via-zambia-green/60 to-black/20'
            }
          />
        </div>

        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
            julyFourthActive ? 'flex min-h-[min(72vh,640px)] flex-col justify-end py-10 md:py-14' : 'py-16 md:py-24'
          }`}
        >
          <div className={julyFourthActive ? 'w-full' : 'max-w-2xl'}>
            {!julyFourthActive && (
              <>
                <p className="inline-flex items-center gap-2 text-white/90 text-sm uppercase tracking-[0.08em] font-heading">
                  <span className="h-2 w-2 rounded-full bg-copper ui-hero-pulse-dot shadow-[0_0_12px_rgba(184,115,51,0.65)]" />
                  Zambian soul, NorCal polish
                </p>
                <h1 className="mt-4 text-4xl md:text-6xl font-heading font-bold text-white tracking-[-0.02em] drop-shadow">
                  Zambian Heritage.
                  <br />
                  NorCal Community.
                </h1>
                <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed">
                  Connecting Zambians across Northern California since 2017 — rooted in culture, thriving in community.
                </p>
              </>
            )}

            <div className={`grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:flex-wrap ${julyFourthActive ? '' : 'mt-8'}`}>
              <Link to="/membership" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Join ZANC
                </Button>
              </Link>
              <Link to="/news" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className={heroOutlineButtonClass}>
                  Explore Events
                </Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setSubscribeOpen(true)}
                className={heroOutlineButtonClass}
                aria-haspopup="dialog"
                aria-label="Open subscribe form for ZANC email updates"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
      <LandingEventSpotlightModal
        open={spotlightModalOpen}
        onClose={() => setSpotlightModalOpen(false)}
        event={landingSpotlightEvent}
      />

      {/* Independence — the flagship event, given first position after the hero. */}
      {independence && (
        <section className="py-10 md:py-14 bg-gray-50 border-b border-mist">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="overflow-hidden rounded-2xl border-2 border-copper/40 bg-gradient-to-br from-copper-glow via-white to-cloud shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
                  <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">
                    ZANC flagship event · save the date
                  </p>
                  <h2 className="mt-2 text-2xl md:text-4xl font-heading font-bold text-zambia-green tracking-[-0.01em]">
                    Zambian Independence Celebration 2026
                  </h2>
                  <p className="mt-3 text-lg font-heading font-semibold text-redwood">Saturday, October 24, 2026</p>
                  <p className="mt-1 text-sm text-slate leading-relaxed">
                    {independence.venueName}
                    <br />
                    {independence.venueAddress}
                  </p>
                  <p className="mt-4 text-slate leading-relaxed max-w-xl">
                    One flagship Saturday celebration — formal, cultural, and social. Members and friends from Northern California,
                    Southern California, and out of town are all warmly encouraged to join us. Programme and ticketing details are
                    coming soon.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:flex-wrap">
                    <Link to="/independence" className="w-full sm:w-auto">
                      <Button variant="accent" size="lg" className="w-full sm:w-auto">
                        Event details
                      </Button>
                    </Link>
                    {independence.accommodation?.bookingUrl && (
                      <a
                        href={independence.accommodation.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                          Book the host hotel
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-copper/25 bg-white/70 p-6 md:p-8 flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Where to stay</p>
                    <p className="mt-1 text-sm text-slate leading-relaxed">
                      Special ZANC Independence group rate available through the host hotel
                      {independence.accommodation?.groupRate ? ` — ${independence.accommodation.groupRate}` : ''}.
                    </p>
                    {independence.accommodation?.bookingDeadline && (
                      <p className="mt-1 text-sm text-slate">Book by {independence.accommodation.bookingDeadline}.</p>
                    )}
                  </div>
                  <div className="border-t border-mist pt-4">
                    <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Help make it happen</p>
                    <p className="mt-1 text-sm text-slate leading-relaxed">
                      We are inviting community members to join the cooking and décor teams — defined responsibilities may be
                      compensated.
                    </p>
                    <Link
                      to="/independence#take-part"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-bay-blue hover:underline"
                    >
                      See how to take part →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-10 md:py-14 bg-white border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">What&apos;s Happening in the Community</h2>
              <p className="text-slate mt-1 max-w-2xl">
                What&apos;s coming up next, plus steady ways to plug in — in person, online, and across the diaspora.
              </p>
            </div>
            <Link to="/news?calendar=1" className="shrink-0">
              <Button variant="primary">Review this year&apos;s calendar</Button>
            </Link>
          </Reveal>
          {julyFourthActive && (
            <div className="mb-6">
              <JulyFourthCommunityNote />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingSpotlightEvent ? (
              <Reveal
                key={landingSpotlightEvent.anchorId ?? landingSpotlightEvent.title}
                delayMs={0}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-copper/25 p-6 shadow-[0_4px_24px_-4px_rgba(27,94,32,0.1),0_0_36px_rgba(184,115,51,0.14)] ring-2 ring-copper/15 ring-offset-2 ring-offset-white ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Next up</p>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                    {landingSpotlightEvent.title}
                  </h3>
                  <span className="text-[10px] font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist shrink-0">
                    {landingSpotlightEvent.dateLabel}
                  </span>
                </div>
                <p className="text-slate mt-3 leading-relaxed text-sm flex-1">{eventCardExcerpt(landingSpotlightEvent.description)}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <button
                    type="button"
                    onClick={() => setSpotlightModalOpen(true)}
                    className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 text-left motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                  >
                    Event details →
                  </button>
                  <Link
                    to={landingSpotlightEvent.anchorId ? `/news#${landingSpotlightEvent.anchorId}` : '/news'}
                    className="text-slate font-medium text-sm hover:text-bay-blue inline-flex items-center gap-1"
                  >
                    On Events &amp; News →
                  </Link>
                </div>
              </Reveal>
            ) : (
              <Reveal
                key="events-fallback"
                delayMs={0}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-mist p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                  Events &amp; News
                </h3>
                <p className="text-slate mt-3 leading-relaxed text-sm flex-1">
                  See the full calendar, RSVPs, and what&apos;s coming next for ZANC in Northern California.
                </p>
                <div className="mt-4">
                  <Link
                    to="/news"
                    className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                  >
                    Explore events →
                  </Link>
                </div>
              </Reveal>
            )}
            {[
              {
                title: 'Community Hangouts',
                excerpt: 'Casual gatherings, games, and connection.',
                href: '/news#community-hangouts',
                external: false,
              },
              {
                title: 'Shipping to Zambia',
                excerpt: 'Coordinate shared container shipping.',
                href: 'https://link360.vercel.app/',
                external: true,
              },
              {
                title: 'Business & Investment Series',
                excerpt: "Learn how diaspora can engage in Zambia's growth.",
                href: '/news#business-investment-series',
                external: false,
              },
            ].map((card, i) => (
              <Reveal
                key={card.title}
                delayMs={(i + 1) * 80}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-mist p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                  {card.title}
                </h3>
                <p className="text-slate mt-3 leading-relaxed text-sm flex-1">{card.excerpt}</p>
                <div className="mt-4">
                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                    >
                      Start on Link360 →
                    </a>
                  ) : (
                    <Link
                      to={card.href}
                      className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                    >
                      Learn more →
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gray-50 border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Get Involved</h2>
            <p className="text-slate mt-1 max-w-2xl">
              Step from browsing into participating — the ZANC community grows when members show up, volunteer, and partner with us.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Join ZANC',
                excerpt: 'Become a member for voting rights, events, and updates that keep you close to the community.',
                to: '/membership',
                linkLabel: 'Membership options →',
              },
              {
                title: 'Volunteer at Events',
                excerpt: 'Help make gatherings run smoothly — setup, welcome tables, and program support always welcome.',
                to: '/news',
                linkLabel: 'Events & News →',
              },
              {
                title: 'Join a Committee',
                excerpt: 'Committees are forming; share your skills and interests — we’ll match you when roles open.',
                to: '/get-involved',
                linkLabel: 'Learn more →',
              },
              {
                title: 'Partner / Sponsor',
                excerpt: 'Highlight your organization or sponsor programming that strengthens our diaspora and local ties.',
                to: '/contact',
                linkLabel: 'Contact us →',
              },
            ].map((card, i) => (
              <Reveal
                key={card.title}
                delayMs={i * 100}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-mist p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                  {card.title}
                </h3>
                <p className="text-slate mt-3 leading-relaxed text-sm flex-1">{card.excerpt}</p>
                <div className="mt-4">
                  <Link
                    to={card.to}
                    className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                  >
                    {card.linkLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zambia-green text-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {HOME_STATS.map((stat, i) => (
              <Reveal key={stat.label} delayMs={i * 80} durationMs={640} className="group">
                <p className="text-3xl md:text-5xl font-heading font-bold text-copper motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 drop-shadow-sm">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.08em] text-white/80 font-heading">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCommunitySpotlight
        title="Featured community business / entity"
        entries={[
          {
            description:
              'Be the first to be featured here. We highlight businesses and organizations that strengthen our diaspora and local ties. Reach out for details on how to participate.',
            ctaLabel: 'Contact us about featuring your business',
            ctaLink: '/contact',
          },
        ]}
      />

      <section className="py-10 md:py-14 bg-copper-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            DOM order = NorCal block then SoCal (mobile stack). On lg, explicit rows so body row height matches the taller column
            and both mini-card rows share row 4 (same baseline).
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-mist/80 lg:gap-x-0 lg:gap-y-6">
            <p className="text-xs md:text-sm uppercase tracking-[0.08em] font-heading text-redwood lg:col-start-1 lg:row-start-1 lg:pr-10">
              Rooted in NorCal
            </p>
            <h2 className="mt-2 lg:mt-0 text-2xl md:text-3xl font-heading font-semibold text-zambia-green lg:col-start-1 lg:row-start-2 lg:pr-10">
              Sacramento to the Sierra, the Bay region to Wine Country — our community thrives across Northern California.
            </h2>
            <p className="mt-3 lg:mt-0 text-slate leading-relaxed lg:col-start-1 lg:row-start-3 lg:pr-10">
              Sacramento, the wider Bay region, Wine Country, Silicon Valley, and beyond — plus members in AZ, NV, IL, IN, NY &amp; CT.
            </p>
            <div className="mt-6 lg:mt-0 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-3 xl:gap-4 lg:col-start-1 lg:row-start-4 lg:pr-10 lg:self-stretch lg:items-stretch">
              {[
                { label: 'Bay region', icon: '🌉' },
                { label: 'Sacramento', icon: '🏛️' },
                { label: 'Wine Country', icon: '🌲' },
                { label: 'Silicon Valley', icon: '☀️' },
              ].map((r) => (
                <RegionMiniCard key={r.label} label={r.label} icon={r.icon} />
              ))}
            </div>

            <p className="text-xs md:text-sm uppercase tracking-[0.08em] font-heading text-redwood mt-10 lg:mt-0 lg:col-start-2 lg:row-start-1 lg:pl-10">
              Connecting with SoCal
            </p>
            <h2 className="mt-2 lg:mt-0 text-2xl md:text-3xl font-heading font-semibold text-zambia-green lg:col-start-2 lg:row-start-2 lg:pl-10">
              Los Angeles to San Diego — we’re strengthening connections with Zambians in Southern California.
            </h2>
            <p className="mt-3 lg:mt-0 text-slate leading-relaxed lg:col-start-2 lg:row-start-3 lg:pl-10">
              There are active Zambian networks across Greater LA, Orange County, the Inland Empire, and San Diego. ZANC is a Northern
              California association, and we are intentionally building warmer ties with those communities — starting with
              introductions, shared updates, and open invitations. SoCal members and friends are especially encouraged to join us for
              Independence in October.
            </p>
            <div className="mt-6 lg:mt-0 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-3 xl:gap-4 lg:col-start-2 lg:row-start-4 lg:pl-10 lg:self-stretch lg:items-stretch">
              {[
                { label: 'Greater LA', icon: '🌴' },
                { label: 'Orange County', icon: '🏖️' },
                { label: 'Inland Empire', icon: '⛰️' },
                { label: 'San Diego', icon: '🌊' },
              ].map((r) => (
                <RegionMiniCard key={r.label} label={r.label} icon={r.icon} />
              ))}
            </div>
          </div>

          {/* Full-width row so the hub isn’t trapped in the right column */}
          <Reveal className="mt-10 lg:mt-12 w-full rounded-xl border border-mist bg-white/80 p-4 sm:p-6 shadow-sm ui-card-motion motion-safe:hover:shadow-md motion-safe:hover:border-zambia-green/15">
            <p className="text-sm font-heading font-semibold text-zambia-green">LA area community hub</p>
            <p className="text-sm text-slate mt-2 leading-relaxed max-w-3xl">
              A dedicated page for Los Angeles and Southern California updates—events, contacts, and ways to plug in—is being put
              together. In the meantime, Rev. Stephen Mubanga is ZANC&apos;s Los Angeles area representative, and you can reach the
              team at{' '}
              <a href="mailto:zancsac@gmail.com" className="text-bay-blue font-medium hover:underline">
                zancsac@gmail.com
              </a>
              .
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-md border border-dashed border-mist bg-cloud px-3 py-2 text-sm text-slate"
                aria-disabled="true"
              >
                <span className="font-medium text-zambia-green">LA area community page</span>
                <span className="text-[10px] font-heading uppercase tracking-[0.12em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                  Coming soon
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-zambia-green text-white py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Be Part of Something Bigger</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join the members building bridges between Zambia and Northern California.
            </p>
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/membership">
              <Button variant="accent" size="lg">Join ZANC</Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="!bg-transparent !text-white border-2 border-white/90 hover:!bg-white hover:!text-zambia-green focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zambia-green"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
