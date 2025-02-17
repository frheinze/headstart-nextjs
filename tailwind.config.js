module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ordercloud/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        theme1: {
          pastel: '#EEF9FC',
          light: '#8ecae6ff',
          DEFAULT: '#219ebcff',
          dark: '#023047ff'
        },
        theme2: {
          pastel: '#FFF9EB',
          DEFAULT: '#ffb703ff',
          dark: '#fb8500ff'
        }
      }
    }
  },
  safelist: [
    'bg-red-600',
    'bg-blue-900',
    'bg-green-600',
    'bg-gray-600'
  ],
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
};
