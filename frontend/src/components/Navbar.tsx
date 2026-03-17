import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/news', label: 'News' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/membership', label: 'Membership' },
    { to: '/insurance', label: 'Insurance' },
    { to: '/forms', label: 'Forms' },
  ];

  const linkClass = (path: string) =>
    `font-medium transition-colors ${isActive(path) ? 'text-primary-800 border-b-2 border-primary-800' : 'text-gray-600 hover:text-primary-800'}`;

  const mobileLinkClass = (path: string) =>
    `font-medium px-3 py-2 rounded-md transition-colors ${isActive(path) ? 'text-primary-800 bg-gray-100' : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'}`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-primary-800 text-center">
            ZAMBIAN ASSOCIATION IN NORTHERN CALIFORNIA
          </h1>
        </div>

        <nav className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-6">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex md:space-x-6">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className={linkClass(to)}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-800" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary-800" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-1 py-3">
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
