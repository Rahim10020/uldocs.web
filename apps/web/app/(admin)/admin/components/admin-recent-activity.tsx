"use client";

import { ArrowRight, ScrollText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminAudit } from "@/hooks/use-admin-audit";
import {
	AUDIT_ACTION_ICONS,
	AUDIT_ACTION_LABELS,
	getAuditTargetHref,
} from "@/lib/audit";
import { formatRelativeTime } from "@/lib/format";
import { routes } from "@/lib/routes";

/** Cinq dernières actions du journal d'audit. */
export function AdminRecentActivity() {
	const auditQuery = useAdminAudit({ page: 1, pageSize: 5 });
	const entries = auditQuery.data?.data ?? [];

	return (
		<section className="rounded-xl border border-black-10 bg-white p-5 sm:p-6">
			<div className="flex items-center justify-between gap-3">
				<h2 className="text-lg font-semibold text-black">Dernières actions</h2>
				<Link
					href={routes.adminAudit}
					className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
				>
					Voir le journal
					<ArrowRight aria-hidden className="size-4" />
				</Link>
			</div>

			{auditQuery.isError ? (
				<div className="py-8 text-center">
					<p className="text-sm text-black-60">
						Impossible de charger les actions récentes.
					</p>
					<Button
						variant="secondary"
						size="sm"
						className="mt-3"
						onClick={() => void auditQuery.refetch()}
					>
						Réessayer
					</Button>
				</div>
			) : auditQuery.isPending ? (
				<div className="mt-4 space-y-4">
					{Array.from(
						{ length: 5 },
						(_, index) => `admin-activity-skeleton-${index}`,
					).map((key) => (
						<div key={key} className="flex gap-3">
							<Skeleton className="size-9 shrink-0 rounded-full" />
							<div className="flex-1 space-y-2 py-1">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
					))}
				</div>
			) : entries.length === 0 ? (
				<div className="py-8 text-center">
					<ScrollText aria-hidden className="mx-auto size-6 text-black-40" />
					<p className="mt-3 text-sm text-black-60">
						Aucune action enregistrée pour le moment.
					</p>
				</div>
			) : (
				<ul className="mt-3 divide-y divide-black-10">
					{entries.map((entry) => {
						const Icon = AUDIT_ACTION_ICONS[entry.action];
						const href = getAuditTargetHref(entry);
						const target = entry.cible.libelle ?? "un élément";

						return (
							<li key={entry.id} className="flex gap-3 py-3.5">
								<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black-5 text-black-60">
									<Icon aria-hidden className="size-4" />
								</span>
								<div className="min-w-0">
									<p className="text-sm leading-relaxed text-black-80">
										{entry.acteur ? (
											<Link
												href={routes.profileById(entry.acteur.id)}
												className="font-semibold text-black transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
											>
												{entry.acteur.nom}
											</Link>
										) : (
											<span className="font-semibold text-black">Système</span>
										)}{" "}
										{AUDIT_ACTION_LABELS[entry.action]}{" "}
										{href ? (
											<Link
												href={href}
												className="font-medium text-primary transition-colors hover:text-primary-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
											>
												{target}
											</Link>
										) : (
											<span className="font-medium text-black">{target}</span>
										)}
									</p>
									<p className="mt-1 text-xs text-black-50">
										{formatRelativeTime(entry.dateAction)}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
