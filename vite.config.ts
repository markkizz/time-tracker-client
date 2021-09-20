import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: "inline",
      workbox: {
        cleanupOutdatedCaches: true
      },
      mode: 'development',
      registerType: "prompt",
      base: '/',
      manifest: {
        "name": "Simple time tracker",
        "short_name": "time tracker",
        "icons": [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/pwa-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          }
        ],
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone"
      }
    }),
    preact()
  ]
})
