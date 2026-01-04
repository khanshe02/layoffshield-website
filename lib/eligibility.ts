import { ClaimInput, DecisionResult } from "./types";

const WAITING_PERIOD_DAYS = 180;

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function hardEligibilityCheck(
  claim: ClaimInput
): DecisionResult | null {
  const subscriptionDate = new Date(claim.subscriptionStartDate);
  const terminationDate = new Date(claim.terminationDate);

  if (daysBetween(subscriptionDate, terminationDate) < WAITING_PERIOD_DAYS) {
    return {
      eligible: false,
      decision: "REJECTED",
      reasons: ["WAITING_PERIOD_NOT_MET"],
    };
  }

  if (claim.terminationReason === "misconduct") {
    return {
      eligible: false,
      decision: "REJECTED",
      reasons: ["MISCONDUCT_EXCLUDED"],
    };
  }

  return null;
}