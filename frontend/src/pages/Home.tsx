import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { heroImages } from '../heroImages';
import Reveal from '../components/Reveal';

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
          'From Sacramento to the Bay Area, we host gatherings that celebrate Zambian heritage and strengthen our Northern California community.',
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
              Zambian soul, Bay Area polish
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-heading font-bold text-white tracking-[-0.02em] drop-shadow">
              Zambian Heritage.
              <br />
              Bay Area Community.
            </h1>
            <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed">
              Connecting Zambians across Northern California since 1995 — rooted in culture, thriving in community.
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
              <p className="text-4xl md:text-5xl font-heading font-bold text-copper">1995</p>
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

      <section className="py-10 md:py-14 bg-copper-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.08em] font-heading text-redwood">Rooted in NorCal</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-heading font-semibold text-zambia-green">
              From Sacramento to the Bay Area, our community thrives across Northern California.
            </h2>
            <p className="mt-3 text-slate leading-relaxed">
              Bay Area, Sacramento, Wine Country, and Silicon Valley — plus members in AZ, NV, IL, IN, NY &amp; CT.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Bay Area', icon: '🌉' },
                { label: 'Sacramento', icon: '🏛️' },
                { label: 'Wine Country', icon: '🌲' },
                { label: 'Silicon Valley', icon: '☀️' },
              ].map((r) => (
                <div key={r.label} className="bg-white rounded-lg border border-mist p-4 text-center shadow-sm">
                  <div className="text-2xl">{r.icon}</div>
                  <div className="mt-2 text-sm font-heading font-semibold text-zambia-green">{r.label}</div>
                </div>
              ))}
            </div>
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
              <Button variant="outline" size="lg" className="border-white/80 text-white hover:bg-white/10">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
