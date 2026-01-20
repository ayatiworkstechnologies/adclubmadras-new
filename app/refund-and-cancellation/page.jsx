import MainLayout from "@/components/layout/MainLayout";
import RefundPolicyContent from "@/components/pages/Legal/RefundandCancellation";

export const metadata = {
    title: "Refund & Cancellation Policy | Ad Club Madras",
    description: "Read the refund and cancellation policy of Ad Club Madras.",
};

export default function RefundCancellationPage() {
    return (
        <MainLayout>
            <RefundPolicyContent />
        </MainLayout>
    );
}
