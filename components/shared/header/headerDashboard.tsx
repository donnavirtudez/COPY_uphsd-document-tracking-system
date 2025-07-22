"use client";

import Image from "next/image";
import styles from "./header.module.css";
import Search from "./search";

export default function HeaderDashboard() {
  

  const userName = "Neil Yvan";
  const firstInitial = userName.charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src="/logo-dashboard.png" alt="Logo Icon" width={300} height={240} />
      </div>

      <div className={styles.rightWrapper}>
        <Search />

        <div className={styles.userInfo}>
            <span className={styles.userName}>Welcome, {userName}</span>
          <div className={styles.userIcon}>{firstInitial}</div>
          
        </div>
      </div>
    </header>
  );
}
