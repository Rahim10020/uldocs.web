"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useOpenReportsCount } from "@/hooks/use-open-reports-count";
import { routes } from "@/lib/routes";

/** Cloche admin : nombre de signalements ouverts, vers la modération. */
export function AdminNotifications() {
	const { data } = useOpenReportsCount();
	const count = data ?? 0;
	const hasPending = count > 0;

	return (
		<Link
			href={routes.adminModeration}
			aria-label={
				hasPending
					? `${count} signalement${count > 1 ? "s" : ""} en attente`
					: "Aucun signalement en attente"
			}
			className="relative flex size-9 items-center justify-center rounded-md text-black-70 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
		>
			<Bell aria-hidden className="size-5" />
			{hasPending ? (
				<span
					aria-hidden
					className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold leading-4 text-white"
				>
					{count > 9 ? "9+" : count}
				</span>
			) : null}
		</Link>
	);
}
