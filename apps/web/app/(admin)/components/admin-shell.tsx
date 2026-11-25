"use client";

import type { ReactNode } from "react";
import { useSession } from "@/hooks/use-session";
import { AdminAccess } from "./admin-access";
import { AdminHeader } from "./admin-header";
import { AdminShellSkeleton } from "./admin-shell-skeleton";
import { AdminSidebar } from "./admin-sidebar";

/** Garde d'accès et structure commune des pages d'administration. */
export function AdminShell({ children }: { children: ReactNode }) {
	const { user, isLoading, isAdmin } = useSession();

	if (isLoading) {
		return <AdminShellSkeleton />;
	}

	if (!isAdmin) {
		return <AdminAccess authenticated={Boolean(user)} />;
	}

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-surface">
			<AdminHeader />
			<div className="flex min-h-0 flex-1 overflow-hidden">
				<AdminSidebar />
				<main className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
					{children}
				</main>
			</div>
		</div>
	);
}
