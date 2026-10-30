"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { AuthMobileTopBar } from "@/app/(auth)/components/auth-mobile-top-bar";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { cn } from "@/lib/utils";

type AuthDialogProps = {
	title: string;
	description?: string;
	children: ReactNode;
	onClose?: () => void;
	image?: boolean;
	mobileHeader?: ReactNode;
	topContent?: ReactNode;
	className?: string;
	contentClassName?: string;
};

/**
 * Carte d'authentification : deux colonnes sur desktop, plein écran sur mobile.
 * Elle gère le focus initial, Échap et le piège de focus.
 */
export function AuthDialog({
	title,
	description,
	children,
	onClose,
	image = false,
	mobileHeader,
	topContent,
	className,
	contentClassName,
}: AuthDialogProps) {
	const titleId = useId();
	const descriptionId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const onCloseRef = useRef(onClose);

	onCloseRef.current = onClose;
	useBodyScrollLock(true);

	useEffect(() => {
		const previousFocus = document.activeElement as HTMLElement | null;
		const dialog = dialogRef.current;

		const focusTimer = window.setTimeout(() => {
			const firstField = dialog?.querySelector<HTMLElement>(
				"input:not([type='hidden']), select, textarea",
			);

			(firstField ?? closeRef.current)?.focus();
		}, 0);

		function getFocusableElements() {
			if (!dialog) {
				return [];
			}

			return Array.from(
				dialog.querySelectorAll<HTMLElement>(
					"a[href], button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
				),
			).filter((element) => element.offsetParent !== null);
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				event.preventDefault();
				onCloseRef.current?.();
				return;
			}

			if (event.key !== "Tab") {
				return;
			}

			const focusable = getFocusableElements();

			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			window.clearTimeout(focusTimer);
			document.removeEventListener("keydown", handleKeyDown);
			previousFocus?.focus();
		};
	}, []);

	return (
		<div
			ref={dialogRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={description ? descriptionId : undefined}
			className={cn(
				"fixed inset-0 z-60 flex min-h-dvh w-full flex-col overflow-hidden bg-white lg:static lg:z-auto lg:min-h-0 lg:max-h-[calc(100dvh-3rem)] lg:max-w-210 lg:flex-row lg:rounded-lg lg:border lg:border-black-10",
				className,
			)}
		>
			{image ? (
				<div className="relative hidden min-h-125 w-[46%] shrink-0 lg:block">
					<Image
						src="/images/banner.png"
						alt=""
						fill
						priority
						sizes="(min-width: 1024px) 390px, 0px"
						className="object-cover"
					/>
				</div>
			) : null}

			<div className="relative flex min-h-0 w-full flex-1 flex-col">
				{mobileHeader ?? <AuthMobileTopBar />}

				{onClose ? (
					<button
						ref={closeRef}
						type="button"
						onClick={onClose}
						aria-label="Fermer"
						className="absolute cursor-pointer right-4 top-4 z-10 flex size-9 items-center justify-center rounded text-black-50 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
					>
						<X aria-hidden className="size-6" />
					</button>
				) : null}

				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
					<div
						className={cn(
							"flex min-h-full flex-col justify-center px-6 pb-10 pt-4 sm:px-10 lg:justify-start lg:px-10 lg:py-12",
							contentClassName,
						)}
					>
						<div className={cn(image ? "lg:pr-4" : "mx-auto w-full max-w-xl")}>
							{topContent}
							<h1
								id={titleId}
								className="text-3xl font-bold tracking-tight text-black"
							>
								{title}
							</h1>
							{description ? (
								<p
									id={descriptionId}
									className="mt-3 text-md leading-relaxed text-black-60"
								>
									{description}
								</p>
							) : null}

							<div className="mt-8">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
