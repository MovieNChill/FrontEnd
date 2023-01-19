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
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any maskable',
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
