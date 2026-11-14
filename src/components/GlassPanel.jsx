import React from 'react';

export default function GlassPanel({
  children,
  className = '',
  accent = 'cyan', // 'cyan' | 'gold' | 'purple' | 'mars'
  glow = false,
  cornerAccents = true,
}) {
  const accentBorder = {
    cyan: 'border-space-cyan/30 hover:border-space-cyan/60 shadow-glowCyan',
    gold: 'border-space-gold/30 hover:border-space-gold/60 shadow-glowGold',
    purple: 'border-space-purple/40 hover:border-space-purple/70 shadow-glowPurple',
    mars: 'border-space-mars/40 hover:border-space-mars/70',
  }[accent] || 'border-white/20';

  const cornerColor = {
    cyan: 'border-space-cyan',
    gold: 'border-space-gold',
    purple: 'border-space-purple',
    mars: 'border-space-mars',
  }[accent] || 'border-white';

  return (
    <div
      className={`relative rounded-2xl bg-space-surface backdrop-blur-xl border transition-all duration-300 ${accentBorder} ${
        glow ? 'shadow-lg' : ''
      } ${className}`}
    >
      {/* Sci-Fi Corner Bracket Accents */}
      {cornerAccents && (
        <>
          <span
            className={`absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 ${cornerColor} pointer-events-none`}
          />
          <span
            className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 ${cornerColor} pointer-events-none`}
          />
          <span
            className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 ${cornerColor} pointer-events-none`}
          />
          <span
            className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 ${cornerColor} pointer-events-none`}
          />
        </>
      )}

      {children}
    </div>
  );
}

