import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const dark = saved !== null ? saved === "true" : true;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = (event) => {
    if (isTransitioning) return;

    // Detect iOS/mobile to disable View Transition API (prevents certificate flip glitch)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = window.innerWidth < 768;
    const shouldUseTransition = !isIOS && !isMobile;

    const isAppearanceTransition =
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      shouldUseTransition;

    if (!isAppearanceTransition || !event) {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
      return;
    }

    setIsTransitioning(true);
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      const animation = document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 650,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );

      animation.onfinish = () => setIsTransitioning(false);
    });

    transition.finished.finally(() => {
      if (!isTransitioning) setIsTransitioning(false);
    });
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleDarkMode, isTransitioning }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
