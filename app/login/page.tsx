import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./loginform"; // your client component!

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (session) {
    redirect("/admin/dashboard"); // Already logged in? Skip login.
  }

  return <Login />;
}