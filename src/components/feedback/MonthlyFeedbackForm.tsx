"use client";

import { useState, useEffect } from "react";
import { submitMonthlyFeedback } from "@/lib/api";
import { getLoggedInUser } from "@/utils/auth";

const bandFields = {
  B8: ["leadership", "orgContribution", "assistingPresales"],
  B7: ["timelyDelivery", "codeQuality", "clientCommunication"],
  B6: ["improvement"],
};

const MonthlyFeedbackForm = () => {
  const user = getLoggedInUser();
  const [formData, setFormData] = useState({
    employeeEmail: user?.email || "",
    feedbackMonth: "",
    managerEmail: "",
    comments: "",
    attachment: null as File | null,
    leadership: undefined,
    orgContribution: undefined,
    assistingPresales: undefined,
    timelyDelivery: undefined,
    codeQuality: undefined,
    clientCommunication: undefined,
    improvement: undefined,
  });

  const [bandLevel, setBandLevel] = useState<"B8" | "B7" | "B6" | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch user band level from backend 
    setBandLevel("B7"); 
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await submitMonthlyFeedback(formData);
      setMessage("Feedback submitted successfully!");
    } catch (error) {
      setMessage("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Monthly Feedback Form</h2>

      {message && <p className="text-green-400">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Feedback Month (YYYY-MM)
          <input type="month" name="feedbackMonth" required className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={handleChange} />
        </label>

        <label className="block">
          Manager Email
          <input type="email" name="managerEmail" required className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={handleChange} />
        </label>

        <label className="block">
          Additional Comments
          <textarea name="comments" rows={3} className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={handleChange}></textarea>
        </label>

        {bandLevel &&
          bandFields[bandLevel].map((field) => (
            <label key={field} className="block">
              {field.replace(/([A-Z])/g, " $1").trim()}
              <input type="number" name={field} min="1" max="5" className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={handleChange} />
            </label>
          ))}

        <label className="block">
          Upload Attachment (Optional)
          <input type="file" name="attachment" className="w-full p-2 bg-gray-700 text-white rounded-md" onChange={handleFileChange} />
        </label>

        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default MonthlyFeedbackForm;
