export type RiskResult = {
  score: number;
  flags: string[];
};

export function evaluateRisk(claim: any): RiskResult {
  let score = 0;
  const flags: string[] = [];

  // Rule 1 — High claim amount
  if (claim.amount > 50000) {
    score += 30;
    flags.push("HIGH_AMOUNT");
  }

  // Rule 2 — Short subscription duration
  if (claim.subscription_start_date) {
    const start = new Date(claim.subscription_start_date);
    const now = new Date();
    const days =
      (now.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24);

    if (days < 120) {
      score += 20;
      flags.push("SHORT_SUBSCRIPTION_DURATION");
    }
  }

  // Rule 3 — Previous claim history
  if (claim.previous_paid_claim === true) {
    score += 40;
    flags.push("PREVIOUS_PAID_CLAIM");
  }

  // Rule 4 — Manual verification missing
  if (!claim.employment_verified || !claim.layoff_verified) {
    score += 25;
    flags.push("INCOMPLETE_VERIFICATION");
  }

  // Cap at 100
  score = Math.min(score, 100);

  return { score, flags };
}
