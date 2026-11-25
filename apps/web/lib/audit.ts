import type { LucideIcon } from "lucide-react";
import {
	Ban,
	FilePen,
	FilePlus,
	FileX,
	ShieldCheck,
	TriangleAlert,
	UserCog,
	UserX,
} from "lucide-react";
import type { Route } from "next";
import type { AuditAction, AuditEntry, AuditTargetType } from "shared";
import { routes } from "./routes";

/** Verbe affiché devant la cible dans le fil d'activité. */
export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
	document_cree: "a importé",
	document_modifie: "a modifié",
	document_retire: "a retiré",
	signalement_traite: "a traité",
	utilisateur_averti: "a averti",
	utilisateur_suspendu: "a suspendu",
	utilisateur_banni: "a banni",
	role_modifie: "a changé le rôle de",
};

export const AUDIT_ACTION_ICONS: Record<AuditAction, LucideIcon> = {
	document_cree: FilePlus,
	document_modifie: FilePen,
	document_retire: FileX,
	signalement_traite: ShieldCheck,
	utilisateur_averti: TriangleAlert,
	utilisateur_suspendu: UserX,
	utilisateur_banni: Ban,
	role_modifie: UserCog,
};

/** Libellés des types de cible du journal d'audit. */
export const AUDIT_TARGET_LABELS: Record<AuditTargetType, string> = {
	document: "Document",
	utilisateur: "Utilisateur",
	signalement: "Signalement",
	systeme: "Système",
};

/** Lien vers la cible d'une entrée d'audit, quand une page existe. */
export function getAuditTargetHref(entry: AuditEntry): Route | null {
	if (entry.cible.id === null) {
		return null;
	}

	switch (entry.cible.type) {
		case "document":
			return routes.document(entry.cible.id) as Route;
		case "utilisateur":
			return routes.profileById(entry.cible.id) as Route;
		case "signalement":
			return routes.adminModeration as Route;
		default:
			return null;
	}
}
