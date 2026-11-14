import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, Compass, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundscape } from '../utils/audio';

export default function HeroSection({ onExplore }) {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-20 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center pointer-events-auto">
        {/* Celestial Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-space-midnight/80 border border-space-gold/40 text-xs font-mono text-space-gold tracking-widest uppercase mb-6 backdrop-blur-md shadow-glowGold"
        >
          <span className="w-2 h-2 rounded-full bg-space-gold animate-ping" />
          <span>SOLAR SYSTEM SECTOR 00 • THE CORE</span>
        </motion.div>

        {/* Main Hero Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tight text-white mb-4 drop-shadow-[0_0_35px_rgba(255,179,71,0.35)]"
        >
          {personal.name.toUpperCase()}
        </motion.h1>

        {/* Headline Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-2xl md:text-3xl font-light text-space-cyan font-space tracking-wide mb-3"
        >
          {personal.headline}
        </motion.p>

        {/* Role & Subrole */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-white/60 uppercase mb-8"
        >
          {personal.role} <span className="text-space-gold">|</span> {personal.subRole}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              soundscape.playWarp(0.25);
              onExplore();
            }}
            className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-space-gold via-amber-500 to-orange-500 text-space-deep font-bold font-mono text-sm tracking-wider uppercase shadow-glowGold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          >
            <Compass size={17} className="group-hover:rotate-45 transition-transform duration-300" />
            <span>EXPLORE MY UNIVERSE</span>
          </button>

          <a
            href="/Dharshini-Resume.pdf"
            download="Dharshini_T_Resume.pdf"
            className="px-7 py-3.5 rounded-xl bg-space-midnight/90 border border-space-cyan/40 text-space-cyan font-bold font-mono text-sm tracking-wider uppercase shadow-glowCyan hover:bg-space-cyan hover:text-space-deep active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <FileText size={16} />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>

        {/* Scroll Cue Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2 text-white/40 font-mono text-xs tracking-widest uppercase cursor-pointer"
          onClick={() => {
            soundscape.playWarp(0.2);
            onExplore();
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} className="text-space-cyan animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

