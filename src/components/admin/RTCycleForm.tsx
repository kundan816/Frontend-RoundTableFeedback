'use client';

import React, { useState } from 'react';
import { startRTCycle } from '@/lib/api';
import { getLoggedInUser } from '@/utils/auth';

export default function RTCycleForm() {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getLoggedInUser();
    if (!user || !user.isAdmin) {
      alert('Only admins can start RT cycle.');
      return;
    }
    try {
      await startRTCycle({ startMonth, endMonth }, user.email);
      alert('RT cycle started successfully!');
    } catch (error) {
      console.error(error);
      alert('Error starting RT cycle.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md max-w-md">
      <div className="mb-4">
        <label className="block mb-1">Start Month (YYYY-MM)</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">End Month (YYYY-MM)</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-brand-purple w-full py-2 rounded font-semibold hover:bg-purple-800 transition"
      >
        Start RT Cycle
      </button>
    </form>
  );
}
