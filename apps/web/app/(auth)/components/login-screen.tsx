"use client";

import { useRouter } from "next/navigation";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { LoginForm } from "@/app/(auth)/components/login-form";
import { routes } from "@/lib/routes";

export function LoginScreen({ mode }: { mode: "modal" | "page" }) {
  const router = useRouter();

  const close = () => {
    if (mode === "modal") {
      router.back();
      return;
    }

    router.push(routes.home);
  };

  return (
    <AuthDialog
      title="Content de te revoir !"
      description="Connecte-toi pour retrouver tes documents, tes favoris et tes imports."
      image
      onClose={close}
    >
      <LoginForm onSuccess={close} mode={mode} />
    </AuthDialog>
  );
}
