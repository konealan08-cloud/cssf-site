/**
 * Ouvre en grand les photos marquees `data-agrandir` (voir PhotoAgrandissable).
 * Un seul ecouteur delegue sur le document : il survit aux transitions de page
 * d'Astro, qui remplacent le contenu sans recharger les scripts.
 */

let active = false;

export function activerVisionneuse(): void {
  if (active) return;
  active = true;

  document.addEventListener('click', (evenement) => {
    const cible = evenement.target as Element | null;
    if (!cible) return;

    const dialogue = document.getElementById('visionneuse') as HTMLDialogElement | null;
    if (!dialogue) return;

    const declencheur = cible.closest<HTMLElement>('[data-agrandir]');
    if (declencheur) {
      const image = dialogue.querySelector<HTMLImageElement>('[data-visionneuse-image]')!;
      const legende = dialogue.querySelector<HTMLElement>('[data-visionneuse-legende]')!;
      image.src = declencheur.dataset.agrandir ?? '';
      image.alt = declencheur.dataset.alt ?? '';
      legende.textContent = declencheur.dataset.legende ?? '';
      dialogue.showModal();
      return;
    }

    // Fermeture : bouton, ou clic en dehors de la photo (sur le fond sombre).
    if (
      dialogue.open &&
      (cible.closest('[data-visionneuse-fermer]') || !cible.closest('img, figcaption'))
    ) {
      dialogue.close();
    }
  });
}
