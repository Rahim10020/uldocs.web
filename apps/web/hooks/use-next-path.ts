"use client";

import type { Route } from "next";
import { useEffect, useState } from "react";
import { getSafeNextPath } from "@/lib/next-path";

/** Destination interne demandée après connexion ou inscription. */
export function useNextPath(): Route | null {
	const [nextPath, setNextPath] = useState<Route | null>(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setNextPath(getSafeNextPath(params.get("next")) as Route | null);
	}, []);

	return nextPath;
}
