"use client";

import { ChevronDown } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type AuthSelectOption = {
	value: string;
	label: string;
};

type AuthSelectProps = {
	label: string;
	value: string;
	options: AuthSelectOption[];
	onChange: (value: string) => void;
	placeholder: string;
	disabled?: boolean;
	error?: string;
	className?: string;
};

/** Select natif stylé pour les étapes d'onboarding. */
export function AuthSelect({
	label,
	value,
	options,
	onChange,
	placeholder,
	disabled,
	error,
	className,
}: AuthSelectProps) {
	const id = useId();
	const errorId = `${id}-error`;

	return (
		<div className={cn("w-full", className)}>
			<label
				htmlFor={id}
				className="mb-2 block text-sm font-semibold text-black"
			>
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					disabled={disabled}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? errorId : undefined}
					className={cn(
						"h-12 w-full appearance-none rounded-md border border-black-30 bg-white px-4 pr-10 text-md text-black outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-black-5 disabled:text-black-50",
						!value && "text-black-50",
						error && "border-error focus:border-error",
					)}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown
					aria-hidden
					className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black-50"
				/>
			</div>
			{error ? (
				<p id={errorId} className="mt-1.5 text-sm text-error">
					{error}
				</p>
			) : null}
		</div>
	);
}
