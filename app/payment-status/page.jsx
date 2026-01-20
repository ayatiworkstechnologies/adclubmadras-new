import React, { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PaymentStatus from "@/components/PaymentStatus";

export const metadata = {
    title: "Payment Status | Ad Club Madras",
    description: "Check your payment status for Ad Club Madras membership.",
};

export default function PaymentStatusPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentStatus />
            </Suspense>
        </MainLayout>
    );
}
