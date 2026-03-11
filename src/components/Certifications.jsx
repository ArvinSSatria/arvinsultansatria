import { motion } from "framer-motion";
import { FaCalendarAlt, FaAward } from "react-icons/fa";
import { useState, useRef, useEffect, useCallback } from "react";
import { portfolioData } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

const SPEED = 0.8;
const DRAG_THRESHOLD = 10; // px — below = tap, above = drag

const Certifications = () => {
  const [flippedId, setFlippedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { certificates } = portfolioData;
  const { isTransitioning } = useTheme();

  const duplicated = [...certificates, ...certificates];

  // ── refs ─────────────────────────────────────────────────────────────────────
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const rafRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartPosRef = useRef(0);

  // ── animation loop ───────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const el = trackRef.current;
    if (el) {
      const halfWidth = el.scrollWidth / 2;
      if (!isHoveredRef.current && !isDraggingRef.current && halfWidth > 0) {
        positionRef.current -= SPEED;
      }
      if (halfWidth > 0) {
        positionRef.current = positionRef.current % halfWidth;
        if (positionRef.current > 0) positionRef.current -= halfWidth;
      }
      el.style.transform = `translateX(${positionRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // ── global mouse listeners ────────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      if (Math.abs(dx) > DRAG_THRESHOLD) hasDraggedRef.current = true;
      positionRef.current = dragStartPosRef.current + dx;
    };
    const onMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // ── touch listeners ───────────────────────────────────────────────────────────
  // Drag/scroll logic only — flip is handled by onClick on each card.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onTouchStart = (e) => {
      const t = e.touches[0];
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartXRef.current = t.clientX;
      dragStartYRef.current = t.clientY;
      dragStartPosRef.current = positionRef.current;
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      const t = e.touches[0];
      const dx = t.clientX - dragStartXRef.current;
      const dy = t.clientY - dragStartYRef.current;

      // Total Euclidean movement — catches both horizontal and vertical drags
      // so a page-scroll never accidentally triggers a flip.
      const totalMoved = Math.sqrt(dx * dx + dy * dy);
      if (totalMoved > DRAG_THRESHOLD) hasDraggedRef.current = true;

      // Only take over horizontal swipes for the marquee.
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
        positionRef.current = dragStartPosRef.current + dx;
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Flip is handled by the onClick on each card — nothing to do here.
    };

    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
    wrapper.addEventListener("touchend", onTouchEnd);
    return () => {
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // ── mouse handlers ────────────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;
    e.preventDefault();
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  }, []);

  // ── per-card click handler ────────────────────────────────────────────────────
  // onClick fires on mobile after touchend (no 300 ms delay on modern browsers
  // with a proper viewport meta tag). The browser does NOT fire click after a
  // real drag, so hasDraggedRef is a safety net for edge-cases only.
  const handleCardClick = useCallback((uniqueKey) => {
    if (hasDraggedRef.current) return; // was a drag, not a tap
    setFlippedId((prev) => (prev === uniqueKey ? null : uniqueKey));
  }, []);

  return (
    <section
      id="certifications"
      className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30 overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // certifications
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Certificates &amp; Awards
          </h2>
          <p className="text-zinc-500 max-w-lg">
            Recognitions and certifications from my learning journey.
          </p>
        </motion.div>
      </div>

      {/* ── Unified Marquee — mobile + desktop ── */}
      <div
        ref={wrapperRef}
        className="relative select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-white dark:from-[#18181b] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-white dark:from-[#18181b] to-transparent pointer-events-none" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex w-max gap-4 md:gap-10 py-4 pl-4 md:pl-0 pr-4 md:pr-10 will-change-transform"
        >
          {duplicated.map((cert, index) => {
            const uniqueKey = `${cert.id}-${index}`;
            const isFlipped = flippedId === uniqueKey;

            return (
              <div
                key={uniqueKey}
                className="flex-shrink-0 w-[82vw] md:w-[520px] aspect-[16/10] [perspective:1200px] md:[perspective:2000px] group outline-none"
                aria-label={`Certificate: ${cert.title}`}
                // onClick handles tap-to-flip on mobile AND click-to-flip on desktop.
                // hasDraggedRef prevents flip when the user was actually dragging.
                onClick={() => handleCardClick(uniqueKey)}
              >
                {/* Flip container */}
                <div
                  data-flip-container
                  className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${
                    isFlipped
                      ? "[transform:rotateY(180deg)]"
                      : !isDragging
                        ? "md:group-hover:[transform:rotateY(180deg)]"
                        : ""
                  }`}
                >
                  {/* ── Front ── */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900/50 shadow-lg md:group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      draggable={false}
                      className="w-full h-full object-cover object-center scale-100 md:group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors" />
                    {/* Tap hint — mobile only */}
                    <div className="absolute bottom-3 right-3 md:hidden">
                      <span className="text-[9px] text-white/50 font-mono bg-black/25 px-2 py-0.5 rounded-full">
                        Tap to flip
                      </span>
                    </div>
                  </div>

                  {/* ── Back ── */}
                  <div
                    className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/95 dark:bg-zinc-900/95 p-5 md:p-8 flex flex-col justify-between shadow-2xl ${
                      isTransitioning ? "" : "backdrop-blur-xl"
                    }`}
                  >
                    <div>
                      <div className="p-2 md:p-2.5 rounded-xl bg-accent/10 w-fit mb-3 md:mb-5">
                        <FaAward className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                      </div>

                      <h3 className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 md:mb-3 tracking-tight">
                        {cert.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-accent/80 mb-2 md:mb-5 bg-accent/5 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full w-fit">
                        <FaCalendarAlt className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                        {cert.date}
                      </div>

                      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-none mb-4 md:mb-0">
                        {cert.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-500 border border-zinc-200/50 dark:border-zinc-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
