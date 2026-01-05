import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(
  req: NextRequest,
  context: any
) {
  const id = context.params.id;

  try {
    const supabase = supabaseServer();

    const { data: claim, error } = await supabase
      .from("claims")
      .select("reason")
      .eq("id", id)
      .single();

    if (error || !claim) {
      return new Response(
        JSON.stringify({ eligible: false, reason: "Claim not found" }),
        { status: 404 }
      );
    }

    // Simple eligibility rule (example)
    const eligible = Boolean(claim.reason);

    return new Response(
      JSON.stringify({ eligible }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
