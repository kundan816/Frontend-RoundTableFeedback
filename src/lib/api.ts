import axios from 'axios';
import { FeedbackForm, RTFeedbackSubmission, RTCycle } from './types';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8097/api'
});

export const login = async (email: string) => {
    const response = await api.post('/employees/login', { email });
    return response.data;
};

export const submitMonthlyFeedback = async (feedback: FeedbackForm) => {
    const response = await api.post('/feedback', feedback);
    return response.data;
};

export const getEmployeeFeedbacks = async (email: string) => {
    const response = await api.get(`/feedback/employee/${email}`);
    return response.data;
};

export const startRTCycle = async (cycle: Partial<RTCycle>, adminEmail: string) => {
    const response = await api.post(`/rt/cycle?email=${adminEmail}`, cycle);
    return response.data;
};

export const submitRTFeedback = async (submission: RTFeedbackSubmission) => {
    const response = await api.post('/rt/feedback', submission);
    return response.data;
};

export const adminUpdateRTFeedback = async (
    id: number,
    adminEmail: string,
    overrideRating: number,
    reason: string
) => {
    const response = await api.put(
        `/rt/feedback/${id}/admin-update`,
        { overrideRating, reason },
        { headers: { adminEmail } }
    );
    return response.data;
};