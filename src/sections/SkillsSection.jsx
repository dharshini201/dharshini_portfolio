import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Database,
  Wrench,
  Cpu,
  Layers,
  Palette,
  Atom,
  Layout,
  Boxes,
  Network,
  ShieldCheck,
  Lock,
  FileSpreadsheet,
  Table2,
  GitBranch,
  Github,
  Terminal,
  Send,
  Box,
} from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'frontend', label: 'Frontend', count: skills.frontend.length },
    { id: 'backend', label: 'Backend', count: skills.backend.length },
    { id: 'database', label: 'Databases', count: skills.database.length },
    { id: 'tools', label: 'Tools', count: skills.tools.length },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code':
        return Code;
      case 'Palette':
        return Palette;
      case 'Cpu':
        return Cpu;
      case 'Atom':
        return Atom;
      case 'Layout':
        return Layout;
      case 'Layers':
        return Layers;
      case 'Server':
        return Server;
      case 'Boxes':
        return Boxes;
      case 'Network':
        return Network;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Lock':
        return Lock;
      case 'Database':
        return Database;
      case 'FileSpreadsheet':
        return FileSpreadsheet;
      case 'Table2':
        return Table2;
      case 'GitBranch':
        return GitBranch;
      case 'Github':
        return Github;
      case 'Terminal':
        return Terminal;
      case 'Send':
        return Send;
      case 'Box':
        return Box;
      default:
        return Cpu;
    }
  };

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        ...skills.frontend.map((s) => ({ ...s, group: 'Frontend' })),
        ...skills.backend.map((s) => ({ ...s, group: 'Backend' })),
        ...skills.database.map((s) => ({ ...s, group: 'Database' })),
        ...skills.tools.map((s) => ({ ...s, group: 'Tools' })),
      ];
    }
    return skills[activeTab].map((s) => ({
      ...s,
      group: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
    }));
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-purple/20 border border-space-purple/40 text-xs font-mono text-purple-300 tracking-widest uppercase mb-3 shadow-glowPurple">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              02 / VENUS • SECOND PLANETARY ORBIT
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
              TECHNICAL <span className="text-purple-400">SKILLS</span>
            </h2>
            <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
              FULL-STACK ENGINEERING & MODERN WEB ARCHITECTURE
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-space-midnight/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'bg-space-purple text-white font-bold shadow-glowPurple'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floating 3D/Glass Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {getFilteredSkills().map((skill, index) => {
            const Icon = getIcon(skill.icon);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <GlassPanel
                  accent="purple"
                  className="p-5 h-full flex flex-col justify-between group hover:border-purple-400/80 hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div>
                    {/* Top row: Icon & Group Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-space-purple/20 border border-space-purple/40 text-purple-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-space-purple/30 transition-all duration-300 shadow-glowPurple">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                        {skill.group}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-base font-bold font-orbitron text-white group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/65 mt-1.5 font-sans leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Level progress indicator */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-1">
                      <span>MASTERY</span>
                      <span className="text-purple-300 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-space-purple via-violet-400 to-fuchsia-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

