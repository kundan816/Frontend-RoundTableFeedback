"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkRTEligibility, getActiveRTCycle, submitRTFeedback } from "@/lib/api";
import { getLoggedInUser } from "@/utils/auth";

const RTFeedbackPage = () => {
  const router = useRouter();
  const user = getLoggedInUser();

  if (!user) {
    router.push("/login");
    return null;
  }

  const [isEligible, setIsEligible] = useState(false);
  const [rtCycleId, setRtCycleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    employeeEmail: user.email,
    rtCycleId: 0,
    additionalComments: "",
  });

  // Fetch active RT cycle
  useEffect(() => {
    const fetchCycle = async () => {
      const activeCycle = await getActiveRTCycle();
      if (activeCycle) {
        setRtCycleId(activeCycle.id);
      } else {
        console.error("No active RT cycle found!");
      }
      setLoading(false);
    };

    fetchCycle();
  }, []);

  // Check eligibility after fetching cycleId
  useEffect(() => {
    if (rtCycleId !== null) {
      const checkEligibility = async () => {
        const eligible = await checkRTEligibility(user.email, rtCycleId);
        console.log("User eligibility:", eligible);
        setIsEligible(eligible);
      };
      checkEligibility();
    }
  }, [user.email, rtCycleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rtCycleId) {
      alert("No active RT cycle found. Cannot submit feedback.");
      return;
    }

    setSubmitting(true);
    try {
      await submitRTFeedback({ ...formData, rtCycleId });
      alert("RT Feedback submitted successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Failed to submit RT Feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-lg font-medium">Loading RT cycle...</p>
      </div>
    );
  }

  if (!isEligible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg font-semibold bg-gray-800 px-6 py-3 rounded-md shadow-md">
          ❌ You are not eligible to submit RT feedback at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-4 animate-fade-in">Submit RT Feedback</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <textarea
          placeholder="Add your feedback here..."
          value={formData.additionalComments}
          onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
          className="w-full p-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-300"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-purple-500 flex justify-center items-center"
          disabled={submitting}
        >
          {submitting ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 text-purple-400 hover:underline hover:text-purple-300 transition-all duration-300"
      >
        🔙 Back to Dashboard
      </button>
    </div>
  );
};

export default RTFeedbackPage;
