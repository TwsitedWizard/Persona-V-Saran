/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'p5-red': '#FF0000',
        'p5-charcoal': '#1A1A1A',
        'p5-dark': '#111111',
        'p5-gray': '#2A2A2A',
        'p5-light-gray': '#3A3A3A',
      },
      fontFamily: {
        'heading': ['"Bebas Neue"', 'Impact', 'sans-serif'],
        'body': ['"Inter"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out infinite alternate',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'slice-in-left': 'sliceInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slice-in-right': 'sliceInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stamp': 'stamp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'noise': 'noise 0.5s steps(10) infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        sliceInLeft: {
          '0%': { transform: 'translateX(-120%) skewX(-15deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(0deg)', opacity: '1' },
        },
        sliceInRight: {
          '0%': { transform: 'translateX(120%) skewX(15deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(0deg)', opacity: '1' },
        },
        stamp: {
          '0%': { transform: 'scale(3) rotate(-12deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(-6deg)', opacity: '1' },
        },
        noise: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}
