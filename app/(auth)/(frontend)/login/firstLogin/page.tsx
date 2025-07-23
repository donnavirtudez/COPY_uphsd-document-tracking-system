"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import styles from "../loginStyles.module.css";

export default function FirstLoginChangePass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success("Password changed successfully.");
      setIsLoading(false);
      router.push("/dashboard");
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
            <h2 className={styles.loginTitle}>Change Password</h2>
            <p className={styles.description}>
              Please update your temporary password.
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Current Temporary Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
            </form>

            <button
              onClick={handleChangePassword}
              className={styles.signInBtn}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Change Password"}
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
