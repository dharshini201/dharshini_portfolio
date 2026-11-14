import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Palette,
  Cpu,
  Atom,
  Layout,
  Layers,
  Server,
  Boxes,
  Network,
  Database,
  FileSpreadsheet,
  GitBranch,
  Github,
  Terminal,
  Send,
  ShieldCheck,
  Lock,
  Shield,
  Users,
  Compass,
} from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { SKILLS_DATA } from '../data/skills';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'ALL SKILLS' },
    { id: 'frontend', label: 'FRONTEND', count: SKILLS_DATA.frontend.length },
    { id: 'backend', label: 'BACKEND', count: SKILLS_DATA.backend.length },
    { id: 'database', label: 'DATABASE', count: SKILLS_DATA.database.length },
    { id: 'authentication', label: 'AUTHENTICATION', count: SKILLS_DATA.authentication?.length || 0 },
    { id: 'tools', label: 'TOOLS', count: SKILLS_DATA.tools.length },
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
      case 'Compass':
        return Compass;
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
      case 'Database':
        return Database;
      case 'FileSpreadsheet':
        return FileSpreadsheet;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Lock':
        return Lock;
      case 'Shield':
        return Shield;
      case 'Users':
        return Users;
      case 'GitBranch':
        return GitBranch;
      case 'Github':
        return Github;
      case 'Terminal':
        return Terminal;
      case 'Send':
        return Send;
      default:
        return Cpu;
    }
  };

  const getSkills = () => {
    if (activeTab === 'all') {
      return [
        ...SKILLS_DATA.frontend.map((s) => ({ ...s, category: 'Frontend' })),
        ...SKILLS_DATA.backend.map((s) => ({ ...s, category: 'Backend' })),
        ...SKILLS_DATA.database.map((s) => ({ ...s, category: 'Database' })),
        ...(SKILLS_DATA.authentication ? SKILLS_DATA.authentication.map((s) => ({ ...s, category: 'Authentication' })) : []),
        ...SKILLS_DATA.tools.map((s) => ({ ...s, category: 'Tools' })),
      ];
    }
    const target = SKILLS_DATA[activeTab] || [];
    return target.map((s) => ({
      ...s,
      category: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
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
              VENUS • ORBIT 02
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
              TECHNICAL <span className="text-purple-400">SKILLS</span>
            </h2>
            <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
              FULL-STACK MERN STACK & MODERN WEB DEVELOPMENT
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-space-midnight/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
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

        {/* Floating Holographic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {getSkills().map((skill, index) => {
            const Icon = getIcon(skill.icon);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <GlassPanel
                  accent="purple"
                  className="p-5 h-full flex flex-col justify-between group hover:border-purple-400/80 hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-space-purple/20 border border-space-purple/40 text-purple-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-space-purple/30 transition-all duration-300 shadow-glowPurple">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                        {skill.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-orbitron text-white group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-white/65 mt-1.5 font-sans leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mb-1">
                      <span>PROFICIENCY</span>
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
