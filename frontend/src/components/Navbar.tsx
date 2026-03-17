import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Linkedin, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, dbUser, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
      // Still close the menu even if sign out fails
      setIsUserMenuOpen(false);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-primary-800 text-center">
            ASSOCIATION OF ZAMBIANS IN CALIFORNIA
          </h1>
        </div>
        
        <nav className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-6">
            {/* Mobile menu button */}
            <button 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`font-medium transition-colors ${isActive('/') ? 'text-primary-800 border-b-2 border-primary-800' : 'text-gray-600 hover:text-primary-800'}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${isActive('/about') ? 'text-primary-800 border-b-2 border-primary-800' : 'text-gray-600 hover:text-primary-800'}`}
              >
                About
              </Link>
              <Link 
                to="/news" 
                className={`font-medium transition-colors ${isActive('/news') ? 'text-primary-800 border-b-2 border-primary-800' : 'text-gray-600 hover:text-primary-800'}`}
              >
                News
              </Link>
              <Link 
                to="/get-involved" 
                className={`font-medium transition-colors ${isActive('/get-involved') ? 'text-primary-800 border-b-2 border-primary-800' : 'text-gray-600 hover:text-primary-800'}`}
              >
                Get Involved
              </Link>
            </div>
          </div>
          
          {/* Right side - Auth and Social */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-800 transition-colors"
                >
                  <User size={20} />
                  <span className="hidden sm:inline font-medium">
                    {user.user_metadata?.name || user.email?.split('@')[0]}
                  </span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user.user_metadata?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    
                    {/* Admin Dashboard Link */}
                    {dbUser?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Social links */}
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-500 hover:text-primary-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-500 hover:text-primary-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </nav>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-3 py-3">
              <Link 
                to="/" 
                className={`font-medium px-3 py-2 rounded-md transition-colors ${isActive('/') ? 'text-primary-800 bg-gray-100' : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`font-medium px-3 py-2 rounded-md transition-colors ${isActive('/about') ? 'text-primary-800 bg-gray-100' : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/news" 
                className={`font-medium px-3 py-2 rounded-md transition-colors ${isActive('/news') ? 'text-primary-800 bg-gray-100' : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/get-involved" 
                className={`font-medium px-3 py-2 rounded-md transition-colors ${isActive('/get-involved') ? 'text-primary-800 bg-gray-100' : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Involved
              </Link>
              
              {/* Mobile auth */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="px-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {user.user_metadata?.name || user.email?.split('@')[0]}
                    </p>
                    
                    {/* Admin Dashboard Link for Mobile */}
                    {dbUser?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        className="w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2 mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 space-y-2">
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;