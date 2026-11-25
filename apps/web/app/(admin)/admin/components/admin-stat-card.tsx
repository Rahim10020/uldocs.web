import type { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

type StatTone = "primary" | "success" | "warning" | "error" | "neutral";

const ICON_TONES: Record<StatTone, string> = {
	primary: "bg-primary-10 text-primary",
	success: "bg-black-5 text-success",
	warning: "bg-black-5 text-warning",
	error: "bg-black-5 text-error",
	neutral: "bg-black-5 text-black-60",
};

const DETAIL_TONES: Record<StatTone, string> = {
	primary: "text-primary",
	success: "text-success",
	warning: "text-warning",
	error: "text-error",
	neutral: "text-black-50",
};

/** Carte de statistique du tableau de bord admin. */
export function AdminStatCard({
	label,
	value,
	detail,
	tone = "primary",
	icon: Icon,
}: {
	label: string;
	value: number;
	detail: string;
	tone?: StatTone;
	icon: LucideIcon;
}) {
	return (
		<div className="rounded-xl border border-black-10 bg-white p-5">
			<div className="flex items-start justify-between gap-3">
				<p className="text-sm font-medium text-black-60">{label}</p>
				<span
					className={cn(
						"flex size-9 shrink-0 items-center justify-center rounded-lg",
						ICON_TONES[tone],
					)}
				>
					<Icon aria-hidden className="size-5" />
				</span>
			</div>
			<p className="mt-3 text-3xl font-bold tracking-tight text-black">
				{formatNumber(value)}
			</p>
			<p className={cn("mt-1 text-sm font-medium", DETAIL_TONES[tone])}>
				{detail}
			</p>
		</div>
	);
}
