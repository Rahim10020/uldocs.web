import { Award, Download, FileUp, Flame, type LucideIcon } from "lucide-react";
import type { ProfileBadge, ProfileBadgeIcon } from "@/lib/mocks/profile";

const BADGE_ICONS: Record<ProfileBadgeIcon, LucideIcon> = {
	upload: FileUp,
	trending: Flame,
	downloads: Download,
};

/** Badges de contribution affichés sur le profil. */
export function ProfileBadges({ badges }: { badges: ProfileBadge[] }) {
	return (
		<section
			aria-labelledby="profile-badges-title"
			className="rounded-md border border-black-10 bg-surface p-4 sm:p-5"
		>
			<div className="flex items-center gap-2">
				<Award aria-hidden className="size-4 text-primary" />
				<h2
					id="profile-badges-title"
					className="text-sm font-semibold text-black"
				>
					Badges
				</h2>
			</div>

			<ul className="mt-3 flex flex-wrap gap-2">
				{badges.map((badge) => {
					const Icon = BADGE_ICONS[badge.icon];

					return (
						<li
							key={badge.id}
							className="inline-flex items-center gap-1.5 rounded-full border border-black-10 bg-white py-1 pr-3 pl-1.5 text-xs font-medium text-black-80"
						>
							<span className="flex size-5 items-center justify-center rounded-full bg-surface text-primary">
								<Icon aria-hidden className="size-3" />
							</span>
							{badge.label}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
