import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const { experience: timeline } = portfolioData;

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Education & Journey
          </h2>
          <p className="text-zinc-500 max-w-lg mb-16">
            My academic path and professional experiences so far.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800/50" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-10 md:pl-24"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute left-0 md:left-8 top-1 w-px h-full">
                  <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full border-2 border-accent bg-white dark:bg-zinc-950" />
                </div>

                <span className="inline-block font-mono text-[11px] text-accent bg-accent/5 border border-accent/10 px-3 py-1 rounded-full mb-3">
                  {item.year}
                </span>

                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-accent flex-shrink-0 hidden sm:block">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-400 dark:text-zinc-500 font-mono mb-3">{item.org}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 border border-zinc-200 dark:border-zinc-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
