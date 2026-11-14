import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  Wrench,
  Brain,
  Layers,
} from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { PROJECTS_DATA } from '../data/projects';

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const project = PROJECTS_DATA[selectedProjectIndex] || PROJECTS_DATA[0];

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-cyan/15 border border-space-cyan/40 text-xs font-mono text-space-cyan tracking-widest uppercase mb-3 shadow-glowCyan">
              <span className="w-1.5 h-1.5 rounded-full bg-space-cyan animate-ping" />
              EARTH • ORBIT 03
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
              FEATURED <span className="text-space-cyan">PROJECTS</span>
            </h2>
            <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
              FULL-STACK MERN ARCHITECTURE & MACHINE LEARNING SYSTEMS
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap gap-2 bg-space-midnight/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {PROJECTS_DATA.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                  selectedProjectIndex === idx
                    ? 'bg-space-cyan text-space-deep font-bold shadow-glowCyan'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {idx === 0 ? <Wrench size={13} /> : <Brain size={13} />}
                <span>{idx === 0 ? 'CAR SERVICE HUB (MERN)' : 'PARKINSON AI (ML)'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Card */}
        <GlassPanel accent="cyan" className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Project Overview Graphic & Stats */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Futuristic Architecture Terminal Card */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-space-cyan/40 bg-space-midnight/90 p-6 shadow-glass">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono text-white/40 ml-2">system-core // {project.id}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-cyan/15 text-space-cyan font-bold border border-space-cyan/30">
                    {project.period}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-space-cyan/15 border border-space-cyan/40 text-space-cyan flex items-center justify-center shadow-glowCyan">
                      {selectedProjectIndex === 0 ? <Wrench size={24} /> : <Brain size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-space-gold uppercase tracking-wider block">
                        {project.badge}
                      </span>
                      <h4 className="text-lg font-bold font-orbitron text-white">
                        {project.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed">
                    {project.detailedOverview}
                  </p>
                </div>

                {/* Production Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-5 mt-5 border-t border-white/10">
                  {project.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center font-mono"
                    >
                      <div className="text-[10px] text-white/50">{stat.label}</div>
                      <div className="text-xs text-space-cyan font-bold mt-0.5">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Project Features & Technology Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-space-gold mb-2">
                  <Sparkles size={14} className="text-space-cyan" />
                  <span>{project.subtitle}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black font-orbitron text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-xs md:text-sm text-white/80 leading-relaxed font-sans mb-4">
                  {project.description}
                </p>

                {/* Technology Badges */}
                <div className="mb-5">
                  <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technology.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-space-cyan/10 border border-space-cyan/30 text-space-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core System Features */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2">
                    CORE SYSTEM FEATURES (CONFIRMED RESUME SPECIFICATION)
                  </span>
                  <div className="grid grid-cols-1 gap-2 text-xs text-white/80 font-sans">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-space-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-space-cyan text-space-deep font-bold font-mono text-xs tracking-wider uppercase text-center shadow-glowCyan hover:bg-cyan-300 transition-all flex items-center justify-center gap-2"
                >
                  <Github size={15} />
                  <span>VIEW ON GITHUB</span>
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-space-midnight border border-white/20 text-white font-mono text-xs tracking-wider uppercase text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={15} />
                  <span>REPOSITORY LINK</span>
                </a>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
