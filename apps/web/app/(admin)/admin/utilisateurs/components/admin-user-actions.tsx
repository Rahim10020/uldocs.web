"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { AdminUserListItem } from "shared";
import {
	ADMIN_USER_ACTION_LABELS,
	type AdminUserActionKind,
} from "@/lib/admin-users";

export function AdminUserActions({
	user,
	currentUserId,
	onAction,
}: {
	user: AdminUserListItem;
	currentUserId: number | null;
	onAction: (action: AdminUserActionKind) => void;
}) {
	const [open, setOpen] = useState(false);
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const protectedAccount = user.id === currentUserId || user.role === "admin";
	const actions: AdminUserActionKind[] =
		user.statut === "actif"
			? [
					...(user.role === "etudiant" ? (["promote"] as const) : []),
					"suspend",
					"ban",
				]
			: user.statut === "suspendu"
				? ["reactivate", "ban"]
				: [];

	useEffect(() => {
		if (!open) {
			return;
		}

		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
			}
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	if (protectedAccount || actions.length === 0) {
		return (
			<span className="text-black-40">
				—<span className="sr-only">Aucune action disponible</span>
			</span>
		);
	}

	return (
		<div ref={containerRef} className="relative flex justify-end">
			<button
				ref={triggerRef}
				type="button"
				aria-label={`Actions pour ${user.nom}`}
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((value) => !value)}
				className="flex size-9 cursor-pointer items-center justify-center rounded-full text-black-60 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
			>
				<MoreHorizontal aria-hidden className="size-5" />
			</button>

			{open ? (
				<div
					id={menuId}
					className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-black-10 bg-white p-1 shadow-lg"
				>
					{actions.map((action) => (
						<button
							key={action}
							type="button"
							onClick={() => {
								setOpen(false);
								onAction(action);
							}}
							className={`flex min-h-10 w-full cursor-pointer items-center rounded-md px-3 text-left text-sm transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 ${
								action === "ban" ? "text-error" : "text-black-80"
							}`}
						>
							{ADMIN_USER_ACTION_LABELS[action]}
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}
