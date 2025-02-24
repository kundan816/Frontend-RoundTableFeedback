'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, clearLoggedInUser } from '@/utils/auth';

export default function Navbar() {
  const router = useRouter();
  const user = getLoggedInUser();

  const handleLogout = () => {
    clearLoggedInUser();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-brand-purple">RoundTable</div>
      <div>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-brand-purple px-3 py-1 rounded hover:bg-purple-800 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
