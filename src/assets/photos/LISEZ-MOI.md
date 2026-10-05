# Photos du site

Déposez ici les photos de l'école, en respectant **exactement** ces noms de fichiers
(l'extension peut être `.jpg`, `.png` ou `.webp`) :

| Nom du fichier            | Où il apparaît                                              |
| ------------------------- | ----------------------------------------------------------- |
| `logo`                    | En-tête, pied de page, favicon                              |
| `cour-interieure`         | Bannière de l'Accueil, image de partage WhatsApp / Facebook |
| `messe-communion`         | Pilier FOI, page L'école, présentation de l'Accueil         |
| `laureats-prix`           | Pilier EXCELLENCE, page Résultats, article Journée du mérite |
| `tenues-traditionnelles`  | Pilier CULTURE, page L'école                                 |
| `sensibilisation-jeppc`   | Article JEPPC 2025                                           |
| `resultats-bacd-2026`     | Article « Résultats du BAC D 2026 » (affiche, montrée entière) |
| `don-pdi-2023`            | Article « Solidarité : dons aux PDI »                        |
| `jubile-procession`       | Encart Jubilé d'argent (Accueil), grande photo               |
| `jubile-hostie`           | Encart Jubilé d'argent (Accueil)                             |

Les dix photos sont en place. Tant qu'un fichier est absent, le site affiche à sa place un cadre sobre
« Photo à venir ». Rien ne casse, la mise en page reste intacte.

Pas besoin de préparer les images : déposez le fichier d'origine, Astro le convertit
en WebP, génère les tailles nécessaires (srcset) et le compresse au moment du build.

Conseils :

- privilégiez des photos en **paysage** (plus larges que hautes)
  où un portrait convient mieux ;
- une largeur d'au moins **1 600 px** est idéale pour la bannière `cour-interieure` ;
- inutile de compresser vous-même, cela se fait automatiquement.
