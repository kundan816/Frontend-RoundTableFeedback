"use client";

import { useState, useEffect } from "react";
import { startRTCycle, getAllRTCycles } from "@/lib/api";
import { RTCycleDTO } from "@/lib/types";
import { getLoggedInUser } from "@/utils/auth";

export default function RTCyclePage() {
  const [cycles, setCycles] = useState<RTCycleDTO[]>([]);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ email: string; admin: boolean } | null>(null); // Store logged-in user

  //  Fetch RT Cycles
  const fetchCycles = async () => {
  try {
    const data = await getAllRTCycles();
    console.log("📡 Updated RT Cycles:", data); 

    if (!Array.isArray(data)) {
      console.error(" Error: Expected an array but got:", data);
      return;
    }

    setCycles(data);  //  Set the full array of cycles
  } catch (err) {
    console.error("Failed to fetch RT cycles:", err);
    setCycles([]);  // Set empty if error
  }
};

  

  //  Fetch logged-in user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        console.log("Logged in User:", loggedInUser); //  Debugging log
        setUser(loggedInUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };
  
    fetchUser();
    fetchCycles();
  }, []);
  
    

  //  Start RT Cycle
  const handleStartCycle = async () => {
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }
  
    if (!user.admin) { 
      alert("Only admins can start RT cycles.");
      return;
    }
  
    if (!startMonth || !endMonth) {
      alert("Please select both start and end month.");
      return;
    }
  
    try {
      setLoading(true);
      await startRTCycle({ startMonth, endMonth }, user.email);
      alert("RT Cycle started successfully!");
      
      //  Fetch updated cycles
      fetchCycles();
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response?.data || "Failed to start RT cycle.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage RT Cycles</h1>

      <div className="flex gap-4 items-center">
        {/* Start Month Input */}
        <input
          type="month"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          className="border p-2 rounded w-1/3 bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Start Month"
        />

        {/* End Month Input */}
        <input
          type="month"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          className="border p-2 rounded w-1/3 bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="End Month"
        />

        {/* Start RT Cycle Button */}
        <button
          onClick={handleStartCycle}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start RT Cycle"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <h2 className="text-xl font-semibold mt-6">Active RT Cycles</h2>
<ul className="mt-4">
  {Array.isArray(cycles) && cycles.length > 0 ? (
    cycles.map((cycle, index) => (
      <li key={index} className="border-b py-2">
        {cycle.startMonth} - {cycle.endMonth}
      </li>
    ))
  ) : (
    <li className="text-gray-500">No Active RT Cycles found</li>
  )}
</ul>



    </div>
  );
}
