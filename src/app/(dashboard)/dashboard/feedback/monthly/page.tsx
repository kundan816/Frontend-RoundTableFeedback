"use client";

import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/utils/auth";

const MonthlyFeedbackForm = () => {
  const user = getLoggedInUser();
  const [bandLevel, setBandLevel] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    feedbackMonth: "", // 
    managerEmail: "",
    comments: "",
    leadership: "",
    orgContribution: "",
    assistingPresales: "",
    timelyDelivery: "",
    codeQuality: "",
    clientCommunication: "",
    improvement: "",
  });

  useEffect(() => {
    if (user?.bandLevel) {
      setBandLevel(user.bandLevel);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const feedbackData: any = {
      employeeEmail: user?.email,
      feedbackMonth: formData.feedbackMonth , 
      managerEmail: formData.managerEmail,
      comments: formData.comments,
    };
  
    if (bandLevel === "B6") {
      feedbackData.leadership = formData.leadership;
      feedbackData.orgContribution = formData.orgContribution;
      feedbackData.assistingPresales = formData.assistingPresales;
    } else if (bandLevel === "B7") {
      feedbackData.timelyDelivery = formData.timelyDelivery;
      feedbackData.codeQuality = formData.codeQuality;
      feedbackData.clientCommunication = formData.clientCommunication;
    } else if (bandLevel === "B8") {
      feedbackData.timelyDelivery = formData.timelyDelivery;
      feedbackData.codeQuality = formData.codeQuality;
      feedbackData.improvement = formData.improvement;
    }
  
    try {
      const response = await fetch("http://localhost:8097/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
  
      const responseData = await response.json();  

      if (!response.ok) throw new Error(responseData.message || "Submission failed");

      alert("Feedback submitted successfully!");
    } catch (error:any) {
      console.error("Error submitting feedback:", error);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-blue-400">Submit Monthly Feedback</h2>

      {bandLevel ? (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-96">
          
          <label className="block text-white">Feedback Month</label>
          <input
            type="month"
            name="feedbackMonth"
            value={formData.feedbackMonth}
            onChange={handleChange}
            className="w-full p-2 my-2 rounded bg-gray-700 text-white"
            required
          />

          <label className="block text-white">Manager Email</label>
          <input
            type="email"
            name="managerEmail"
            value={formData.managerEmail}
            onChange={handleChange}
            className="w-full p-2 my-2 rounded bg-gray-700 text-white"
          />

          <label className="block text-white">Comments</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 my-2 rounded bg-gray-700 text-white"
          />

          {/* Show relevant fields based on band level */}
          {bandLevel === "B6" && (
            <>
              <label className="block text-white">Leadership</label>
              <input type="number" name="leadership" value={formData.leadership} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Org Contribution</label>
              <input type="number" name="orgContribution" value={formData.orgContribution} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Assisting Presales</label>
              <input type="number" name="assistingPresales" value={formData.assistingPresales} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            </>
          )}

          {bandLevel === "B7" && (
            <>
              <label className="block text-white">Timely Delivery</label>
              <input type="number" name="timelyDelivery" value={formData.timelyDelivery} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Code Quality</label>
              <input type="number" name="codeQuality" value={formData.codeQuality} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Client Communication</label>
              <input type="number" name="clientCommunication" value={formData.clientCommunication} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            </>
          )}

          {bandLevel === "B8" && (
            <>
              <label className="block text-white">Timely Delivery</label>
              <input type="number" name="timelyDelivery" value={formData.timelyDelivery} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Code Quality</label>
              <input type="number" name="codeQuality" value={formData.codeQuality} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />

              <label className="block text-white">Improvement</label>
              <input type="number" name="improvement" value={formData.improvement} onChange={handleChange} className="w-full p-2 my-2 rounded bg-gray-700 text-white" />
            </>
          )}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Submit Feedback
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MonthlyFeedbackForm;
