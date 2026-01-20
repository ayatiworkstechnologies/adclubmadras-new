import MainLayout from "@/components/layout/MainLayout";
import MembershipRenewalForm from "@/components/MembershipReNewForm";

export const metadata = {
    title: "Membership Renewal | Ad Club Madras",
    description: "Renew your Ad Club Madras membership.",
};

export default function MembershipRenewalPage() {
    return (
        <MainLayout>
            <MembershipRenewalForm />
        </MainLayout>
    );
}
