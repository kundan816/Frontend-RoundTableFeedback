import { LoginDTO, FeedbackFormDTO, RTCycleDTO, RTFeedbackSubmissionDTO } from "./types";
import axios from "axios";

const BASE_URL = "http://localhost:8097/api";

//  Login User
export async function loginUser(loginData: LoginDTO) {
  try {
    const res = await axios.post(`${BASE_URL}/employees/login`, loginData);
    const user = res.data;

   
    const formattedUser = {
      ...user,
      admin: Boolean(user.admin), 
    };

    
    localStorage.setItem("user", JSON.stringify(formattedUser));

    return formattedUser; 
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}


//  Submit Monthly Feedback
export async function submitMonthlyFeedback(formData: FeedbackFormDTO) {
  try {
    const res = await axios.post(`${BASE_URL}/feedback`, formData);
    return res.data;
  } catch (error) {
    console.error("Feedback Submission Error:", error);
    throw error;
  }
}


//  Start RT Cycle
export async function startRTCycle(cycleData: { startMonth: string; endMonth: string }, adminEmail: string) {
  try {
    const res = await axios.post(`${BASE_URL}/rt/cycle?email=${adminEmail}`, cycleData);
    return res.data;
  } catch (error) {
    console.error("Error starting RT cycle:", error);
    throw error;
  }
}



//  Get All RT Cycles
export async function getAllRTCycles() {
  try {
    const res = await axios.get(`${BASE_URL}/rt/cycle`);
    console.log("📡 API Response (getAllRTCycles):", res.data); //  Debugging log
    return Array.isArray(res.data) ? res.data : []; // Ensure it's an array
  } catch (error) {
    console.error("Error fetching RT cycles:", error);
    throw error;
  }
}



//  Get All RT Feedback
export async function getAllRTFeedback() {
  try {
    const res = await axios.get(`${BASE_URL}/rt/feedback`);
    return res.data;
  } catch (error) {
    console.error("Fetch RT Feedback Error:", error);
    throw error;
  }
}

export async function getEmployeeFeedback(email: string) {
  try {
    const res = await axios.get(`${BASE_URL}/rt/feedback/employee?email=${encodeURIComponent(email)}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching employee feedback:", error);
    throw error;
  }
}



// Admin Override Feedback
export async function adminOverrideFeedback(
  adminEmail: string,
  submissionId: number,
  overrideRating: number,
  reason: string
) {
  try {
    const res = await axios.put(
      `${BASE_URL}/rt/feedback/${submissionId}/admin-update`,
      {},
      {
        headers: { adminEmail }, // Admin email in headers
        params: { overrideRating, reason }, // Query params
      }
    );
    return res.data;
  } catch (error) {
    console.error("Admin Override Feedback Error:", error);
    throw error;
  }
}



// Check if the user has submitted sufficient feedback for RT eligibility
export const checkRequiredFeedback = async (email: string, cycleId: string): Promise<boolean> => {
  try {
    const response = await axios.get<boolean>(
      `${BASE_URL}/rt/feedback/eligibility?email=${email}&cycleId=${cycleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking RT feedback eligibility:", error);
    throw new Error("Failed to check RT feedback eligibility.");
  }
};


// Submit RT feedback
export const submitRTFeedback = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/rt/feedback`, formData);
    return response.data;
  } catch (error) {
    console.error("RT Feedback Submission Error:", error);
    throw error;
  }
};
export const getActiveRTCycle = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rt/cycle`);
    const activeCycle = response.data.find((cycle: any) => cycle.active);
    return activeCycle;
  } catch (error) {
    console.error("Error fetching active RT cycle:", error);
    return null;
  }
};

//  Check RT feedback eligibility
export const checkRTEligibility = async (email: string, cycleId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/rt/feedback/eligibility`, {
      params: { email, cycleId },
    });
    return response.data;
  } catch (error) {
    console.error("RT Eligibility Check Error:", error);
    return false;
  }
};