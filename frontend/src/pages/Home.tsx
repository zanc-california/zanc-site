import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import { heroImages } from '../heroImages';
import { supabase } from '../lib/supabase';

const Home = () => {
  const [newsItems, setNewsItems] = useState<Array<{ id: string; title: string; excerpt: string | null; date: string; slug: string }>>([]);
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await supabase
          .from('news')
          .select('id, title, excerpt, published_at, slug')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);
        if (data) {
          setNewsItems(
            data.map((row) => ({
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
      }
    };
    fetchNews();
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
                The Association of Zambians in California (ZANC) is a vibrant community organization
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

      {newsItems.length > 0 && (
        <section className="py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <NewsCard key={item.id} id={item.slug} title={item.title} excerpt={item.excerpt || ''} date={item.date} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/news">
                <Button variant="primary">View All News</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

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
