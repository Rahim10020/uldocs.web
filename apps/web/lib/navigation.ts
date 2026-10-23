import { routes } from "./routes";

/** Liens du pied de page. */
export const FOOTER_LINKS = [
  { href: routes.charter, label: "Charte de contribution" },
  { href: routes.report, label: "Signaler un problème" },
] as const;

/** Liens du menu mobile (le header desktop n'a pas de navigation secondaire). */
export const MOBILE_NAV_LINKS = [
  { href: routes.documents, label: "Documents" },
  ...FOOTER_LINKS,
] as const;
