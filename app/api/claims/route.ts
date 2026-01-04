import { NextResponse } from "next/server";
import { supabaseServer } from "../../lib/supabaseClient";

/**
 * POST /api/claims
 * Submit a claim (Phase 3)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      employer,
      reason,
      last_working_day,
    } = body;

    if (!employer || !reason || !last_working_day) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("claims")
      .insert({
        employer,
        reason,
        last_working_day,
        status: "PENDING",
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
