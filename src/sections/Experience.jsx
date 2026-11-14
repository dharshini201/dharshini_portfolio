import React from 'react';
import { Calendar, MapPin, CheckCircle, Layers, Brain, Wrench, Code } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { EXPERIENCE_DATA } from '../data/projects';

export default function Experience({ onOpenCertificate }) {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-mars/20 border border-space-mars/50 text-xs font-mono text-red-400 tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            MARS • ORBIT 04
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            PROJECT <span className="text-space-mars">EXPERIENCE</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            PRACTICAL TIMELINE & TECHNICAL IMPLEMENTATION HISTORY
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-space-mars/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-space-deep border-2 border-space-mars flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-space-mars animate-pulse" />
              </div>

              <GlassPanel accent="mars" className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-space-mars/15 border border-space-mars/40 text-red-300 uppercase">
                      {exp.badge}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mt-1.5">
                      {exp.role}
                    </h3>
                    <h4 className="text-sm md:text-base font-semibold text-space-mars">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="flex flex-col md:items-end text-xs font-mono text-white/50 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-space-mars" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-white/40" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mt-4 text-xs md:text-sm text-white/80 font-sans">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-space-mars shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
