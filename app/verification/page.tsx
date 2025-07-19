"use client";

import { useState, useRef, useEffect } from "react";

interface VerificationCodePageProps {
  email: string;
  purpose: "registration" | "forgot-password";
}

export default function VerificationCodePage({
  email,
  purpose,
}: VerificationCodePageProps) {
  const CODE_LENGTH = 6;
  const [codeDigits, setCodeDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    if (resendCooldown === 0) return;

    const timer = setTimeout(() => {
      setResendCooldown(resendCooldown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

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

    const focusIndex =
      pasteDigits.length >= CODE_LENGTH ? CODE_LENGTH - 1 : pasteDigits.length;
    inputsRef.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered Code:", codeDigits.join(""));
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setCodeDigits(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
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
                className="w-12 h-14 text-center text-2xl font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-700 transition"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={idx === 0 ? handlePaste : undefined}
                ref={(el) => {
                  inputsRef.current[idx] = el;
                }}
                autoComplete="one-time-code"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white font-semibold py-3 rounded-md hover:bg-red-800 transition"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="font-medium cursor-pointer text-[#800000] hover:underline disabled:text-gray-400 transition"
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
