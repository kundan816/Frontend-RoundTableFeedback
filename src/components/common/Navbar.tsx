"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, clearLoggedInUser } from "@/utils/auth";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const router = useRouter();
  const user = getLoggedInUser();
  
  const handleLogout = () => {
    clearLoggedInUser();
    router.push("/login"); 
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
 
      <button className="md:hidden text-white" onClick={toggleSidebar}>
        ☰
      </button>

      
      <h1 className="text-lg font-semibold">RT Feedback System</h1>

      <div className="flex items-center gap-4">
        <span className="hidden md:inline">{user?.email}</span>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
