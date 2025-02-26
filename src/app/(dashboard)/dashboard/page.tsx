"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, getUserRole, clearLoggedInUser } from "@/utils/auth";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [role, setRole] = useState<"admin" | "employee" | null>(null);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      router.push("/login");
      return;
    }
    setUser(loggedInUser);
    setRole(getUserRole(loggedInUser.email));
  }, [router]);

  const handleLogout = () => {
    clearLoggedInUser();
    router.push("/login");
  };

  if (!user || !role)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 animate-fade-in">
      {/* Welcome Message */}
      <h1 className="text-3xl font-extrabold mb-2 text-blue-400">
        Welcome, <span className="text-purple-400">{user.email}</span>
      </h1>
      <p className="text-lg text-gray-300">Role: <span className="text-green-400">{role.toUpperCase()}</span></p>

      {/* Buttons Section */}
      <div className="mt-6 space-y-4 space-x-4">
        {role === "admin" ? (
          <>
            <button
              onClick={() => router.push("/admin/rt-cycle")}
              className="px-6 py-3 w-64 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Manage RT Cycles
            </button>
            <button
              onClick={() => router.push("/admin/feedback")}
              className="px-6 py-3 w-80 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Admin Feedback Management
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/dashboard/feedback/monthly")}
              className="px-6 py-3 w-64 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Monthly Feedback
            </button>
            <button
              onClick={() => router.push("/dashboard/feedback/rt")}
              className="px-6 py-3 w-64 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit RT Feedback
            </button>
          </>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 w-64 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
