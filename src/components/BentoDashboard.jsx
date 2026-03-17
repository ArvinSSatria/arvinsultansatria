import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  FaMapMarkerAlt, FaCode, FaCamera, 
  FaPlay, FaPause, FaClock, FaMusic,
  FaExternalLinkAlt 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BentoDashboard = () => {
  const { personal, stats, photography, music } = portfolioData;
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(new Date());
  const [lyricIndex, setLyricIndex] = useState(0);
  const audioRef = useRef(null);

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
      
      <div className="max-w-6xl mx-auto">
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
            className="col-span-2 row-span-2 p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  // established 2020
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-zinc-900 leading-[1.1] tracking-tight">
                Crafting digital <br />
                experiences at <br />
                <span className="text-accent underline decoration-accent/30 underline-offset-8 decoration-2">{personal.education.split(' ').slice(-2).join(' ')}</span>
              </h3>
            </div>
            
            <div className="relative z-10 mt-12 grid grid-cols-2 gap-8 border-t border-white/5 dark:border-black/5 pt-8">
               {stats.slice(0, 2).map((stat, i) => (
                 <div key={i}>
                    <p className="text-3xl font-bold text-white dark:text-zinc-900">{stat.value}</p>
                    <p className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider mt-1">{stat.label}</p>
                 </div>
               ))}
            </div>

            <FaCode className="absolute -bottom-10 -right-10 text-[12rem] text-white/5 dark:text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </motion.div>

          {/* Location Card - Interactive */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 sm:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 flex flex-col justify-between group min-h-[160px] md:min-h-[200px]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-accent transition-colors">
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
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
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
            className="col-span-2 p-5 md:p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-[#1c1c1e] relative overflow-hidden group"
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
                  <h4 className="text-sm sm:text-lg md:text-xl font-bold truncate leading-tight">{music.title}</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm text-zinc-500 font-mono tracking-tighter truncate">{music.artist}</p>
                  
                  {/* Dynamic Lyrics Display - Stacked (Original & Translation) */}
                  <div className="mt-3 min-h-[3.5rem] flex flex-col justify-center">
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
                          <p className="text-[10px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                            {music.lyrics[lyricIndex].original}
                          </p>
                          <p className="text-[8px] sm:text-[10px] italic text-zinc-500 font-medium leading-tight mt-1">
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
                        key={i}
                        animate={isPlaying ? { height: [5, 15, 8, 20, 6] } : { height: 3 }}
                        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
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
            className="col-span-2 row-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-all duration-500 group overflow-hidden flex flex-col"
          >
            {/* Project Image Header */}
            <div className="aspect-[16/9] md:aspect-[16/10] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800/30 bg-zinc-100 dark:bg-zinc-800/20 mb-6 shrink-0">
              <img 
                src={portfolioData.projects[0].image} 
                alt="Featured" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                  {portfolioData.projects[0].title}
                </h4>
                <Link to="/projects" className="text-zinc-400 hover:text-accent transition-colors">
                  <FaCode className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs font-mono text-accent/70 mb-3">{portfolioData.projects[0].subtitle}</p>
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
            {/* Photography Header Image */}
            <Link to="/photography" className="block aspect-[16/9] md:aspect-[16/10] rounded-xl overflow-hidden relative group/img mb-6 shrink-0 border border-zinc-200 dark:border-zinc-800/30">
               <img src={photography[0].url} alt="Latest" className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105" />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-mono text-[10px] uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">View Gallery</span>
               </div>
            </Link>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-accent transition-colors">
                  {photography[0].caption}
                </h4>
                <Link to="/photography" className="text-zinc-400 hover:text-accent transition-colors">
                  <FaCamera className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-3 tracking-widest uppercase truncate pt-1">Captured Moment</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                Exploring the beauty of {photography[0].location} through my lens. Part of the latest landscape series.
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
