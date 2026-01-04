import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const claimId = searchParams.get("claimId");

  const { data } = await supabase
    .from("claim_audit_logs")
    .select("*")
    .eq("claim_id", claimId)
    .order("created_at", { ascending: false });

  return NextResponse.json(data ?? []);
}
