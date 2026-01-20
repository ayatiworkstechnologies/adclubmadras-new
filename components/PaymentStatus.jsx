"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const result = searchParams.get("status");
    const name = searchParams.get("name");
    const amount = searchParams.get("amount");
    const txnid = searchParams.get("txnid");

    setStatus({
      result,
      name,
      amount,
      txnid,
    });
  }, [searchParams]);

  if (!status) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Checking payment status...</p>
      </div>
    );
  }

  const isSuccess = status.result === "success";

  return (
    <div className="min-h-screen flex items-center  justify-center bg-black px-4 text-white">
      <div className="bg-zinc-900 shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        {/* ✅ Lottie Animation */}
        <div className="flex justify-center">
          {isSuccess ? (
            <div className="w-80 h-80">
              <DotLottieReact
                src="https://lottie.host/d990339d-6fc0-45e3-8c98-ef3128cbc82e/uSWZCcqzhw.lottie"
                autoplay
                loop={false}
              />
            </div>
          ) : (
            <div className="w-80 h-80">
              <DotLottieReact
                src="https://lottie.host/5fad6fac-f11a-418c-bf78-35ab555280ee/oMclflznh8.lottie"
                autoplay
                loop={true}
              />
            </div>
          )}
        </div>

        {/* ✅ Payment Status Heading */}
        <h2
          className={`text-3xl font-bold mb-4 ${isSuccess ? "text-green-400" : "text-red-400"
            }`}
        >
          {isSuccess ? "Payment Successful" : "Payment Failed"}
        </h2>

        {/* ✅ Details */}
        {isSuccess ? (
          <>
            <p className="text-gray-300 mb-2">Thank you, {status.name}!</p>
            <p className="text-gray-400 mb-2">
              Transaction ID: <strong>{status.txnid}</strong>
            </p>
            <p className="text-gray-400 mb-4">
              Amount Paid: ₹<strong>{status.amount}</strong>
            </p>
            <div className="text-green-400 font-semibold">
              Your registration has been confirmed.
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-400 mb-4">
              Sorry, your payment could not be completed.
            </p>
            <div className="text-red-400 font-semibold">
              Please try again or contact support.
            </div>
          </>
        )}

        {/* ✅ Button */}
        <a
          href="/"
          className="mt-6 inline-block bg-primary/80 hover:bg-primary text-white font-semibold py-2 px-6 rounded transition duration-200"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
