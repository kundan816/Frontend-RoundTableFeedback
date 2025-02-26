"use client";

import { useState, useEffect } from "react";
import { checkRTEligibility, submitRTFeedback } from "@/lib/api";
import { getLoggedInUser } from "@/utils/auth";

const RTFeedbackForm = ({ cycleId }: { cycleId: number }) => {
  const user = getLoggedInUser();
  const [isEligible, setIsEligible] = useState(false);
  const [collatedFeedback, setCollatedFeedback] = useState<any>(null);
  const [additionalComments, setAdditionalComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEligibility = async () => {
      const eligible = await checkRTEligibility(user?.email || "", cycleId);
      setIsEligible(eligible);
    };
    fetchEligibility();
  }, [user?.email, cycleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await submitRTFeedback({
        employeeEmail: user?.email || "",
        rtCycleId: cycleId,
        additionalComments,
      });
      setMessage("RT Feedback submitted successfully!");
    } catch (error) {
      setMessage("Error submitting RT feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">RT Feedback Form</h2>

      {message && <p className="text-green-400">{message}</p>}

      {!isEligible ? (
        <p className="text-red-400">You are not eligible to submit RT feedback yet.</p>
      ) : (
        <>
          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <h3 className="font-semibold">Collated Feedback (Read-only)</h3>
            <pre className="text-sm">{JSON.stringify(collatedFeedback, null, 2)}</pre>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Additional Comments (Optional)
              <textarea className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={(e) => setAdditionalComments(e.target.value)}></textarea>
            </label>

            <button type="submit" className="bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700" disabled={loading}>
              {loading ? "Submitting..." : "Submit RT Feedback"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RTFeedbackForm;
