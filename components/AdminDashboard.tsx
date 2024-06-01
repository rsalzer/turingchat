"use client";

import { signOut } from "next-auth/react";

const AdminDashboard = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default AdminDashboard;
