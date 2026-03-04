/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1c1c1a',
        cream: {
          DEFAULT: '#f4ede0',
          dark: '#e8dece',
        },
        green: {
          DEFAULT: '#2a5240',
          light: '#3d7a5e',
          deep: '#2a4a37',
        },
        gold: {
          DEFAULT: '#b8943a',
          light: '#d4aa55',
        },
        canvas: '#faf8f4',
        muted: '#6b6560',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.4rem, 3.5vw, 3.8rem)', { lineHeight: '1.15' }],
        'display-md': ['clamp(2rem, 3vw, 3rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
}
