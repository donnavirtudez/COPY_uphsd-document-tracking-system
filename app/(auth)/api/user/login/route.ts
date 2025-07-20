import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface UserWithRole {
  email: string;
  password: string;
  role: "Admin" | "Employee";
}

async function findUserByEmail(email: string): Promise<UserWithRole | null> {
  const user = await db.user.findFirst({
    where: { Email: { equals: email, mode: "insensitive" } },
    include: { Role: true },
  });

  if (!user) return null;

  const roleName =
    user.Role.RoleName.trim().toLowerCase() === "admin" ? "Admin" : "Employee";

  return {
    email: user.Email,
    password: user.Password,
    role: roleName,
  };
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { Email, Password } = body as { Email: string; Password: string };

    if (!Email || !Password) {
      return NextResponse.json(
        { message: "Email and Password are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(Email)) {
      return NextResponse.json(
        { message: "Email is not valid." },
        { status: 400 }
      );
    }

    if (!Email.toLowerCase().endsWith("@cvsu.edu.ph")) {
      return NextResponse.json(
        { message: "Email must be a valid @cvsu.edu.ph address." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(Email);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (user.password !== Password) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // session token (use JWT or secure ID in real app)
    const sessionToken = `${user.email}:${Date.now()}`;

    // Set the session cookie
    const response = NextResponse.json(
      { role: user.role, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set({
      name: "session",
      value: sessionToken,
      httpOnly: true,  // more secure, not accessible from JS
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}