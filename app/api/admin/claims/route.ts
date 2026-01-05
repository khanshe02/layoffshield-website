import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { insertClaimAudit } from "@/lib/claimAudit";

export async function POST(
  req: NextRequest,
  context: any
) {
  const id = context.params.id;

  try {
    const supabase = supabaseServer(); // ✅ THIS LINE IS CRITICAL
    const body = await req.json();
    const { status: nextStatus } = body;

    const { error } = await supabase
      .from("claims")
      .update({ status: nextStatus })
      .eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400 }
      );
    }

    await insertClaimAudit({
      claimId: id,
      action: "STATUS_UPDATE",
      previousStatus: "UNKNOWN",
      newStatus: nextStatus,
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
