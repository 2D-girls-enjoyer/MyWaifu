/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'rgba(var(--primary-color))',
        'secondary-color': 'rgba(var(--secondary-color))',
        'primary-text-color': 'rgba(var(--primary-text-color))',
        'color-modal-background': 'rgba(var(--color-modal-background))',
        'color-navbar-background': 'rgba(var(--color-navbar-background))',
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

