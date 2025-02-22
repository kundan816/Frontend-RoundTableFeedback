'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-gray-950 p-4 hidden md:block">
      <div className="text-brand-purple text-lg font-bold mb-6">Menu</div>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full text-left hover:text-brand-purple transition"
          >
            Dashboard
          </button>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
}
