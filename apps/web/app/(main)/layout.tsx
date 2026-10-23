import type { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main className="flex-1 overflow-x-clip">{children}</main>
			<Footer />
		</>
	);
}
