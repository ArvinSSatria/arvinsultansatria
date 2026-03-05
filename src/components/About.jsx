import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { personal, stats, about } = portfolioData;

  const aboutInfo = [
    { label: 'Location', value: personal.location },
    { label: 'Education', value: personal.education },
    { label: 'Email', value: personal.email },
    { label: 'Major', value: personal.major },
    { label: 'Hobbies', value: personal.hobbies },
    { label: 'GPA', value: personal.gpa },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // about me
          </span>

          <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Image + Stats */}
            <div className="md:col-span-2 space-y-6">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30"
                  >
                    <p className="text-2xl font-bold text-accent">{stat.value}</p>
                    <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Text */}
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {about.title}<br />
                <span className="text-zinc-400 dark:text-zinc-500">{about.subtitle}</span>
              </h2>

              <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {about.description.map((para, i) => {
                  // Replace names with styled spans
                  let content = para;
                  const name = personal.name;
                  const university = personal.education;
                  
                  // Use a helper to safely replace
                  const parts = para.split(new RegExp(`(${name}|${university})`, 'g'));
                  
                  return (
                    <p key={i}>
                      {parts.map((part, index) => {
                        if (part === name || part === university) {
                          return (
                            <span key={index} className="text-zinc-800 dark:text-zinc-200 font-medium">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {aboutInfo.map((info) => (
                    <div key={info.label}>
                      <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">{info.label}</p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-0.5 break-words">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
