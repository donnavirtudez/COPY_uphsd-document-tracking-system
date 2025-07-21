
import Head from 'next/head'
import styles from './document.module.css'



export default function Document() {
  return (
   <>
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
          <h1 className={styles.heading}>My Documents</h1>
          <button>
            <span>+</span> Create New Document
          </button>
        </main>
      </div>
    </>
  )
}