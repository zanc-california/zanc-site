import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SubscribeModal from '../components/SubscribeModal';
import { getFlagRaisingEvent, getIndependenceEvent, INDEPENDENCE_FEATURES, INDEPENDENCE_RESERVATION_URL } from '../data/communityCalendar2026';
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
      <section className="relative overflow-hidden bg-zambia-green">
        <div className="absolute inset-0 bg-gradient-to-br from-zambia-green via-zambia-green-light to-redwood opacity-95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-white/90 text-sm uppercase tracking-[0.08em] font-heading">
              <span className="h-2 w-2 rounded-full bg-copper shadow-[0_0_12px_rgba(184,115,51,0.65)]" />
              ZANC flagship event
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-white tracking-[-0.02em] drop-shadow">
              Zambian Independence
              <br />
              Celebration 2026
            </h1>
            <p className="mt-5 text-white text-lg md:text-xl font-heading font-semibold">
              Saturday, October 24, 2026 · 6:00 PM
            </p>
            <p className="mt-1 text-white/90">Doors open at 5:30 PM · Adults $55 · Ages 10–17 $25 · Under 10 free</p>
            <p className="mt-2 text-white/90 leading-relaxed">
              {event.venueName}
              <br />
              {event.venueAddress}
            </p>
            <p className="mt-5 text-white/90 leading-relaxed max-w-2xl">
              Bring the whole family for Zambian food, music and community. Join Joseph Prouse, Jean Nangwala and
              Dj LittyRocket as we celebrate 62 years of independence.
            </p>
            <p className="mt-3 text-white/90 text-sm">Please reserve early and include everyone attending, including children. Hall capacity: 160.</p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:flex-wrap">
              <a href={INDEPENDENCE_RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-copper px-6 py-3 text-lg font-medium text-white hover:bg-copper-light focus-visible:ring-2 focus-visible:ring-white">
                Reserve your place
              </a>
              {accommodation?.bookingUrl && (
                <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Book the host hotel
                  </Button>
                </a>
              )}
              <a href="#take-part" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="!w-full sm:!w-auto !justify-center !bg-transparent !text-white border-white/80 hover:!bg-white/10 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zambia-green"
                >
                  Help make it happen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />

      {/* At a glance */}
      <section className="py-10 md:py-14 bg-white border-b border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Approved family flyer, also available to download and share. */}
          {event.imageUrl && (
            <Reveal className="mb-8 md:mb-10">
              <figure className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-mist bg-cloud shadow-sm">
                <img
                  src={event.imageUrl}
                  width={1122}
                  height={1402}
                  alt="Zambia Independence Celebration family flyer: October 24 in Woodland, adults $55, ages 10–17 $25, under 10 free"
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
                <figcaption className="px-4 py-3 text-sm text-slate leading-relaxed border-t border-mist">
                  Presented by ZANC. Sponsored by American Hospitality Services. Doors 5:30 PM · celebration 6:00 PM ·
                  adults $55 · ages 10–17 $25 · under 10 free. <a href={event.imageUrl} download className="font-semibold text-bay-blue underline">Download the family flyer</a>
                </figcaption>
              </figure>
            </Reveal>
          )}

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
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">{item.label}</p>
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
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Meet the evening’s guests and artists</h2>
          <p className="mt-2 text-slate">Confirmed for October 24. Share the flyers with family and friends; speaking and performance times will follow.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDEPENDENCE_FEATURES.map((guest) => (
              <article key={guest.name} className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm">
                <a href={guest.imageUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${guest.name} flyer in full size`}>
                  <img src={guest.imageUrl} alt={`${guest.name} Independence celebration flyer`} width={1122} height={1402} className="w-full h-auto" loading="lazy" />
                </a>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-copper">{guest.role}</p>
                  <h3 className="mt-1 text-xl font-heading font-semibold text-zambia-green">{guest.name}</h3>
                  <p className="mt-2 text-sm text-slate">{guest.description}</p>
                  <a href={guest.imageUrl} download className="mt-4 inline-block font-medium text-bay-blue underline">Download flyer</a>
                </div>
              </article>
            ))}
          </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {flagRaising.imageUrl && (
                <Reveal>
                  <figure className="overflow-hidden rounded-xl border border-mist bg-cloud shadow-sm">
                    <img
                      src={flagRaising.imageUrl}
                      width={1254}
                      height={1254}
                      alt="Zambia in San Francisco — civic flag raising at San Francisco City Hall"
                      className="w-full h-auto object-contain"
                    />
                    <figcaption className="px-4 py-3 text-sm text-slate leading-relaxed border-t border-mist">
                      Date confirmed: Friday, October 23, 2026 at 11:30 AM, San Francisco City Hall.
                    </figcaption>
                  </figure>
                </Reveal>
              )}
              <Reveal className="rounded-xl border border-mist bg-cloud p-6">
                <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Honorary Consul</p>
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
        <section className="py-10 md:py-14 bg-fog border-b border-mist">
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
                      <dt className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Group rate</dt>
                      <dd className="mt-1 font-heading font-semibold text-zambia-green">{accommodation.groupRate}</dd>
                    </div>
                  )}
                  {accommodation.bookingDeadline && (
                    <div className="rounded-lg border border-mist bg-cloud px-4 py-3">
                      <dt className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Book by</dt>
                      <dd className="mt-1 font-heading font-semibold text-zambia-green">{accommodation.bookingDeadline}</dd>
                    </div>
                  )}
                </dl>

                {accommodation.note && <p className="mt-4 text-sm text-slate leading-relaxed">{accommodation.note}</p>}

                {accommodation.bookingUrl && (
                  <div className="mt-6">
                    <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                      <Button variant="accent">Book at the group rate</Button>
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
                    <Button variant="outline">Email ZANC about travel</Button>
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
                        <Button variant="outline">{ws.ctaLabel}</Button>
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
              Join the ZANC email list for program updates. This page stays current as each decision is made — hotel booking,
              admission, and the City Hall flag raising are already here.
            </p>
          </Reveal>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={INDEPENDENCE_RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-copper px-6 py-3 text-lg font-medium text-white hover:bg-copper-light focus-visible:ring-2 focus-visible:ring-white">Reserve your place</a>
            <Button
              type="button"
              variant="accent"
              size="lg"
              onClick={() => setSubscribeOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open subscribe form for ZANC email updates"
            >
              Get Independence updates
            </Button>
            <Link to="/membership">
              <Button
                variant="outline"
                size="lg"
                className="!bg-transparent !text-white border-2 border-white/90 hover:!bg-white hover:!text-zambia-green focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zambia-green"
              >
                Join ZANC
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Independence;
