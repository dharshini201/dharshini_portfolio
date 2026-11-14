import React from 'react';
import { motion } from 'framer-motion';
import { Orbit, Compass } from 'lucide-react';
import { PLANETS } from '../data/planets';
import { soundscape } from '../utils/audio';

export default function PlanetNavigation({
  activePlanetId,
  onSelectPlanet,
}) {
  return (
    <aside
      aria-label="Planet navigation"
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-1.5 p-2 rounded-2xl bg-space-deep/80 backdrop-blur-xl border border-white/10 shadow-glass select-none"
    >
      <div className="px-2.5 py-1 text-[9px] font-mono tracking-widest text-space-cyan/70 uppercase border-b border-white/10 mb-1 flex items-center justify-between">
        <span>SOLAR ARRAY</span>
        <Orbit size={11} className="text-space-cyan animate-spin-slow" />
      </div>

      {PLANETS.map((planet, index) => {
        const isActive = planet.id === activePlanetId;
        return (
          <button
            key={planet.id}
            onClick={() => {
              soundscape.playWarp(0.2);
              onSelectPlanet(planet.id);
            }}
            className={`group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-xs font-mono transition-all duration-300 ${
              isActive
                ? 'bg-space-midnight border border-space-cyan/40 text-space-cyan font-bold shadow-glowCyan'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {/* Color Indicator Dot */}
            <span
              className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                isActive ? 'scale-125' : 'group-hover:scale-110'
              }`}
              style={{
                backgroundColor: planet.glowColor || planet.color,
                boxShadow: isActive ? `0 0 8px ${planet.glowColor}` : 'none',
              }}
            />

            {/* Planet Name */}
            <span className="text-[11px] tracking-wider truncate w-20">
              {planet.name}
            </span>

            {/* Orbit Index */}
            <span className="text-[9px] text-white/30 font-mono">
              0{index}
            </span>
          </button>
        );
      })}

      {/* Back to Solar System Core button */}
      <div className="pt-1 mt-1 border-t border-white/10">
        <button
          onClick={() => {
            soundscape.playWarp(0.25);
            onSelectPlanet('sun');
          }}
          className="w-full py-1.5 px-2 rounded-lg bg-space-gold/10 hover:bg-space-gold/20 text-space-gold text-[10px] font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 border border-space-gold/30 transition-all"
        >
          <Compass size={12} />
          <span>FULL SYSTEM</span>
        </button>
      </div>
    </aside>
  );
}

