"use client";
import Head from 'next/head'
import styles from './history.module.css'
import { useState } from 'react';
import EmployeeSidebar from "@/components/shared/employeeSidebar/employeeSidebar";
import EmployeeHeader from "@/components/shared/employeeHeader/employeeHeader";

const documents = [
  {
    title: 'IT Equipment Purchase Request',
    Aprrove: 'SD',
    status: 'Pending',
    created: 'July 5, 2025',
    Completed: 'July 5, 2025',
  },
  {
    title: 'Student Grades',
    Aprrove: 'Antonio Orcales',
    status: 'Completed',
    created: 'July 5, 2025',
     Completed: 'July 10, 2025',
  },
  {
    title: 'Student Good Moral Request',
    Aprrove: 'Antonio Orcales',
    status: 'Pending',
    created: 'July 5, 2025',
    Completed: 'July 10, 2025',
  },

  {
    title: 'Request Form',
    Aprrove: 'Antonio Orcales',
    status: 'Pending',
    created: 'July 5, 2025',
    Completed: 'July 10, 2025',
    
  },
];


export default function History() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Add this line
  return (
   <>
   <div className={styles.Maincontainer}> 
      <Head>
        <title className={styles.title}>Document</title>
      </Head>

       <EmployeeHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className={styles.container}>
        <EmployeeSidebar sidebarOpen={sidebarOpen} />

        <main className={styles.main}>
     <div className={styles.Maincontainer}>
  <div className={styles.headerRow}>
    <h1 className={styles.heading}>History</h1>
    
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
            <th>Approved by</th>
            <th>Department</th>
            <th>Created</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.title}</td>
              <td>{doc.Aprrove}</td>
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
              <td>{doc.created}</td>
              <td>{doc.Completed}</td>
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