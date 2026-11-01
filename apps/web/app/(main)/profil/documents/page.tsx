import { redirect } from "next/navigation";
import { profileTabHref } from "@/lib/profile";

/** Ancienne URL de « Mes documents », conservée pour les liens existants. */
export default function MyDocumentsPage() {
	redirect(profileTabHref("documents"));
}
