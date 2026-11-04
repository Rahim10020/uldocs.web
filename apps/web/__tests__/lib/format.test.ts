import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "@/lib/format";

const NOW = Date.UTC(2026, 10, 4, 12, 0, 0);

function at(hoursAgo: number) {
	return new Date(NOW - hoursAgo * 3_600_000).toISOString();
}

describe("formatRelativeTime", () => {
	it("affiche l'instant, les minutes, les heures et les jours", () => {
		expect(formatRelativeTime(at(0), NOW)).toBe("à l'instant");
		expect(formatRelativeTime(at(0.5), NOW)).toBe("il y a 30 min");
		expect(formatRelativeTime(at(2), NOW)).toBe("il y a 2 h");
		expect(formatRelativeTime(at(48), NOW)).toBe("il y a 2 j");
	});

	it("retombe sur une date lisible au-delà d'une semaine", () => {
		expect(formatRelativeTime(at(24 * 10), NOW)).toBe("25 octobre 2026");
	});

	it("renvoie une chaîne vide pour une date invalide", () => {
		expect(formatRelativeTime("pas une date", NOW)).toBe("");
	});
});
