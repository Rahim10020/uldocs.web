import { describe, expect, it } from "vitest";
import { resolveAcademicSelection } from "@/lib/academic-selection";
import { mockAcademic } from "@/lib/mocks/academic";
import { MOCK_USERS } from "@/lib/mocks/users";

describe("sélection académique du profil", () => {
	it("retrouve la faculté, la filière et le niveau de l'utilisateur", () => {
		const user = MOCK_USERS[0];
		const selection = resolveAcademicSelection(mockAcademic.facultes, user);

		expect(selection).toEqual({
			faculteId: String(user.faculteId),
			filiereId: String(user.filiereId),
			niveauId: String(user.niveauId),
		});
	});

	it("retrouve la faculté même si seul le niveau est connu", () => {
		const user = MOCK_USERS[0];
		const selection = resolveAcademicSelection(mockAcademic.facultes, {
			faculteId: null,
			filiereId: null,
			niveauId: user.niveauId,
		});

		expect(selection?.faculteId).toBe(String(user.faculteId));
		expect(selection?.filiereId).toBe(String(user.filiereId));
		expect(selection?.niveauId).toBe(String(user.niveauId));
	});

	it("ignore les identifiants inconnus", () => {
		expect(
			resolveAcademicSelection(mockAcademic.facultes, {
				faculteId: 9999,
				filiereId: 9999,
				niveauId: 9999,
			}),
		).toBeNull();
	});
});
