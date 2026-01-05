export type AutoApprovalResult = {
  approved: boolean;
  reason?: string;
};

export function evaluateAutoApproval(claim: any): AutoApprovalResult {
  if (claim.eligibility_status !== "ELIGIBLE") {
    return { approved: false };
  }

  if (claim.amount > 50000) {
    return {
      approved: false,
      reason: "Amount exceeds auto-approval threshold",
    };
  }

  if (claim.previous_paid_claim === true) {
    return {
      approved: false,
      reason: "Previous claim exists",
    };
  }

  if (claim.risk_score && claim.risk_score > 30) {
    return {
      approved: false,
      reason: "Risk score too high",
    };
  }

  return {
    approved: true,
    reason: "Eligible and low risk – auto-approved",
  };
}
