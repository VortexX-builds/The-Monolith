/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '0px',
      none: '0px',
    },
    extend: {
      colors: {
        bg: '#0d141a',
        'surface-a': '#1B2228',
        'surface-b': '#2C302E',
        'text-primary': '#ffffff',
        'text-secondary': '#c5c6ca',
        'text-muted': '#A8A9AD',
      },
      fontFamily: {
        monument: ['"Monument Extended"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

