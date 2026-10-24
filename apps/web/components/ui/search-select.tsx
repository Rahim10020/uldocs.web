import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchSelectOption = {
  value: string;
  label: string;
};

/** Select natif stylé, utilisé par la barre de filtres et la feuille mobile. */
export function SearchSelect({
  label,
  value,
  options,
  onChange,
  className,
  allLabel,
  disabled,
}: {
  label: string;
  value: string;
  options: SearchSelectOption[];
  onChange: (value: string) => void;
  className?: string;
  /** Libellé de l'option vide. Par défaut, le nom du filtre. */
  allLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-10 w-full cursor-pointer appearance-none truncate rounded border border-black-40 bg-white pl-3 pr-9 text-sm text-black transition-colors focus:border-black-90 focus:outline-none focus:ring focus:ring-black-90 disabled:cursor-not-allowed disabled:opacity-50",
          value ? "font-medium" : "text-black-80",
        )}
      >
        <option value="">{allLabel ?? label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-black-60"
      />
    </div>
  );
}
