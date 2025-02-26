"use client";

import { useState } from "react";
import { getEmployeeFeedback, adminOverrideFeedback } from "@/lib/api";
import { toast } from "react-toastify";

const FeedbackList = () => {
  const [email, setEmail] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overrideData, setOverrideData] = useState<{ id: number; newRating: number; reason: string }>({
    id: 0,
    newRating: 0,
    reason: "",
  });

  const handleSearch = async () => {
    if (!email.trim()) {
      toast.error("Please enter a valid employee email.");
      return;
    }
  
    setLoading(true);
  
    try {
      const data = await getEmployeeFeedback(email.trim()); // Ensure no extra spaces
      if (!Array.isArray(data)) {
        toast.error("Invalid response from server.");
        return;
      }
      setFeedbacks(data);
    } catch (error) {
      toast.error("Failed to fetch feedback. Ensure the email is correct.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleOverride = async (feedbackId: number) => {
    if (!overrideData.reason || overrideData.newRating <= 0) {
      toast.error("Provide a valid reason and new rating.");
      return;
    }
  
    const adminEmail = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).email : null;
  
    if (!adminEmail) {
      toast.error("Admin email not found. Please log in again.");
      return;
    }
  
    try {
      await adminOverrideFeedback(adminEmail, feedbackId, overrideData.newRating, overrideData.reason);
      toast.success("Rating overridden successfully.");
      handleSearch(); // Refresh feedback list
    } catch (error) {
      toast.error("Failed to override rating.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search Employee Feedback</h2>
      <div className="flex space-x-4">
        <input
          type="email"
          placeholder="Enter employee email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {feedbacks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Employee Feedback</h3>
          {feedbacks.map((fb: any) => (
            <div key={fb.id} className="bg-gray-700 p-4 rounded-md mb-4">
              <p><strong>Month:</strong> {fb.feedbackMonth}</p>
              <p><strong>Rating:</strong> {fb.rating}</p>
              <p><strong>Comments:</strong> {fb.comments || "No comments"}</p>

              {/* Override Rating */}
              <div className="mt-4">
                <label className="text-sm">New Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={overrideData.id === fb.id ? overrideData.newRating : ""}
                  onChange={(e) =>
                    setOverrideData((prev) => ({
                      ...prev,
                      id: fb.id,
                      newRating: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <label className="text-sm mt-2">Reason</label>
                <textarea
                  value={overrideData.id === fb.id ? overrideData.reason : ""}
                  onChange={(e) =>
                    setOverrideData((prev) => ({
                      ...prev,
                      id: fb.id,
                      reason: e.target.value,
                    }))
                  }
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <button
                  onClick={() => handleOverride(fb.id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium"
                >
                  Override Rating
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;