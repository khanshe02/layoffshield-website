import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const { claimId, amount } = await req.json();

  if (!claimId) {
    return NextResponse.json(
      { error: "Missing claimId" },
      { status: 400 }
    );
  }

  await supabaseServer
    .from("claims")
    .update({ status: "PAID" })
    .eq("id", claimId);

  return NextResponse.json({ success: true });
}
