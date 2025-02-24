'use client';

import React, { useEffect, useState } from 'react';
import { getAllRTFeedback, adminOverrideFeedback } from '@/lib/api';
import { getLoggedInUser } from '@/utils/auth';
import { RTFeedbackSubmission } from '@/lib/types';

export default function FeedbackList() {
  const [submissions, setSubmissions] = useState<RTFeedbackSubmission[]>([]);
  const [overrideRating, setOverrideRating] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRTFeedback();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching RT feedback:', error);
      }
    };
    fetchData();
  }, []);

  const handleOverride = async (submissionId: number) => {
    const user = getLoggedInUser();
    if (!user || !user.isAdmin) {
      alert('Only admins can override feedback.');
      return;
    }
    try {
      await adminOverrideFeedback(user.email, submissionId, parseFloat(overrideRating), overrideReason);
      alert('Override applied successfully!');
      // Refresh the list
      const data = await getAllRTFeedback();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
      alert('Error overriding feedback.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-brand-purple">RT Feedback Submissions</h2>
      {submissions.map((sub) => (
        <div key={sub.id} className="border border-gray-700 p-4 mb-4 rounded">
          <p><strong>Submission ID:</strong> {sub.id}</p>
          <p><strong>Employee:</strong> {sub.employeeEmail}</p>
          <p><strong>Calculated Rating:</strong> {sub.calculatedRating}</p>
          <p><strong>Calculated Grade:</strong> {sub.calculatedGrade}</p>
          <p><strong>Override Rating:</strong> {sub.adminOverrideRating || 'N/A'}</p>
          <p><strong>Override Grade:</strong> {sub.adminOverrideGrade || 'N/A'}</p>
          <p><strong>Admin Reason:</strong> {sub.adminReason || 'N/A'}</p>
          <button
            className="mt-2 bg-brand-purple px-3 py-1 rounded hover:bg-purple-800 transition"
            onClick={() => setSelectedSubmissionId(sub.id)}
          >
            Override
          </button>
          {selectedSubmissionId === sub.id && (
            <div className="mt-2">
              <input
                type="number"
                placeholder="Override Rating"
                className="w-32 p-1 rounded bg-gray-700 mr-2"
                value={overrideRating}
                onChange={(e) => setOverrideRating(e.target.value)}
              />
              <input
                type="text"
                placeholder="Reason"
                className="w-64 p-1 rounded bg-gray-700 mr-2"
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
              />
              <button
                className="bg-brand-purple px-3 py-1 rounded hover:bg-purple-800 transition"
                onClick={() => handleOverride(sub.id)}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
