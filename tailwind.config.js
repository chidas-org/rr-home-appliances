/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B4FD8',
        secondary: '#F97316',
        accent: '#0EA5E9',
        success: '#16A34A',
        warning: '#D97706',
        error: '#DC2626',
        info: '#0284C7',
        surface: '#FFFFFF',
        background: '#F0F4FF',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['2.5rem', { lineHeight: '1.2', fontWeight: '800' }],
        'display-lg': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'display-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        card: '0.75rem',
        button: '0.5rem',
        input: '0.5rem',
        badge: '9999px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(27, 79, 216, 0.15)',
        dropdown: '0 10px 40px rgba(0, 0, 0, 0.12)',
        modal: '0 20px 60px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      zIndex: {
        base: '10',
        dropdown: '40',
        sticky: '45',
        modal: '50',
        toast: '60',
        tooltip: '70',
      },
      height: {
        header: '4rem',
      },
      spacing: {
        header: '4rem',
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}