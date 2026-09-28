import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Les actualites de l'ecole.
 * Pour ajouter un article : creer un fichier .md dans `src/content/articles/`.
 * Son nom de fichier devient l'adresse de la page (ex. mon-article.md ->
 * /actualites/mon-article/). Voir le README pour le detail des champs.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    /** Date de publication, au format AAAA-MM-JJ. */
    date: z.coerce.date(),
    /** Court extrait affiche sur les cartes d'actualites. */
    chapeau: z.string(),
    /** Nom du fichier photo, sans extension, depuis src/assets/photos/. */
    photo: z.string().optional(),
    /** Texte alternatif de la photo. */
    photoAlt: z.string().optional(),
    /**
     * Mettre a true quand l'image est une affiche ou un document contenant du
     * texte : elle est alors montree en entier, sans aucun recadrage.
     */
    photoEntiere: z.boolean().default(false),
    /** Source de l'information, si elle provient d'un tiers. */
    source: z.string().optional(),
    /** Mettre a false pour retirer un article du site sans le supprimer. */
    publie: z.boolean().default(true),
  }),
});

export const collections = { articles };
