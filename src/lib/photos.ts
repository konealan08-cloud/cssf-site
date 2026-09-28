/**
 * Registre des photos du site.
 *
 * Pour ajouter ou remplacer une photo : deposer le fichier dans
 * `src/assets/photos/` en respectant exactement le nom attendu ci-dessous.
 * Astro se charge ensuite de la convertir en WebP, de generer les differentes
 * tailles (srcset) et de la compresser.
 *
 * Si un fichier est absent, le composant `<Photo>` affiche automatiquement
 * un cadre sobre portant la mention « Photo a venir ». Aucun ecran casse,
 * aucune image manquante.
 */
import type { ImageMetadata } from 'astro';

const fichiers = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif}',
  { eager: true },
);

/** Nom de base d'un fichier, sans dossier ni extension. */
function racine(chemin: string): string {
  const nom = chemin.split('/').pop() ?? chemin;
  return nom.replace(/\.[^.]+$/, '').toLowerCase();
}

const registre = new Map<string, ImageMetadata>();
for (const [chemin, module] of Object.entries(fichiers)) {
  registre.set(racine(chemin), module.default);
}

/** Les noms de photos attendus par le site. */
export type NomPhoto =
  | 'logo'
  | 'cour-interieure'
  | 'messe-communion'
  | 'laureats-prix'
  | 'tenues-traditionnelles'
  | 'sensibilisation-jeppc'
  | 'directeur'
  | 'resultats-bacd-2026';

/** Renvoie la photo demandee, ou `undefined` si le fichier n'a pas ete fourni. */
export function photo(nom: string): ImageMetadata | undefined {
  return registre.get(nom.toLowerCase());
}

/** Liste des photos effectivement presentes dans le projet. */
export function photosPresentes(): string[] {
  return [...registre.keys()].sort();
}
