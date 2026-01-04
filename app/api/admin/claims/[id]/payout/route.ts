import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// UUID format guard (prevents <REAL-UUID>, <claim-id>, etc.)
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("PAYOUT ID RECEIVED:", id);

  if (!id || !UUID_REGEX.test(id)) {
    return NextResponse.json(
      { error: "Invalid claim id format" },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();

  // 1. Fetch claim
  const { data: claim, error: fetchError } = await supabase
    .from("claims")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !claim) {
    return NextResponse.json(
      { error: "Claim not found" },
      { status: 404 }
    );
  }

  // 2. Guards
  if (claim.status !== "APPROVED") {
    return NextResponse.json(
      { error: "Claim must be APPROVED before payout" },
      { status: 400 }
    );
  }

  if (claim.paid_at) {
    return NextResponse.json(
      { error: "Claim already paid" },
      { status: 400 }
    );
  }

  // 3. Mark as paid
  const { data, error } = await supabase
    .from("claims")
    .update({
      paid_at: new Date().toISOString(),
      payout_reference: `TEST-${Date.now()}`,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
