import About from '../components/About';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ProfilePage = () => {
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
      <div className="border-b border-zinc-200 dark:border-zinc-800/30 mb-0" />
      <About />
      <Certifications />
      <Experience />
      <Skills />
    </div>
  );
};

export default ProfilePage;
