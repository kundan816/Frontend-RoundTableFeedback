"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLoggedInUser, getUserRole } from "@/utils/auth";

const Sidebar = () => {
  const pathname = usePathname();
  const user = getLoggedInUser();
  const role = getUserRole(user?.email || "");

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const adminLinks = [
    { href: "/admin/rt-cycle", label: "RT Cycle Management" },
    { href: "/admin/feedback", label: "Feedback Management" },
  ];

  const employeeLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/feedback/monthly", label: "Monthly Feedback" },
    { href: "/feedback/rt", label: "RT Feedback" },
  ];

  return (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen p-5 transition-all ${isOpen ? "block" : "hidden md:block"}`}>
      {/* Sidebar Toggle Button (Mobile View) */}
      <button onClick={toggleSidebar} className="md:hidden text-white mb-4">
        ✖
      </button>

      {/* Sidebar Title */}
      <h2 className="text-lg font-bold mb-5">Navigation</h2>

      {/* Sidebar Links */}
      <nav>
        {(role === "admin" ? adminLinks : employeeLinks).map(({ href, label }) => (
          <Link key={href} href={href} className={`block px-4 py-2 rounded-md mb-2 transition-colors ${pathname === href ? "bg-purple-700" : "hover:bg-gray-700"}`}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
