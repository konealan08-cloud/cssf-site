/**
 * Animations du site : apparition au defilement et compteurs chiffres.
 * Tout repose sur IntersectionObserver, sans aucune librairie externe.
 * Le reglage systeme « reduire les animations » est respecte.
 */

const REDUIRE = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Formate un nombre a la francaise : separateur decimal virgule. */
function formater(valeur: number, decimales: number): string {
  return valeur.toLocaleString('fr-FR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/** Courbe de ralentissement : demarrage franc, arrivee en douceur. */
function adouci(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const DUREE_COMPTEUR = 1500;

function animerCompteur(element: HTMLElement): void {
  if (element.dataset.compte === 'fait') return;
  element.dataset.compte = 'fait';

  const cible = Number.parseFloat(element.dataset.valeur ?? '0');
  const decimales = Number.parseInt(element.dataset.decimales ?? '0', 10);

  if (Number.isNaN(cible)) return;

  if (REDUIRE()) {
    element.textContent = formater(cible, decimales);
    return;
  }

  const depart = performance.now();

  const pas = (maintenant: number) => {
    const avance = Math.min((maintenant - depart) / DUREE_COMPTEUR, 1);
    element.textContent = formater(cible * adouci(avance), decimales);
    if (avance < 1) {
      requestAnimationFrame(pas);
    } else {
      element.textContent = formater(cible, decimales);
    }
  };

  requestAnimationFrame(pas);
}

let observateur: IntersectionObserver | null = null;

export function demarrerAnimations(): void {
  // Les compteurs partent de zero, mais seulement si le JS est bien la :
  // sans JS, la valeur finale reste inscrite dans le HTML.
  document.querySelectorAll<HTMLElement>('[data-valeur]').forEach((element) => {
    if (element.dataset.compte === 'fait') return;
    if (REDUIRE()) return;
    const decimales = Number.parseInt(element.dataset.decimales ?? '0', 10);
    element.textContent = formater(0, decimales);
  });

  const cibles = document.querySelectorAll<HTMLElement>('.anim');

  if (!('IntersectionObserver' in window)) {
    cibles.forEach((cible) => cible.classList.add('est-visible'));
    document.querySelectorAll<HTMLElement>('[data-valeur]').forEach(animerCompteur);
    return;
  }

  observateur?.disconnect();

  observateur = new IntersectionObserver(
    (entrees, self) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        const cible = entree.target as HTMLElement;
        cible.classList.add('est-visible');
        // Les compteurs contenus dans le bloc demarrent en meme temps.
        cible.querySelectorAll<HTMLElement>('[data-valeur]').forEach(animerCompteur);
        if (cible.hasAttribute('data-valeur')) animerCompteur(cible);
        self.unobserve(cible);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  cibles.forEach((cible) => observateur!.observe(cible));

  // Filet de securite : un bloc deja a l'ecran au chargement doit apparaitre
  // meme si l'observateur tarde (cas des connexions lentes).
  requestAnimationFrame(() => {
    cibles.forEach((cible) => {
      const boite = cible.getBoundingClientRect();
      if (boite.top < window.innerHeight * 0.92 && boite.bottom > 0) {
        cible.classList.add('est-visible');
        cible.querySelectorAll<HTMLElement>('[data-valeur]').forEach(animerCompteur);
        if (cible.hasAttribute('data-valeur')) animerCompteur(cible);
      }
    });
  });
}
