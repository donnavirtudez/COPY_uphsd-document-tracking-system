'use client';

import styles from './signupStyles.module.css';

export default function Signup() {
  return (
    <div className={styles.background}>
      <form className={styles.card}>
        <h2 className={styles.title}>Create an account</h2>

        {/* Personal Info */}
        <section>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.formGroup}>
            <input type="text" placeholder="First Name" className={styles.input} />
            <input type="text" placeholder="Last Name" className={styles.input} />
          </div>
          <div className={styles.form}>
            <input type="email" placeholder="Email" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <input type="password" placeholder="Create Password" className={styles.input} />
            <input type="password" placeholder="Confirm Password" className={styles.input} />
          </div>
          <div className={styles.form}>
            <input type="number" placeholder="Mobile No. (09XX-XXX-XXXX" className={styles.input} />
          </div>
          <div className={styles.form}>
            <input type="text" placeholder="Enter gender" className={styles.input} />
          </div>
        </section>

        {/* Work Info */}
        <section>
          <h3 className={styles.sectionTitle}>Position Details</h3>
          <div className={styles.form}>
            <input type="number" placeholder="ID number" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <select className={styles.input}>
              <option>Select Department</option>
            </select>
            <select className={styles.input}>
              <option>Role</option>
            </select>
          </div>
        </section>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <a href="/ " className={styles.back}>Back</a>
          <button type="submit" className={styles.Btn}>Create</button>
        </div>
      </form>
    </div>
  );
}
