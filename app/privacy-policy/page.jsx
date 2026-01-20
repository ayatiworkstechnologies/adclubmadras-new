import MainLayout from "@/components/layout/MainLayout";
import PrivacyPolicyContent from "@/components/pages/Legal/PrivacyPolicy";

export const metadata = {
    title: "Privacy Policy | Ad Club Madras",
    description: "Read the privacy policy of Ad Club Madras.",
};

export default function PrivacyPolicyPage() {
    return (
        <MainLayout>
            <PrivacyPolicyContent />
        </MainLayout>
    );
}
