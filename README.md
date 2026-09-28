# Site du Complexe Scolaire Sainte Famille

Site officiel du Complexe Scolaire Sainte Famille (CSSF), quartier Pissy, Ouagadougou.

- **Site en ligne :** https://cssf-bf.netlify.app
- **Code source :** https://github.com/konealan08-cloud/cssf-site
- **Tableau de bord Netlify :** https://app.netlify.com/projects/cssf-bf

Site statique construit avec **Astro** et **Tailwind CSS**. Aucune base de données,
aucun serveur à maintenir : le site se met en ligne gratuitement sur Netlify ou Vercel.

---

## 1. Lancer le projet sur votre ordinateur

Il faut **Node.js version 20 ou plus** (à télécharger sur [nodejs.org](https://nodejs.org)).

Ouvrez un terminal dans ce dossier, puis :

```bash
npm install     # à faire une seule fois, installe les outils
npm run dev     # lance le site en local
```

Le terminal affiche une adresse du type `http://localhost:4321`. Ouvrez-la dans
votre navigateur. Chaque modification de fichier se voit immédiatement, sans
rien relancer.

### Les autres commandes

| Commande          | Ce qu'elle fait                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Lance le site en local, avec rechargement automatique                    |
| `npm run build`   | Fabrique la version finale du site dans le dossier `dist/`               |
| `npm run preview` | Affiche la version finale en local, exactement comme en ligne            |

---

## 2. Ajouter une actualité

Chaque article est un simple fichier texte dans `src/content/articles/`.

**Étape 1.** Créez un nouveau fichier, par exemple
`src/content/articles/fete-de-fin-annee-2027.md`.
Le nom du fichier devient l'adresse de la page :
`/actualites/fete-de-fin-annee-2027/`. Utilisez des tirets, pas d'espaces,
pas d'accents.

**Étape 2.** Collez ce modèle et remplacez les valeurs :

```markdown
---
titre: 'Fête de fin d''année 2027'
date: 2027-06-20
chapeau: 'Une phrase de résumé, affichée sur la carte de l''article.'
photo: fete-fin-annee-2027
photoAlt: 'Description de la photo, pour les personnes malvoyantes'
source: 'Nom de la source, si l''information vient d''ailleurs'
---

Le texte de l'article, écrit normalement.

Laissez une ligne vide entre deux paragraphes.

## Un sous-titre

Du **texte en gras**, et des listes :

- premier point
- deuxième point

> Une citation, par exemple les paroles du Directeur.
```

**À savoir sur les champs :**

- `titre`, `date` et `chapeau` sont **obligatoires**, les autres sont facultatifs.
- La `date` s'écrit toujours **année-mois-jour**, par exemple `2027-06-20`.
  Les articles s'affichent du plus récent au plus ancien.
- Si un texte contient une apostrophe, doublez-la (`d''année`) ou entourez
  la ligne de guillemets doubles.
- `photo` est le nom du fichier **sans son extension**, déposé dans
  `src/assets/photos/`. Si vous n'avez pas encore la photo, retirez la ligne :
  un cadre « Photo à venir » s'affichera à la place.
- Pour retirer un article du site sans le supprimer, ajoutez la ligne
  `publie: false`.

**Étape 3.** Rien d'autre à faire. L'article apparaît automatiquement sur la page
d'accueil, avec sa propre page, et il est ajouté au plan du site.

---

## 3. Remplacer ou ajouter une photo

Toutes les photos vivent dans **`src/assets/photos/`**.

Déposez simplement le fichier en respectant le nom attendu. Astro se charge du
reste : conversion en WebP, création des différentes tailles pour mobile et
ordinateur, compression, chargement différé.

| Nom du fichier           | Où la photo apparaît                                         |
| ------------------------ | ------------------------------------------------------------ |
| `logo`                   | En-tête, pied de page, favicon                               |
| `cour-interieure`        | Bannière de l'accueil, aperçu de partage WhatsApp / Facebook |
| `messe-communion`        | Pilier FOI, page L'école, présentation de l'accueil          |
| `laureats-prix`          | Pilier EXCELLENCE, page Résultats, article Journée du mérite |
| `tenues-traditionnelles` | Pilier CULTURE, page L'école                                 |
| `sensibilisation-jeppc`  | Article JEPPC 2025                                           |
| `directeur`              | Mot du directeur (recadré en rond automatiquement)           |
| `resultats-bacd-2026`    | Article « Résultats du BAC D 2026 » (affiche, montrée entière) |
| `don-pdi-2023`           | Article « Solidarité : dons aux PDI »                         |

L'extension peut être `.jpg`, `.png` ou `.webp`. **Le nom, lui, doit être exact.**

Si une image est une **affiche ou un document contenant du texte** (comme l'affiche
des résultats du BAC), ajoutez `photoEntiere: true` dans l'article : elle sera
montrée en entier, sans aucun recadrage qui couperait du texte.

Pour remplacer une photo : supprimez l'ancienne et déposez la nouvelle sous le
même nom. Tant qu'un fichier est absent, le site affiche un cadre sobre
« Photo à venir » : la mise en page reste intacte, rien ne casse.

Conseils : privilégiez des photos **en paysage** (sauf `directeur`, où un portrait
convient mieux), d'au moins **1 600 px de large** pour la bannière. Inutile de les
compresser vous-même.

---

## 4. Modifier les textes et les coordonnées

| Ce que vous voulez changer                           | Fichier à ouvrir                     |
| ---------------------------------------------------- | ------------------------------------ |
| Téléphone, WhatsApp, e-mail, adresse, **Facebook**   | `src/lib/site.ts`                    |
| Noms des onglets de navigation                       | `src/lib/site.ts`                    |
| Page d'accueil                                       | `src/pages/index.astro`              |
| Page L'école (histoire, mot du directeur, blason…)   | `src/pages/ecole.astro`              |
| Page Résultats (chiffres, mentions, graphique)       | `src/pages/resultats.astro`          |
| Page Inscriptions                                    | `src/pages/inscriptions.astro`       |
| Couleurs et polices                                  | `src/styles/global.css`              |

Les coordonnées de l'école (téléphone, WhatsApp, e-mail, adresse) sont écrites
**une seule fois** dans `src/lib/site.ts`. Les modifier là les met à jour partout
sur le site, y compris dans les liens WhatsApp et les données pour Google.

### Le lien Facebook

Il est déjà renseigné dans `src/lib/site.ts` :

```ts
export const FACEBOOK_URL =
  'https://www.facebook.com/p/Complexe-Scolaire-Sainte-Famille-61575121974534/';
```

Le lien apparaît dans le pied de page et sur la page Inscriptions. Si vous le
remplacez par une chaîne vide, aucun lien Facebook ne s'affiche nulle part : il
n'y a donc jamais de lien mort.

### Les chiffres des résultats

Ils se trouvent en haut de `src/pages/resultats.astro` (session en cours) et dans
`src/components/GrapheEvolution.astro` (les six dernières sessions). Pour ajouter
une nouvelle année au graphique, ajoutez l'année dans `ANNEES` et une valeur à
chaque série : le graphique se redessine tout seul.

---

## 5. Mettre le site en ligne

Le site est **déjà en ligne** sur Netlify, relié au dépôt GitHub.

### Mettre le site à jour

Il suffit d'envoyer vos modifications sur GitHub :

```bash
git add .
git commit -m "Description de la modification"
git push
```

Netlify reconstruit et republie le site tout seul, en deux à trois minutes.
Vous pouvez suivre l'avancement sur https://app.netlify.com/projects/cssf-bf

### Publier depuis votre ordinateur (sans passer par GitHub)

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Repartir de zéro ailleurs (Vercel)

1. Créez un compte sur [vercel.com](https://vercel.com).
2. **Add New → Project**, choisissez le dépôt.
3. Vercel détecte Astro automatiquement. Laissez les réglages par défaut et
   cliquez sur **Deploy**.

### L'adresse du site : rien à configurer

Le site lit tout seul son adresse publique dans la variable `URL` que Netlify
fournit au moment du build. Concrètement :

- au premier déploiement, l'adresse est du type `https://nom-du-site.netlify.app` ;
- le jour où le nom de domaine définitif est acheté et branché dans Netlify
  (*Domains → Add a domain*), l'adresse se met à jour toute seule au déploiement
  suivant.

Les liens canoniques, l'aperçu de partage WhatsApp et Facebook, le plan du site et
le fichier `robots.txt` suivent automatiquement. Le certificat HTTPS est installé
par Netlify, gratuitement.

> **Attention si vous déployez par glisser-déposer** (en déposant le dossier `dist`
> directement sur Netlify) : dans ce cas Netlify ne fait aucun build, donc la
> variable `URL` n'existe pas. Lancez alors le build en précisant l'adresse :
>
> ```bash
> SITE_URL=https://votre-adresse.netlify.app npm run build
> ```
>
> Le plus simple reste de passer par GitHub : Netlify construit le site lui-même et
> tout est automatique.

Ensuite, chaque modification envoyée sur GitHub remet le site à jour tout seul.

---

## 6. Organisation des fichiers

```
cssf-site/
├── astro.config.mjs          Réglages Astro (dont l'adresse du site)
├── netlify.toml              Réglages de mise en ligne Netlify
├── public/
│   ├── favicon.svg           Icône de repli (remplacée par le logo s'il est fourni)
│   └── robots.txt            Instructions pour les moteurs de recherche
└── src/
    ├── assets/photos/        LES PHOTOS DE L'ÉCOLE (voir section 3)
    ├── components/           Briques réutilisables (barre du haut, cartes, graphiques…)
    ├── content/articles/     LES ARTICLES D'ACTUALITÉ (voir section 2)
    ├── layouts/              Structure commune à toutes les pages (SEO, en-tête, pied de page)
    ├── lib/site.ts           COORDONNÉES ET NAVIGATION (voir section 4)
    ├── pages/                Une page du site = un fichier
    ├── scripts/              Animations au défilement et compteurs chiffrés
    └── styles/global.css     Couleurs, polices, animations
```

---

## 7. Ce qui est déjà en place

- **Navigation** : une seule barre de 52 px, collée en haut, 4 onglets toujours
  visibles sur mobile comme sur ordinateur, sans menu burger. Testée jusqu'à
  360 px de large.
- **Animations** : apparition en fondu au défilement, compteurs chiffrés,
  graphiques qui se dessinent, effet de zoom lent sur la bannière, transitions
  douces entre les pages. Tout se désactive si le visiteur a demandé de réduire
  les animations dans les réglages de son appareil.
- **Photos** : conversion automatique en WebP, plusieurs tailles selon l'écran,
  chargement différé.
- **Référencement** : titre et description propres à chaque page, aperçu de
  partage WhatsApp et Facebook, données structurées `School` pour Google, plan du
  site généré automatiquement.
- **Accessibilité** : textes alternatifs, navigation au clavier, contrastes
  vérifiés, langue déclarée en français, graphiques doublés d'un tableau de
  données.
- **Poids** : moins de 1 Mo par page, y compris les photos.

---

## 8. Besoin d'aide ?

Les fichiers sont commentés en français. Les deux endroits à connaître pour
l'entretien courant :

- une actualité à publier → `src/content/articles/`
- une coordonnée ou le lien Facebook à changer → `src/lib/site.ts`
