import { formatCount } from "@/lib/format";

type ProfileStatsProps = {
	documents: number;
	points: number;
	views: number;
};

/** Compteurs clés du profil : documents, points et vues cumulées. */
export function ProfileStats({ documents, points, views }: ProfileStatsProps) {
	const stats = [
		{ label: "Documents", value: documents },
		{ label: "Points", value: points },
		{ label: "Vues", value: views },
	];

	return (
		<dl className="grid grid-cols-3 gap-3 sm:gap-4">
			{stats.map((stat) => (
				<div
					key={stat.label}
					className="flex flex-col-reverse rounded-md border border-black-10 bg-white px-3 py-4 text-center"
				>
					<dt className="mt-1 text-xs font-medium text-black-60 sm:text-sm">
						{stat.label}
					</dt>
					<dd className="text-xl font-bold text-black sm:text-2xl">
						{formatCount(stat.value)}
					</dd>
				</div>
			))}
		</dl>
	);
}
