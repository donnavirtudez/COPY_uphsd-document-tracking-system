"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const isEmailValid = /^[^\s@]+@cvsu\.edu\.ph$/i.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!isEmailValid) {
      toast.error("Please enter a valid @cvsu.edu.ph email address.");
      return;
    }

    // Placeholder for actual forgot password request logic
    toast.success("Password reset link sent to your email.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {email && (
              <p className="mt-1 text-sm">
                {isEmailValid ? (
                  <span className="text-green-600">✔ Valid email address</span>
                ) : (
                  <span className="text-red-600">
                    ✖ Email must end with @cvsu.edu.ph
                  </span>
                )}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
