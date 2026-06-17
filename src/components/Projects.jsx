import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const INITIAL_COUNT = 4;

const Projects = () => {
  const { projects } = portfolioData;
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // selected work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-zinc-500 max-w-lg mb-16">
            Some of my recent projects showcasing design thinking and development skills.
          </p>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => {
              const isExtra = index >= INITIAL_COUNT;
              // Stagger: kartu lama pakai delay bertingkat saat scroll,
              // kartu baru (dari View All) pakai delay dari posisi relatifnya
              const entryDelay = isExtra ? 0 : Math.min(index * 0.09, 0.27);

              return (
                <motion.div
                  key={project.id}
                  data-project-index={index}
                  className="group relative grid md:grid-cols-2 gap-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-colors duration-500 will-change-transform"
                  initial={isExtra ? { opacity: 0, y: 20 } : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.65,
                    delay: entryDelay,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {/* Project image */}
                  <div className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800/30 bg-zinc-100 dark:bg-zinc-800/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>

                  {/* Project info */}
                  <div className="flex flex-col justify-center py-2">
                    <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700 mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono text-accent/70 mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 border border-zinc-200 dark:border-zinc-800/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors group/link"
                      >
                        View Detail
                        <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </button>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors group/link"
                      >
                        View Project
                        <FaExternalLinkAlt className="w-3 h-3 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Toggle button */}
        {projects.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="mt-12 flex justify-start"
          >
            <motion.button
              onClick={handleToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/40 bg-white dark:bg-zinc-900/50 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors duration-300 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {showAll ? (
                  <motion.span
                    key="less"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="flex items-center gap-2"
                  >
                    <FaMinus className="w-3 h-3" />
                    Show Less
                  </motion.span>
                ) : (
                  <motion.span
                    key="more"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="flex items-center gap-2"
                  >
                    <FaPlus className="w-3 h-3" />
                    View All Projects ({projects.length})
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Full Screenshot Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-zinc-900/80 backdrop-blur-sm"
            onClick={() => { setSelectedProject(null); setIsZoomed(false); }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-auto max-h-[90vh] bg-zinc-100 dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/60 shadow-2xl flex flex-col"
            >
              {/* Header / Close button */}
              <div className="absolute top-4 right-4 md:top-6 md:right-8 z-10 flex gap-2">
                <button
                  onClick={() => { setSelectedProject(null); setIsZoomed(false); }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all border border-zinc-200/50 dark:border-zinc-700/50"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Image Container */}
              <div 
                className={`w-full flex-1 min-h-0 overflow-y-auto p-0 overscroll-contain ${isZoomed ? 'overflow-x-auto' : 'overflow-x-hidden'}`}
                data-lenis-prevent="true"
              >
                {selectedProject.fullScreenshot ? (
                  <img
                    src={selectedProject.fullScreenshot}
                    alt={`Full Screenshot - ${selectedProject.title}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`${isZoomed ? "w-auto max-w-none cursor-zoom-out" : "w-full h-auto cursor-zoom-in"} block transition-all duration-300 origin-top`}
                  />
                ) : (
                  <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900">
                    <div className="text-center p-8">
                      <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">Full screenshot is not available yet.</p>
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">Please add it to the portfolio data.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
