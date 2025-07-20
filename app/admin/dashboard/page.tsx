import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // ❌ This is async, must await!
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  console.log("SESSION:", session); // ✅ prints to server logs

  if (!session) {
    redirect("/login"); // or wherever you want
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Hello, Admin. 👋</h1>
      <p className="mt-4 text-gray-600">Welcome to your dashboard.</p>
    </main>
  );
}