import { useState, useEffect } from 'react';
import { 
  FaMoon, FaSun, 
  FaHome, FaUser, FaBriefcase, FaCamera, FaEnvelope 
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'home', icon: FaHome },
  { href: '/profile', label: 'profile', icon: FaUser },
  { href: '/projects', label: 'works', icon: FaBriefcase },
  { href: '/photography', label: 'gallery', icon: FaCamera },
  { href: '/contact', label: 'contact', icon: FaEnvelope },
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
      ? 'w-10 h-10 shrink-0' // Decreased size slightly
      : 'px-4 py-2 text-[13px]';
      
    const content = isMobile ? <link.icon className="w-5 h-5" /> : link.label;

    return (
      <Link
        key={link.href}
        to={link.href}
        className={`relative flex items-center justify-center ${paddingClass} font-mono font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none active:ring-0 select-none whitespace-nowrap ${
          isActive
            ? 'text-white bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100'
        }`}
        style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
        aria-label={link.label}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      {/* ── Desktop: Floating centered pill (Top) ── */}
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        {navLinks.map((link) => renderNavLink(link, false))}

        {/* Dark mode toggle in pill */}
        <button
          onClick={toggleDarkMode}
          className="ml-1 p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
          aria-label="Toggle Dark Mode"
          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
        >
          {isDarkMode ? <FaSun className="w-3.5 h-3.5" /> : <FaMoon className="w-3.5 h-3.5" />}
        </button>
      </nav>

      {/* ── Mobile: Floating centered pill (Bottom) ── */}
      <nav
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center justify-between p-2 px-2.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-28 opacity-0'
        } w-[90vw] max-w-[360px]`}
      >
        <div className="flex items-center justify-between flex-1 pr-1.5">
          {navLinks.map((link) => renderNavLink(link, true))}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-7 bg-zinc-200 dark:bg-zinc-700/60 mx-1 shrink-0 rounded-full"></div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          className="w-11 h-11 flex items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 shrink-0 ml-0.5 focus:outline-none focus-visible:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
