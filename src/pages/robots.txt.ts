import type { APIRoute } from 'astro';

/** Instructions pour les moteurs de recherche, generees a chaque build. */
export const GET: APIRoute = ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
