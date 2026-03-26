import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaMapMarkerAlt, FaArrowRight, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Photography = ({ preview = false }) => {
  const { photography } = portfolioData;
  const displayPhotos = preview ? photography.slice(0, 4) : photography;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedPhoto]);

  return (
    <section
      id="photography"
      className={`py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30 overflow-hidden ${preview ? '' : 'bg-zinc-50/30 dark:bg-zinc-900/10'}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
              // through my lens
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Photography
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400">
              Moments I captured while exploring places, light, and everyday
              stories.
            </p>
          </div>

          {preview && (
            <Link
              to="/photography"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium transition-all hover:gap-4 hover:bg-accent group self-start md:self-auto"
            >
              View Full Gallery
              <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[260px]">

          {displayPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08
              }}
              onClick={() => setSelectedPhoto(photo)}
              className={`relative group overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900/50 cursor-pointer ${photo.span}`}
            >

              {/* Image */}
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">

                <p className="text-white text-lg font-semibold mb-1 transform translate-y-6 group-hover:translate-y-0 transition duration-500">
                  {photo.caption}
                </p>

                <div className="flex items-center gap-2 text-white/80 text-xs font-mono transform translate-y-6 group-hover:translate-y-0 transition duration-500 delay-75">
                  <FaMapMarkerAlt className="w-3.5 h-3.5 text-accent" />
                  {photo.location}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {!preview && (
            <div className="mt-16 text-center">
                <p className="text-zinc-500 dark:text-zinc-500 text-sm italic">
                    More photos coming soon...
                </p>
            </div>
        )}
      </div>

      {/* Lightbox / Full screen image view */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[90vh] md:max-h-[85vh] rounded-xl"
              />
              
              {/* Caption overlay in lightbox */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <p className="text-white text-xl font-bold mb-2">
                  {selectedPhoto.caption}
                </p>
                <div className="flex items-center gap-2 text-white/80 text-sm font-mono">
                  <FaMapMarkerAlt className="w-4 h-4 text-accent" />
                  {selectedPhoto.location}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Photography;