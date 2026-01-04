import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Claim ID required" },
      { status: 400 }
    );
  }

  // Fetch claim
  const { data: claim, error } = await supabaseServer
    .from("claims")
    .select("*")
    .eq("id", id)
    .single();

  if (!claim || error) {
    return NextResponse.json(
      { error: "Claim not found" },
      { status: 404 }
    );
  }

  if (claim.status !== "APPROVED") {
    return NextResponse.json(
      { error: "Claim not approved" },
      { status: 400 }
    );
  }

  // Simulate payout (later: Razorpay / Stripe / Bank API)
  const { error: payoutError } = await supabaseServer
    .from("claims")
    .update({
      status: "PAID",
      paid_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (payoutError) {
    return NextResponse.json(
      { error: payoutError.message },
      { status: 500 }
    );
  }

  // Audit log
  await supabaseServer.from("claim_audit_logs").insert({
    claim_id: id,
    action: "PAYOUT_EXECUTED",
  });

  return NextResponse.json({ success: true });
}
