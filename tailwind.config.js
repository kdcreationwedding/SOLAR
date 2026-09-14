/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyBrand: {
          white: "#FFFFFF",
          softWhite: "#F8FAFC",
          skyBlue: "#3B82F6",
          lightSky: "#E0F2FE",
          deepSky: "#0F172A",
          sunYellow: "#FFC72C",
          brightYellow: "#FBBF24",
          sunsetOrange: "#F97316",
          deepOrange: "#EA580C",
          sunsetPink: "#E11D48",
          cardBg: "rgba(15, 23, 42, 0.75)",
          lightCardBg: "rgba(255, 255, 255, 0.85)"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif']
      },
      backgroundImage: {
        'sky-sunrise': 'linear-gradient(to bottom, #FFF7ED 0%, #FED7AA 40%, #BAE6FD 100%)',
        'sky-day': 'linear-gradient(to bottom, #0F172A 0%, #1E3A8A 40%, #0F172A 100%)',
        'sky-sunset': 'linear-gradient(to bottom, #431407 0%, #9A3412 40%, #1E1B4B 100%)',
        'text-gradient-sky': 'linear-gradient(135deg, #FFFFFF 0%, #FBBF24 50%, #F97316 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
