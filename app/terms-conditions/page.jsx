import MainLayout from "@/components/layout/MainLayout";
import TermsConditionsContent from "@/components/pages/Legal/TermsandConditions";

export const metadata = {
    title: "Terms & Conditions | Ad Club Madras",
    description: "Read the terms and conditions of Ad Club Madras.",
};

export default function TermsConditionsPage() {
    return (
        <MainLayout>
            <TermsConditionsContent />
        </MainLayout>
    );
}
