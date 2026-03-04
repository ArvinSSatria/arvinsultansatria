import { motion } from 'framer-motion';
import { FaReact, FaJs, FaPython, FaGitAlt, FaFigma, FaHtml5, FaCss3Alt, FaGithub, FaNpm, FaCode, FaLaravel } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer, SiCanva, SiMysql, SiNextdotjs, SiPostgresql } from 'react-icons/si';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', icon: FaHtml5 },
        { name: 'CSS3', icon: FaCss3Alt },
        { name: 'JavaScript', icon: FaJs },
        { name: 'React', icon: FaReact },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'Next.js', icon: SiNextdotjs },
      ]
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git', icon: FaGitAlt },
        { name: 'GitHub', icon: FaGithub },
        { name: 'VS Code', icon: FaCode },
        { name: 'Vite', icon: SiVite },
        { name: 'npm', icon: FaNpm },
        { name: 'Framer Motion', icon: SiFramer },
      ]
    },
    {
      title: 'Design & Backend',
      skills: [
        { name: 'Figma', icon: FaFigma },
        { name: 'Canva', icon: SiCanva },
        { name: 'Laravel', icon: FaLaravel },
        { name: 'Python', icon: FaPython },
        { name: 'MySQL', icon: SiMysql },
        { name: 'PostgreSQL', icon: SiPostgresql },
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // tech stack
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tools & Technologies
          </h2>
          <p className="text-zinc-500 max-w-lg mb-16">
            The technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <h3 className="text-sm font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-800" />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:border-accent/30 dark:hover:border-accent/20 transition-all duration-300 cursor-default"
                  >
                    <skill.icon className="w-7 h-7 text-zinc-400 dark:text-zinc-500 group-hover:text-accent transition-colors duration-300" />
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
