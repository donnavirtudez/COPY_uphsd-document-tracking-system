"use client";

import { useState } from "react";
import styles from "../forgotPassStyles.module.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleUpdate = () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success("Password successfully updated!");
      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

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
            <p>Welcome Perpetualite</p>
            <h2>University of Perpetual Help System DALTA</h2>
            <p>Las Piñas</p>
            <button className={styles.mottoBtn}>
              Character Building is Nation Building
            </button>
          </div>

       
          <div className={styles.rightPanel}>
            <h2 className={styles.Title}>Set New Password</h2>
            <p className={styles.description}>
              Please enter your new password below.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={styles.input}
                required
              />
            </form>

            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className={styles.signInBtn}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>

            <a href="/login" className={styles.forgotLink}>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
