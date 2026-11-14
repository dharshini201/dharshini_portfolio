import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Orbit, Activity, Sparkles } from 'lucide-react';
import { PLANETS } from '../data/planets';

export default function PlanetInfoHUD({ activePlanetId }) {
  const planet = PLANETS.find((p) => p.id === activePlanetId) || PLANETS[0];

  return (
    <div className="fixed bottom-6 left-6 z-20 pointer-events-none hidden md:block select-none font-mono">
      <AnimatePresence mode="wait">
        <motion.div
          key={planet.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="p-3.5 rounded-xl bg-space-deep/80 backdrop-blur-md border border-space-cyan/25 text-xs text-white/80 max-w-xs shadow-glass"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-space-cyan animate-pulse" />
              <span className="font-bold text-white tracking-widest uppercase">
                {planet.name}
              </span>
            </div>
            <span className="text-[10px] text-space-gold px-1.5 py-0.5 rounded bg-space-gold/10 border border-space-gold/30">
              {planet.category.split('/')[0]}
            </span>
          </div>

          <div className="space-y-1 text-[11px]">
            {planet.facts.distanceFromSun && (
              <div className="flex items-center justify-between text-white/60">
                <span className="flex items-center gap-1.5">
                  <Compass size={12} className="text-space-cyan" /> Dist. Sun:
                </span>
                <span className="text-white font-medium">{planet.facts.distanceFromSun}</span>
              </div>
            )}
            {planet.facts.orbitalPeriod && (
              <div className="flex items-center justify-between text-white/60">
                <span className="flex items-center gap-1.5">
                  <Orbit size={12} className="text-space-cyan" /> Orbit Period:
                </span>
                <span className="text-white font-medium">{planet.facts.orbitalPeriod}</span>
              </div>
            )}
            {planet.facts.temperature && (
              <div className="flex items-center justify-between text-white/60">
                <span className="flex items-center gap-1.5">
                  <Activity size={12} className="text-space-gold" /> Surface Temp:
                </span>
                <span className="text-space-gold font-medium">{planet.facts.temperature}</span>
              </div>
            )}
            <div className="pt-1.5 mt-1 border-t border-white/10 text-[10px] text-space-cyan/90 flex items-center gap-1">
              <Sparkles size={11} className="text-space-cyan shrink-0" />
              <span className="truncate">{planet.facts.theme || planet.subtitle}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

