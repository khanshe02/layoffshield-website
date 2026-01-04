type EligibilityResult = {
  status: "ELIGIBLE" | "INELIGIBLE";
  reason?: string;
};

export function evaluateEligibility(claim: any): EligibilityResult {
  if (claim.status !== "SUBMITTED") {
    return {
      status: "INELIGIBLE",
      reason: "Claim not in SUBMITTED state",
    };
  }

  if (!claim.employment_verified) {
    return {
      status: "INELIGIBLE",
      reason: "Employment not verified",
    };
  }

  if (!claim.layoff_verified) {
    return {
      status: "INELIGIBLE",
      reason: "Layoff not verified",
    };
  }

  const subscriptionStart = new Date(claim.subscription_start_date);
  const now = new Date();
  const daysActive =
    (now.getTime() - subscriptionStart.getTime()) /
    (1000 * 60 * 60 * 24);

  if (daysActive < 90) {
    return {
      status: "INELIGIBLE",
      reason: "Waiting period not completed",
    };
  }

  if (claim.previous_paid_claim) {
    return {
      status: "INELIGIBLE",
      reason: "Previous claim already paid",
    };
  }

  return { status: "ELIGIBLE" };
}
