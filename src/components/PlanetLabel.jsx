import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Orbit, ArrowUp } from 'lucide-react';
import { PLANETS } from '../data/planets';

export default function PlanetLabel({
  activePlanetId,
  onResetToSun,
}) {
  const planet = PLANETS.find((p) => p.id === activePlanetId) || PLANETS[0];
  const isSun = planet.id === 'sun';

  return (
    <div className="fixed bottom-6 left-6 z-20 pointer-events-none hidden md:block select-none font-mono">
      <AnimatePresence mode="wait">
        <motion.div
          key={planet.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="p-3.5 rounded-xl bg-space-deep/85 backdrop-blur-md border border-space-cyan/25 text-xs text-white/80 max-w-xs shadow-glass pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: planet.glowColor || planet.color }}
              />
              <span className="font-bold font-orbitron text-white tracking-widest uppercase">
                {planet.name}
              </span>
            </div>
            <span className="text-[10px] text-space-gold px-1.5 py-0.5 rounded bg-space-gold/10 border border-space-gold/30">
              {planet.title}
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-white/70">
            {planet.facts.distanceFromSun && (
              <div className="flex items-center justify-between">
                <span className="text-white/40">Dist. from Sun:</span>
                <span className="text-white font-medium">{planet.facts.distanceFromSun}</span>
              </div>
            )}
            {planet.facts.orbitalPeriod && (
              <div className="flex items-center justify-between">
                <span className="text-white/40">Orbital Period:</span>
                <span className="text-white font-medium">{planet.facts.orbitalPeriod}</span>
              </div>
            )}
            <div className="pt-1.5 mt-1 border-t border-white/10 text-[10px] text-space-cyan flex items-center justify-between">
              <span className="truncate">{planet.facts.theme || planet.subtitle}</span>
              {!isSun && (
                <button
                  onClick={onResetToSun}
                  className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-space-cyan hover:text-space-deep text-[10px] text-white transition-all flex items-center gap-1 shrink-0"
                >
                  <ArrowUp size={10} />
                  <span>SUN</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

