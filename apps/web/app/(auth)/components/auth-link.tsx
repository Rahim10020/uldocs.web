"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { AuthMode } from "@/types/auth";

type AuthRoute = "/connexion" | "/inscription" | "/mot-de-passe-oublie";

/**
 * Lien entre écrans d'authentification.
 * En mode page, une navigation complète évite d'empiler une modale interceptée
 * au-dessus de la page courante. En mode modale, le Link Next.js intercepte.
 */
export function AuthLink({
	href,
	mode,
	children,
	className,
	onClick,
}: {
	href: AuthRoute;
	mode: AuthMode;
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	if (mode === "page") {
		return (
			<a href={href} className={className} onClick={onClick}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className} onClick={onClick}>
			{children}
		</Link>
	);
}
