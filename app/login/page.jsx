import MainLayout from "@/components/layout/MainLayout";
import LoginFormContent from "@/components/LoginForm";

export const metadata = {
    title: "Login, Advertising Club Madras – Member Access & Dashboard",
    description: "Secure member login to Advertising Club Madras. Access your dashboard, events, registrations, resources, and exclusive member benefits in one place.",
};

export default function LoginPage() {
    return (
        <MainLayout>
            <LoginFormContent />
        </MainLayout>
    );
}
