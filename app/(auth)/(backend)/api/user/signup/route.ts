// import { NextResponse } from "next/server";
// import { hash } from "bcryptjs";
// import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const {
//     Firstname,
//     Lastname,
//     Email,
//     Password,
//     Sex,
//     Department,
//     Position,
//     EmployeeID,
//     MobileNumber,
//   } = body;

//   // VALIDATION
//   if (!Firstname || !Lastname || !Email || !Password || !Sex || !Department || !Position || !EmployeeID || !MobileNumber) {
//     return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
//   }

//   if (!Email.endsWith("@cvsu.edu.ph")) {
//     return NextResponse.json({ message: "Invalid email domain." }, { status: 400 });
//   }

//   // Hash password
//   const hashedPassword = await hash(Password, 10);

//   //  Determine role
//   const adminTitles = ["President", "Vice President", "Director", "Assistant Director", "Dean"];
//   const role = adminTitles.includes(Position) ? "Admin" : "Employee";

//   try {
//     const user = await db.user.create({
//       data: {
//         Firstname: Firstname,
//         lastName: Lastname,
//         email: Email,
//         password: hashedPassword,
//         sex: Sex,
//         departmentId: parseInt(Department),
//         position: Position,
//         employeeId: EmployeeID,
//         mobileNumber: MobileNumber,
//         role, 
//       },
//     });

//     return NextResponse.json({ message: "Account created!", userId: user.id }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
//   }
// }
