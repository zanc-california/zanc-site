import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/news', label: 'Events & News' },
    { to: '/community', label: 'Community' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/membership', label: 'Join ZANC' },
    { to: '/insurance', label: 'Insurance' },
  ];

  const linkClass = (path: string) =>
    `font-medium transition-colors ${isActive(path) ? 'text-zambia-green border-b-2 border-copper' : 'text-slate hover:text-zambia-green'}`;

  const mobileLinkClass = (path: string) =>
    `font-medium px-3 py-3 rounded-md transition-colors ${isActive(path) ? 'text-zambia-green bg-cloud' : 'text-slate hover:text-zambia-green hover:bg-cloud'}`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 ${isScrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-white'} border-b border-mist`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-copper-glow border border-mist">
              <span className="font-heading font-bold text-copper">Z</span>
            </span>
            <div className="leading-tight">
              <div className="font-heading font-bold text-zambia-green text-base sm:text-lg">ZANC</div>
              <div className="text-xs sm:text-sm text-slate">Zambian Association in Northern California</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-mist bg-white hover:bg-cloud"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className={linkClass(to)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="rounded-lg border border-mist bg-white shadow-sm p-2">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className={mobileLinkClass(to)} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
