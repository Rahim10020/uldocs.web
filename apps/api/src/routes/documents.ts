import { Router } from "express";
import {
	type DocumentReaction,
	VOTES_DOCUMENT,
	type VoteDocument,
} from "shared";

/**
 * Stockage temporaire des réactions en attendant le branchement Prisma.
 * L'authentification n'est pas encore branchée : on utilise l'utilisateur de
 * démonstration 1, comme les mocks frontend.
 */
const DEMO_USER_ID = 1;

type ReactionState = {
	votesUtiles: number;
	votesInutiles: number;
	votes: Map<number, VoteDocument>;
};

const reactions = new Map<number, ReactionState>();

function getState(documentId: number): ReactionState {
	const existing = reactions.get(documentId);

	if (existing) {
		return existing;
	}

	const state: ReactionState = {
		votesUtiles: 0,
		votesInutiles: 0,
		votes: new Map(),
	};

	reactions.set(documentId, state);

	return state;
}

function getReaction(documentId: number): DocumentReaction {
	const state = getState(documentId);

	return {
		votesUtiles: state.votesUtiles,
		votesInutiles: state.votesInutiles,
		voteUtilisateur: state.votes.get(DEMO_USER_ID) ?? null,
	};
}

export function setReaction(
	documentId: number,
	valeur: VoteDocument | null,
): DocumentReaction {
	const state = getState(documentId);
	const previous = state.votes.get(DEMO_USER_ID) ?? null;

	if (previous === "utile") {
		state.votesUtiles = Math.max(0, state.votesUtiles - 1);
	}

	if (previous === "inutile") {
		state.votesInutiles = Math.max(0, state.votesInutiles - 1);
	}

	state.votes.delete(DEMO_USER_ID);

	if (valeur === "utile") {
		state.votesUtiles += 1;
		state.votes.set(DEMO_USER_ID, valeur);
	}

	if (valeur === "inutile") {
		state.votesInutiles += 1;
		state.votes.set(DEMO_USER_ID, valeur);
	}

	return getReaction(documentId);
}

/** Réinitialise le stockage (tests). */
export function resetReactions(): void {
	reactions.clear();
}

export const documentsRouter = Router();

documentsRouter.put("/:id/reaction", (req, res) => {
	const documentId = Number(req.params.id);

	if (!Number.isInteger(documentId) || documentId <= 0) {
		res.status(400).json({ ok: false, error: "Document invalide" });
		return;
	}

	const valeur = (req.body as { valeur?: unknown } | undefined)?.valeur;

	if (
		valeur !== null &&
		(typeof valeur !== "string" ||
			!VOTES_DOCUMENT.includes(valeur as VoteDocument))
	) {
		res.status(400).json({ ok: false, error: "Réaction invalide" });
		return;
	}

	res.json({
		ok: true,
		data: setReaction(documentId, valeur as VoteDocument | null),
	});
});
