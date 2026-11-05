import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { personal } = portfolioData;
  const roles = personal.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(500);
      }
    };
    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-500/5 dark:bg-zinc-400/5 rounded-full blur-3xl md:blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-400/5 dark:bg-zinc-500/5 rounded-full blur-3xl md:blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.08 } }
          }}
        >
          {/* Main heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 34, scale: 0.96, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
          >
            <span className="text-zinc-900 dark:text-zinc-100">{personal.name.split(' ')[0]}</span>
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">{personal.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } } }}
            className="mb-6"
          >
            <span className="font-mono text-lg md:text-xl text-zinc-400 dark:text-zinc-500">
              {'> '}{currentText}
              <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle animate-blink" />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 22, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65 } } }}
            className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10"
          >
            Informatics graduate from Universitas Ahmad Dahlan with hands-on
            experience in web development, software engineering, and digital projects.
          </motion.p>

          {/* CTA + Socials */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-start gap-0 group transition-all cursor-pointer"
            >
              <span className="rounded-full font-semibold transition-transform duration-300 group-hover:scale-[0.98] shadow-sm px-3 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-200">
                View My Work
              </span>
              <span className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-[1.05] shadow-sm shrink-0 relative z-10 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
            </Link>
            <a
              href={personal.cvPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-start gap-0 group transition-all cursor-pointer"
              aria-label="Download Curriculum Vitae"
            >
              <span className="rounded-full font-medium transition-transform duration-300 group-hover:scale-[0.98] px-3 py-3 text-xs sm:px-7 sm:py-3.5 sm:text-sm border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white">
                Download CV
              </span>
              <span className="flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 group-hover:scale-[1.05] shrink-0 relative z-10 w-8 h-8 sm:w-10 sm:h-10 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } } }}
            className="flex items-center justify-center gap-4"
          >
            {portfolioData.socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800/50 text-zinc-400 dark:text-zinc-500 hover:text-accent hover:border-accent/30 transition-all duration-300"
                aria-label={`Visit ${s.name}`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
