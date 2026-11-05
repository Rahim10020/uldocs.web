import { Pencil } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { routes } from "@/lib/routes";

type ProfileHeaderUser = {
	nom: string;
	avatarUrl: string | null;
};

type ProfileHeaderProps = {
	user: ProfileHeaderUser;
	academicLabel: string | null;
	isAcademicLoading: boolean;
	rank: { position: number; totalContributors: number };
	/** Masque les actions réservées au propriétaire du profil. */
	editable?: boolean;
};

/** En-tête du profil : identité, cursus et actions du propriétaire. */
export function ProfileHeader({
	user,
	academicLabel,
	isAcademicLoading,
	rank,
	editable = true,
}: ProfileHeaderProps) {
	return (
		<section className="flex items-start justify-between gap-4">
			<div className="flex min-w-0 items-start gap-4">
				<UserAvatar
					nom={user.nom}
					className="size-16 text-xl sm:size-20 sm:text-2xl"
				/>
				<div className="min-w-0">
					<h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
						{user.nom}
					</h1>
					{academicLabel ? (
						<p className="mt-1 text-sm text-black-60 sm:text-base">
							{academicLabel}
						</p>
					) : editable && !isAcademicLoading ? (
						<Link
							href={routes.profileEdit}
							className="mt-1 inline-block text-sm font-medium text-primary hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
						>
							Complète tes informations académiques
						</Link>
					) : null}
					<p className="mt-1 text-xs text-black-50 sm:text-sm">
						#{rank.position} sur {rank.totalContributors} contributeurs
					</p>
				</div>
			</div>

			{editable ? (
				<ButtonLink
					href={routes.profileEdit}
					variant="secondary"
					size="sm"
					className="shrink-0"
				>
					<Pencil aria-hidden className="size-4" />
					<span className="hidden sm:inline">Modifier</span>
				</ButtonLink>
			) : null}
		</section>
	);
}
