"use client";

import { useEffect } from "react";

export default function AdminRedirectPage() {
    useEffect(() => {
        window.location.href = "https://admin.adclubmadras.com/admin/acm/console/login";
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <p>Redirecting to Admin Panel...</p>
        </div>
    );
}
