import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/** Plan du site, genere automatiquement a chaque build. */
export const GET: APIRoute = async ({ site }) => {
  const base = site?.href.replace(/\/$/, '') ?? '';

  const articles = await getCollection('articles', ({ data }) => data.publie);

  const pages: { chemin: string; priorite: string; maj?: Date }[] = [
    { chemin: '/', priorite: '1.0' },
    { chemin: '/ecole/', priorite: '0.8' },
    { chemin: '/jubile/', priorite: '0.8' },
    { chemin: '/resultats/', priorite: '0.8' },
    { chemin: '/inscriptions/', priorite: '0.9' },
    ...articles
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((article) => ({
        chemin: `/actualites/${article.id}/`,
        priorite: '0.6',
        maj: article.data.date,
      })),
  ];

  const corps = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${base}${page.chemin}</loc>${
      page.maj ? `\n    <lastmod>${page.maj.toISOString().slice(0, 10)}</lastmod>` : ''
    }
    <priority>${page.priorite}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(corps, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
