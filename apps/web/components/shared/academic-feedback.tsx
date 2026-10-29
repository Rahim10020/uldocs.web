import { FileQuestion } from "lucide-react";
import type { Route } from "next";
import { Button, ButtonLink } from "@/components/ui/button";

/** Panneau d'erreur simple pour les pages académiques. */
export function ErrorPanel({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<div className="mt-10 rounded-md border border-black-10 bg-surface p-8 text-center">
			<p className="text-sm text-black-70">{message}</p>
			<Button variant="secondary" className="mt-4" onClick={onRetry}>
				Réessayer
			</Button>
		</div>
	);
}

/** État affiché lorsqu'un id académique n'existe pas. */
export function AcademicNotFound({
	title,
	message,
	href,
	linkLabel,
}: {
	title: string;
	message: string;
	href: Route;
	linkLabel: string;
}) {
	return (
		<div className="mx-auto mt-16 flex max-w-xl flex-col items-center text-center">
			<FileQuestion aria-hidden className="size-10 text-black-30" />
			<h1 className="mt-4 text-2xl font-bold text-black">{title}</h1>
			<p className="mt-2 text-sm text-black-60">{message}</p>
			<ButtonLink href={href} variant="secondary" className="mt-6">
				{linkLabel}
			</ButtonLink>
		</div>
	);
}
