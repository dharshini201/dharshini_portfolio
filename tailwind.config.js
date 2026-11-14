/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          deep: '#03040B',
          midnight: '#07152D',
          purple: '#6C45A8',
          cyan: '#42D9FF',
          gold: '#FFB347',
          sun: '#FF8800',
          mars: '#E05A47',
          surface: 'rgba(7, 21, 45, 0.45)',
          border: 'rgba(66, 217, 255, 0.18)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'Space Grotesk', 'monospace', 'sans-serif'],
        space: ['Space Grotesk', 'Inter', 'sans-serif'],
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowCyan: '0 0 25px rgba(66, 217, 255, 0.35)',
        glowGold: '0 0 30px rgba(255, 179, 71, 0.45)',
        glowPurple: '0 0 25px rgba(108, 69, 168, 0.4)',
        glass: '0 8px 32px 0 rgba(3, 4, 11, 0.65)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

