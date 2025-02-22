export type BandLevel = 'B6' | 'B7' | 'B8';

export interface Employee {
    id: number;
    email: string;
    name: string;
    bandLevel: BandLevel;
    isAdmin: boolean;
}

export interface FeedbackForm {
    id?: number;
    employeeEmail: string;
    feedbackMonth: string;
    managerEmail: string;
    comments: string;
    // B6 fields
    leadership?: number;
    orgContribution?: number;
    assistingPresales?: number;
    // B7 fields
    timelyDelivery?: number;
    codeQuality?: number;
    clientCommunication?: number;
    // B8 fields
    improvement?: number;
}

export interface RTCycle {
    id: number;
    startMonth: string;
    endMonth: string;
    active: boolean;
}

export interface RTFeedbackSubmission {
    id?: number;
    employeeEmail: string;
    rtCycleId: number;
    additionalComments: string;
    calculatedRating?: number;
    calculatedGrade?: string;
    adminOverrideRating?: number;
    adminOverrideGrade?: string;
    adminReason?: string;
    includedFeedbacks: FeedbackForm[];
}