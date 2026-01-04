import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function PATCH(req: Request) {
  const { id, nextStatus } = await req.json();

  if (!id || !nextStatus) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer
    .from("claims")
    .update({ status: nextStatus })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
