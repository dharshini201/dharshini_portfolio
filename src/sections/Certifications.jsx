import React from 'react';
import { Award, ExternalLink, FileText, Brain, Terminal, Database, Layers, Sparkles } from 'lucide-react';
import GlassPanel from '../components/GlassPanel';
import { CERTIFICATIONS_DATA } from '../data/projects';

export default function Certifications({ onOpenCertificate }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'Terminal':
        return Terminal;
      case 'Database':
        return Database;
      case 'Layers':
        return Layers;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="certifications"
      className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 py-24 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-gold/15 border border-space-gold/40 text-xs font-mono text-space-gold tracking-widest uppercase mb-3 shadow-glowGold">
            <span className="w-1.5 h-1.5 rounded-full bg-space-gold animate-ping" />
            JUPITER • ORBIT 05
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-orbitron text-white tracking-wide">
            CERTIFICATIONS & <span className="text-space-gold">CREDENTIALS</span>
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider uppercase mt-1">
            VERIFIED INDUSTRY CERTIFICATES & HOLOGRAPHIC CARDS
          </p>
        </div>

        {/* Holographic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS_DATA.map((cert) => {
            const Icon = getIcon(cert.icon);
            return (
              <GlassPanel
                key={cert.id}
                accent="gold"
                className="p-6 flex flex-col justify-between group hover:border-space-gold hover:translate-y-[-4px] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-space-gold/15 border border-space-gold/30 text-space-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glowGold">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold font-orbitron text-white group-hover:text-space-gold transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-space-gold/80 mt-1">
                    {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
                  </div>

                  <p className="text-xs text-white/70 mt-3 font-sans leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
                  {cert.previewUrl ? (
                    <button
                      onClick={() => onOpenCertificate(cert)}
                      className="flex-1 py-2 px-3 rounded-lg bg-space-gold/20 hover:bg-space-gold hover:text-space-deep text-white border border-space-gold/40 text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileText size={13} />
                      <span>VIEW PDF</span>
                    </button>
                  ) : (
                    <div className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/40 text-[11px] font-mono text-center">
                      Verified Credential
                    </div>
                  )}

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-space-cyan hover:text-space-deep text-white border border-white/10 transition-all"
                      title="Verify Badge on Credly"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}

