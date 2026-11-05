import type { Metadata } from "next";
import { CharterContent } from "./components/charter-content";

export const metadata: Metadata = {
  title: "Charte de contribution — ulDocs",
  description:
    "Découvre les règles de contribution d'ulDocs et les engagements à respecter pour partager des documents sur la plateforme.",
};

export default function CharterPage() {
  return <CharterContent />;
}
