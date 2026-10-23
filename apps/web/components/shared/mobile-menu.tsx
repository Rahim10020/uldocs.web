"use client";

import { Menu, Upload, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { MOBILE_NAV_LINKS } from "@/lib/navigation";
import { routes } from "@/lib/routes";

/** Bouton hamburger et tiroir de navigation mobile. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (pathname) {
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative z-20 flex size-10 shrink-0 items-center justify-center rounded-md text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40 lg:hidden"
      >
        {open ? (
          <X aria-hidden className="size-6" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-0 z-10 bg-black-60 lg:hidden"
          />
          <aside
            id={panelId}
            aria-label="Navigation mobile"
            className="fixed bottom-0 left-0 top-0 z-20 flex w-[min(20rem,85vw)] flex-col overflow-y-auto bg-white pb-6 shadow-lg lg:hidden"
          >
            <div className="shrink-0 bg-surface border-b border-black-30">
              <div className="flex items-center justify-between px-4 h-14">
                <Link
                  href={routes.home}
                  onClick={closeMenu}
                  aria-label="ulDocs — Accueil"
                >
                  <Image
                    src="/logo.svg"
                    alt="ulDocs"
                    width={92}
                    height={25}
                    unoptimized
                    className="h-4 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={closeMenu}
                  className="flex size-9 items-center justify-center rounded-md text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                >
                  <X aria-hidden className="size-6" />
                </button>
              </div>
            </div>

            <div className="px-4">
              <div className="flex flex-col gap-2 border-b border-black-30 py-6">
                <ButtonLink
                  href={routes.newDocument}
                  onClick={closeMenu}
                  className="w-full"
                >
                  Contribuer
                </ButtonLink>
                <Link
                  href={routes.login}
                  onClick={closeMenu}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xs border border-black-20 bg-white px-6 text-base font-semibold text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                >
                  <UserRound aria-hidden className="size-4" />
                  Se connecter
                </Link>
              </div>

              <nav className="flex flex-col gap-2 py-2">
                {MOBILE_NAV_LINKS.slice(0, 1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-2 text-lg font-medium text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={routes.newDocument}
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                >
                  <Upload aria-hidden className="size-5" />
                  Importer
                </Link>
                {MOBILE_NAV_LINKS.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-2 text-lg font-medium text-black transition-colors hover:bg-black-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-40"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
