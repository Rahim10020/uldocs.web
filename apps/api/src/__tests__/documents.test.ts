import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../app.js";
import { resetReactions } from "../routes/documents.js";

describe("PUT /documents/:id/reaction", () => {
	beforeEach(() => {
		resetReactions();
	});

	it("enregistre un vote utile", async () => {
		const res = await request(app)
			.put("/documents/1/reaction")
			.send({ valeur: "utile" });

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			ok: true,
			data: {
				votesUtiles: 1,
				votesInutiles: 0,
				voteUtilisateur: "utile",
			},
		});
	});

	it("déplace le vote vers inutile", async () => {
		await request(app).put("/documents/1/reaction").send({ valeur: "utile" });

		const res = await request(app)
			.put("/documents/1/reaction")
			.send({ valeur: "inutile" });

		expect(res.body.data).toEqual({
			votesUtiles: 0,
			votesInutiles: 1,
			voteUtilisateur: "inutile",
		});
	});

	it("retire le vote avec null", async () => {
		await request(app).put("/documents/1/reaction").send({ valeur: "utile" });

		const res = await request(app)
			.put("/documents/1/reaction")
			.send({ valeur: null });

		expect(res.body.data).toEqual({
			votesUtiles: 0,
			votesInutiles: 0,
			voteUtilisateur: null,
		});
	});

	it("refuse une valeur inconnue", async () => {
		const res = await request(app)
			.put("/documents/1/reaction")
			.send({ valeur: "peut-etre" });

		expect(res.status).toBe(400);
	});
});
