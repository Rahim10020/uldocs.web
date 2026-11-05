import { notFound } from "next/navigation";
import { PublicProfileContent } from "./public-profile-content";

/** Lit `params` dans la boundary Suspense pour garder le shell partagé. */
export async function PublicProfileRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const userId = Number(id);

	if (!Number.isInteger(userId) || userId <= 0) {
		notFound();
	}

	return <PublicProfileContent userId={userId} />;
}
