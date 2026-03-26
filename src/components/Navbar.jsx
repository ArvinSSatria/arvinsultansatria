import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/profile', label: 'profile' },
  { href: '/projects', label: 'works' },
  { href: '/photography', label: 'gallery' },
  { href: '/contact', label: 'contact' },
];

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const renderNavLink = (link, isMobile = false) => {
    const isActive = pathname === link.href;
    const baseClass = isMobile 
      ? `px-3 py-2.5 text-center text-xs font-mono rounded-xl transition-all focus:outline-none focus-visible:outline-none ${
          isActive
            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-md'
            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white focus:bg-transparent active:bg-zinc-100 dark:active:bg-zinc-800'
        }`
      : `relative px-4 py-2 text-[13px] font-mono font-medium rounded-full transition-all duration-300 focus:outline-none ${
          isActive
            ? 'text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`;

    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={() => isMobile && setIsMobileOpen(false)}
        className={baseClass}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop: Floating centered pill */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        {navLinks.map((link) => renderNavLink(link))}

        {/* Dark mode toggle in pill */}
        <button
          onClick={toggleDarkMode}
          className="ml-1 p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
        </button>
      </nav>

      {/* Mobile: Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {!isMobileOpen && (
          <div className="flex justify-center gap-3 pb-6">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl text-zinc-600 dark:text-zinc-300"
            >
              <FaBars className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">menu</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl text-zinc-600 dark:text-zinc-300"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {isMobileOpen && (
          <div className="mx-4 mb-4 p-3 rounded-2xl bg-white/98 dark:bg-zinc-900/98 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm gpu-accelerate">
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">navigation</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {navLinks.map((link) => renderNavLink(link, true))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
