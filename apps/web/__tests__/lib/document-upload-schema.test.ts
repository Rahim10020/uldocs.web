import { describe, expect, it } from "vitest";
import { documentMetadataSchema } from "@/lib/document-upload-schema";

const validValues = {
	type: "resume",
	faculteId: "1",
	filiereId: "2",
	niveauId: "3",
	semestreId: "4",
	ueId: "5",
	anneeAcademique: "2026-2027",
	certification: true,
};

describe("schéma des métadonnées d'upload", () => {
	it("accepte des métadonnées complètes", () => {
		expect(documentMetadataSchema.safeParse(validValues).success).toBe(true);
	});

	it("refuse un type absent ou obsolète", () => {
		expect(
			documentMetadataSchema.safeParse({ ...validValues, type: "" }).success,
		).toBe(false);
		expect(
			documentMetadataSchema.safeParse({ ...validValues, type: "memoire" })
				.success,
		).toBe(false);
	});

	it("refuse une sélection académique incomplète", () => {
		expect(
			documentMetadataSchema.safeParse({ ...validValues, ueId: "" }).success,
		).toBe(false);
	});

	it("exige la certification", () => {
		const result = documentMetadataSchema.safeParse({
			...validValues,
			certification: false,
		});

		expect(result.success).toBe(false);
	});
});
