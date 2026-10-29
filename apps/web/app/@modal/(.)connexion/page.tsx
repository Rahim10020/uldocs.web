import { AuthModal } from "@/app/(auth)/components/auth-modal";
import { LoginScreen } from "@/app/(auth)/components/login-screen";

export default function LoginModalPage() {
  return (
    <AuthModal>
      <LoginScreen mode="modal" />
    </AuthModal>
  );
}
