/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tealbg: '#0b3136', // dark teal background
        sand: '#E8D8B9',  // tan/sand text
        accent: '#D97B3E', // orange accent
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} 