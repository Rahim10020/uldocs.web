"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { FloatingInput } from "@/components/ui/floating-input";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  error?: string;
};

/** Champ mot de passe avec bascule de visibilité. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ label, error, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <FloatingInput
        ref={ref}
        label={label}
        error={error}
        type={visible ? "text" : "password"}
        trailing={
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={
              visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
            }
            aria-pressed={visible}
            className="absolute cursor-pointer right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded text-black-50 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
          >
            {visible ? (
              <EyeOff aria-hidden className="size-5" />
            ) : (
              <Eye aria-hidden className="size-5" />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);
