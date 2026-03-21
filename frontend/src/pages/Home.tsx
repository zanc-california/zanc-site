import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { heroImages } from '../heroImages';
import Reveal from '../components/Reveal';

/** NorCal / SoCal region chips — fixed footprint so all eight match. */
function RegionMiniCard({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="bg-white rounded-lg border border-mist shadow-sm flex h-[7.5rem] sm:h-[8rem] w-full flex-col items-center justify-center gap-2 px-2 py-3">
      <span className="text-2xl shrink-0" aria-hidden>
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
  const hero = heroImages[currentHero];

  const highlights = useMemo(
    () => [
      {
        title: 'Elections 2026',
        date: 'February 2026',
        excerpt:
          'General elections were recently held and a new committee was elected. Thank you to everyone who participated and helped make the process a success.',
      },
      {
        title: 'Open Enrollment (Insurance)',
        date: 'June 1 – July 31',
        excerpt:
          'Group Life Insurance open enrollment runs June 1 through July 31 each year. Review this year’s calendar for key deadlines.',
      },
      {
        title: 'Community Events',
        date: 'Year-round',
        excerpt:
          'Throughout Northern California, we host gatherings that celebrate Zambian heritage and strengthen our community.',
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-fog">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero.src} alt={hero.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-zambia-green/90 via-zambia-green/60 to-black/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-white/90 text-sm uppercase tracking-[0.08em] font-heading">
              <span className="h-2 w-2 rounded-full bg-copper" />
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

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/membership">
                <Button variant="accent" size="lg">Join ZANC</Button>
              </Link>
              <Link to="/news">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-md border-2 border-white/80 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-zambia-green"
                >
                  Explore Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Community Highlights</h2>
              <p className="text-slate mt-1">What’s happening across our Northern California community.</p>
            </div>
            <Link to="/news?calendar=1">
              <Button variant="primary">Review this year’s calendar</Button>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <Reveal key={h.title} className="bg-cloud rounded-lg border border-mist p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-heading font-semibold text-zambia-green">{h.title}</h3>
                  <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded">
                    {h.date}
                  </span>
                </div>
                <p className="text-slate mt-3 leading-relaxed">{h.excerpt}</p>
                <div className="mt-4">
                  <Link to="/news" className="text-bay-blue font-medium hover:underline">View details →</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zambia-green text-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-copper">2017</p>
              <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.08em] text-white/80 font-heading">Founded</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-copper">68+</p>
              <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.08em] text-white/80 font-heading">Insured members</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-copper">7</p>
              <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.08em] text-white/80 font-heading">States reached</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-heading font-bold text-copper">4+</p>
              <p className="mt-1 text-xs md:text-sm uppercase tracking-[0.08em] text-white/80 font-heading">Annual events</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white border-y border-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.08em] font-heading text-copper">Community spotlight</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-heading font-semibold text-zambia-green">
            Featured community business / entity
          </h2>
          <p className="mt-4 text-slate max-w-2xl mx-auto leading-relaxed">
            Be the first to be featured here. We highlight businesses and organizations that strengthen our diaspora and local ties. Reach
            out for details on how to participate.
          </p>
          <div className="mt-6">
            <Link to="/contact">
              <Button variant="accent">Contact us about featuring your business</Button>
            </Link>
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
              Connected in SoCal
            </p>
            <h2 className="mt-2 lg:mt-0 text-2xl md:text-3xl font-heading font-semibold text-zambia-green lg:col-start-2 lg:row-start-2 lg:pl-10">
              Los Angeles to San Diego — we’re growing a visible Southern California circle that pairs with NorCal, not apart from it.
            </h2>
            <p className="mt-3 lg:mt-0 text-slate leading-relaxed lg:col-start-2 lg:row-start-3 lg:pl-10">
              From Greater LA and Orange County to the Inland Empire and San Diego, members gather for fellowship, culture, and mutual
              support. SoCal and NorCal show up as sister communities—shared heritage, two home bases, one extended ZANC family.
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
          <div className="mt-10 lg:mt-12 w-full rounded-xl border border-mist bg-white/80 p-4 sm:p-6 shadow-sm">
            <p className="text-sm font-heading font-semibold text-zambia-green">LA area community hub</p>
            <p className="text-sm text-slate mt-2 leading-relaxed max-w-3xl">
              A dedicated page for Los Angeles and Southern California updates—events, contacts, and ways to plug in—is on the way.
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
            <p className="text-xs text-slate/80 mt-3">For now, this home page is the only place we mention the upcoming LA hub.</p>
          </div>
        </div>
      </section>

      <section className="bg-zambia-green text-white py-12 md:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Be Part of Something Bigger</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Join 68+ members building bridges between Zambia and Northern California.
          </p>
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
