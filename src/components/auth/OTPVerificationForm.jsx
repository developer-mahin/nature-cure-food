"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const OTPVerificationForm = ({ phoneNumber, onVerify, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      alert("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);
    try {
      await onVerify(otpCode);
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await onResend();
      setTimeLeft(300);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend failed:", error);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Phone</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-gray-900">{phoneNumber}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#097B35] focus:border-[#097B35]"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2" />
              Code expires in {formatTime(timeLeft)}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="text-[#097B35] hover:text-[#00662A] font-medium"
              >
                Resend Code
              </button>
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="w-full h-12 bg-[#097B35] hover:bg-[#00662A] text-white font-medium"
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </Button>

        <div className="text-center">
          <Link
            href="/sign-up"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign Up
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble receiving the code? Check your SMS or try{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="text-[#097B35] hover:text-[#00662A] underline"
            >
              resending
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
