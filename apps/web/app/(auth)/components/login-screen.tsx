"use client";

import { useRouter } from "next/navigation";
import { AuthDialog } from "@/app/(auth)/components/auth-dialog";
import { LoginForm } from "@/app/(auth)/components/login-form";
import { useNextPath } from "@/hooks/use-next-path";
import { routes } from "@/lib/routes";

export function LoginScreen({ mode }: { mode: "modal" | "page" }) {
	const router = useRouter();
	const nextPath = useNextPath();

	const close = () => {
		if (mode === "modal") {
			router.back();
			return;
		}

		router.push(routes.home);
	};

	const finish = () => {
		if (nextPath) {
			router.replace(nextPath);
			return;
		}

		close();
	};

	return (
		<AuthDialog
			title="Content de te revoir !"
			description="Connecte-toi pour retrouver tes documents, tes enregistrements et tes imports."
			image
			onClose={close}
		>
			<LoginForm onSuccess={finish} mode={mode} nextPath={nextPath} />
		</AuthDialog>
	);
}
