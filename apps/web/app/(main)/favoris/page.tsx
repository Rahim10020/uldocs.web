import type { Metadata } from "next";
import { FavoritesContent } from "./components/favorites-content";

export const metadata: Metadata = {
  title: "Enregistrés — ulDocs",
  description: "Retrouve les documents que tu as enregistrés sur ulDocs.",
};

export default function FavoritesPage() {
  return <FavoritesContent />;
}
