import React from 'react';
import { Layers, Brain, Compass, GraduationCap, MapPin, Sparkles, Code2, Palette } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { EDUCATION_DATA } from '../data/projects';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function About() {
  const degree = EDUCATION_DATA[0]; // MCA
  const ugDegree = EDUCATION_DATA[1]; // B.Sc. CS
  const { personal } = PORTFOLIO_DATA;

  const interests = [
    {
      title: 'Full-Stack Architecture',
      icon: Layers,
      description:
        'Building robust MERN web applications with modular Express routing, REST APIs, and stateful React interfaces.',
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      description:
        'Developing neural network classifications, medical severity models with CNNs and Random Forests, and Streamlit analytics.',
    },
    {
      title: 'Responsive UI/UX',
      icon: Palette,
      description:
        'Crafting fluid cross-device user experiences using modern CSS, Flexbox/Grid, Bootstrap, and accessible component hierarchies.',
    },
    {
      title: 'Open Source Building',
      icon: Code2,
      description:
        'Sharing clean, well-documented code repositories on GitHub, following industry best practices and continuous learning.',
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono text-amber-300 tracking-widest uppercase mb-3 shadow-glowGold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
            MERCURY • ORBIT 01
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            ABOUT <span className="text-space-gold">ME</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            PERSONAL INTRODUCTION, ACADEMIC PROFILE & OBJECTIVES
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Portrait & Key Details */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <GlassPanel accent="gold" className="p-6 flex flex-col items-center text-center">
              {/* Profile Image with Golden Aura Glow */}
              <div className="relative w-44 h-44 mb-4">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-space-gold via-amber-400 to-yellow-600 opacity-20 blur-md" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-space-gold/40 bg-space-midnight/90 shadow-glowGold">
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold font-orbitron text-white">
                {personal.name}
              </h3>
              <p className="text-xs font-mono text-space-gold uppercase tracking-widest mt-1">
                {personal.role}
              </p>

              <div className="w-full mt-4 pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/70 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">DEGREE:</span>
                  <span className="text-white font-medium">MCA (2024 – 2026)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">COLLEGE:</span>
                  <span className="text-white font-medium">{degree.institution}</span>
                </div>
                {ugDegree && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">UG DEGREE:</span>
                    <span className="text-white font-medium">{ugDegree.degree}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-white/40">LOCATION:</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <MapPin size={11} className="text-space-gold" /> {personal.contactInfo.location}
                  </span>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel accent="gold" className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-space-gold/15 text-space-gold border border-space-gold/30">
                <GraduationCap size={20} />
              </div>
              <div className="text-xs font-mono">
                <div className="text-white font-bold">{degree.institution}</div>
                <div className="text-space-gold/80">{degree.degree} • {degree.period}</div>
              </div>
            </GlassPanel>
          </div>

          {/* Right Column: Bio, Objective & Interests */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <GlassPanel accent="gold" className="p-6 md:p-8">
              <span className="text-[11px] font-mono text-space-gold uppercase tracking-widest block mb-2 font-bold">
                PROFESSIONAL SUMMARY
              </span>
              <blockquote className="text-sm md:text-base text-white/90 font-space leading-relaxed border-l-2 border-space-gold pl-4 mb-6">
                "{personal.introDescription}"
              </blockquote>

              <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest block mb-2 font-bold">
                CAREER OBJECTIVE
              </span>
              <p className="text-xs md:text-sm text-white/80 font-sans leading-relaxed">
                {personal.careerObjective}
              </p>
            </GlassPanel>

            {/* Core Competencies & Passion Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <GlassPanel key={idx} accent="gold" className="p-5">
                    <div className="flex items-center gap-2.5 mb-2.5 text-space-gold">
                      <div className="p-2 rounded-lg bg-space-gold/10 border border-space-gold/30">
                        <Icon size={18} />
                      </div>
                      <h4 className="text-sm font-bold font-orbitron text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </GlassPanel>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
