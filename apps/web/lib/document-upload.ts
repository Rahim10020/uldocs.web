import type { FormatDocument, TypeDocument } from "shared";

/** Règles d'upload partagées par le formulaire et les mocks. */
export const MAX_UPLOAD_FILES = 10;
export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "20 Mo";
export const UPLOAD_FORMATS_LABEL = "PDF, DOCX, PPTX, JPG, PNG";
export const UPLOAD_ACCEPT =
	".pdf,.docx,.pptx,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/jpeg,image/png";

const EXTENSION_FORMATS: Record<string, FormatDocument> = {
	pdf: "pdf",
	docx: "docx",
	pptx: "pptx",
	jpg: "image",
	jpeg: "image",
	png: "image",
};

const MIME_FORMATS: Record<string, FormatDocument> = {
	"application/pdf": "pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		"docx",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation":
		"pptx",
	"image/jpeg": "image",
	"image/jpg": "image",
	"image/png": "image",
};

/** Extension normalisée d'un nom de fichier, sans point. */
export function getFileExtension(fileName: string): string {
	const lastDot = fileName.lastIndexOf(".");

	if (lastDot <= 0 || lastDot === fileName.length - 1) {
		return "";
	}

	return fileName.slice(lastDot + 1).toLowerCase();
}

/** Format de stockage d'un fichier, ou `null` si le format n'est pas accepté. */
export function getDocumentFormat(
	file: Pick<File, "name" | "type">,
): FormatDocument | null {
	const extension = getFileExtension(file.name);
	const extensionFormat = EXTENSION_FORMATS[extension];

	if (extensionFormat) {
		return extensionFormat;
	}

	return MIME_FORMATS[file.type.toLowerCase()] ?? null;
}

/** Valide un fichier isolé. Retourne un message prêt à afficher. */
export function validateUploadFile(file: File): string | null {
	if (file.size <= 0) {
		return `Le fichier « ${file.name} » est vide.`;
	}

	if (file.size > MAX_FILE_SIZE_BYTES) {
		return `Le fichier « ${file.name} » dépasse ${MAX_FILE_SIZE_LABEL}.`;
	}

	if (!getDocumentFormat(file)) {
		return `Le format de « ${file.name} » n'est pas accepté. Utilise ${UPLOAD_FORMATS_LABEL}.`;
	}

	return null;
}

/** Clé d'identification pour repérer les doublons dans une sélection. */
export function getFileKey(
	file: Pick<File, "name" | "size" | "lastModified">,
): string {
	return `${file.name}:${file.size}:${file.lastModified}`;
}

export type FileSelectionResult = {
	accepted: File[];
	errors: string[];
};

/**
 * Ajoute des fichiers à une sélection existante.
 * Les doublons, les formats invalides et les dépassements de limite sont
 * ignorés avec un message explicite.
 */
export function addFilesToSelection(
	existing: File[],
	incoming: File[],
	maxFiles = MAX_UPLOAD_FILES,
): FileSelectionResult {
	const knownKeys = new Set(existing.map(getFileKey));
	const accepted: File[] = [];
	const errors: string[] = [];
	let count = existing.length;

	for (const file of incoming) {
		if (count >= maxFiles) {
			errors.push(`Tu peux importer ${maxFiles} fichiers maximum par envoi.`);
			break;
		}

		const key = getFileKey(file);

		if (knownKeys.has(key)) {
			errors.push(`« ${file.name} » est déjà sélectionné.`);
			continue;
		}

		const validationError = validateUploadFile(file);

		if (validationError) {
			errors.push(validationError);
			continue;
		}

		knownKeys.add(key);
		accepted.push(file);
		count += 1;
	}

	return { accepted, errors };
}

/** Titre lisible prérempli depuis le nom du fichier. */
export function titleFromFileName(fileName: string): string {
	const withoutExtension = fileName.replace(/\.[^.]+$/, "");

	return withoutExtension.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Taille en kilo-octets, unité attendue par `formatFileSize`. */
export function fileSizeInKiloOctets(sizeInBytes: number): number {
	return Math.max(1, Math.round(sizeInBytes / 1024));
}

/** Année académique courante, au format `2026-2027`. */
export function currentAcademicYear(now = new Date()): string {
	const startYear =
		now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;

	return `${startYear}-${startYear + 1}`;
}

/** Années académiques proposées dans le formulaire, de la plus récente. */
export function academicYearOptions(now = new Date(), count = 5): string[] {
	const current = currentAcademicYear(now);
	const startYear = Number(current.slice(0, 4));

	return Array.from({ length: count }, (_, index) => {
		const year = startYear - index;
		return `${year}-${year + 1}`;
	});
}

export type DocumentFormDataInput = {
	titre: string;
	type: TypeDocument;
	ueId: number;
	anneeAcademique: string;
	nbPages?: number | null;
	fichier: File;
};

/** Construit le `FormData` attendu par `POST /documents`. */
export function buildDocumentFormData({
	titre,
	type,
	ueId,
	anneeAcademique,
	nbPages,
	fichier,
}: DocumentFormDataInput): FormData {
	const formData = new FormData();

	formData.set("titre", titre.trim());
	formData.set("type", type);
	formData.set("ueId", String(ueId));
	formData.set("anneeAcademique", anneeAcademique);
	formData.set("langue", "fr");
	formData.set("certification", "true");

	if (nbPages !== null && nbPages !== undefined) {
		formData.set("nbPages", String(nbPages));
	}

	formData.set("fichier", fichier);

	return formData;
}
