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

/** Date lisible, ex. « 23 décembre 2023 ». */
export function formatDate(value: string): string {
	return new Intl.DateTimeFormat("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(value));
}
