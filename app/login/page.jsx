import MainLayout from "@/components/layout/MainLayout";
import LoginFormContent from "@/components/LoginForm";

export const metadata = {
    title: "Member Login | Ad Club Madras",
    description: "Login to your Ad Club Madras member account.",
};

export default function LoginPage() {
    return (
        <MainLayout>
            <LoginFormContent />
        </MainLayout>
    );
}
