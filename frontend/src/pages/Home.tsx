import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import { heroImages } from '../heroImages';

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="bg-white py-10 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6 font-heading flex items-center gap-3">
                <img src="/images/logo.jpg" alt="ZANC Logo" className="h-10 w-10 rounded-full border-2 border-copper-400 bg-white" />
                Welcome to ZANC!
              </h2>
              <p className="text-gray-600 mb-6">
                The Zambian Association in Northern California (ZANC) is a vibrant community organization
                dedicated to connecting Zambians living in California, preserving our rich cultural heritage,
                and supporting community initiatives both here and in Zambia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button variant="primary" size="lg">Learn More</Button>
                </Link>
                <Link to="/membership">
                  <Button variant="primary" size="lg">Join ZANC</Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
                <img
                  src={heroImages[currentHero].src}
                  alt={heroImages[currentHero].alt}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                />
                <span className="absolute bottom-2 right-2 inline-block rounded overflow-hidden shadow-md border-2 border-white bg-[#1a3c2a]">
                  <img src="/images/flag.jpg" alt="Zambian Flag" className="h-10 w-auto block" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Community Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <article className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Elections 2026</h3>
              <p className="text-gray-700">
                General elections were recently held and a new committee was elected. Thank you to everyone who participated and helped make the process a success.
              </p>
            </article>

            <article className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Review This Year’s Calendar</h3>
              <p className="text-gray-700 mb-4">
                Stay up to date on upcoming deadlines, programs, and community events.
              </p>
              <Link to="/news?calendar=1">
                <Button variant="primary">Review this year’s calendar</Button>
              </Link>
            </article>
          </div>
          <div className="mt-6 text-center">
            <Link to="/news">
              <Button variant="outline">View News &amp; Events</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary-800 font-heading">1995</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-gray-600">Founded</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-800 font-heading">68+</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-gray-600">Insured members across 7 states</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-800 font-heading">4+</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-gray-600">Major events per year</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-800 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Become a member today and connect with fellow Zambians in California, participate in cultural events,
            and contribute to our community initiatives.
          </p>
          <Link to="/membership">
            <Button variant="primary" size="lg">Get Involved</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
