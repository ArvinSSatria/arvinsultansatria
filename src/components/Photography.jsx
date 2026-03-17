import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Photography = ({ preview = false }) => {
  const { photography } = portfolioData;
  const displayPhotos = preview ? photography.slice(0, 4) : photography;

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
              className={`relative group overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900/50 ${photo.span}`}
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
    </section>
  );
};

export default Photography;