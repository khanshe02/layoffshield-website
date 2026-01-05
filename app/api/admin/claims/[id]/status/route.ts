import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { insertClaimAudit } from "@/lib/claimAudit";

export async function POST(
  req: NextRequest,
  context: any
) {
  const id = context.params.id;

  try {
    const supabase = supabaseServer();
    const body = await req.json();
    const { status: newStatus } = body;

    // 1. Fetch existing claim
    const { data: claim, error: fetchError } = await supabase
      .from("claims")
      .select("status")
      .eq("id", id)
      .single();

    if (fetchError || !claim) {
      return new Response(
        JSON.stringify({ error: "Claim not found" }),
        { status: 404 }
      );
    }

    const previousStatus = claim.status;

    // 2. Update claim status
    const { error: updateError } = await supabase
      .from("claims")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 400 }
      );
    }

    // 3. Audit trail
    await insertClaimAudit({
      claimId: id,
      action: "STATUS_UPDATE",
      previousStatus,
      newStatus,
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
