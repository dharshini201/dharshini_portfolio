import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Compass } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function Hero({ onExplore }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-20 pointer-events-none"
    >
      {/* Centered Identity & Solar Core Introduction */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center pointer-events-auto">
        {/* Status Pill with Avatar (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-space-midnight/80 border border-space-cyan/40 text-xs font-mono text-space-cyan tracking-widest uppercase mb-5 backdrop-blur-md shadow-glowCyan"
        >
          <img
            src="/assets/dharshini.jpg"
            alt="Dharshini T"
            className="w-5 h-5 rounded-full object-cover border border-space-cyan shadow-sm"
          />
          <span className="w-1.5 h-1.5 rounded-full bg-space-cyan animate-ping" />
          <span>SOLAR SYSTEM OVERVIEW • THE CORE</span>
        </motion.div>

        {/* Hero Name (Centered) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tight text-white mb-3 text-center drop-shadow-[0_0_35px_rgba(66,217,255,0.3)]"
        >
          DHARSHINI T
        </motion.h1>

        {/* Roles & Credentials (Centered) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-space-gold uppercase mb-4 font-semibold text-center"
        >
          MERN Stack Developer <span className="text-white/40">|</span> MCA Graduate
        </motion.p>

        {/* Value Proposition / Summary (Centered) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-sm sm:text-base md:text-lg text-white/80 font-space leading-relaxed mb-8 max-w-xl mx-auto text-center"
        >
          MCA graduate and aspiring MERN Stack Developer skilled in building responsive, secure web applications with React.js, Node.js, Express.js, and MongoDB.
        </motion.p>

        {/* Action Buttons (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            onClick={() => {
              soundscape.playWarp(0.25);
              onExplore();
            }}
            className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-space-cyan via-sky-400 to-blue-500 text-space-deep font-bold font-mono text-xs sm:text-sm tracking-wider uppercase shadow-glowCyan hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Compass size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            <span>EXPLORE SOLAR SYSTEM</span>
          </button>

          <a
            href="/Dharshini-Resume.pdf"
            download="Dharshini_T_Resume.pdf"
            className="px-7 py-3.5 rounded-xl bg-space-midnight border border-white/20 text-white font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            <FileText size={15} />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>

        {/* Scroll Cue Prompt (Centered) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-14 flex flex-col items-center gap-2 text-white/40 font-mono text-xs tracking-widest uppercase cursor-pointer hover:text-space-cyan transition-colors"
          onClick={() => {
            soundscape.playWarp(0.2);
            onExplore();
          }}
        >
          <span>SCROLL TO EXPLORE PLANETS</span>
          <ArrowDown size={14} className="text-space-cyan animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
