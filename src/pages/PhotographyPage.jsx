import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Photography from '../components/Photography';
import { IoArrowBack } from 'react-icons/io5';

const PhotographyPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors font-mono text-xs uppercase tracking-widest group"
        >
          <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
      
      <Photography preview={false} />
      
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800/30 text-center">
         <p className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em]">
            // thank you for scrolling
         </p>
      </div>
    </div>
  );
};

export default PhotographyPage;
