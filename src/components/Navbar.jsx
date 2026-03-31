import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
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
    const paddingClass = isMobile 
      ? 'px-2 min-[375px]:px-2.5 py-1.5 text-[10px] min-[375px]:text-[11px]' 
      : 'px-4 py-2 text-[13px]';
      
    return (
      <Link
        key={link.href}
        to={link.href}
        className={`relative ${paddingClass} font-mono font-medium rounded-full transition-all duration-300 focus:outline-none whitespace-nowrap ${
          isActive
            ? 'text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
        }`}
        style={isMobile ? { WebkitTapHighlightColor: 'transparent' } : {}}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {/* ── Desktop: Floating centered pill (Top) ── */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        {navLinks.map((link) => renderNavLink(link, false))}

        {/* Dark mode toggle in pill */}
        <button
          onClick={toggleDarkMode}
          className="ml-1 p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
        </button>
      </nav>

      {/* ── Mobile: Floating centered pill (Bottom) ── */}
      <nav
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center justify-center p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-900/75 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        } max-w-[95vw]`}
      >
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => renderNavLink(link, true))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          className="p-1.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 shrink-0"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
