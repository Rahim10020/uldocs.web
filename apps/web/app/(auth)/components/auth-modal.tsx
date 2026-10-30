"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAppShellInert } from "@/hooks/use-app-shell-inert";

/**
 * Voile de la modale interceptée. Le contenu reste une carte `AuthDialog`.
 * Le voile couvre tout le viewport, header compris. Sur mobile, la carte est
 * plein écran.
 */
export function AuthModal({ children }: { children: ReactNode }) {
	const router = useRouter();
	useAppShellInert(true);

	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center bg-white lg:bg-black-40 lg:p-6 lg:backdrop-blur-sm">
			<button
				type="button"
				aria-hidden="true"
				tabIndex={-1}
				onMouseDown={(event) => event.preventDefault()}
				onClick={() => router.back()}
				className="absolute inset-0 hidden cursor-default bg-transparent lg:block"
			/>
			<div className="relative z-10 flex w-full justify-center">{children}</div>
		</div>
	);
}
