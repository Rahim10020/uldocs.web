"use client";

import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
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
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
};

const MENU_MAX_HEIGHT = 224;
const OPTION_HEIGHT = 40;

function getShouldOpenUp(
  trigger: HTMLButtonElement | null,
  optionCount: number,
) {
  if (!trigger) {
    return false;
  }

  const rect = trigger.getBoundingClientRect();
  const menuHeight = Math.min(
    MENU_MAX_HEIGHT,
    Math.max(optionCount, 1) * OPTION_HEIGHT + 8,
  );
  const dialog = trigger.closest('[role="dialog"]');
  const boundary = dialog?.getBoundingClientRect();
  const spaceBelow = (boundary?.bottom ?? window.innerHeight) - rect.bottom;
  const spaceAbove = rect.top - (boundary?.top ?? 0);

  return spaceBelow < menuHeight && spaceAbove > spaceBelow;
}

/** Select personnalisé pour les étapes d'onboarding et d'import. */
export function AuthSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  disabled,
  error,
  required,
  autoFocus,
  className,
}: AuthSelectProps) {
  const labelId = useId();
  const triggerId = useId();
  const valueId = `${triggerId}-value`;
  const listboxId = useId();
  const errorId = `${triggerId}-error`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption =
    selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const resolvedActiveIndex =
    options.length === 0 ? -1 : Math.min(activeIndex, options.length - 1);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (!autoFocus || disabled) {
      return;
    }

    triggerRef.current?.focus();
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePlacement() {
      setOpenUp(getShouldOpenUp(triggerRef.current, options.length));
    }

    window.addEventListener("resize", updatePlacement);
    document.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      document.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open || resolvedActiveIndex < 0) {
      return;
    }

    const listbox = listboxRef.current;
    const option =
      listbox?.querySelectorAll<HTMLElement>('[role="option"]')[
        resolvedActiveIndex
      ];

    if (!listbox || !option) {
      return;
    }

    const optionTop = option.offsetTop;
    const optionBottom = optionTop + option.offsetHeight;
    const visibleBottom = listbox.scrollTop + listbox.clientHeight;

    if (optionTop < listbox.scrollTop) {
      listbox.scrollTop = optionTop;
    } else if (optionBottom > visibleBottom) {
      listbox.scrollTop = optionBottom - listbox.clientHeight;
    }
  }, [open, resolvedActiveIndex]);

  function openList() {
    if (disabled) {
      return;
    }

    setActiveIndex(Math.max(selectedIndex, 0));
    setOpenUp(getShouldOpenUp(triggerRef.current, options.length));
    setOpen(true);
  }

  function selectOption(option: AuthSelectOption) {
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function selectActiveOption() {
    if (resolvedActiveIndex < 0) {
      return;
    }

    selectOption(options[resolvedActiveIndex]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }

    if (!open) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openList();
      }

      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) =>
          Math.min(Math.max(current, 0) + 1, Math.max(options.length - 1, 0)),
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) => Math.max(Math.max(current, 0) - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(Math.max(options.length - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectActiveOption();
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  const activeOptionId =
    open && resolvedActiveIndex >= 0
      ? `${listboxId}-option-${resolvedActiveIndex}`
      : undefined;

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <span
        id={labelId}
        className="mb-2 block text-sm font-semibold text-black"
      >
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </span>

      <div className="relative">
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-describedby={error ? errorId : undefined}
          aria-activedescendant={activeOptionId}
          aria-invalid={Boolean(error)}
          aria-required={required}
          data-auth-select
          disabled={disabled}
          onClick={() => {
            if (open) {
              setOpen(false);
              return;
            }

            openList();
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-12 cursor-pointer w-full items-center justify-between gap-3 rounded-md border border-black-30 bg-white px-4 text-left text-md text-black outline-none transition-colors hover:border-black-40 focus:border-primary disabled:cursor-not-allowed disabled:bg-black-5 disabled:text-black-50",
            !selectedOption && "text-black-50",
            error && "border-error focus:border-error",
          )}
        >
          <span id={valueId} className="truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-black-50 transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open ? (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            className={cn(
              "absolute left-0 right-0 z-50 max-h-56 overflow-y-auto rounded-md border border-black-20 bg-white py-1 shadow-lg",
              openUp ? "bottom-[calc(100%+4px)]" : "top-[calc(100%+4px)]",
            )}
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-black-50">
                Aucune option disponible.
              </div>
            ) : (
              options.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === resolvedActiveIndex;

                return (
                  <div
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    tabIndex={-1}
                    aria-selected={isSelected}
                    onClick={() => selectOption(option)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectOption(option);
                      }
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors",
                      isActive ? "bg-primary-5 text-black" : "text-black-70",
                      isSelected && "font-semibold text-black",
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected ? (
                      <Check
                        aria-hidden
                        className="size-4 shrink-0 text-primary"
                      />
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
