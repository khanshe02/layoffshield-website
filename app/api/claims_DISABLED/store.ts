export type StoredClaim = {
  id: string;
  employer: string;
  terminationReason: string;
  employmentStartDate: string;
  terminationDate: string;
  subscriptionStartDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  riskScore: number;
  reasons: string[];
};

export const claimStore: StoredClaim[] = [];