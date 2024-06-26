import { getServerSession } from "next-auth/next";
import AdminDashboard from "@/components/AdminDashboard";
import SignInButton from "@/components/SignInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div>
        <div>Not logged in</div>
        <SignInButton />
      </div>
    );
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <AdminDashboard />
    </div>
  );
}
