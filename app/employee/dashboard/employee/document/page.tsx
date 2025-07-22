"use client";

import Head from 'next/head'
import styles from './document.module.css'
import { useState } from 'react';

const documents = [
  {
    title: 'IT Equipment Purchase Request',
    fileType: 'PDF File',
    status: 'Pending',
    date: 'July 5, 2025',
  },
  {
    title: 'Student Grades',
    fileType: 'PDF File',
    status: 'Completed',
    date: 'July 5, 2025',
  },
  {
    title: 'Student Good Moral Request',
    fileType: 'PDF File',
    status: 'Pending',
    date: 'July 5, 2025',
  },
];


export default function Document() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
   <>
   <div className={styles.Maincontainer}> 
      <Head>
        <title className={styles.title}>Document</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src="/full-logo.png" alt="Logo" className={styles.logo} />
       
        </div>


        <div className={styles.headerRight}>
          <span>Welcome, Kurt Macaranas</span>
          <div>
            <img src="/profile.png" alt="Profile" className={styles.profilePic} />
          </div>

          {/* Hamburger Button */}
          <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <p className={styles.role}>👤 IT COORDINATOR</p>
          <ul>
            <li>📂 Dashboard</li>
            <li className={styles.active}>📄 My Documents</li>
            <li>🕘 History</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>




        <main className={styles.main}>
     <div className={styles.Maincontainer}>
  <div className={styles.headerRow}>
    <h1 className={styles.heading}>My Documents</h1>
    <button className={styles.createButton}>
      <span>+</span> Create New Document
    </button>
  </div>


  <div className={styles.cards}>
    <div className={`${styles.card} ${styles.red}`}>
      <span className={styles.count}>6</span>
      <p>Total Documents</p>
    </div>
    <div className={`${styles.card} ${styles.blue}`}>
      <span className={styles.count}>12</span>
      <p>In Process</p>
    </div>
    <div className={`${styles.card} ${styles.green}`}>
      <span className={styles.count}>23</span>
      <p>Completed</p>
    </div>
  </div>


    {/* search */}
   <div className={styles.searchAndFilter}>
  <input
    type="text"
    placeholder="Search documents..."
    className={styles.searchInput}
  />

  <select className={styles.dropdown}>
    <option value="all">All Status</option>
    <option value="in-process">In Process</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
    <option value="rejected">Rejected</option>
  </select>

  <select className={styles.dropdown}>
    <option value="all">All Types</option>
    <option value="Memo">Memo</option>
    <option value="report">Report</option>
    <option value="request">Request</option>
    <option value="evaluation">Evaluation</option>
  </select>
</div>
 





 {/* table */}
    <div className={styles.containerTable}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Document</th>
            <th>File</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.title}</td>
              <td>{doc.fileType}</td>
              <td>
                <span
                  className={
                    doc.status === 'Completed'
                      ? styles.statusCompleted
                      : styles.statusPending
                  }
                >
                  {doc.status}
                </span>
              </td>
              <td>{doc.date}</td>
              <td>
                <a href="#">View</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>



</main>
      </div>
      </div>


      
    </>
  )
}