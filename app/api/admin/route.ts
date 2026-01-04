cat > app/api/admin/claims/route.ts <<'EOF'
import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

/**
 * GET /api/admin/claims
 */
export async function GET() {
  const { data, error } = await supabaseServer
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

/**
 * PATCH /api/admin/claims
 */
export async function PATCH(req: Request) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer
    .from("claims")
    .update({ status })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
EOF
