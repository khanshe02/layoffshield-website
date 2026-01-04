export type ClaimInput = {
  userId: string;
  employer: string;
  terminationReason: "redundancy" | "restructuring" | "performance" | "misconduct";
  employmentStartDate: string;
  terminationDate: string;
  subscriptionStartDate: string;
};

export type DecisionResult = {
  eligible: boolean;
  riskScore?: number;
  decision: "APPROVED" | "MANUAL_REVIEW" | "REJECTED";
  reasons: string[];
};