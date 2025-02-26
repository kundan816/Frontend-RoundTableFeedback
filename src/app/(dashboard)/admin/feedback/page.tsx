"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8097/api";

export default function AdminFeedbackPage() {
  const [email, setEmail] = useState(""); // Admin searches feedback by email
  const [feedback, setFeedback] = useState<any>(null); // Stores feedback details
  const [loading, setLoading] = useState(false);
  const [overrideRating, setOverrideRating] = useState("");
  const [reason, setReason] = useState("");

  // Fetch Feedback by Employee Email
  const fetchFeedback = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email to search.");
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/rt/feedback/employee`, {
        params: { email },
      });
  
      console.log("Fetched Feedback Data:", res.data); 
      console.log("Employee Data:", res.data[0]?.employee); 
  
      if (Array.isArray(res.data) && res.data.length > 0) {
        setFeedback(res.data[0]);
        toast.success("Feedback data loaded!");
      } else {
        toast.error("No feedback found.");
        setFeedback(null);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to fetch feedback. Please check the email.");
      setFeedback(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Override Submission
  const handleOverride = async () => {
    if (!overrideRating || isNaN(Number(overrideRating)) || Number(overrideRating) < 0 || Number(overrideRating) > 100) {
      toast.error("Please enter a valid rating between 0 and 100.");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please provide a reason for overriding the rating.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/rt/feedback/${feedback?.id}/admin-update`,
        {},
        {
          headers: { adminEmail: "rajshorya893@gmail.com" }, // Replace with actual admin email
          params: { overrideRating: Number(overrideRating), reason },
        }
      );


      

      setFeedback(res.data); // Update feedback data with new rating
      toast.success("Rating overridden successfully!");
    } catch (error) {
      console.error("Error overriding rating:", error);
      toast.error("Failed to override rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">Admin Feedback Management</h1>

      {/* Email Search */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter employee email..."
          className="p-2 border rounded w-80 text-black"
        />
        <button
          onClick={fetchFeedback}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Display Feedback Details */}
      {feedback ? (
        <div className="bg-gray-800 p-6 rounded-md">
          <h2 className="text-xl font-semibold">
            Feedback for: {feedback?.employee?.email || "N/A"}
          </h2>
          <p className="mt-2">Calculated Rating: <span className="font-bold">{feedback?.calculatedRating ?? "N/A"}</span></p>
          <p>Calculated Grade: <span className="font-bold">{feedback?.calculatedGrade ?? "N/A"}</span></p>

          {/* Override Form */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-yellow-400">Override Rating</h3>
            <div className="flex items-center space-x-4 mt-2">
              <input
                type="number"
                value={overrideRating}
                onChange={(e) => setOverrideRating(e.target.value)}
                placeholder="New Rating (0-100)"
                className="p-2 border rounded w-32 text-black"
              />
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for override"
                className="p-2 border rounded w-96 text-black"
              />
              <button
                onClick={handleOverride}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
                disabled={loading}
              >
                {loading ? "Processing..." : "Override Rating"}
              </button>
            </div>
          </div>

          {/* Updated Override Details */}
          {feedback?.adminOverrideRating !== undefined && (
            <div className="mt-6 p-4 bg-red-900 text-white rounded">
              <h3 className="text-lg font-bold">Admin Override Applied</h3>
              <p>New Rating: <span className="font-bold">{feedback?.adminOverrideRating ?? "N/A"}</span></p>
              <p>New Grade: <span className="font-bold">{feedback?.adminOverrideGrade ?? "N/A"}</span></p>
              <p>Reason: <span className="italic">{feedback?.adminReason ?? "N/A"}</span></p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400">No feedback data available. Please search an email.</p>
      )}
    </div>
  );
}
