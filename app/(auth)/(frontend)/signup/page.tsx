'use client';

import styles from './signupStyles.module.css';
import { useState } from 'react';

export default function Signup() {
  const DEPARTMENTS = [
    { id: 1, name: "College of Engineering" },
    { id: 2, name: "College of Business" },
    { id: 3, name: "College of Computer Studies" },
    { id: 4, name: "College of Arts & Sciences" },
  ];

  const POSITIONS = [
    "Clerk", "Administrative Assistant", "Registrar Staff", "Instructor", "Faculty",
    "Department Secretary", "Department Head", "Program Chair", "Dean",
    "Assistant Director", "Director", "Vice President", "President", "Other",
  ];

  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Sex: "",
    Department: "",
    Position: "",
    EmployeeID: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileInput, setMobileInput] = useState("");
  const [customPosition, setCustomPosition] = useState("");

  const isEmailValid = /^[^\s@]+@cvsu\.edu\.ph$/i.test(formData.Email);

  const passwordRequirements = [
    { label: "Password at least 8 characters", test: (s: string) => s.length >= 8 },
    { label: "Password at least one uppercase letter", test: (s: string) => /[A-Z]/.test(s) },
    { label: "Password at least one lowercase letter", test: (s: string) => /[a-z]/.test(s) },
    { label: "Password at least one number", test: (s: string) => /\d/.test(s) },
    { label: "Password at least one special character (!@#$%^&*)", test: (s: string) => /[!@#$%^&*]/.test(s) },
  ];

  const validateField = (name: string, value: string): string => {
  switch (name) {
    case "Firstname":
      return value.trim() === "" ? "First Name is required." : "";
    case "Lastname":
      return value.trim() === "" ? "Last Name is required." : "";
    case "Email":
      if (!value.trim()) return "Email is required.";
      return /^[^\s@]+@cvsu\.edu\.ph$/i.test(value)
        ? ""
        : "Email must end with @cvsu.edu.ph";
    case "Password":
      if (!value) return "Password is required.";
      for (const { label, test } of passwordRequirements) {
        if (!test(value)) return label;
      }
      return "";
    case "ConfirmPassword":
      if (!value) return "Please confirm your password.";
      return value !== formData.Password ? "Passwords do not match." : "";
    case "Sex":
      return !value ? "Sex is required." : "";
    case "Department":
      return !value ? "Department is required." : "";
    case "Position":
      return !value ? "Position is required." : "";
    case "EmployeeID":
      return !value ? "Employee ID is required." : "";
    case "MobileNumber":
      return !/^\d{10}$/.test(value) ? "Mobile number must be 10 digits." : "";
    default:
      return "";
  }
};


  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  // Handle Mobile Number separately
  if (name === "MobileNumber") {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      setMobileInput(digits);
      const errorMsg =
        /^\d{10}$/.test(digits) || digits === ""
          ? ""
          : "Mobile number must be 10 digits.";
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
    return;
  }

  // Regular input updates
  setFormData((prev) => ({ ...prev, [name]: value }));

  const errorMsg = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: errorMsg }));
};


  const formatMobile = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 7);
    const part3 = digits.slice(7, 10);
    return [part1, part2, part3].filter(Boolean).join("-");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const {
      Firstname, Lastname, Email, Password, ConfirmPassword,
      Sex, Department, Position, EmployeeID,
    } = formData;

    const finalPosition = Position === "Other" ? customPosition.trim() : Position;

    if (!Firstname) newErrors.Firstname = "First name is required.";
    if (!Lastname) newErrors.Lastname = "Last name is required.";
    if (!Email) newErrors.Email = "Email is required.";
    else if (!isEmailValid) newErrors.Email = "Email must end with @cvsu.edu.ph";

    if (!Password) newErrors.Password = "Password is required.";
    else {
      passwordRequirements.forEach(({ label, test }) => {
        if (!test(Password)) newErrors.Password = label;
      });
    }

    if (!ConfirmPassword) newErrors.ConfirmPassword = "Please confirm your password.";
    else if (Password !== ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match.";

    if (!Sex) newErrors.Sex = "Sex is required.";
    if (!Department) newErrors.Department = "Department is required.";
    if (!finalPosition) newErrors.Position = "Position is required.";
    if (!EmployeeID) newErrors.EmployeeID = "Employee ID is required.";
    if (!/^\d{10}$/.test(mobileInput)) newErrors.MobileNumber = "Mobile number must be 10 digits.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const MobileNumber = `+63${mobileInput}`;
    console.log("Form submitted:", { ...formData, Position: finalPosition, MobileNumber });
  };


  return (
    <div className={styles.background}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create an account</h2>

        {/* Personal Info */}
        <section>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.formGroup}>
            <input type="text"
            placeholder="First Name"
            name="Firstname"
            id="Firstname"
            className={styles.input} 
            value={formData.Firstname} 
            onChange={handleChange}
            required/>

            <input type="text" 
            placeholder="Last Name" 
            name="Lastname"
            id="Lastname"
            className={styles.input} 
            value={formData.Lastname}
            onChange={handleChange}
            required/>
          </div>

          <div className={styles.form}>
            <input
  type="email"
  name="Email"
  id="Email"
  placeholder="Email"
  className={styles.input}
  value={formData.Email}
  onChange={handleChange}
  required
/>

             
  </div>

          <div className={styles.formGroup}>
  {/* Password Field */}
  <div className={styles.inputWrapper}>
    <input
      type="password"
      placeholder="Create Password"
      className={styles.input}
      name="Password"
      id="Password"
      value={formData.Password}
      onChange={handleChange}
      required
    />
    
  </div>

  {/* Confirm Password Field */}
  <div className={styles.inputWrapper}>
    <input
      type="password"
      placeholder="Confirm Password"
      className={styles.input}
      name="ConfirmPassword"
      id="ConfirmPassword"
      value={formData.ConfirmPassword}
      onChange={handleChange}
      required
    />
    
    
  </div>
</div>


        
          <div className={styles.form}>
            <input type="text" 
            placeholder="Mobile No. (09XX-XXX-XXXX)"
            name="MobileNumber"
            className={styles.input} 
            value={formatMobile(mobileInput)}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 11) setMobileInput(val);
                }}


            required/>
          </div>
          <div className={styles.form}>
            <select 
            id="Sex"
            name="Sex"
            value={formData.Sex}
            onChange={handleChange}
            className={styles.input} >
            <option value="" disabled>
                  Select Sex
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              
              </select>
    </div>
        </section>
              
    
   

        {/* Work Info */}
        <section>
          <h3 className={styles.sectionTitle}>Position Details</h3>
          <div className={styles.form}>
            <input
  type="number"
  name="EmployeeID"
  id="EmployeeID"
  placeholder="Employee ID"
  className={styles.input}
  value={formData.EmployeeID}
  onChange={handleChange}
  required
/>

          </div>
          <div className={styles.formGroup}>
            <select className={styles.input}
                id="Department"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                required>
              <option value="" disabled>
                  Select Department
                </option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}

            </select>
            <select className={styles.input}
  
              id="Position"
              name="Position"
              value={formData.Position}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Position
              </option>
              {POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>

          </div>
        </section>

     {Object.values(errors).filter(Boolean).length > 0 && (
  <div className={styles.errorBox}>
    {Object.values(errors).map((msg, index) => (
      <p key={index} className={styles.errorText}>
        {msg}
      </p>
    ))}
  </div>
)}




        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <a href="/ " className={styles.back}>Back</a>
          <button type="submit" className={styles.Btn}>Create</button>
        </div>
      </form>
    </div>
    
  );
}
