import type { Metadata } from "next";
import { CategoriesContent } from "./components/categories-content";

export const metadata: Metadata = {
  title: "Toutes les catégories — ulDocs",
  description:
    "Explorez les facultés, écoles et instituts de l'Université de Lomé.",
};

export default function CategoriesPage() {
  return <CategoriesContent />;
}
