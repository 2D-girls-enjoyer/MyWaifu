/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-background': 'rgba(var(--color-chat-background))',
        'user-bubble': 'rgba(var(--color-user-bubble))',
        'user-bubble-text': 'rgba(var(--color-user-bubble-text))',
        'waifu-bubble': 'rgba(var(--color-waifu-bubble))',
        'waifu-bubble-text': 'rgba(var(--color-waifu-bubble-text))'
      }
    },
  },
  plugins: [],
}

