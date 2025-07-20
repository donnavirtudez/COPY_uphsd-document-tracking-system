"use client";

import { useState } from "react";

const DEPARTMENTS = [
  { id: 1, name: "College of Engineering" },
  { id: 2, name: "College of Business" },
  { id: 3, name: "College of Computer Studies" },
  { id: 4, name: "College of Arts & Sciences" },
];

const POSITIONS = [
  "Clerk",
  "Administrative Assistant",
  "Registrar Staff",
  "Instructor",
  "Faculty",
  "Department Secretary",
  "Department Head",
  "Program Chair",
  "Dean",
  "Assistant Director",
  "Director",
  "Vice President",
  "President",
  "Other",
];

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Gender: "",
    Department: "",
    Position: "",
    EmployeeID: "",
  });

  const [mobileInput, setMobileInput] = useState("");
  const [customPosition, setCustomPosition] = useState("");

  const isEmailValid = /^[^\s@]+@cvsu\.edu\.ph$/i.test(formData.Email);

  const passwordRequirements = [
    { label: "At least 8 characters", test: (s: string) => s.length >= 8 },
    { label: "One uppercase letter", test: (s: string) => /[A-Z]/.test(s) },
    { label: "One lowercase letter", test: (s: string) => /[a-z]/.test(s) },
    { label: "One number", test: (s: string) => /\d/.test(s) },
    {
      label: "One special character (!@#$%^&*)",
      test: (s: string) => /[!@#$%^&*]/.test(s),
    },
  ];

  const isPasswordValid = passwordRequirements.every((req) =>
    req.test(formData.Password)
  );

  const formatMobile = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 7);
    const part3 = digits.slice(7, 10);
    return [part1, part2, part3].filter(Boolean).join("-");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "Position" && value !== "Other") {
      setCustomPosition("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      Firstname,
      Lastname,
      Email,
      Password,
      Gender,
      Department,
      Position,
      EmployeeID,
    } = formData;

    const finalPosition =
      Position === "Other" ? customPosition.trim() : Position;

    if (
      !Firstname ||
      !Lastname ||
      !Email ||
      !Password ||
      !Gender ||
      !Department ||
      !finalPosition ||
      !EmployeeID
    ) {
      return;
    }

    if (!isEmailValid) return;

    if (!isPasswordValid) return;

    if (mobileInput.length !== 10 || !/^\d{10}$/.test(mobileInput)) return;

    const MobileNumber = `+63${mobileInput}`;

    // Do something with form data here if needed
    console.log("Form submitted:", {
      ...formData,
      Position: finalPosition,
      MobileNumber,
    });
  };

  return (

    <div
  className="min-h-screen bg-[url('/registerbg.png')] bg-cover bg-center flex items-center justify-center p-4 opacity-100 relative"
>
  <img
    src="/full-logo.png" // ← Replace with your logo path
    alt="Logo"
    className="absolute top-4 left-4 w-50 h-16" // ← Adjust size as needed
  /> 


      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Sign Up</h2>
        <h3 className="text-3xl font-semibold text-red-800 mb-8">Personal Information</h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="Firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="Firstname"
                id="Firstname"
                value={formData.Firstname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="Lastname"
                id="Lastname"
                value={formData.Lastname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.Email && (
              <p className="flex items-center gap-2 text-sm mt-1">
                {isEmailValid ? (
                  <span className="text-green-600">✔ Valid email address</span>
                ) : (
                  <span className="text-red-600">
                    ✖ Email must end with @cvsu.edu.ph
                  </span>
                )}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="Password"
              id="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.Password && (
              <div className="mt-2 space-y-1 text-sm">
                {passwordRequirements.map(({ label, test }) => {
                  const passed = test(formData.Password);
                  return (
                    <p
                      key={label}
                      className={passed ? "text-green-600" : "text-red-600"}
                    >
                      {passed ? "✔" : "✖"} {label}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="EmployeeID"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employee ID
            </label>
            <input
              type="text"
              name="EmployeeID"
              id="EmployeeID"
              value={formData.EmployeeID}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="MobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-600 select-none">
                +63
              </span>
              <input
                type="text"
                name="MobileNumber"
                id="MobileNumber"
                placeholder="912-3456-789"
                value={formatMobile(mobileInput)}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) setMobileInput(val);
                }}
                className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="Gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="Department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="Department"
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="Position"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Position
            </label>
            <select
              id="Position"
              name="Position"
              value={formData.Position}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {formData.Position === "Other" && (
              <input
                type="text"
                placeholder="Enter your position"
                value={customPosition}
                onChange={(e) => setCustomPosition(e.target.value)}
                className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>

          <div className="flex space-x-4">
  <button
    type="button"
  className="w-48 h-12 bg-white border-2 border-red-600 text-red-600 font-semibold py-3 rounded-full hover:bg-red-50 transition"

  >
    Back
  </button>


  <button
    type="button"
  className="w-48 h-12 bg-white border-2 border-red-600 text-red-600 font-semibold py-3 rounded-full hover:bg-red-50 transition"
  >
    Clear
  </button>

  <button
    type="submit"
    className="w-48 h-12 bg-red-800 text-yellow-400 font-semibold py-3 rounded-full hover:bg-red-700 transition"
  >
    Register
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
