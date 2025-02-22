'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitMonthlyFeedback } from '@/lib/api';
import { getLoggedInUser } from '@/utils/auth';
import { FeedbackFormDTO } from '@/lib/types';

export default function MonthlyFeedbackForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<FeedbackFormDTO>({
    employeeEmail: '',
    feedbackMonth: '',
    managerEmail: '',
    comments: '',
    leadership: 0,
    orgContribution: 0,
    assistingPresales: 0,
    timelyDelivery: 0,
    codeQuality: 0,
    clientCommunication: 0,
    improvement: 0,
  });

  useEffect(() => {
    const storedUser = getLoggedInUser();
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
      setFormData((prev) => ({
        ...prev,
        employeeEmail: storedUser.email,
      }));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMonthlyFeedback(formData);
      alert('Feedback submitted successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error submitting feedback.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) return null;

  // Render relevant fields based on band level
  const isB6 = user.bandLevel === 'B6';
  const isB7 = user.bandLevel === 'B7';
  const isB8 = user.bandLevel === 'B8';

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block mb-1">Feedback Month (YYYY-MM)</label>
        <input
          type="text"
          name="feedbackMonth"
          placeholder="2025-02"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={formData.feedbackMonth}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Manager Email</label>
        <input
          type="email"
          name="managerEmail"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={formData.managerEmail}
          onChange={handleChange}
          required
        />
      </div>

      {isB6 && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Leadership (0-10)</label>
            <input
              type="number"
              name="leadership"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.leadership}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Org Contribution (0-10)</label>
            <input
              type="number"
              name="orgContribution"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.orgContribution}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Assisting Pre-sales (0-10)</label>
            <input
              type="number"
              name="assistingPresales"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.assistingPresales}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {isB7 && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Timely Delivery (0-10)</label>
            <input
              type="number"
              name="timelyDelivery"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.timelyDelivery}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Code Quality (0-10)</label>
            <input
              type="number"
              name="codeQuality"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.codeQuality}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Client Communication (0-10)</label>
            <input
              type="number"
              name="clientCommunication"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.clientCommunication}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {isB8 && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Timely Delivery (0-10)</label>
            <input
              type="number"
              name="timelyDelivery"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.timelyDelivery}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Code Quality (0-10)</label>
            <input
              type="number"
              name="codeQuality"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.codeQuality}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Improvement (0-10)</label>
            <input
              type="number"
              name="improvement"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none"
              value={formData.improvement}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label className="block mb-1">Comments</label>
        <textarea
          name="comments"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-brand-purple w-full py-2 rounded font-semibold hover:bg-purple-800 transition"
      >
        Submit
      </button>
    </form>
  );
}
