import type { Metadata } from "next";
import { FavoritesContent } from "./components/favorites-content";

export const metadata: Metadata = {
  title: "Favoris — ulDocs",
  description: "Retrouvez les documents que vous avez sauvegardés sur ulDocs.",
};

export default function FavoritesPage() {
  return <FavoritesContent />;
}
