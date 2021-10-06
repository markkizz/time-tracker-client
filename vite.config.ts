import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories',
      "react-dom/test-utils": "preact/test-utils",
      "react/jsx-runtime": "preact/jsx-runtime"
    }
  },
  plugins: [
    VitePWA({
      injectRegister: "inline",
      workbox: {
        cleanupOutdatedCaches: false
      },
      mode: 'development',
      registerType: "autoUpdate",
      base: '/',
      includeAssets: ['hourglass.png', 'favicon.ico'],
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
    preact(),
    WindiCSS()
  ]
})
