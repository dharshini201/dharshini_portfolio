import React from 'react';
import { Rocket, Award, Briefcase, Database, GitPullRequest, Sparkles, CheckCircle2, Brain, GraduationCap } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { ACHIEVEMENTS_DATA } from '../data/projects';

export default function Achievements() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Rocket':
        return Rocket;
      case 'Award':
        return Award;
      case 'Brain':
        return Brain;
      case 'GraduationCap':
        return GraduationCap;
      case 'Briefcase':
        return Briefcase;
      case 'Database':
        return Database;
      case 'GitPullRequest':
        return GitPullRequest;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/40 text-xs font-mono text-cyan-300 tracking-widest uppercase mb-3 shadow-glowCyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
            URANUS • ORBIT 07
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            TECHNICAL <span className="text-cyan-300">ACHIEVEMENTS</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            LEARNING MILESTONES & PROFESSIONAL GROWTH
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const Icon = getIcon(ach.icon);
            return (
              <GlassPanel
                key={ach.id}
                accent="cyan"
                className="p-6 flex flex-col justify-between group hover:border-cyan-300 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glowCyan">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold">
                      {ach.year}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                    {ach.category}
                  </span>

                  <h3 className="text-base md:text-lg font-bold font-orbitron text-white group-hover:text-cyan-300 transition-colors">
                    {ach.title}
                  </h3>

                  <p className="text-xs md:text-sm text-white/70 mt-3 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300/80">
                  <CheckCircle2 size={13} className="text-cyan-300" />
                  <span>Verified Milestone</span>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}

