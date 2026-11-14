import React from 'react';
import { motion } from 'framer-motion';
import { PLANETS } from '../data/planets';
import { soundscape } from '../utils/audio';

export default function ScrollProgress({
  activePlanetId,
  onNavigateTo,
}) {
  const activeIndex = PLANETS.findIndex((p) => p.id === activePlanetId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const progressRatio = safeActiveIndex / (PLANETS.length - 1);

  return (
    <div className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none">
      {/* Background track line */}
      <div className="relative w-0.5 h-64 md:h-80 bg-white/10 rounded-full flex flex-col justify-between items-center py-1">
        {/* Glowing active progress bar */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-space-gold via-space-cyan to-blue-500 rounded-full"
          animate={{ height: `${progressRatio * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Planet Navigation Nodes */}
        {PLANETS.map((planet, idx) => {
          const isActive = planet.id === activePlanetId;
          const isPassed = idx <= safeActiveIndex;

          return (
            <button
              key={planet.id}
              onClick={() => {
                soundscape.playWarp(0.2);
                onNavigateTo(planet.id);
              }}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              aria-label={`Warp to ${planet.name} - ${planet.title}`}
            >
              {/* Outer Indicator Ring */}
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'scale-150 ring-2 ring-space-cyan bg-space-midnight'
                    : 'group-hover:scale-125'
                }`}
              >
                {/* Center Core Dot */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'bg-space-cyan shadow-glowCyan animate-pulse'
                      : isPassed
                      ? 'bg-space-gold'
                      : 'bg-white/30 group-hover:bg-white/70'
                  }`}
                />
              </div>

              {/* Hover Flyout Tooltip (Left) */}
              <div className="absolute right-7 px-2.5 py-1 rounded-md bg-space-midnight/90 backdrop-blur-md border border-space-cyan/30 text-[10px] font-mono tracking-wider text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-glass">
                <span className="text-space-gold font-bold">{planet.name}</span>
                <span className="text-white/40 mx-1.5">/</span>
                <span className="text-white/90">{planet.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Orbit Indicator Label at bottom */}
      <span className="text-[9px] font-mono tracking-widest text-space-cyan/60 uppercase mt-3 rotate-90 origin-center">
        ORBIT
      </span>
    </div>
  );
}

