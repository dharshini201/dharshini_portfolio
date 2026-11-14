import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function EducationSection() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-xs font-mono text-amber-300 tracking-widest uppercase mb-3 shadow-glowGold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            06 / SATURN • SIXTH PLANETARY ORBIT
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            ACADEMIC <span className="text-amber-300">EDUCATION</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            VERIFIED QUALIFICATIONS & COMPUTATIONAL FOUNDATIONS
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <GlassPanel
              key={edu.id}
              accent="gold"
              className="p-6 md:p-8 hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 shadow-glowGold">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300 uppercase">
                      {edu.status}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mt-1">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm md:text-base font-semibold text-amber-200/90">
                      {edu.institution}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 mt-1">
                      <MapPin size={12} className="text-amber-300" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Score & Period Badge */}
                <div className="flex md:flex-col items-end justify-between md:justify-start gap-2 text-right">
                  <div className="px-3 py-1.5 rounded-xl bg-space-midnight border border-amber-400/30 text-amber-300 font-mono font-bold text-sm shadow-glowGold">
                    {edu.score}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/50">
                    <Calendar size={13} className="text-amber-300" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider block mb-2">
                  CURRICULUM & KEY HIGHLIGHTS
                </span>
                <ul className="space-y-1.5 text-xs md:text-sm text-white/75 font-sans">
                  {edu.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-amber-300 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

