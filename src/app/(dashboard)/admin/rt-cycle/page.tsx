'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import RTCycleForm from '@/components/admin/RTCycleForm';

export default function RTCyclePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-brand-purple">Start RT Cycle</h1>
          <RTCycleForm />
        </div>
      </div>
    </div>
  );
}
