import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { insertClaimAudit } from "@/lib/claimAudit";

export async function POST(
  req: NextRequest,
  context: any
) {
  const { claimId } = await req.json();

  try {
    const supabase = supabaseServer();

    // Update claim to PAID
    const { error } = await supabase
      .from("claims")
      .update({ status: "PAID" })
      .eq("id", claimId);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    // Audit trail
    await insertClaimAudit({
      claimId,
      action: "PAID",
      previousStatus: "APPROVED",
      newStatus: "PAID",
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
