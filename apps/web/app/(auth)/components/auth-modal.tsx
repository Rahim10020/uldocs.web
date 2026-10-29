"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Voile de la modale interceptée. Le contenu reste une carte `AuthDialog`.
 * Sur mobile, la carte est plein écran et couvre le header.
 */
export function AuthModal({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center bg-white lg:inset-x-0 lg:bottom-0 lg:top-14 lg:z-40 lg:bg-black-40 lg:p-6 lg:backdrop-blur-sm">
			<button
				type="button"
				aria-label="Fermer"
				onClick={() => router.back()}
				className="absolute inset-0 hidden cursor-default bg-transparent lg:block"
			/>
			<div className="relative z-10 flex w-full justify-center">{children}</div>
		</div>
	);
}
