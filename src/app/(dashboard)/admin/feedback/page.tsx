'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import FeedbackList from '@/components/admin/FeedbackList';

export default function AdminFeedbackPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-brand-purple">All RT Feedback</h1>
          <FeedbackList />
        </div>
      </div>
    </div>
  );
}
