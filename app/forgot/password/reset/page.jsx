import React, { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ForgotPasswordContent from "@/components/pages/Auth/ForgotPassword";

export const metadata = {
    title: "Reset Password | Ad Club Madras",
    description: "Reset your Ad Club Madras account password.",
};

export default function ForgotPasswordPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <ForgotPasswordContent />
            </Suspense>
        </MainLayout>
    );
}
