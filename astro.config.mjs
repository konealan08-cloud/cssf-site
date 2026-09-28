import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  /**
   * Adresse publique du site. Elle sert aux liens canoniques, a l'apercu de
   * partage WhatsApp / Facebook et au plan du site.
   *
   * Sur Netlify, la variable URL est fournie automatiquement au moment du build :
   * rien a modifier ici, ni au premier deploiement (adresse en .netlify.app),
   * ni plus tard quand le nom de domaine definitif sera branche sur le site.
   *
   * SITE_URL permet de forcer une adresse a la main si besoin.
   */
  site: process.env.SITE_URL || process.env.URL || 'http://localhost:4321',
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
