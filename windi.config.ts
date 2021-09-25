import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    colors: {
      primary: {
        light: '#E8F8FC',
        dark: '#383C6B',
        DEFAULT: '#383C6B'
      },
      secoundary: {
        light: '#F2E205',
        dark: '#F29F05',
        DEFAULT: '#FFCD38'
      },
      ...colors
    }
  }
})