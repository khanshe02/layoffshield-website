import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { evaluateAutoApproval } from "@/lib/autoApprovalEngine";
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

  if (claim.status !== "SUBMITTED") {
    return NextResponse.json(
      { error: "Claim not in SUBMITTED state" },
      { status: 400 }
    );
  }

  const result = evaluateAutoApproval(claim);

  if (!result.approved) {
    return NextResponse.json({
      auto_approved: false,
      reason: result.reason ?? "Conditions not met",
    });
  }

  const { data: updated, error: updateError } = await supabase
    .from("claims")
    .update({
      status: "APPROVED",
      auto_approved: true,
      auto_approved_at: new Date().toISOString(),
      auto_approval_reason: result.reason,
      reviewed_at: new Date().toISOString(),
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
    action: "AUTO_APPROVED",
    previousStatus: "SUBMITTED",
    newStatus: "APPROVED",
    metadata: {
      reason: result.reason,
    },
  });

  return NextResponse.json(updated);
}
