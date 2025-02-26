"use client";

import { useState } from "react";
import { startRTCycle, getAllRTCycles } from "@/lib/api";
import { toast } from "react-toastify";

const RTCycleForm = () => {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [rtCycles, setRTCycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminEmail = "rajshorya893@gmail.com"; 

  const fetchRTCycles = async () => {
    try {
      const cycles = await getAllRTCycles();
      setRTCycles(cycles);
    } catch (error) {
      toast.error("Failed to fetch RT cycles");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startMonth || !endMonth) {
      toast.error("Please select both start and end months.");
      return;
    }

    setLoading(true);
    try {
      await startRTCycle({ startMonth, endMonth }, adminEmail);
      toast.success("RT Cycle started successfully!");
      fetchRTCycles();
      setStartMonth("");
      setEndMonth("");
    } catch (error) {
      toast.error("Error starting RT Cycle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Start a New RT Cycle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Start Month-Year</label>
          <input
            type="month"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm">End Month-Year</label>
          <input
            type="month"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start RT Cycle"}
        </button>
      </form>

       {/* Display existing RT Cycles  */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Active RT Cycles</h3>
        <button onClick={fetchRTCycles} className="text-sm text-blue-400 mb-2">Refresh List</button>
        <ul className="space-y-2">
          {rtCycles.map((cycle: any) => (
            <li key={cycle.id} className="bg-gray-700 p-3 rounded-md">
              {cycle.startMonth} - {cycle.endMonth}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RTCycleForm;
