import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { evaluateEligibility } from "@/lib/eligibilityEngine";
import { insertClaimAudit } from "@/lib/claimAudit";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = supabaseServer();

  const { data: claim, error } = await supabase
    .from("claims")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !claim) {
    return NextResponse.json(
      { error: "Claim not found" },
      { status: 404 }
    );
  }

  const result = evaluateEligibility(claim);

  const { data: updated, error: updateError } = await supabase
    .from("claims")
    .update({
      eligibility_status: result.status,
      eligibility_reason: result.reason ?? null,
      eligibility_checked_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  await insertClaimAudit({
    claimId: id,
    action: "ELIGIBILITY_CHECKED",
    previousStatus: claim.eligibility_status,
    newStatus: result.status,
    metadata: {
      reason: result.reason ?? "All checks passed",
    },
  });

  return NextResponse.json(updated);
}
