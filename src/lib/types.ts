export interface LoginDTO {
    email: string;
    password: string;
  }
  
  export interface FeedbackFormDTO {
    employeeEmail: string;
    feedbackMonth: string; //  "2025-02"
    managerEmail: string;
    comments: string;
    leadership?: number;
    orgContribution?: number;
    assistingPresales?: number;
    timelyDelivery?: number;
    codeQuality?: number;
    clientCommunication?: number;
    improvement?: number;
  }
  
  export interface RTCycleDTO {
    startMonth: string;
    endMonth: string;
  }
  
  export interface RTFeedbackSubmissionDTO {
    employeeEmail: string;
    rtCycleId: number;
    additionalComments?: string;
    calculatedRating?: number;
    calculatedGrade?: string;
    adminOverrideRating?: number;
    adminOverrideGrade?: string;
    adminReason?: string;
  }
  
  export interface RTFeedbackSubmission {
    id: number;
    employeeEmail: string;
    rtCycleId: number;
    additionalComments: string;
    calculatedRating: number;
    calculatedGrade: string;
    adminOverrideRating?: number;
    adminOverrideGrade?: string;
    adminReason?: string;
    includedFeedbacks?: any[];
  }
  