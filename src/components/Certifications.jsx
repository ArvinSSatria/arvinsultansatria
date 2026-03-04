import { motion } from 'framer-motion';
import { FaCalendarAlt, FaAward } from 'react-icons/fa';
import { useState } from 'react';

const Certifications = () => {
  const [activeId, setActiveId] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'Certificate Bangkit Academy',
      date: 'July 2024',
      description: 'Successfully completed the Bangkit Academy 2024 program.',
      image: '/certificates/[Bangkit 2024 Batch 2] Certificate.jpg',
      tags: ['Team Leadership', 'Capstone Project'],
    },
    {
      id: 2,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_kedua.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 3,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_ketiga.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 4,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_keempat.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 5,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_kelima.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
    {
      id: 6,
      title: 'Sertifikat Course Bangkit Academy',
      date: '2024',
      description: 'Successfully completed a course module in Bangkit Academy learning path.',
      image: '/certificates/sertifikat_course_keenam.jpg',
      tags: ['Course', 'Bangkit Academy'],
    },
  ];

  // Duplicate for desktop marquee
  const duplicated = [...certificates, ...certificates, ...certificates];

  return (
    <section id="certifications" className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30 overflow-hidden">
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
            Certificates & Awards
          </h2>
          <p className="text-zinc-500 max-w-lg">
            Recognitions and certifications from my learning journey.
          </p>
        </motion.div>
      </div>

      {/* Mobile View: Animated List */}
      <div className="md:hidden px-6 pb-12">
        <div className="grid grid-cols-1 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="aspect-[16/10] perspective-1000 cursor-pointer"
              onClick={() => setActiveId(activeId === cert.id ? null : cert.id)}
            >
              <div
                className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${
                  activeId === cert.id ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900/50 shadow-sm">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 active:bg-black/10 transition-colors">
                    <span className="text-[10px] text-white/40 font-mono">Tap to flip</span>
                  </div>
                </div>
                {/* Back */}
                <div 
                  className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/95 p-6 flex flex-col justify-between shadow-xl transition-opacity duration-300 ${
                    activeId === cert.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div>
                    <FaAward className="w-6 h-6 text-accent mb-3" />
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">{cert.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-accent/70 mb-3"><FaCalendarAlt />{cert.date}</div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-4">{cert.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/30 text-zinc-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop View: Auto-scrolling Marquee (Bergerak Kanan ke Kiri) */}
      <div className="hidden md:block relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white dark:from-[#18181b] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white dark:from-[#18181b] to-transparent pointer-events-none" />

        <div className="flex gap-10 animate-marquee py-4 hover:[animation-play-state:paused]">
          {duplicated.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="flex-shrink-0 w-[520px] aspect-[16/10] perspective-2000 group cursor-default"
            >
              {/* Flip container */}
              <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                {/* Front face */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/40 bg-zinc-100 dark:bg-zinc-900/50 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                {/* Back face */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="p-2.5 rounded-xl bg-accent/10 w-fit mb-5">
                      <FaAward className="w-6 h-6 text-accent" />
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight">
                      {cert.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-mono text-accent/80 mb-5 bg-accent/5 px-2.5 py-1 rounded-full w-fit">
                      <FaCalendarAlt className="w-3.5 h-3.5" />
                      {cert.date}
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                      {cert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/50 text-zinc-500 border border-zinc-200/50 dark:border-zinc-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

