/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: '#1D4ED8',   // blue-700
          secondary: '#9333EA', // purple-600
          accent: '#F59E0B',    // amber-500
          background: '#F9FAFB',
          surface: '#FFFFFF',
          muted: '#6B7280',     // gray-500
          danger: '#EF4444',    // red-500
          success: '#10B981',   // green-500
        }
      }
    },
  },
  plugins: [],
};
