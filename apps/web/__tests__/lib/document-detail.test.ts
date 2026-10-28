import { describe, expect, it } from "vitest";
import {
	applyReaction,
	buildDocumentBreadcrumb,
	canPreviewDocument,
	clampPage,
	nextReactionVote,
	PREVIEW_PAGE_LIMIT,
	previewPageCount,
	toDownloadFileName,
	usefulPercentage,
} from "@/lib/document-detail";
import { formatFileSize } from "@/lib/format";
import { MOCK_DOCUMENTS } from "@/lib/mocks/documents";

function firstDocument() {
	const document = MOCK_DOCUMENTS[0];

	if (!document) {
		throw new Error("Aucun document mocké.");
	}

	return document;
}

describe("document detail", () => {
	it("construit le fil d'Ariane avec les filtres de recherche", () => {
		const document = firstDocument();
		const breadcrumb = buildDocumentBreadcrumb(document);

		expect(breadcrumb.map((item) => item.label)).toEqual([
			"Accueil",
			document.faculte.nom,
			`${document.niveau} ${document.filiere.nom}`,
			document.semestre,
			document.ue.nom,
			`Examen ${document.anneeAcademique}`,
		]);
		expect(breadcrumb[0]?.href).toBe("/");
		expect(breadcrumb[1]?.href).toBe(
			`/documents?faculteId=${document.faculte.id}`,
		);
	});

	it("borne les numéros de page", () => {
		expect(clampPage(0, 74)).toBe(1);
		expect(clampPage(12, 74)).toBe(12);
		expect(clampPage(99, 74)).toBe(74);
		expect(clampPage(Number.NaN, 74)).toBe(1);
		expect(clampPage(3, 0)).toBe(1);
	});

	it("limite l'aperçu aux trois premières pages", () => {
		expect(PREVIEW_PAGE_LIMIT).toBe(3);
		expect(previewPageCount(null)).toBeNull();
		expect(previewPageCount(1)).toBe(1);
		expect(previewPageCount(3)).toBe(3);
		expect(previewPageCount(74)).toBe(3);
	});

	it("nettoie le nom de fichier téléchargé", () => {
		expect(toDownloadFileName("Cours : droit / civil ?")).toBe(
			"Cours - droit - civil",
		);
		expect(toDownloadFileName("   ")).toBe("document");
	});

	it("retire le vote quand on reclique sur le même pouce", () => {
		expect(nextReactionVote("utile", "utile")).toBeNull();
		expect(nextReactionVote("utile", "inutile")).toBe("inutile");
		expect(nextReactionVote(null, "utile")).toBe("utile");
	});

	it("applique un changement de vote sans compter deux fois", () => {
		const reaction = {
			votesUtiles: 4,
			votesInutiles: 1,
			voteUtilisateur: "utile" as const,
		};

		expect(applyReaction(reaction, "inutile")).toEqual({
			votesUtiles: 3,
			votesInutiles: 2,
			voteUtilisateur: "inutile",
		});
		expect(applyReaction(reaction, null)).toEqual({
			votesUtiles: 3,
			votesInutiles: 1,
			voteUtilisateur: null,
		});
	});

	it("calcule le pourcentage de votes utiles", () => {
		expect(
			usefulPercentage({
				votesUtiles: 3,
				votesInutiles: 1,
				voteUtilisateur: null,
			}),
		).toBe(75);
		expect(
			usefulPercentage({
				votesUtiles: 0,
				votesInutiles: 0,
				voteUtilisateur: null,
			}),
		).toBe(0);
	});

	it("n'active l'aperçu que pour un PDF disponible", () => {
		const document = firstDocument();

		expect(canPreviewDocument(document)).toBe(true);
		expect(
			canPreviewDocument({ format: "docx", fichierUrl: "/fichier.docx" }),
		).toBe(false);
		expect(canPreviewDocument({ format: "pdf", fichierUrl: "" })).toBe(false);
	});

	it("formate le poids d'un fichier", () => {
		expect(formatFileSize(512)).toBe("512 Ko");
		expect(formatFileSize(1024)).toBe("1 Mo");
		expect(formatFileSize(2560)).toBe("2,5 Mo");
	});
});
