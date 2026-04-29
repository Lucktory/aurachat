/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#08060D',
          surface: '#100D18',
          overlay: '#1A1526',
          hover:   '#221E30',
        },
        accent: {
          purple: '#A855F7',
          pink:   '#EC4899',
          blue:   '#38BDF8',
        },
        brand: {
          primary:   '#F5F0FF',
          secondary: '#9CA3AF',
          muted:     '#4B5563',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED, #EC4899)',
        'gradient-glow':    'linear-gradient(135deg, #EC4899, #A855F7)',
        'gradient-card':    'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.06))',
        'mesh-bg': [
          'radial-gradient(at 20% 20%, hsla(271,91%,25%,0.45) 0px, transparent 55%)',
          'radial-gradient(at 80% 10%, hsla(330,80%,28%,0.30) 0px, transparent 50%)',
          'radial-gradient(at 5%  70%, hsla(255,85%,18%,0.30) 0px, transparent 50%)',
          'radial-gradient(at 90% 80%, hsla(300,70%,20%,0.20) 0px, transparent 50%)',
        ].join(', '),
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(168,85,247,0.18), transparent)',
      },
      boxShadow: {
        'glow-sm': '0 0 18px rgba(168,85,247,0.30)',
        'glow-md': '0 0 35px rgba(168,85,247,0.40)',
        'glow-lg': '0 0 65px rgba(168,85,247,0.50)',
        'glow-pink': '0 0 30px rgba(236,72,153,0.40)',
        'card':      '0 8px 32px rgba(0,0,0,0.5)',
        'card-hover':'0 20px 60px rgba(0,0,0,0.7)',
        'inner-glow':'inset 0 0 30px rgba(168,85,247,0.12)',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow':     'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':          'float 6s ease-in-out infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'gradient-x':     'gradient-x 4s ease infinite',
        'spin-slow':      'spin 10s linear infinite',
        'bounce-subtle':  'bounce-subtle 1s ease-in-out infinite',
        'glow-pulse':     'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%',   backgroundSize: '200% 200%' },
          '50%':      { backgroundPosition: '100% 50%', backgroundSize: '200% 200%' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.35)' },
          '50%':      { boxShadow: '0 0 45px rgba(168,85,247,0.65)' },
        },
      },
    },
  },
  plugins: [],
}
