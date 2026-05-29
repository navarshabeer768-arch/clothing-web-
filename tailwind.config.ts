import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Luxury brand colors
        gold: {
          50: '#fdf8ed',
          100: '#f9eecf',
          200: '#f2d99b',
          300: '#e9c060',
          400: '#e2a830',
          500: '#d4921a',
          600: '#b87213',
          700: '#935513',
          800: '#784416',
          900: '#643917',
          950: '#391d08',
        },
        cream: {
          50: '#fefdf8',
          100: '#fdf9ed',
          200: '#faf0d0',
          300: '#f5e3a8',
          400: '#eed076',
          500: '#e5bb4c',
          600: '#d4a033',
          700: '#b17f28',
          800: '#8f6325',
          900: '#765224',
          950: '#432c10',
        },
        luxury: {
          50: '#f8f7f4',
          100: '#eeebe3',
          200: '#ddd6c6',
          300: '#c8bba3',
          400: '#b09d80',
          500: '#a28b6a',
          600: '#957c5f',
          700: '#7c6550',
          800: '#655344',
          900: '#52443a',
          950: '#2b231e',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200px 0' },
          to: { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'luxury-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        luxury: '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'luxury-lg': '0 12px 40px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)',
        'luxury-xl': '0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #f8f7f4 0%, #eeebe3 100%)',
        'gradient-gold': 'linear-gradient(135deg, #e2a830 0%, #d4921a 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
