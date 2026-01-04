export const runtime = "nodejs";

import { NextResponse } from "next/server";
import supabase from "@/src/supabase/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      user_id,
      full_name,
      aadhaar_number,
      pan_number,
      date_of_birth,
    } = body;

    if (!user_id || !aadhaar_number || !pan_number) {
      return NextResponse.json(
        { error: "Missing required KYC fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("kyc")
      .insert([
        {
          user_id,
          full_name,
          aadhaar_number,
          pan_number,
          date_of_birth,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}