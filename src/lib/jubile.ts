/**
 * Contenus du jubile d'argent partages entre l'Accueil et la page Jubile,
 * pour que le theme et les legendes des photos restent identiques partout.
 */

export const THEME_JUBILE =
  "Rendons grâce pour 25 ans d'excellence dans l'Éducation et œuvrons pour un Avenir plus radieux dans la Discipline et la Paix.";

export const PHOTOS_JUBILE = {
  procession: {
    nom: 'jubile-procession',
    alt: "Procession des servants de messe en aube blanche à la messe d'ouverture du jubilé d'argent",
    legende: "Procession d'entrée de la messe d'ouverture du jubilé",
  },
  consecration: {
    nom: 'jubile-hostie',
    alt: "Le prêtre élève l'hostie lors de la consécration, à la messe d'ouverture du jubilé",
    legende: "Messe d'ouverture du jubilé (Consécration)",
  },
} as const;
