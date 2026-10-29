import type { ReactNode } from "react";
import { Header } from "@/components/shared/header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-white">
      <div className="hidden lg:block">
        <Header />
      </div>
      <main className="flex min-h-dvh items-center justify-center lg:min-h-[calc(100dvh-3.5rem)] lg:px-6 lg:py-10">
        {children}
      </main>
    </div>
  );
}
