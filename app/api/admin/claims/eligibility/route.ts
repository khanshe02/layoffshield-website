import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { data: claim } = await supabaseServer
    .from("claims")
    .select("reason")
    .eq("id", id)
    .single();

  // LayoffShield v1 eligibility rules
  const eligibleReasons = ["layoff", "redundancy"];
  const eligibility =
    claim && eligibleReasons.includes(claim.reason?.toLowerCase())
      ? "ELIGIBLE"
      : "NOT_ELIGIBLE";

  await supabaseServer
    .from("claims")
    .update({ eligibility_status: eligibility })
    .eq("id", id);

  return NextResponse.json({ success: true });
}
