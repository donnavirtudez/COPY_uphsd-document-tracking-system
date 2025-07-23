"use client";

import Head from 'next/head'
import { useState } from 'react';
import styles from './employee.module.css'
import EmployeeSidebar from "@/components/shared/employeeSidebar/employeeSidebar";
import EmployeeHeader from "@/components/shared/employeeHeader/employeeHeader";

export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title className={styles.title}>Dashboard</title>
      </Head>

          <EmployeeHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />


     

      <div className={styles.container}>
<EmployeeSidebar sidebarOpen={sidebarOpen} />
        <main className={styles.main}>
          <h2>Dashboard</h2>

          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.red}`}>
              <span className={styles.count}>6</span>
              <p>Pending Signatures</p>
            </div>
            <div className={`${styles.card} ${styles.blue}`}>
              <span className={styles.count}>12</span>
              <p>In Process</p>
            </div>
            <div className={`${styles.card} ${styles.green}`}>
              <span className={styles.count}>23</span>
              <p>Completed</p>
            </div>
            <div className={`${styles.card} ${styles.orange}`}>
              <span className={styles.count}>5</span>
              <p>New Request</p>
            </div>
          </div>

          <h3 className={styles.recentTitle}>Recent Documents</h3>
          <div className={styles.documentList}>
            <div className={styles.documentCard}>
              <div>
                <strong>Faculty Evaluation Form</strong>
                <p>To: Mr. Remollo</p>
                <p>Department: HR Department</p>
              </div>
              <div>
                <p>Date Received: July 1, 2025</p>
                <p>Priority: High</p>
                <span className={styles.pending}>Pending Signature</span>
              </div>
            </div>

            <div className={styles.documentCard}>
              <div>
                <strong>Student Good Moral Certificate</strong>
                <p>To: Mr. Talisay</p>
                <p>Department: IT Department</p>
              </div>
              <div>
                <p>Date Received: July 1, 2025</p>
                <p>Priority: High</p>
                <span className={styles.pending}>Pending Signature</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}