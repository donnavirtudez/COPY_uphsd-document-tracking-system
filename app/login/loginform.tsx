"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./loginStyles.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "Email") {
      setIsEmailValid(value.toLowerCase().endsWith("@cvsu.edu.ph"));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.Email.toLowerCase().endsWith("@cvsu.edu.ph")) {
      toast.error("Email must be a valid @cvsu.edu.ph address.");
      return;
    }

    if (!formData.Password) {
      toast.error("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      toast.success("Login successful!");

      if (data.role === "Admin") {
        router.push("/admin/dashboard");
      } else if (data.role === "Employee") {
        router.push("/employee/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.background}>
        <div className={styles.card}>
          <div className={styles.leftPanel}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className={styles.logo}
            />
            <h2>University of Perpetual Help System DALTA</h2>
            <p>Las Piñas</p>
            <button className={styles.mottoBtn}>
              Character Building is Nation Building
            </button>
            <p>Welcome</p>
          </div>

          <div className={styles.rightPanel}>
            <h2 className={styles.loginTitle}>Log In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="Email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.Email}
                className={styles.input}
                required
              />
              {formData.Email && (
                <p
                  className={`flex items-center gap-2 text-sm mt-1 ${
                    isEmailValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isEmailValid ? (
                    <>✔ Valid email address</>
                  ) : (
                    <>✖ Email must end with @cvsu.edu.ph</>
                  )}
                </p>
              )}

              <input
                name="Password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.Password}
                className={styles.input}
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className={styles.signInBtn}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <a href="/forgotpass" className={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
