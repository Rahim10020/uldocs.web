"use client";

import { FileStack } from "lucide-react";
import type { DocumentsQuery } from "../../components/profile-document-grid";
import { ProfileDocumentGrid } from "../../components/profile-document-grid";

/** Documents validés publiés par l'utilisateur consulté. */
export function PublicProfileDocuments({
	query,
	page,
	onPageChange,
}: {
	query: DocumentsQuery;
	page: number;
	onPageChange: (page: number) => void;
}) {
	const count = query.data?.total ?? 0;

	return (
		<section aria-labelledby="public-profile-documents" className="mt-10">
			<div className="flex gap-6 overflow-x-auto border-b border-black-10">
				<h2
					id="public-profile-documents"
					className="shrink-0 border-b-2 border-black pb-3 text-sm font-semibold text-black"
				>
					Documents publiés{" "}
					<span className="font-normal text-black-50">({count})</span>
				</h2>
			</div>

			<div className="mt-6">
				<ProfileDocumentGrid
					query={query}
					page={page}
					onPageChange={onPageChange}
					emptyState={{
						icon: FileStack,
						title: "Aucun document publié",
						description:
							"Cet utilisateur n'a pas encore partagé de document sur ulDocs.",
					}}
				/>
			</div>
		</section>
	);
}
