import { parseProfileTab } from "@/lib/profile";
import { ProfileContent } from "./profile-content";

/** Lit `searchParams` dans la boundary Suspense pour garder le shell partagé. */
export async function ProfileTabContent({
	searchParams,
}: {
	searchParams: Promise<{ tab?: string | string[] }>;
}) {
	const { tab } = await searchParams;

	return <ProfileContent initialTab={parseProfileTab(tab)} />;
}
