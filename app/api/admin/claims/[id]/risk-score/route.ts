import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { evaluateRisk } from "@/lib/riskScoringEngine";
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

  const result = evaluateRisk(claim);

  const { data: updated, error: updateError } = await supabase
    .from("claims")
    .update({
      risk_score: result.score,
      risk_flags: result.flags,
      risk_checked_at: new Date().toISOString(),
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
    action: "RISK_SCORED",
    previousStatus: claim.risk_score?.toString(),
    newStatus: result.score.toString(),
    metadata: {
      flags: result.flags,
    },
  });

  return NextResponse.json(updated);
}
