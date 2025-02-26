"use client";

import { useState, useEffect } from "react";
import { checkRequiredFeedback, submitRTFeedback, getAllRTCycles } from "@/lib/api";
import { getLoggedInUser } from "@/utils/auth";

// Define TypeScript types
type User = {
  email: string;
  name: string;
};

type RTCycle = {
  id: number;
  startMonth: string;
  endMonth: string;
};

export default function SubmitFeedbackPage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCycleId, setSelectedCycleId] = useState<number | null>(null);
  const [additionalComments, setAdditionalComments] = useState("");
  const [rtCycles, setRtCycles] = useState<RTCycle[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Logged-in User & RT Cycles
  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      setUser(loggedInUser);
    };

    const fetchRTCycles = async () => {
      try {
        const response: RTCycle[] = await getAllRTCycles();
        setRtCycles(response || []);
      } catch (error) {
        console.error("Error fetching RT cycles:", error);
        setRtCycles([]);
      }
    };

    fetchUser();
    fetchRTCycles();
  }, []);

  const handleSubmitFeedback = async () => {
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    if (!additionalComments.trim()) {
      alert("Please provide additional comments before submitting feedback.");
      return;
    }

    if (!user.email) {
      alert("User email is missing. Please check login details.");
      return;
    }

    if (!selectedCycleId) {
      alert("Please select an RT cycle before submitting feedback.");
      return;
    }

    setLoading(true);

    try {
      const hasEnoughFeedback = await checkRequiredFeedback(user.email, selectedCycleId.toString());

      if (!hasEnoughFeedback) {
        alert("You do not meet the 75% feedback rule to submit RT feedback.");
        setLoading(false);
        return;
      }

      await submitRTFeedback({
        employeeEmail: user.email,
        rtCycleId: selectedCycleId,
        additionalComments,
      });

      alert("Feedback submitted successfully!");
      setAdditionalComments("");
      setSelectedCycleId(null);
    } catch (error : any) {
      alert("Error submitting feedback: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit RT Feedback</h1>

      {/* RT Cycle Selection */}
      <label className="block font-semibold">Select RT Cycle:</label>
      <select
        value={selectedCycleId || ""}
        onChange={(e) => setSelectedCycleId(parseInt(e.target.value, 10))}
        className="border p-2 rounded w-full bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <option value="">-- Select Cycle --</option>
        {rtCycles.map((cycle: RTCycle) => (
          <option key={cycle.id} value={cycle.id}>
            {`Cycle ${cycle.startMonth} - ${cycle.endMonth}`}
          </option>
        ))}
      </select>

      {/* Additional Comments */}
      <label className="block font-semibold mt-4">Additional Comments:</label>
      <textarea
        value={additionalComments}
        onChange={(e) => setAdditionalComments(e.target.value)}
        className="border p-2 rounded w-full bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        rows={4}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmitFeedback}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}
