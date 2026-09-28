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
  /**
   * Prechargement des pages : des qu'un lien apparait a l'ecran, la page
   * cible est telechargee en arriere-plan (HTML seul, quelques ko). Le clic
   * affiche alors la page quasi instantanement. Astro desactive de lui-meme
   * ce prechargement en mode « economie de donnees » et sur reseau 2G.
   */
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
