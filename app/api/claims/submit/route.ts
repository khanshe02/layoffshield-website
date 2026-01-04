import { NextResponse } from "next/server";
import { supabaseServer } from "../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      user_id,
      last_working_day,
      termination_reason,
      termination_comment,
      documents
    } = body;

    if (!user_id || !last_working_day || !termination_reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("claims")
      .insert({
        user_id,
        last_working_day,
        termination_reason,
        termination_comment: termination_comment || null,
        documents: documents || null,
        status: "pending"
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}