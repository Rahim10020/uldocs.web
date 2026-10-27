/** Formate un compteur (vues, téléchargements) en notation compacte française. */
export function formatCount(value: number): string {
  if (value < 1000) {
    return String(value);
  }

  const thousands = value / 1000;
  const compact =
    thousands < 10 ? Number(thousands.toFixed(1)) : Math.round(thousands);

  return `${String(compact).replace(".", ",")}k`;
}

/** Note moyenne avec une décimale, au format français. */
export function formatRating(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/** Poids de fichier lisible, ex. « 2,4 Mo ». */
export function formatFileSize(kiloOctets: number): string {
  if (kiloOctets < 1024) {
    return `${Math.max(1, Math.round(kiloOctets))} Ko`;
  }

  const megaOctets = kiloOctets / 1024;

  return `${String(Number(megaOctets.toFixed(1))).replace(".", ",")} Mo`;
}

/** Date lisible, ex. « 23 décembre 2023 ». */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
