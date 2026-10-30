"use client";

import { useEffect } from "react";

const APP_SHELL_ID = "app-shell";

let lockCount = 0;
let previousFocus: HTMLElement | null = null;

/**
 * Rend le shell applicatif inerte pendant qu'une modale est ouverte.
 * Le focus est mémorisé au premier verrou puis restauré au dernier déverrouillage.
 */
export function useAppShellInert(active: boolean): void {
	useEffect(() => {
		if (!active) {
			return;
		}

		const appShell = document.getElementById(APP_SHELL_ID);

		if (!appShell) {
			return;
		}

		if (lockCount === 0) {
			previousFocus = document.activeElement as HTMLElement | null;
			appShell.setAttribute("inert", "");
		}

		lockCount += 1;

		return () => {
			lockCount = Math.max(0, lockCount - 1);

			if (lockCount === 0) {
				appShell.removeAttribute("inert");
				previousFocus?.focus();
				previousFocus = null;
			}
		};
	}, [active]);
}
