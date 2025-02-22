'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRTFeedback, checkRTEligibility } from '@/lib/api';
import { getLoggedInUser } from '@/utils/auth';
import { RTFeedbackSubmissionDTO } from '@/lib/types';

export default function RTFeedbackForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cycleId, setCycleId] = useState<number>(0);
  const [additionalComments, setAdditionalComments] = useState('');
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const storedUser = getLoggedInUser();
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }
  }, [router]);

  // For demo, assume active cycle ID is known or fetched from backend
  // In a real scenario, you'd fetch the active cycle ID from an API.
  useEffect(() => {
    // Example: Hardcode an active cycle ID or fetch from /api/rt/cycle
    const fetchActiveCycle = async () => {
      try {
        const activeCycle = await fetch('/api/rt/cycle').then((res) => res.json());
        setCycleId(activeCycle.id);
      } catch (error) {
        console.error('Error fetching active cycle:', error);
      }
    };
    fetchActiveCycle();
  }, []);

  // Check if user has enough monthly feedback forms
  useEffect(() => {
    if (user && cycleId) {
      checkRTEligibility(user.email, cycleId).then((eligible) => {
        setIsEligible(eligible);
      });
    }
  }, [user, cycleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) {
      alert('You do not have enough monthly feedback forms to submit RT feedback.');
      return;
    }
    try {
      const dto: RTFeedbackSubmissionDTO = {
        employeeEmail: user.email,
        rtCycleId: cycleId,
        additionalComments,
      };
      await submitRTFeedback(dto);
      alert('RT Feedback submitted successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error submitting RT feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block mb-1">Active RT Cycle ID</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={cycleId}
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Additional Comments</label>
        <textarea
          className="w-full p-2 rounded bg-gray-700 focus:outline-none"
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!isEligible}
        className={`${
          isEligible ? 'bg-brand-purple hover:bg-purple-800' : 'bg-gray-600'
        } w-full py-2 rounded font-semibold transition`}
      >
        Submit RT Feedback
      </button>
    </form>
  );
}
