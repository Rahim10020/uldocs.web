import { describe, expect, it } from "vitest";
import {
	academicYearOptions,
	addFilesToSelection,
	buildDocumentFormData,
	currentAcademicYear,
	fileSizeInKiloOctets,
	getDocumentFormat,
	getFileExtension,
	getFileKey,
	MAX_FILE_SIZE_BYTES,
	titleFromFileName,
	validateUploadFile,
} from "@/lib/document-upload";

function fileLike(
	name: string,
	size = 1024,
	type = "application/pdf",
	lastModified = 1,
): File {
	return { name, size, type, lastModified } as File;
}

describe("règles d'upload", () => {
	it("détecte les formats acceptés par extension", () => {
		expect(getDocumentFormat(fileLike("cours.PDF"))).toBe("pdf");
		expect(getDocumentFormat(fileLike("cours.docx"))).toBe("docx");
		expect(getDocumentFormat(fileLike("cours.pptx"))).toBe("pptx");
		expect(getDocumentFormat(fileLike("scan.jpg"))).toBe("image");
		expect(getDocumentFormat(fileLike("scan.jpeg"))).toBe("image");
		expect(getDocumentFormat(fileLike("scan.png"))).toBe("image");
		expect(
			getDocumentFormat(fileLike("archive.zip", 1024, "application/zip")),
		).toBeNull();
	});

	it("retombe sur le type MIME quand l'extension est absente", () => {
		expect(
			getDocumentFormat(fileLike("document", 1024, "application/pdf")),
		).toBe("pdf");
		expect(getDocumentFormat(fileLike("photo", 1024, "image/png"))).toBe(
			"image",
		);
	});

	it("extrait l'extension normalisée", () => {
		expect(getFileExtension("Droit.Civil.PDF")).toBe("pdf");
		expect(getFileExtension("sans-extension")).toBe("");
		expect(getFileExtension(".gitignore")).toBe("");
	});

	it("refuse un fichier vide, trop lourd ou au mauvais format", () => {
		expect(validateUploadFile(fileLike("vide.pdf", 0))).toContain("vide");
		expect(
			validateUploadFile(fileLike("lourd.pdf", MAX_FILE_SIZE_BYTES + 1)),
		).toContain("20 Mo");
		expect(
			validateUploadFile(fileLike("archive.zip", 1024, "application/zip")),
		).toContain("format");
		expect(validateUploadFile(fileLike("cours.pdf"))).toBeNull();
	});

	it("ignore les doublons et respecte la limite de dix fichiers", () => {
		const existing = [fileLike("cours.pdf")];
		const result = addFilesToSelection(existing, [
			fileLike("cours.pdf"),
			fileLike("td.pdf", 2048),
			fileLike("archive.zip", 1024, "application/zip"),
		]);

		expect(result.accepted.map((file) => file.name)).toEqual(["td.pdf"]);
		expect(result.errors).toHaveLength(2);
	});

	it("bloque l'ajout au-delà de dix fichiers", () => {
		const existing = Array.from({ length: 10 }, (_, index) =>
			fileLike(`cours-${index}.pdf`, 1024 + index),
		);
		const result = addFilesToSelection(existing, [fileLike("encore.pdf")]);

		expect(result.accepted).toHaveLength(0);
		expect(result.errors[0]).toContain("10 fichiers maximum");
	});

	it("préremplit un titre lisible depuis le nom du fichier", () => {
		expect(titleFromFileName("droit_civil_S3-2024.pdf")).toBe(
			"droit civil S3 2024",
		);
		expect(titleFromFileName("  annales__maths .docx")).toBe("annales maths");
	});

	it("convertit les octets en kilo-octets pour formatFileSize", () => {
		expect(fileSizeInKiloOctets(1024)).toBe(1);
		expect(fileSizeInKiloOctets(1536)).toBe(2);
		expect(fileSizeInKiloOctets(0)).toBe(1);
	});

	it("déduit l'année académique à partir de la date", () => {
		const octobre = new Date("2026-10-30T12:00:00.000Z");
		const mars = new Date("2026-03-01T12:00:00.000Z");

		expect(currentAcademicYear(octobre)).toBe("2026-2027");
		expect(currentAcademicYear(mars)).toBe("2025-2026");
		expect(academicYearOptions(octobre, 3)).toEqual([
			"2026-2027",
			"2025-2026",
			"2024-2025",
		]);
	});

	it("construit le FormData attendu par l'API", () => {
		const fichier = new File(["contenu"], "cours.pdf", {
			type: "application/pdf",
		});
		const formData = buildDocumentFormData({
			titre: "  Droit civil  ",
			type: "resume",
			ueId: 12,
			anneeAcademique: "2026-2027",
			nbPages: 3,
			fichier,
		});

		expect(formData.get("titre")).toBe("Droit civil");
		expect(formData.get("type")).toBe("resume");
		expect(formData.get("ueId")).toBe("12");
		expect(formData.get("anneeAcademique")).toBe("2026-2027");
		expect(formData.get("nbPages")).toBe("3");
		expect(formData.get("langue")).toBe("fr");
		expect(formData.get("certification")).toBe("true");
		expect(formData.get("fichier")).toBe(fichier);
	});

	it("omet nbPages quand il est inconnu", () => {
		const formData = buildDocumentFormData({
			titre: "Cours",
			type: "cours",
			ueId: 1,
			anneeAcademique: "2026-2027",
			nbPages: null,
			fichier: new File(["x"], "cours.docx"),
		});

		expect(formData.get("nbPages")).toBeNull();
	});

	it("utilise une clé stable pour repérer les doublons", () => {
		const file = fileLike("cours.pdf", 2048, "application/pdf", 42);

		expect(getFileKey(file)).toBe("cours.pdf:2048:42");
	});
});
