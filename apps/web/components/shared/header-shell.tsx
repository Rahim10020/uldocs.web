"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

const DOCUMENT_DETAIL_PATH = /^\/documents\/\d+$/;

/** Aligne le header sur la largeur fluide de la fiche document. */
export function HeaderShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const fluid = DOCUMENT_DETAIL_PATH.test(pathname);

  return (
    <Container className={className} fluid={fluid}>
      {children}
    </Container>
  );
}
