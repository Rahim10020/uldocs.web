"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { routes } from "@/lib/routes";

/** Menu d'authentification du header desktop. */
export function DesktopAccountMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLFieldSetElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <fieldset
      ref={containerRef}
      className="relative"
      aria-label="Actions de connexion"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-md font-semibold text-black-80 transition-colors hover:bg-black-5 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
      >
        <UserRound aria-hidden className="size-4" />
        Se connecter
      </button>

      {open ? (
        <div
          id={menuId}
          className="absolute right-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-md border border-black-10 bg-white shadow-lg"
        >
          <p className="border-b border-black-10 px-5 py-4 text-center text-base font-semibold text-black">
            Bienvenue sur ulDocs !
          </p>
          <nav aria-label="Authentification" className="flex flex-col p-2">
            <Link
              href={routes.login}
              className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
            >
              <UserRound aria-hidden className="size-4" />
              Se connecter
            </Link>
            <Link
              href={routes.register}
              className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
            >
              <UserRound aria-hidden className="size-4" />
              Créer un compte
            </Link>
          </nav>
        </div>
      ) : null}
    </fieldset>
  );
}
