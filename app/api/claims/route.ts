import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

/**
 * POST /api/claims
 * Create a new claim (user side)
 */
export async function POST(req: Request) {
  const body = await req.json();

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("claims")
    .insert(body)
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
