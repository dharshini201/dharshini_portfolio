import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, Compass } from 'lucide-react';

export default function Footer({ onBackToSun }) {
  const contactInfo = {
    name: 'Dharshini T',
    role: 'MERN Stack Developer',
    location: 'Dindigul, Tamil Nadu',
    github: 'https://github.com/dharshini201',
    linkedin: 'https://linkedin.com/in/dharshini2003',
    email: 'dharshinithirumurugan2424@gmail.com',
    phone: '+91 9360084723',
  };

  return (
    <footer className="relative w-full z-20 py-12 px-6 md:px-12 bg-space-deep/90 border-t border-space-cyan/20 backdrop-blur-md text-white select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-space-gold animate-pulse" />
            <span className="font-orbitron font-bold tracking-widest text-lg">
              {contactInfo.name}
            </span>
          </div>
          <p className="text-xs text-white/60 font-mono tracking-wider">
            {contactInfo.role} • {contactInfo.location}
          </p>
        </div>

        {/* Social connections */}
        <div className="flex items-center gap-4 text-white/70">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-space-cyan hover:text-space-cyan hover:shadow-glowCyan transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-space-cyan hover:text-space-cyan hover:shadow-glowCyan transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-space-gold hover:text-space-gold hover:shadow-glowGold transition-all"
            aria-label="Send Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-space-gold hover:text-space-gold transition-all"
            aria-label="Call Direct"
          >
            <Phone size={18} />
          </a>
        </div>

        {/* Warp back to Sun */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSun}
            className="px-4 py-2 rounded-xl bg-space-midnight border border-space-cyan/30 text-xs font-mono text-space-cyan hover:bg-space-cyan hover:text-space-deep hover:shadow-glowCyan transition-all duration-300 flex items-center gap-2"
          >
            <span>RETURN TO SOLAR CORE</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-mono gap-2">
        <div className="flex items-center gap-2">
          <Compass size={12} className="text-space-cyan" />
          <span>PHOTOREALISTIC 3D SOLAR SYSTEM PORTFOLIO</span>
        </div>
        <div>
          © {new Date().getFullYear()} {contactInfo.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
