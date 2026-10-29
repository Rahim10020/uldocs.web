import { AuthModal } from "@/app/(auth)/components/auth-modal";
import { RegisterScreen } from "@/app/(auth)/components/register-screen";

export default function RegisterModalPage() {
  return (
    <AuthModal>
      <RegisterScreen mode="modal" />
    </AuthModal>
  );
}
