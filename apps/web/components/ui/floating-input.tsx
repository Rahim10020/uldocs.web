import {
	forwardRef,
	type InputHTMLAttributes,
	type ReactNode,
	useId,
} from "react";
import { cn } from "@/lib/utils";

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
	trailing?: ReactNode;
	containerClassName?: string;
};

/** Champ texte avec libellé flottant au focus ou quand une valeur est saisie. */
export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
	function FloatingInput(
		{
			id,
			label,
			error,
			trailing,
			className,
			containerClassName,
			required,
			...props
		},
		ref,
	) {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const errorId = `${inputId}-error`;

		return (
			<div className={cn("w-full", containerClassName)}>
				<div className="relative">
					<input
						ref={ref}
						id={inputId}
						required={required}
						aria-invalid={Boolean(error)}
						aria-describedby={error ? errorId : undefined}
						placeholder=" "
						className={cn(
							"peer h-12 w-full rounded-md border border-black-30 bg-white px-4 text-md text-black outline-none transition-colors placeholder:text-transparent focus:border-primary disabled:cursor-not-allowed disabled:bg-black-5",
							error && "border-error focus:border-error",
							trailing ? "pr-12" : "",
							className,
						)}
						{...props}
					/>
					<label
						htmlFor={inputId}
						className={cn(
							"pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-md text-black-60 transition-all",
							"peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary",
							"peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs",
							error && "text-error peer-focus:text-error",
						)}
					>
						{label}
						{required ? <span aria-hidden> *</span> : null}
					</label>
					{trailing}
				</div>
				{error ? (
					<p id={errorId} className="mt-1.5 text-sm text-error">
						{error}
					</p>
				) : null}
			</div>
		);
	},
);
