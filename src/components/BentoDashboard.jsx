import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView 
} from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  FaMapMarkerAlt, FaCode, FaCamera, 
  FaPlay, FaPause, FaClock, FaMusic,
  FaExternalLinkAlt, FaStar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  
  const targetValue = parseInt(value);
  const isNumeric = !isNaN(targetValue);
  const suffix = isNumeric ? value.replace(/[0-9]/g, '') : '';

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setDisplayValue(targetValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    } else if (isInView && !isNumeric) {
      setDisplayValue(value);
    }
  }, [isInView, targetValue, isNumeric, value]);

  return (
    <div ref={ref}>
      <p className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
        {isNumeric ? `${displayValue}${suffix}` : value}
      </p>
      <p className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 tracking-wider mt-1">{label}</p>
    </div>
  );
};

const BentoDashboard = () => {
  const { personal, stats, photography, music } = portfolioData;
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(new Date());
  const [lyricIndex, setLyricIndex] = useState(0);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const iconY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const smoothIconY = useSpring(iconY, { stiffness: 100, damping: 30 });
  const smoothIconRotate = useSpring(iconRotate, { stiffness: 100, damping: 30 });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync lyrics with audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (music.lyrics) {
        const currentTime = audio.currentTime;
        // Find the index of the last lyric that has started
        const index = music.lyrics.reduce((latestIdx, lyric, idx) => {
          if (currentTime >= lyric.startTime) {
            return idx;
          }
          return latestIdx;
        }, -1);
        
        if (index !== lyricIndex) {
          setLyricIndex(index);
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [music.lyrics, lyricIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="pb-24 px-6 relative">
      <audio ref={audioRef} src={music.audioUrl} loop />
      
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Main Stat Card - Bento Hub */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="col-span-2 row-span-2 p-6 sm:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  // established 2020
                </span>
              </div>
              <h3 className="text-3xl md:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-[1.2] tracking-tight">
                Crafting digital <br />
                experiences at <br />
                <span className="text-accent underline decoration-accent/20 underline-offset-8 decoration-2">{personal.education.split(' ').slice(-2).join(' ')}</span>
              </h3>
            </div>
            
            <div className="relative z-10 mt-8 grid grid-cols-2 gap-6 border-t border-zinc-100 dark:border-zinc-800/50 pt-8">
               {stats.slice(0, 2).map((stat, i) => (
                 <StatCounter key={i} value={stat.value} label={stat.label} />
               ))}
            </div>

            <motion.div
              style={{ y: smoothIconY, rotate: smoothIconRotate }}
              className="absolute -bottom-10 -right-10 text-[12rem] text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none"
            >
              <FaCode />
            </motion.div>
          </motion.div>

          {/* Location Card - Interactive */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 sm:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 flex flex-col justify-between group min-h-[160px] md:min-h-[200px]"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-accent transition-colors">
              <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1 tracking-widest leading-none">Lives In</p>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{personal.location.split(',')[0]}</h4>
              <p className="text-xs md:text-sm text-zinc-500 font-medium">{personal.location.split(',')[1]}</p>
            </div>
          </motion.div>

          {/* Clock Card - Dynamic */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 sm:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 flex flex-col justify-between group min-h-[160px] md:min-h-[200px]"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-accent">
                 <FaClock className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-800/50 px-2 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                GMT+7
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 mb-1 tracking-widest leading-none">Local Time</p>
              <h4 className="text-xl md:text-2xl font-mono font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 flex items-baseline">
                {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                <span className="text-accent animate-pulse mx-1">:</span>
                <span className="text-sm md:text-base opacity-40">{time.toLocaleTimeString('en-US', { second: '2-digit' })}</span>
              </h4>
            </div>
          </motion.div>

          {/* Music Player Card - Interactive Vinyl */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 p-5 md:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 relative overflow-hidden group"
          >
            <div className="flex items-center gap-4 md:gap-8 relative z-10 h-full">
              {/* Spinning Vinyl */}
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0">
                <motion.div 
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { repeat: Infinity, duration: 8, ease: "linear" } : { duration: 1 }}
                  className="w-full h-full rounded-full bg-zinc-900 dark:bg-black p-0.5 md:p-1 relative"
                >
                  <div className="w-full h-full rounded-full border-[3px] sm:border-[4px] md:border-[6px] border-zinc-800 dark:border-zinc-900 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-zinc-700 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <img src={music.cover} alt="Cover" className="w-full h-full object-cover opacity-50" />
                    </div>
                  </div>
                  {/* Groove texture simulation */}
                  <div className="absolute inset-0 rounded-full pointer-events-none" />
                </motion.div>
                
                {/* Tone arm */}
                <motion.div 
                  animate={isPlaying ? { rotate: 20 } : { rotate: 0 }}
                  className="absolute -top-1 -right-0.5 w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-zinc-400 dark:bg-zinc-600 origin-right rounded-full z-20"
                />
              </div>

              {/* Player Info & Controls - Landscape Layout */}
              <div className="flex-1 flex flex-row items-center justify-between gap-2 sm:gap-4 overflow-hidden">
                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-accent mb-0.5 sm:mb-1">
                    <FaMusic className="w-2 sm:w-3 h-2 sm:h-3" />
                    <span className="text-[8px] sm:text-[10px] font-mono tracking-widest uppercase truncate">Now Playing</span>
                  </div>
                  <div className="flex items-baseline gap-2 overflow-hidden">
                    <h4 className="text-sm sm:text-lg md:text-xl font-bold truncate leading-tight">{music.title}</h4>
                    <span className="text-zinc-500 dark:text-zinc-500 font-medium opacity-50 px-1.5">•</span>
                    <p className="text-[10px] sm:text-xs md:text-sm text-zinc-500 font-mono tracking-tighter truncate shrink-0">{music.artist}</p>
                  </div>
                  
                  {/* Dynamic Lyrics Display - Stacked (Original & Translation) */}
                  <div className="mt-3 h-[4.5rem] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {isPlaying && music.lyrics && lyricIndex !== -1 && (
                        <motion.div
                          key={lyricIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="flex flex-col"
                        >
                          <p className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                            {music.lyrics[lyricIndex].original}
                          </p>
                          <p className="text-[10px] sm:text-xs italic text-zinc-500 font-medium leading-tight mt-1">
                            {music.lyrics[lyricIndex].translation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right side: Button + Visualizer */}
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Visualizer bars - hidden on very small screens, visible on sm and up */}
                  <div className="hidden sm:flex items-end gap-0.5 sm:gap-1 h-5 sm:h-8 px-2 sm:px-4 border-l border-zinc-200 dark:border-zinc-800">
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div 
                        key={`${i}-${isPlaying}`}
                        initial={{ height: 3 }}
                        animate={isPlaying ? { height: [5, 15, 8, 20, 6] } : { height: 3 }}
                        transition={isPlaying ? { repeat: Infinity, duration: 0.5 + i * 0.1 } : { duration: 0.3 }}
                        className="w-0.5 sm:w-1 bg-accent rounded-full"
                      />
                    ))}
                  </div>

                  <button 
                    onClick={togglePlay}
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all flex-shrink-0"
                  >
                    {isPlaying ? <FaPause className="w-3 h-3 sm:w-4 sm:h-4" /> : <FaPlay className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Project Card - Styled like main Projects section */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="col-span-2 row-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-all duration-500 group overflow-hidden flex flex-col"
          >
            {/* Label at the top */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                // featured project
              </span>
            </div>

            {/* Project Image Header */}
            <div className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800/30 bg-zinc-100 dark:bg-zinc-800/20 mb-6 shrink-0 relative">
              <img 
                src={portfolioData.projects[0].image} 
                alt="Featured" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors leading-[1.1]">
                  {portfolioData.projects[0].title}
                </h4>
                <Link to="/projects" className="text-zinc-400 hover:text-accent transition-colors mt-2">
                  <FaCode className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 leading-relaxed">
                {portfolioData.projects[0].description}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-1.5">
                  {portfolioData.projects[0].tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 border border-zinc-200 dark:border-zinc-800/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={portfolioData.projects[0].preview} 
                  target="_blank" 
                  className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 group/link"
                >
                  Live Preview <FaExternalLinkAlt className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Photo Quick Link (Captured Moment) - Balanced with Project Card */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 row-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-all duration-500 group overflow-hidden flex flex-col"
          >
            {/* Label at the top */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                // captured moment
              </span>
            </div>

            {/* Photography Header Image */}
            <Link to="/photography" className="block aspect-video rounded-xl overflow-hidden relative group/img mb-6 shrink-0 border border-zinc-200 dark:border-zinc-800/30">
               <img src={photography[0].url} alt="Latest" className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105" />
            </Link>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors leading-[1.1]">
                  {photography[0].caption}
                </h4>
                <Link to="/photography" className="text-zinc-400 hover:text-accent transition-colors mt-2">
                  <FaCamera className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                Exploring the beauty of {photography[0].location} through my lens.
              </p>
              
              <div className="mt-auto">
                 <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                    <FaMapMarkerAlt className="w-2.5 h-2.5 text-accent/50" />
                    {photography[0].location}
                 </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoDashboard;
