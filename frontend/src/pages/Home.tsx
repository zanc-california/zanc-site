import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import LandingEventSpotlightModal from '../components/LandingEventSpotlightModal';
import SubscribeModal from '../components/SubscribeModal';
import { getNextUpcomingEvent } from '../data/communityCalendar2026';
import { INDEPENDENCE_RECAP, INDEPENDENCE_RECAP_HERO, INDEPENDENCE_PHOTOGRAPHER } from '../data/independence2026Recap';
import PhotoCredit from '../components/PhotoCredit';
import NearbyEventCard from '../components/NearbyEventCard';
import { getUpcomingNearbyEvents } from '../data/nearbyEvents2026';
import { isJulyFourthWeek, JULY_FOURTH_2026_HERO } from '../data/julyFourth2026';
import { HOME_STATS } from '../data/siteStats';
import HomeHero from '../components/HomeHero';
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
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [spotlightModalOpen, setSpotlightModalOpen] = useState(false);

  const landingSpotlightEvent = getNextUpcomingEvent();
  const nearbyOuting = getUpcomingNearbyEvents()[0];

  const julyFourthActive = isJulyFourthWeek();
  const hero = JULY_FOURTH_2026_HERO;
  const heroOutlineButtonClass =
    '!w-full sm:!w-auto !justify-center !bg-transparent !text-white border-white/80 hover:!bg-white/10 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zambia-green';

  useDocumentMeta({ path: '/' });

  return (
    <div className="bg-fog">
      {julyFourthActive ? (
        <section className="relative min-h-[min(72vh,640px)] overflow-hidden">
          <img src={hero.src} alt={hero.alt} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="relative mx-auto flex min-h-[min(72vh,640px)] max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <h1 className="sr-only">Zambian Heritage. NorCal Community.</h1>
            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <Link to="/membership" className="inline-flex items-center justify-center rounded-md bg-copper px-6 py-3 text-lg font-medium text-white hover:bg-copper-light">Join ZANC</Link>
              <Link to="/news" className="inline-flex items-center justify-center rounded-md border-2 border-white/80 px-6 py-3 text-lg font-medium text-white hover:bg-white/10">Explore Events</Link>
              <Button type="button" variant="outline" size="lg" onClick={() => setSubscribeOpen(true)} className={heroOutlineButtonClass} aria-haspopup="dialog" aria-label="Open subscribe form for ZANC email updates">Subscribe</Button>
            </div>
          </div>
        </section>
      ) : <HomeHero onSubscribe={() => setSubscribeOpen(true)} />}

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
      <LandingEventSpotlightModal
        open={spotlightModalOpen}
        onClose={() => setSpotlightModalOpen(false)}
        event={landingSpotlightEvent}
      />

      <section className="border-b border-mist bg-cloud py-10 md:py-14" aria-labelledby="home-recap-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-copper/30 bg-white shadow-sm lg:grid-cols-2">
            <figure className="flex flex-col justify-center bg-cloud">
              <Link to="/independence" className="block focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-zambia-green">
                <img src={INDEPENDENCE_RECAP_HERO.image_url} srcSet={`${INDEPENDENCE_RECAP_HERO.thumbnail_url} 640w, ${INDEPENDENCE_RECAP_HERO.image_url} 1600w`}
                  sizes="(min-width: 1024px) 600px, 100vw" alt={INDEPENDENCE_RECAP_HERO.alt} width={1600} height={1143} loading="lazy" className="w-full" />
              </Link>
              <figcaption className="px-5 py-3"><PhotoCredit credit={INDEPENDENCE_PHOTOGRAPHER} className="text-slate" /></figcaption>
            </figure>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">Celebration recap · October 24, 2026</p>
              <h2 id="home-recap-title" className="mt-3 text-3xl font-heading font-semibold leading-tight text-zambia-green">Zambia at 62: together in Woodland</h2>
              <p className="mt-4 leading-relaxed text-slate">A shared meal, cultural performances, music and friendships across communities. Thank you to everyone who helped make our Independence celebration such a memorable gathering.</p>
              <p className="mt-4 text-sm leading-relaxed text-slate">Revisit the evening through photographs by Nirav Solanki, who traveled from Los Angeles to celebrate with us and capture these memories.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/independence" className="inline-flex min-h-12 items-center rounded-md bg-zambia-green px-5 py-3 font-semibold text-white hover:bg-redwood">Read the recap →</Link>
                <Link to={INDEPENDENCE_RECAP.galleryPath} className="inline-flex min-h-12 items-center rounded-md border border-mist px-5 py-3 font-semibold text-zambia-green hover:bg-cloud">View the photo album →</Link>
              </div>
              <Link to="/independence#flag-raising" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-bay-blue underline underline-offset-4">October 23: Zambia’s flag at San Francisco City Hall →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-cloud border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-[180px_1fr] items-center">
          <img src="/images/postings/sacramento-visit-2026-09-28.png" alt="ZANC representatives visiting Sacramento City Hall" width={645} height={815} className="w-full h-auto max-w-[180px] rounded-lg" loading="lazy" />
          <div>
            <p className="text-xs uppercase tracking-wide text-copper">Community update · September 28, 2026</p>
            <h2 className="mt-2 text-2xl font-heading font-semibold text-zambia-green">Opening a conversation between Sacramento and Lusaka</h2>
            <p className="mt-2 text-slate max-w-3xl">ZANC and Zambia’s Honorary Consul visited Vice Mayor Karina Talamantes’ office to introduce Zambia and discuss opportunities for cultural, educational and economic cooperation.</p>
            <Link to="/news#latest-updates" className="mt-3 inline-block font-medium text-bay-blue underline">Read the visit recap</Link>
          </div>
        </div>
      </section>

      <section id="community-happenings" className="py-10 md:py-14 bg-white border-b border-mist scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">What&apos;s Happening in the Community</h2>
              <p className="text-slate mt-1 max-w-2xl">
                Upcoming ZANC events and nearby gatherings for our community and friends.
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
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
            {landingSpotlightEvent ? (
              <Reveal
                key={landingSpotlightEvent.anchorId ?? landingSpotlightEvent.title}
                delayMs={0}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-copper/25 p-6 shadow-[0_4px_24px_-4px_rgba(27,94,32,0.1),0_0_36px_rgba(184,115,51,0.14)] ring-2 ring-copper/15 ring-offset-2 ring-offset-white ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Next up</p>
                <div className="mt-2 space-y-3">
                  <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                    {landingSpotlightEvent.title}
                  </h3>
                  <span className="inline-block text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                    {landingSpotlightEvent.dateLabel}
                  </span>
                </div>
                <p className="text-slate mt-3 leading-relaxed text-sm">
                  {landingSpotlightEvent.anchorId === 'sf-flag-raising-2026'
                    ? 'Join Zambians and friends of Zambia for a civic celebration of 62 years of independence, hosted at San Francisco City Hall.'
                    : eventCardExcerpt(landingSpotlightEvent.description)}
                </p>
                {landingSpotlightEvent.anchorId === 'sf-flag-raising-2026' && (
                  <dl className="mt-4 space-y-3 border-t border-mist pt-4 text-sm text-slate">
                    <div><dt className="font-semibold text-zambia-green">Where</dt><dd>1 Dr. Carlton B. Goodlett Place, San Francisco.</dd></div>
                    <div><dt className="font-semibold text-zambia-green">Come together</dt><dd>Honorary Consul Rajen Ranchhod invites our community and friends to celebrate Zambia’s heritage and presence in Northern California.</dd></div>
                    <div><dt className="font-semibold text-zambia-green">Make it a weekend</dt><dd>The Woodland Independence celebration follows on Saturday, October 24.</dd></div>
                  </dl>
                )}
                <div className="mt-auto pt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
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
            ) : nearbyOuting ? <NearbyEventCard event={nearbyOuting} headingLevel="h3" /> : null}
            {[
              {
                title: 'Naija Fest — Palo Alto',
                excerpt:
                  'Sat, Sep 26 · 3–8 PM. Free, all-ages Nigerian Independence afternoon — DJs, food, vendors, and room for elders and kids.',
                href: 'https://www.eventbrite.com/e/naija-fest-2026-bay-area-tickets-1995474566144',
                linkLabel: 'Free RSVP →',
                until: '2026-09-27T00:00:00-07:00',
              },
              {
                title: 'African Arts Festival',
                excerpt:
                  'A free, family-friendly day of live African and diaspora music and dance, presented by Duniya Dance and Drum Company and Yerba Buena Gardens Festival.',
                schedule: 'Sat, Oct 3 · 11 AM–4 PM',
                details: [
                  { label: 'Where', text: 'Great Lawn, Yerba Buena Gardens — Mission Street between 3rd and 4th, San Francisco.' },
                  { label: 'For the family', text: 'Dance and drum lessons, face-painting and performances including Chinyakare Ensemble and Fua dia Congo.' },
                  { label: 'Make a day of it', text: 'African food, clothing, jewelry and other goods for sale. Admission is free; RSVP through the organizer.' },
                ],
                href: 'https://ybgfestival.org/event/african-arts-festival-2026/',
                linkLabel: 'See the festival →',
                until: '2026-10-04T00:00:00-07:00',
              },
              {
                title: 'MoAD fall exhibitions',
                excerpt:
                  'Explore contemporary art and stories of the African diaspora at the Museum of the African Diaspora in San Francisco.',
                schedule: 'Fall exhibitions now on view',
                details: [
                  { label: 'On view', text: 'Dewey Crumpler: Sonic Lineages; After the Island, exploring Jamaican diaspora ceramics; and Dorian Reid’s Calling All Cats!' },
                  { label: 'Where', text: '685 Mission Street at Third. Allow around an hour for the galleries; check museum hours before heading out.' },
                  { label: 'Admission', text: 'Adults $15; seniors, students and educators $7; under 12 free. Free admission on the second Saturday of each month.' },
                ],
                href: 'https://www.moadsf.org/exhibitions',
                linkLabel: 'Explore exhibitions →',
                visitHref: 'https://www.moadsf.org/visit',
                until: '2026-12-07T00:00:00-07:00',
              },
            ]
              .filter((card) => new Date(card.until) > new Date())
              .map((card, i) => (
              <Reveal
                key={card.title}
                delayMs={(i + 1) * 80}
                className="group h-full flex flex-col bg-cloud rounded-lg border border-mist p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active"
              >
                <h3 className="text-lg font-heading font-semibold text-zambia-green motion-safe:transition-colors motion-safe:duration-300 group-hover:text-zambia-green-light">
                  {card.title}
                </h3>
                {card.schedule && <p className="mt-3 text-xs font-heading uppercase tracking-wide text-copper">{card.schedule}</p>}
                <p className="text-slate mt-3 leading-relaxed text-sm">{card.excerpt}</p>
                {card.details && (
                  <dl className="mt-4 space-y-3 border-t border-mist pt-4 text-sm text-slate">
                    {card.details.map((detail) => (
                      <div key={detail.label}><dt className="font-semibold text-zambia-green">{detail.label}</dt><dd>{detail.text}</dd></div>
                    ))}
                  </dl>
                )}
                <div className="mt-auto pt-5 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                  >
                    {card.linkLabel}
                  </a>
                  {card.visitHref && <a href={card.visitHref} target="_blank" rel="noopener noreferrer" className="text-bay-blue font-medium text-sm hover:underline">Hours &amp; admission →</a>}
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
                excerpt: 'Share your skills and interests with the committee and ask where you can help.',
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
              introductions, shared updates, and open invitations. We welcome SoCal members and friends at our gatherings and value the connections strengthened during Independence 2026.
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

          <p className="mt-8 border-t border-mist pt-6 text-sm leading-relaxed text-slate">
            For Los Angeles and Southern California connections, contact ZANC’s LA area representative, Rev. Stephen Mubanga,
            through <a href="mailto:zancsac@gmail.com" className="font-medium text-bay-blue underline underline-offset-4">zancsac@gmail.com</a>.
          </p>
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
