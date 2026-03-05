import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal, socials } = portfolioData;

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-zinc-200 dark:border-zinc-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase mb-4 block">
            // get in touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Let's work together
          </h2>
          <p className="text-zinc-500 max-w-lg mb-16">
            Have an idea or project? Let's have a conversation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                Whether it's a freelance project, collaboration, or just want to say hello —
                feel free to reach out. I'm always open to interesting conversations and
                new opportunities.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 text-lg font-medium text-accent hover:text-accent-400 transition-colors"
              >
                <FaEnvelope className="w-4 h-4" />
                {personal.email}
              </a>
            </div>

            <div>
              <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-4">Socials</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-accent/30 dark:hover:border-accent/20 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-all duration-300"
                    aria-label={`Visit ${s.name}`}
                  >
                    <s.icon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-accent transition-colors" />
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-900/20">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 mb-2">Support My Work ☕</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                If my work helped or inspired you, consider supporting me via Saweria.
              </p>
              <a
                href="https://saweria.co/arvinssatria"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
              >
                ☕ Support via Saweria
              </a>
            </div>
          </motion.div>

          <motion.form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const message = e.target.message.value;
              const whatsappUrl = `https://wa.me/${personal.whatsapp}?text=${encodeURIComponent(
                `Halo Arvin, perkenalkan saya ${name}.\n\n${message}`
              )}`;
              window.open(whatsappUrl, '_blank');
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                required
                className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
            >
              Send via WhatsApp <FaPaperPlane className="w-3.5 h-3.5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
