/**
 * Retire les metadonnees (EXIF, GPS, XMP, appareil, numero de serie, date)
 * des photos de `src/assets/photos/`. A lancer apres chaque ajout de photo :
 *   node scripts/nettoyer-photos.mjs
 *
 * Le site publie deja des versions sans metadonnees (Astro les reencode), mais
 * les fichiers d'origine vivent dans le depot Git : ils doivent etre propres eux aussi.
 * La photo est reencodee en haute qualite, sans perte visible.
 */
import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DOSSIER = 'src/assets/photos';

for (const nom of await readdir(DOSSIER)) {
  const ext = path.extname(nom).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

  const chemin = path.join(DOSSIER, nom);
  const entree = await readFile(chemin);
  const meta = await sharp(entree).metadata();
  if (!meta.exif && !meta.xmp && !meta.iptc) {
    console.log(`ok       ${nom}`);
    continue;
  }

  // rotate() applique l'orientation EXIF avant de la supprimer ;
  // sharp n'ecrit aucune metadonnee en sortie par defaut.
  let image = sharp(entree).rotate();
  if (ext === '.png') image = image.png({ compressionLevel: 9 });
  else if (ext === '.webp') image = image.webp({ quality: 92 });
  else image = image.jpeg({ quality: 92, mozjpeg: true });

  await writeFile(chemin, await image.toBuffer());
  console.log(`nettoye  ${nom}`);
}
