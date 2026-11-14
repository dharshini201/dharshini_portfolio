import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [readyToIntro, setReadyToIntro] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setReadyToIntro(true), 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 55);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    soundscape.init();
    soundscape.playWarp(0.25);
    setIsDismissed(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-space-deep overflow-hidden select-none"
        >
          {/* Deep space radial background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-space-midnight via-space-deep to-black opacity-95" />

          {/* Concentric planetary orbit lines */}
          <div className="absolute w-[520px] h-[520px] rounded-full border border-space-cyan/15 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-space-purple/20 animate-reverse-spin pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
            {!readyToIntro ? (
              /* Phase 1: Small Rotating Earth & Progress */
              <div className="flex flex-col items-center">
                {/* Small Rotating 3D-styled Earth Sphere */}
                <div className="relative w-24 h-24 mb-7 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-space-cyan/40 animate-ping opacity-25" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 via-sky-500 to-emerald-400 shadow-glowCyan flex items-center justify-center overflow-hidden border border-white/30 relative">
                    {/* Rotating cloud overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/40 animate-spin-slow" />
                    <Sparkles className="text-white/90 animate-pulse relative z-10" size={24} />
                  </div>
                </div>

                {/* Status prompt */}
                <div className="text-xs font-mono tracking-[0.25em] uppercase text-space-cyan mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-space-cyan animate-ping" />
                  EXPLORING THE UNIVERSE...
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-space-cyan via-sky-400 to-blue-500"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>

                {/* Percentage */}
                <div className="mt-3 font-mono text-xs text-white/50 tracking-widest">
                  COSMIC COORDINATES: <span className="text-white font-bold">{progress}%</span>
                </div>
              </div>
            ) : (
              /* Phase 2: Intro Announcement Screen */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-midnight/90 border border-space-cyan/30 text-xs font-mono text-space-cyan tracking-widest uppercase mb-5 shadow-glowCyan">
                  <Compass size={13} className="text-space-cyan animate-spin-slow" />
                  <span>DEEP SPACE TELEMETRY ACTIVE</span>
                </div>

                <div className="relative w-24 h-24 mb-4 rounded-full p-1 bg-gradient-to-tr from-space-cyan via-purple-500 to-space-gold shadow-glowCyan animate-pulse-glow">
                  <img
                    src="/assets/dharshini.jpg"
                    alt="Dharshini T"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>

                <h1 className="text-3xl md:text-5xl font-black font-orbitron tracking-wider text-white mb-2">
                  DHARSHINI T
                </h1>

                <p className="text-sm md:text-base font-mono tracking-widest text-space-gold uppercase mb-3 font-semibold">
                  MERN STACK DEVELOPER
                </p>

                <p className="text-xs md:text-sm text-white/70 font-space italic max-w-md mb-8">
                  "Architecting Scalable, Secure & Modern Web Applications."
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleStart}
                    className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-space-cyan via-sky-400 to-blue-500 text-space-deep font-bold font-mono tracking-wider uppercase text-xs sm:text-sm shadow-glowCyan hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>EXPLORE SOLAR SYSTEM</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1.5 transition-transform duration-200"
                    />
                  </button>

                  <a
                    href="/Dharshini-Resume.pdf"
                    download="Dharshini_T_Resume.pdf"
                    className="px-6 py-3.5 rounded-xl bg-space-midnight border border-white/20 text-white font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <FileText size={15} />
                    <span>DOWNLOAD RESUME</span>
                  </a>
                </div>

                <span className="text-[10px] font-mono text-white/30 tracking-widest mt-6 uppercase">
                  SCROLL OR CLICK ANY PLANET TO TRAVEL
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
