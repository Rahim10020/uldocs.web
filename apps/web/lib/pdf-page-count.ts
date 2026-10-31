import { getDocumentFormat } from "@/lib/document-upload";

/**
 * Lit le nombre de pages d'un PDF côté navigateur.
 * Retourne `null` si le fichier n'est pas un PDF ou si la lecture échoue.
 */
export async function readPdfPageCount(file: File): Promise<number | null> {
	if (getDocumentFormat(file) !== "pdf") {
		return null;
	}

	try {
		const { pdfjs } = await import("react-pdf");

		pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

		const data = new Uint8Array(await file.arrayBuffer());
		const loadingTask = pdfjs.getDocument({ data });
		const document = await loadingTask.promise;
		const pageCount = document.numPages;

		await loadingTask.destroy();

		return pageCount;
	} catch {
		return null;
	}
}
