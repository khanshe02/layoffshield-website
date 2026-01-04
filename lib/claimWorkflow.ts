export const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["UNDER_REVIEW", "REJECTED"],
  UNDER_REVIEW: ["APPROVED", "REJECTED"],
  APPROVED: ["PAYOUT_READY"],
  PAYOUT_READY: ["PAID"],
};

export function canTransition(
  current: string,
  next: string,
  eligibility?: string | null
) {
  if (!VALID_TRANSITIONS[current]?.includes(next)) {
    return false;
  }

  // Guardrail: approval requires eligibility
  if (
    next === "APPROVED" &&
    eligibility !== "ELIGIBLE"
  ) {
    return false;
  }

  return true;
}

export function transitionTimestamp(status: string) {
  if (status === "UNDER_REVIEW") return "reviewed_at";
  if (status === "APPROVED") return "approved_at";
  if (status === "PAID") return "paid_at";
  return null;
}
