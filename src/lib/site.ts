/**
 * Source de verite unique pour toutes les informations de l'ecole.
 * Modifier une valeur ici la met a jour partout sur le site.
 */

export const ECOLE = {
  nom: 'Complexe Scolaire Sainte Famille',
  nomCourt: 'CSSF',
  devise: 'Discipline – Travail – Fraternité',
  anneeOuverture: 2001,
} as const;

export const CONTACT = {
  telephoneAffiche: '+226 51 77 01 66',
  telephoneLien: 'tel:+22651770166',
  whatsappNumero: '22651770166',
  email: 'cssf@cssf-bf.org',
  emailLien: 'mailto:cssf@cssf-bf.org',
  boitePostale: '04 BP 8096 Ouagadougou 04',
  adresse: 'Quartier Pissy, secteur 27, en face de la salle CanalOlympia Idrissa Ouédraogo',
  ville: 'Ouagadougou',
  pays: 'Burkina Faso',
} as const;

/** Message pre-rempli du bouton WhatsApp principal. */
const MESSAGE_WHATSAPP =
  'Bonjour, je souhaite des informations sur les inscriptions au Complexe Scolaire Sainte Famille.';

export const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsappNumero}?text=${encodeURIComponent(
  MESSAGE_WHATSAPP,
)}`;

/** Lien WhatsApp avec un message personnalise (pour un bouton precis). */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumero}?text=${encodeURIComponent(message)}`;
}

/** Recherche Google Maps de l'etablissement. */
const REQUETE_MAPS = 'Complexe Scolaire Sainte Famille Pissy Ouagadougou';
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  REQUETE_MAPS,
)}&output=embed`;
export const MAPS_ITINERAIRE_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  REQUETE_MAPS,
)}`;

/**
 * Page Facebook officielle de l'ecole.
 * Laisser une chaine vide masque simplement le lien partout sur le site.
 */
export const FACEBOOK_URL =
  'https://www.facebook.com/p/Complexe-Scolaire-Sainte-Famille-61575121974534/';

export const NAVIGATION = [
  { href: '/', libelle: 'Accueil' },
  { href: '/ecole/', libelle: "L'école" },
  { href: '/resultats/', libelle: 'Résultats' },
  { href: '/jubile/', libelle: 'Jubilé' },
  { href: '/inscriptions/', libelle: 'Inscription' },
] as const;
