"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface VerificationCodePageProps {
  email: string;
  purpose: "registration" | "forgot-password";
  onVerified: () => void;
  onResendCode: () => Promise<void>;
}

export default function VerificationCodePage({
  email,
  purpose,
  onVerified,
  onResendCode,
}: VerificationCodePageProps) {
  const CODE_LENGTH = 6;
  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  // Start countdown on mount and when resendCooldown changes
  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = setTimeout(() => {
      setResendCooldown(resendCooldown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // only single digit number or empty allowed

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle keydown for navigation and deletion
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      const newDigits = [...codeDigits];
      newDigits[index - 1] = "";
      setCodeDigits(newDigits);
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }

    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, CODE_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const pasteDigits = paste.split("");
    setCodeDigits((prev) => {
      const newDigits = [...prev];
      for (let i = 0; i < CODE_LENGTH; i++) {
        newDigits[i] = pasteDigits[i] || "";
      }
      return newDigits;
    });
    // Focus last filled or last input
    const focusIndex =
      pasteDigits.length >= CODE_LENGTH ? CODE_LENGTH - 1 : pasteDigits.length;
    inputsRef.current[focusIndex]?.focus();
  };

  const codeString = codeDigits.join("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (codeString.length !== CODE_LENGTH) {
      toast.error("Please enter the complete verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: codeString, purpose }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid or expired verification code.");
      } else {
        toast.success("Verification successful!");
        onVerified();
      }
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      await onResendCode();
      toast.success("Verification code resent.");
      setResendCooldown(60);
      setCodeDigits(Array(CODE_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch {
      toast.error("Failed to resend verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">
          Email Verification
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Enter the 6-digit verification code sent to{" "}
          <span className="font-medium text-gray-800">{email}</span> to{" "}
          {purpose === "registration"
            ? "complete your registration."
            : "reset your password."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {codeDigits.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="\d*"
                className="w-12 h-14 text-center text-2xl font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                disabled={loading}
                autoComplete="one-time-code"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <button
            onClick={handleResend}
            disabled={loading || resendCooldown > 0}
            className="font-medium text-blue-600 hover:underline disabled:text-gray-400 transition"
          >
            {resendCooldown > 0
              ? `Resend code in ${resendCooldown}s`
              : "Resend verification code"}
          </button>
        </div>
      </div>
    </div>
  );
}
