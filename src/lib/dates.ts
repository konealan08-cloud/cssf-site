const FORMAT_LONG = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** « 16 juillet 2026 » */
export function dateEnFrancais(date: Date): string {
  return FORMAT_LONG.format(date);
}
