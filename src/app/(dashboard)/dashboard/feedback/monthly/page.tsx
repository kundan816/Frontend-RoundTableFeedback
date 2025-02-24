'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import MonthlyFeedbackForm from '@/components/feedback/MonthlyFeedbackForm';

export default function MonthlyFeedbackPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-brand-purple">Monthly Feedback</h1>
          <MonthlyFeedbackForm />
        </div>
      </div>
    </div>
  );
}
