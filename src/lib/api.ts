import { LoginDTO, FeedbackFormDTO, RTCycleDTO, RTFeedbackSubmissionDTO } from './types';

const BASE_URL = 'http://localhost:8080/api';

export async function loginUser(loginData: LoginDTO) {
  const res = await fetch(`${BASE_URL}/employees/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });
  if (!res.ok) {
    throw new Error('Login failed');
  }
  return res.json();
}

export async function submitMonthlyFeedback(formData: FeedbackFormDTO) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error('Failed to submit monthly feedback');
  }
  return res.json();
}

export async function checkRTEligibility(email: string, cycleId: number): Promise<boolean> {
  // This is a sample endpoint. Adjust to your actual backend logic if needed.
  const res = await fetch(
    `${BASE_URL}/rt/feedback/eligible?email=${email}&cycleId=${cycleId}`
  );
  if (!res.ok) {
    // If not found or not eligible, handle accordingly
    return false;
  }
  const data = await res.json();
  return data.eligible;
}

export async function submitRTFeedback(submission: RTFeedbackSubmissionDTO) {
  const res = await fetch(`${BASE_URL}/rt/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (!res.ok) {
    throw new Error('Failed to submit RT feedback');
  }
  return res.json();
}

export async function startRTCycle(cycleData: RTCycleDTO, adminEmail: string) {
  const params = new URLSearchParams({ email: adminEmail });
  const res = await fetch(`${BASE_URL}/rt/cycle?${params.toString()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cycleData),
  });
  if (!res.ok) {
    throw new Error('Failed to start RT cycle');
  }
  return res.json();
}

export async function getAllRTFeedback() {
  const res = await fetch(`${BASE_URL}/rt/feedback`);
  if (!res.ok) {
    throw new Error('Failed to fetch RT feedback');
  }
  return res.json();
}

export async function adminOverrideFeedback(
  adminEmail: string,
  submissionId: number,
  overrideRating: number,
  reason: string
) {
  const params = new URLSearchParams({
    adminEmail,
    overrideRating: overrideRating.toString(),
    reason,
  });
  const res = await fetch(`${BASE_URL}/rt/feedback/${submissionId}/admin-update?${params}`, {
    method: 'PUT',
  });
  if (!res.ok) {
    throw new Error('Failed to override feedback');
  }
  return res.json();
}
