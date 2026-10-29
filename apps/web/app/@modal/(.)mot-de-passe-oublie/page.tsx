import { AuthModal } from "@/app/(auth)/components/auth-modal";
import { ForgotPasswordScreen } from "@/app/(auth)/components/forgot-password-screen";

export default function ForgotPasswordModalPage() {
	return (
		<AuthModal>
			<ForgotPasswordScreen mode="modal" />
		</AuthModal>
	);
}
