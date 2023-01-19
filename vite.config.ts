import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
    VitePWA({
      manifest: {
        name: 'Movie N Chill',
        short_name: 'movienchill',
        description: 'Movie N Chill app',
        theme_color: '#191919',
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
      includeAssets: ['logo.svg'],
      registerType: 'autoUpdate',
    }),
  ],
  server: {
    port: 3000,
  },
});
