'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import RTFeedbackForm from '@/components/feedback/RTFeedbackForm';

export default function RTFeedbackPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-brand-purple">RT Feedback</h1>
          <RTFeedbackForm />
        </div>
      </div>
    </div>
  );
}
