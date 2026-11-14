import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Compass,
  FileText,
  Menu,
  X,
  Orbit,
} from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function Navbar({
  activePlanetId,
  onNavigateTo,
  isFreeInspect,
  onToggleFreeInspect,
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = soundscape.toggle();
    setIsPlayingAudio(active);
  };

  const navLinks = [
    { id: 'sun', label: 'HOME' },
    { id: 'mercury', label: 'ABOUT' },
    { id: 'venus', label: 'SKILLS' },
    { id: 'earth', label: 'PROJECTS' },
    { id: 'mars', label: 'EXPERIENCE' },
    { id: 'saturn', label: 'EDUCATION' },
    { id: 'neptune', label: 'CONTACT' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-3.5 backdrop-blur-md bg-space-deep/70 border-b border-space-cyan/15 select-none transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Top-left: DHARSHINI T */}
          <button
            onClick={() => onNavigateTo('sun')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="Dharshini T Home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-space-cyan to-blue-600 p-0.5 shadow-glowCyan group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/dharshini.jpg"
                alt="Dharshini T"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="text-xs md:text-sm font-black font-orbitron tracking-widest text-white group-hover:text-space-cyan transition-colors">
              DHARSHINI T
            </div>
          </button>

          {/* Top-right: HOME | ABOUT | SKILLS | PROJECTS | EXPERIENCE | EDUCATION | CONTACT */}
          <nav className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-white/70">
            {navLinks.map((link, idx) => {
              const isActive = activePlanetId === link.id;
              return (
                <React.Fragment key={link.id}>
                  <button
                    onClick={() => onNavigateTo(link.id)}
                    className={`px-2.5 py-1 rounded-md transition-all duration-200 tracking-wider ${
                      isActive
                        ? 'text-space-cyan font-bold bg-space-cyan/10 border border-space-cyan/30 shadow-glowCyan'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                  {idx < navLinks.length - 1 && (
                    <span className="text-white/20 select-none">|</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Action Utilities */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'border-space-gold/50 bg-space-gold/15 text-space-gold shadow-glowGold'
                  : 'border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={isPlayingAudio ? 'Mute Deep Space Sound' : 'Play Cinematic Deep Space Drone'}
              aria-label="Toggle soundscape audio"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 size={15} className="animate-pulse" />
                  <span className="hidden xl:inline text-[10px]">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={15} />
                  <span className="hidden xl:inline text-[10px]">SOUND</span>
                </>
              )}
            </button>

            {/* Back to Solar System Core View */}
            <button
              onClick={() => onNavigateTo('sun')}
              className={`p-2 rounded-lg border text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                activePlanetId === 'sun'
                  ? 'border-space-cyan bg-space-cyan/20 text-space-cyan'
                  : 'border-white/15 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title="Return to Full Solar System View"
            >
              <Compass size={15} />
              <span className="hidden xl:inline text-[10px]">SOLAR SYSTEM</span>
            </button>

            {/* Resume Download */}
            <a
              href="/Dharshini-Resume.pdf"
              download="Dharshini_T_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-space-cyan to-blue-500 text-space-deep font-bold font-mono text-xs shadow-glowCyan hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <FileText size={13} />
              <span className="hidden sm:inline">RESUME</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/15 bg-white/5 text-white/80 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-space-deep/95 backdrop-blur-xl pt-20 px-6 flex flex-col justify-between pb-8 border-b border-space-cyan/20">
          <div className="flex flex-col gap-2 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-space-cyan/60 mb-2">
              PLANETARY NAVIGATION
            </span>
            {navLinks.map((link) => {
              const isActive = activePlanetId === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                    isActive
                      ? 'bg-space-midnight border-space-cyan text-space-cyan font-bold shadow-glowCyan'
                      : 'border-white/10 text-white/80 hover:bg-white/5'
                  }`}
                >
                  <span className="font-orbitron">{link.label}</span>
                  <span className="text-xs text-space-gold">{link.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="/Dharshini-Resume.pdf"
              download="Dharshini_T_Resume.pdf"
              className="w-full py-3 rounded-xl bg-space-cyan text-space-deep font-bold text-center text-sm font-mono flex items-center justify-center gap-2 shadow-glowCyan"
            >
              <FileText size={16} /> DOWNLOAD RESUME
            </a>
          </div>
        </div>
      )}
    </>
  );
}
