"use client";

import OTPVerificationForm from "@/components/auth/OTPVerificationForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const phone = searchParams.get("phone");
    if (phone) {
      setPhoneNumber(phone);
    } else {
      router.push("/sign-up");
    }
  }, [searchParams, router]);

  const handleVerify = async (otpCode) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/");
  };

  const handleResend = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    alert("OTP sent successfully!");
  };

  if (!phoneNumber) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
          <p className="text-sm text-gray-500 mt-2">
            If you don't have a phone number, you'll be redirected to sign-up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <OTPVerificationForm
      phoneNumber={phoneNumber}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}

const VerifyOTPPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTPPage;
