'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/utils/auth';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getLoggedInUser();
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-brand-purple">
            Welcome, {user.name || user.email}
          </h1>
          <p>Your band level: {user.bandLevel}</p>
          <p>{user.isAdmin ? 'Role: Admin' : 'Role: Employee'}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="flex gap-4">
              {!user.isAdmin && (
                <>
                  <button
                    onClick={() => router.push('/feedback/monthly')}
                    className="bg-brand-purple px-4 py-2 rounded hover:bg-purple-800 transition"
                  >
                    Submit Monthly Feedback
                  </button>
                  <button
                    onClick={() => router.push('/feedback/rt')}
                    className="bg-brand-purple px-4 py-2 rounded hover:bg-purple-800 transition"
                  >
                    Submit RT Feedback
                  </button>
                </>
              )}
              {user.isAdmin && (
                <>
                  <button
                    onClick={() => router.push('/admin/rt-cycle')}
                    className="bg-brand-purple px-4 py-2 rounded hover:bg-purple-800 transition"
                  >
                    Start RT Cycle
                  </button>
                  <button
                    onClick={() => router.push('/admin/feedback')}
                    className="bg-brand-purple px-4 py-2 rounded hover:bg-purple-800 transition"
                  >
                    View All RT Feedback
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
