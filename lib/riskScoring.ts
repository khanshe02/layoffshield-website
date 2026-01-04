export function calculateRiskScore(claim: {
  reason?: string | null;
  termination_reason?: string | null;
  employer?: string | null;
}) {
  let score = 0;

  // Base risk by reason
  if (claim.reason === "layoff") score += 20;
  if (claim.reason === "redundancy") score += 15;

  // Employer provided
  if (claim.employer) score += 5;

  // Termination comment missing increases risk
  if (!claim.termination_reason) score += 10;

  return Math.min(score, 100);
}

export function determineEligibility(score: number) {
  if (score <= 25) return "ELIGIBLE";
  if (score <= 50) return "REVIEW";
  return "REJECTED";
}
