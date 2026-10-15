import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SubscribeModal from '../components/SubscribeModal';
import { getFlagRaisingEvent, getIndependenceEvent, INDEPENDENCE_COMMUNITY_FLYER, INDEPENDENCE_CONFIRMED_GUESTS, INDEPENDENCE_FEATURES, INDEPENDENCE_RESERVATION_URL } from '../data/communityCalendar2026';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SITE_ORIGIN } from '../lib/siteMeta';

const META_DESCRIPTION =
  'ZANC’s Independence Celebration is Saturday, October 24, 2026 in Woodland — doors 5:30 PM, celebration at 6:00 PM, ' +
  'adults $55, ages 10–17 $25, under 10 free. Reserve your place. San Francisco City Hall flag raising: Friday, October 23 at 11:30 AM.';

const Independence = () => {
  const event = getIndependenceEvent();
  const flagRaising = getFlagRaisingEvent();
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  useDocumentMeta({
    title: 'Zambian Independence Celebration 2026',
    description: META_DESCRIPTION,
    path: '/independence',
    image: '/images/postings/independence-2026-banner.png',
    jsonLd: event && {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Zambian Independence Celebration 2026',
      startDate: '2026-10-24T18:00:00-07:00',
      doorTime: '2026-10-24T17:30:00-07:00',
      offers: [
        { name: 'Adults 18 and over', price: '55' },
        { name: 'Ages 10–17', price: '25' },
        { name: 'Children under 10', price: '0' },
      ].map((offer) => ({ ...offer, '@type': 'Offer', priceCurrency: 'USD', url: INDEPENDENCE_RESERVATION_URL })),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      description: META_DESCRIPTION,
      url: `${SITE_ORIGIN}/independence`,
      location: {
        '@type': 'Place',
        name: event.venueName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2100 Freeway Drive',
          addressLocality: 'Woodland',
          addressRegion: 'CA',
          postalCode: '95776',
          addressCountry: 'US',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Zambian Association in Northern California (ZANC)',
        url: SITE_ORIGIN,
      },
    },
  });

  if (!event) return null;

  const { accommodation, workstreams } = event;

  return (
    <div className="bg-fog">
      {/* Hero */}
      <section aria-labelledby="independence-title" className="relative overflow-hidden bg-zambia-green">
        <div className="absolute inset-0 bg-gradient-to-br from-zambia-green via-zambia-green-light to-redwood opacity-95" />
        <div className="relative max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-white/90 text-sm uppercase tracking-[0.08em] font-heading">
              <span className="h-2 w-2 rounded-full bg-copper shadow-[0_0_12px_rgba(184,115,51,0.65)]" />
              62 years of independence · One Zambia, One Nation
            </p>
            <h1 id="independence-title" className="mt-4 text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] font-heading font-bold text-white tracking-[-0.03em]">
              Zambian Independence
              <br />
              Celebration 2026
            </h1>
            <p className="mt-5 text-white text-lg md:text-xl font-heading font-semibold">
              Saturday, October 24, 2026 · 6:00 PM
            </p>
            <p className="mt-1 text-white/90">Doors open at 5:30 PM · Woodland, California</p>
            <p className="mt-2 text-white/90 leading-relaxed">
              {event.venueName}
              <br />
              {event.venueAddress}
            </p>
            <p className="mt-5 text-white/90 leading-relaxed max-w-2xl">
              Bring the whole family for Zambian food, music and community. Celebrate with Joseph Prouse,
              Jean Nangwala, Dj LittyRocket and friends of Zambia from across Northern California.
            </p>
            <p className="mt-5 font-semibold text-white">Adults $55 · Ages 10–17 $25 · Under 10 free</p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:flex-wrap">
              <a href={INDEPENDENCE_RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-lg font-semibold text-zambia-green hover:bg-copper-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Reserve your place
              </a>
              <a href="#lineup" className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-lg font-medium text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white">
                Explore the evening
              </a>
            </div>
            <p className="mt-4 text-white/90 text-sm leading-relaxed">Reserve for everyone attending, including children. Hall capacity: 160.</p>
            <p className="mt-6 border-t border-white/20 pt-5 text-sm text-white/90">Presented by ZANC · Sponsored by American Hospitality Services</p>
          </div>
          {INDEPENDENCE_COMMUNITY_FLYER && (
            <figure className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
              <a href={INDEPENDENCE_COMMUNITY_FLYER} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-white/30 shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Open the community flyer in full size">
                <img src={INDEPENDENCE_COMMUNITY_FLYER} width={1086} height={1448} alt="Community flyer featuring Jean Nangwala, Joseph Prouse, Rajen Ranchhod, Catherine Bonnefoy, John Shea and Eduardo Madrid Moreno" className="w-full h-auto" loading="eager" />
              </a>
              <figcaption className="mt-4 text-sm text-white/90 leading-relaxed">
                <a href={INDEPENDENCE_COMMUNITY_FLYER} download className="font-medium text-white underline underline-offset-4">Download community flyer</a>
                {event.imageUrl && <> · <a href={event.imageUrl} download className="text-white underline underline-offset-4">Family flyer</a></>}
                <span className="mt-2 block text-xs text-white/80">AI-assisted layout using supplied and public-source photos. The full guest list below also includes Ognian Gavrilov.</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <nav aria-label="On this page" className="border-b border-mist bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-6 gap-y-1 px-4 sm:px-6 lg:px-8 py-3 text-sm font-medium">
          <a href="#event-details" className="py-2 text-zambia-green hover:underline">Event details</a>
          <a href="#lineup" className="py-2 text-zambia-green hover:underline">Music & special guest</a>
          <a href="#confirmed-guests" className="py-2 text-zambia-green hover:underline">Community guests</a>
          {flagRaising && <a href="#flag-raising" className="py-2 text-zambia-green hover:underline">Flag raising · Oct 23</a>}
          {accommodation && <a href="#hotel" className="py-2 text-zambia-green hover:underline">Hotel & travel</a>}
          {workstreams?.length ? <a href="#take-part" className="py-2 text-zambia-green hover:underline">Get involved</a> : null}
        </div>
      </nav>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />

      {/* At a glance */}
      <section id="event-details" aria-labelledby="event-details-title" className="py-10 md:py-12 bg-white border-b border-mist scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="event-details-title" className="mb-6 text-2xl font-heading font-semibold text-zambia-green">Your evening at a glance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Date',
                value: 'Saturday, October 24, 2026',
                note: 'Doors open at 5:30 PM. Celebration at 6:00 PM.',
              },
              { label: 'Venue', value: event.venueName ?? 'TBA', note: event.venueAddress ?? '' },
              {
                label: 'Admission',
                value: 'Adults $55 · Ages 10–17 $25',
                note: 'Children under 10 free. Reserve for everyone in your party.',
              },
              {
                label: 'Flag raising',
                value: 'Friday, October 23 · 11:30 AM',
                note: 'San Francisco City Hall — a civic ceremony the day before the celebration.',
              },
            ].map((item) => (
              <Reveal key={item.label} className="rounded-xl border border-mist bg-cloud p-5 h-full">
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-redwood">{item.label}</p>
                <p className="mt-2 font-heading font-semibold text-zambia-green leading-snug">{item.value}</p>
                <p className="mt-2 text-sm text-slate leading-relaxed">{item.note}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 rounded-xl border border-copper/30 bg-copper-glow/60 p-5 md:p-6">
            <p className="text-sm text-redwood leading-relaxed">
              <span className="font-heading font-semibold">Reservations are open.</span> Complete your reservation through the link above.
              The full running order and music-request details will follow. You can also{' '}
              <button
                type="button"
                onClick={() => setSubscribeOpen(true)}
                className="font-semibold underline underline-offset-2 hover:text-redwood/80"
                aria-haspopup="dialog"
              >
                join the ZANC email list
              </button>{' '}
              for program updates.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="lineup" className="py-10 md:py-14 bg-fog border-b border-mist scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Music and a story from Zambia</h2>
          <p className="mt-2 text-slate">Confirmed for October 24. Share the flyers with family and friends; speaking and performance times will follow.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDEPENDENCE_FEATURES.map((guest) => (
              <article key={guest.name} className="flex flex-row md:flex-col overflow-hidden rounded-xl border border-mist bg-white shadow-sm">
                <a href={guest.imageUrl} target="_blank" rel="noopener noreferrer" className="w-28 sm:w-36 md:w-full shrink-0 bg-cloud" aria-label={`Open ${guest.name} flyer in full size`}>
                  <img src={guest.imageUrl} alt={`${guest.name} Independence celebration flyer`} width={1122} height={1402} className="w-full aspect-[4/5] object-contain bg-cloud" loading="lazy" />
                </a>
                <div className="flex min-w-0 flex-1 flex-col p-4 lg:p-5">
                  <p className="text-xs uppercase tracking-wide text-redwood">{guest.role}</p>
                  <h3 className="mt-1 text-xl font-heading font-semibold text-zambia-green">{guest.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate">{guest.description}</p>
                  <a href={guest.imageUrl} download className="mt-4 inline-block font-medium text-bay-blue underline">Download flyer</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="confirmed-guests" className="py-10 md:py-14 bg-white border-b border-mist scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-wide font-heading text-redwood">Confirmed for October 24</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Joining our community celebration</h2>
          <p className="mt-3 max-w-3xl text-slate">We look forward to welcoming guests from the consular, civic and regional business communities for an evening of Zambian food, music and connection.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {INDEPENDENCE_CONFIRMED_GUESTS.map((guest) => (
              <article key={guest.name} className="flex items-start gap-4 rounded-xl border border-mist bg-cloud p-4 lg:flex-col lg:p-0 lg:overflow-hidden">
                <img src={guest.imageUrl} alt={guest.name} width={600} height={600} className="h-24 w-24 shrink-0 rounded-lg object-cover object-top lg:h-auto lg:w-full lg:aspect-[4/5] lg:rounded-none" loading="lazy" />
                <div className="min-w-0 lg:p-4">
                  <h3 className="text-lg font-heading font-semibold text-zambia-green">{guest.name}</h3>
                  <p className="mt-2 text-sm font-medium text-slate">{guest.title}</p>
                  <p className="mt-1 text-sm text-slate">{guest.affiliation}</p>
                </div>
              </article>
            ))}
          </div>
          <a href={INDEPENDENCE_RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center rounded-md bg-zambia-green px-6 py-3 font-medium text-white hover:bg-zambia-green-light focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2">
            Reserve your place for October 24
          </a>
        </div>
      </section>

      {flagRaising && (
        <section id="flag-raising" className="py-10 md:py-14 bg-white border-b border-mist scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">
                Flag raising at San Francisco City Hall
              </h2>
              <p className="text-slate mt-1 max-w-2xl">
                Friday, October 23, 2026 · 11:30 AM. A civic celebration the day before the Woodland evening.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-12 items-center">
              {flagRaising.imageUrl && (
                <Reveal className="w-full max-w-md mx-auto">
                  <figure className="overflow-hidden rounded-xl border border-mist bg-cloud shadow-sm">
                    <img
                      src={flagRaising.imageUrl}
                      width={1254}
                      height={1254}
                      alt="Zambia in San Francisco — civic flag raising at San Francisco City Hall"
                      loading="lazy"
                      className="w-full h-auto object-contain"
                    />
                    <figcaption className="px-4 py-3 text-sm text-slate leading-relaxed border-t border-mist">
                      Date confirmed: Friday, October 23, 2026 at 11:30 AM, San Francisco City Hall.
                    </figcaption>
                  </figure>
                </Reveal>
              )}
              <Reveal className="rounded-xl border border-mist bg-cloud p-6">
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-redwood">Honorary Consul</p>
                <p className="mt-3 text-slate leading-relaxed">
                  Zambians across the Bay Area and Northern California, together with friends of Zambia, are invited to come out
                  and support this occasion. Seeing the Zambian flag raised at San Francisco City Hall is a proud moment for the
                  community — a chance to celebrate our heritage and represent Zambia in the United States.
                </p>
                <p className="mt-3 text-slate leading-relaxed">
                  Our appreciation to the City of San Francisco and its Protocol Office for working with us to make this possible.
                  Let us show up and celebrate in the spirit of One Zambia, One Nation.
                </p>
                <p className="mt-4 text-sm font-heading font-semibold text-zambia-green">
                  Rajen Ranchhod
                  <span className="block font-normal text-slate">
                    Honorary Consul of the Republic of Zambia · California
                  </span>
                </p>
                <p className="mt-4 text-sm text-slate">
                  {flagRaising.venueName}
                  <br />
                  {flagRaising.venueAddress}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Hotel + travel */}
      {accommodation && (
        <section id="hotel" className="py-10 md:py-14 bg-fog border-b border-mist scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Hotel booking now open</h2>
              <p className="text-slate mt-1 max-w-2xl">
                Special ZANC group rate at the host hotel — the same place as the October 24 celebration. Reserve early if you
                are traveling in for the weekend.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Reveal className="lg:col-span-2 rounded-xl border border-mist bg-white p-6 shadow-sm">
                <h3 className="text-lg font-heading font-semibold text-zambia-green">{accommodation.hotelName}</h3>
                {accommodation.address && <p className="text-sm text-slate mt-1">{accommodation.address}</p>}

                <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {accommodation.groupRate && (
                    <div className="rounded-lg border border-mist bg-cloud px-4 py-3">
                      <dt className="text-[11px] font-heading uppercase tracking-[0.12em] text-redwood">Group rate</dt>
                      <dd className="mt-1 font-heading font-semibold text-zambia-green">{accommodation.groupRate}</dd>
                    </div>
                  )}
                  {accommodation.bookingDeadline && (
                    <div className="rounded-lg border border-mist bg-cloud px-4 py-3">
                      <dt className="text-[11px] font-heading uppercase tracking-[0.12em] text-redwood">Book by</dt>
                      <dd className="mt-1 font-heading font-semibold text-zambia-green">{accommodation.bookingDeadline}</dd>
                    </div>
                  )}
                </dl>

                {accommodation.note && <p className="mt-4 text-sm text-slate leading-relaxed">{accommodation.note}</p>}

                {accommodation.bookingUrl && (
                  <div className="mt-6">
                    <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <span className="inline-flex rounded-md bg-zambia-green px-5 py-3 font-medium text-white hover:bg-zambia-green-light">Book at the group rate</span>
                    </a>
                    <p className="mt-3 text-xs text-slate/80 leading-relaxed">
                      Booking is handled entirely by Marriott. Availability, the nights covered, and the final rate are confirmed
                      by the hotel at the time of booking.
                    </p>
                  </div>
                )}
              </Reveal>

              <Reveal className="rounded-xl border border-mist bg-white p-6 shadow-sm">
                <h3 className="text-lg font-heading font-semibold text-zambia-green">Traveling in?</h3>
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  Guests from Southern California and out of state are especially encouraged to make the trip — Independence is one
                  of the biggest opportunities each year for the wider Zambian community to gather in one place.
                </p>
                <p className="mt-3 text-sm text-slate leading-relaxed">
                  Coordinating a group, or traveling with family? Email us and we will help where we can.
                </p>
                <div className="mt-5">
                  <a
                    href="mailto:zancsac@gmail.com?subject=Independence%202026%20-%20travel%20and%20accommodation"
                    className="inline-block"
                  >
                    <span className="inline-flex rounded-md border border-mist px-4 py-3 font-medium text-zambia-green hover:bg-cloud">Email ZANC about travel</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Community workstreams */}
      {workstreams && workstreams.length > 0 && (
        <section id="take-part" className="py-10 md:py-14 bg-white border-b border-mist scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Be part of putting it together</h2>
              <p className="text-slate mt-1 max-w-2xl">
                Independence is built by the community. These are the areas where members can take something on right now.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workstreams.map((ws, i) => (
                <Reveal
                  key={ws.title}
                  delayMs={i * 80}
                  className="h-full flex flex-col rounded-xl border border-mist bg-cloud p-6 shadow-sm ui-card-motion ui-card-motion-hover"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-heading font-semibold text-zambia-green">{ws.title}</h3>
                    {ws.status && (
                      <span
                        className={`text-[10px] font-heading uppercase tracking-[0.12em] px-2 py-1 rounded-full border ${
                          ws.ctaHref
                            ? 'text-redwood bg-copper-glow border-copper/30'
                            : 'text-slate bg-white border-mist'
                        }`}
                      >
                        {ws.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-slate leading-relaxed flex-1">{ws.body}</p>
                  {/* Status is carried by the chip beside the title, so only CTAs render here. */}
                  {ws.ctaHref && ws.ctaLabel && (
                    <div className="mt-5">
                      <a href={ws.ctaHref} className="inline-block">
                        <span className="inline-flex rounded-md border border-mist bg-white px-4 py-3 font-medium text-zambia-green hover:bg-cloud">{ws.ctaLabel}</span>
                      </a>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 rounded-xl border border-mist bg-fog p-5 md:p-6">
              <p className="text-sm text-slate leading-relaxed">
                Want to help in a way that is not listed here? Email{' '}
                <a href="mailto:zancsac@gmail.com" className="text-bay-blue font-medium hover:underline">
                  zancsac@gmail.com
                </a>{' '}
                and tell us what you would like to take on.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Close */}
      <section className="bg-zambia-green text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">See you on October 24</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Bring your family, reconnect with friends and celebrate Zambia together. Reserve your place,
              or join the email list for the latest program updates.
            </p>
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={INDEPENDENCE_RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-lg font-semibold text-zambia-green hover:bg-copper-glow focus-visible:ring-2 focus-visible:ring-white">Reserve your place</a>
            <Button
              type="button"
              variant="outline"
              className="!bg-transparent !text-white !border-white/70 hover:!bg-white/10"
              size="lg"
              onClick={() => setSubscribeOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open subscribe form for ZANC email updates"
            >
              Get Independence updates
            </Button>
            <Link to="/membership" className="inline-flex items-center justify-center px-4 py-3 font-medium text-white underline underline-offset-4">Join ZANC</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Independence;
