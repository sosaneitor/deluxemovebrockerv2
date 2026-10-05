// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://deluxemovebrokerllc.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
