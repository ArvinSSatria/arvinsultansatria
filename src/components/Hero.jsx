import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaArrowDown } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { useState, useEffect } from 'react';

const Hero = () => {
  const roles = ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder", "Tech Explorer"];
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
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
          }}
        >
          {/* Image Profile */}
          {/* <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-full h-full rounded-full border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-xl group cursor-pointer">
              <img
                src="/profile.jpg"
                alt="Arvin Sultan Satria"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
            </div>
          </motion.div> */}

          {/* Status badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Available for opportunities</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
          >
            <span className="text-zinc-900 dark:text-zinc-100">Arvin</span>
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">Sultan Satria</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-6"
          >
            <span className="font-mono text-lg md:text-xl text-zinc-400 dark:text-zinc-500">
              {'> '}{currentText}
              <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle animate-blink" />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10"
          >
            Informatics student at UAD. I design and build modern web experiences
            with attention to detail, clean code, and smooth interactions.
          </motion.p>

          {/* CTA + Socials */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="group px-7 py-3.5 rounded-full bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
            >
              View My Work
            </a>
            <a
              href="/cv-arvin.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all duration-300"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: "https://github.com/ArvinSSatria", icon: FaGithub },
              { href: "https://www.linkedin.com/in/arvin-sultan-satria/", icon: FaLinkedinIn },
              { href: "https://www.instagram.com/arvinssatria/", icon: FaInstagram },
              { href: "https://www.threads.com/@arvinssatria", icon: SiThreads },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800/50 text-zinc-400 dark:text-zinc-500 hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
            <FaArrowDown className="w-3 h-3 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
