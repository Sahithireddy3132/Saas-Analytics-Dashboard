/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // Deep analytical blue - blue-800
        'primary-50': '#EFF6FF', // Very light blue - blue-50
        'primary-100': '#DBEAFE', // Light blue - blue-100
        'primary-500': '#3B82F6', // Medium blue - blue-500
        'primary-600': '#2563EB', // Darker blue - blue-600
        'primary-700': '#1D4ED8', // Dark blue - blue-700
        'primary-900': '#1E3A8A', // Very dark blue - blue-900

        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate - slate-500
        'secondary-50': '#F8FAFC', // Very light slate - slate-50
        'secondary-100': '#F1F5F9', // Light slate - slate-100
        'secondary-200': '#E2E8F0', // Lighter slate - slate-200
        'secondary-300': '#CBD5E1', // Light-medium slate - slate-300
        'secondary-400': '#94A3B8', // Medium slate - slate-400
        'secondary-600': '#475569', // Darker slate - slate-600
        'secondary-700': '#334155', // Dark slate - slate-700
        'secondary-800': '#1E293B', // Very dark slate - slate-800
        'secondary-900': '#0F172A', // Darkest slate - slate-900

        // Accent Colors
        'accent': '#0EA5E9', // Vibrant sky blue - sky-500
        'accent-50': '#F0F9FF', // Very light sky - sky-50
        'accent-100': '#E0F2FE', // Light sky - sky-100
        'accent-200': '#BAE6FD', // Lighter sky - sky-200
        'accent-300': '#7DD3FC', // Light-medium sky - sky-300
        'accent-400': '#38BDF8', // Medium sky - sky-400
        'accent-600': '#0284C7', // Darker sky - sky-600
        'accent-700': '#0369A1', // Dark sky - sky-700

        // Background Colors
        'background': '#FAFBFC', // Subtle off-white - gray-50
        'surface': '#FFFFFF', // Pure white - white

        // Text Colors
        'text-primary': '#1F2937', // Rich charcoal - gray-800
        'text-secondary': '#6B7280', // Balanced gray - gray-500
        'text-muted': '#9CA3AF', // Muted gray - gray-400

        // Status Colors
        'success': '#059669', // Professional emerald - emerald-600
        'success-50': '#ECFDF5', // Very light emerald - emerald-50
        'success-100': '#D1FAE5', // Light emerald - emerald-100
        'success-500': '#10B981', // Medium emerald - emerald-500
        'success-700': '#047857', // Dark emerald - emerald-700

        'warning': '#D97706', // Authoritative amber - amber-600
        'warning-50': '#FFFBEB', // Very light amber - amber-50
        'warning-100': '#FEF3C7', // Light amber - amber-100
        'warning-500': '#F59E0B', // Medium amber - amber-500
        'warning-700': '#B45309', // Dark amber - amber-700

        'error': '#DC2626', // Clear crimson - red-600
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        'error-500': '#EF4444', // Medium red - red-500
        'error-700': '#B91C1C', // Dark red - red-700

        // Border Colors
        'border': '#E5E7EB', // Light border - gray-200
        'border-light': '#F3F4F6', // Very light border - gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'elevation': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        'light': '8px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}