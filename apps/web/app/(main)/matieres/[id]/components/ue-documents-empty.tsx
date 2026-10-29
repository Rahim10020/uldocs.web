import { Button, ButtonLink } from "@/components/ui/button";
import { routes } from "@/lib/routes";

/** État vide de la page UE. */
export function UeDocumentsEmpty({
	hasFilters,
	onReset,
}: {
	hasFilters: boolean;
	onReset: () => void;
}) {
	return (
		<div className="mt-20 flex flex-col items-center text-center sm:mt-24">
			<p className="text-xl font-semibold text-black sm:text-2xl">
				{hasFilters
					? "Aucun document ne correspond à ces filtres."
					: "Aucun document dans cette UE."}
			</p>
			{hasFilters ? (
				<p className="mt-2 text-sm text-black-60">
					Modifiez ou réinitialisez les filtres pour voir plus de résultats.
				</p>
			) : null}

			<div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
				{hasFilters ? (
					<Button variant="secondary" onClick={onReset}>
						Réinitialiser les filtres
					</Button>
				) : null}
				<ButtonLink href={routes.newDocument}>Contribuer</ButtonLink>
			</div>
		</div>
	);
}
