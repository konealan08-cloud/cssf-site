/**
 * Genere la Content-Security-Policy du site apres le build (lance par
 * `npm run build`), dans `dist/_headers`, que Netlify applique a toutes les pages.
 *
 * Les scripts inline d'Astro changent a chaque modification du code : plutot
 * que d'autoriser tout script inline ('unsafe-inline'), on calcule l'empreinte
 * SHA-256 de chacun. Un script injecte par un tiers serait donc bloque.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';

async function pagesHtml(dossier) {
  const fichiers = [];
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) fichiers.push(...(await pagesHtml(chemin)));
    else if (entree.name.endsWith('.html')) fichiers.push(chemin);
  }
  return fichiers;
}

const empreintes = new Set();
for (const page of await pagesHtml(DIST)) {
  const html = await readFile(page, 'utf8');
  for (const [, attributs, contenu] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attributs)) continue; // script externe : couvert par 'self'
    if (/type="application\/ld\+json"/.test(attributs)) continue; // donnees, jamais executees
    empreintes.add(`'sha256-${createHash('sha256').update(contenu, 'utf8').digest('base64')}'`);
  }
}

const politique = [
  "default-src 'self'",
  `script-src 'self' ${[...empreintes].sort().join(' ')}`,
  // Astro et les composants posent des styles inline (attributs style=) :
  // impossible a lister par empreinte, et sans danger d'execution de code.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  // Seule la carte Google Maps, chargee au clic, est integree.
  'frame-src https://www.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

await writeFile(path.join(DIST, '_headers'), `/*\n  Content-Security-Policy: ${politique}\n`);
console.log(`CSP ecrite dans dist/_headers (${empreintes.size} script(s) inline autorises par empreinte)`);
