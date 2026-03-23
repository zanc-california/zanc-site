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
    { to: '/membership', label: 'Join ZANC' },
    { to: '/insurance', label: 'Insurance' },
    { to: '/news', label: 'Events & News' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/community', label: 'Community' },
  ];

  const linkClass = (path: string) =>
    `font-medium transition-colors ${isActive(path) ? 'text-zambia-green border-b-2 border-copper' : 'text-slate hover:text-zambia-green'}`;

  const mobileLinkClass = (path: string) =>
    `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
      isActive(path)
        ? 'bg-cloud text-zambia-green ring-1 ring-zambia-green/10'
        : 'text-slate hover:bg-cloud hover:text-zambia-green'
    }`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-40 ${isScrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-white'} border-b border-mist`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-3.5 sm:py-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-mist bg-copper-glow">
              <span className="font-heading font-bold text-copper">Z</span>
            </span>
            <div className="min-w-0 leading-tight">
              <div className="font-heading font-bold text-zambia-green text-base sm:text-lg">ZANC</div>
              <div className="text-[11px] text-slate sm:hidden">Northern California</div>
              <div className="hidden text-sm text-slate sm:block">Zambian Association in Northern California</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-mist bg-white hover:bg-cloud md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
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
            <div className="fixed inset-0 top-[73px] bg-black/25 backdrop-blur-[1px]" onClick={() => setIsMenuOpen(false)} />
            <div
              id="mobile-nav"
              className="relative rounded-2xl border border-mist bg-white p-3 shadow-xl ui-modal-pop"
            >
              <div className="rounded-xl border border-copper/20 bg-copper-glow/50 px-4 py-3">
                <p className="text-xs font-heading uppercase tracking-[0.08em] text-redwood">Menu</p>
                <p className="mt-1 text-sm text-slate">
                  Quick access to membership, insurance, events, and community updates.
                </p>
              </div>
              <div className="mt-3 space-y-1">
              {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to} className={mobileLinkClass(to)} onClick={() => setIsMenuOpen(false)}>
                    <span>{label}</span>
                    <span aria-hidden className="text-copper">→</span>
                  </Link>
              ))}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link to="/membership" onClick={() => setIsMenuOpen(false)}>
                  <div className="rounded-xl bg-zambia-green px-4 py-3 text-center text-sm font-medium text-white">
                    Join ZANC
                  </div>
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <div className="rounded-xl border border-mist bg-white px-4 py-3 text-center text-sm font-medium text-slate">
                    Contact
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
