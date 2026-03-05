import { FaHeart } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  const { personal, socials } = portfolioData;

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/30">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-400 dark:text-zinc-600 flex items-center gap-1.5">
            Built with <FaHeart className="w-3 h-3 text-accent" /> by {personal.name}
            <span className="text-zinc-300 dark:text-zinc-800 mx-1">•</span>
            © {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 dark:text-zinc-600 hover:text-accent transition-colors duration-200"
                aria-label={`Visit ${s.name}`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
