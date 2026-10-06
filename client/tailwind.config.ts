import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      screens: {
        '3xl': '2000px', // кастомный брейкпоинт
      },
    },
  },
  plugins: [],
}

export default config