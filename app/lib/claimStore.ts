import { supabaseServer } from "@/lib/supabaseServer";

/* =========================
   Types
   ========================= */

export type ClaimInput = {
  employer_name: string;
  reason: string;
  start_date: string;
  end_date?: string | null;
};

/* =========================
   Create Claim
   ========================= */

export async function createClaim(
  userId: string,
  input: ClaimInput
) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("claims")
    .insert({
      user_id: userId,
      employer_name: input.employer_name,
      reason: input.reason,
      start_date: input.start_date,
      end_date: input.end_date ?? null,
      status: "SUBMITTED",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/* =========================
   Get Claim By ID
   ========================= */

export async function getClaimById(claimId: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .eq("id", claimId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/* =========================
   Update Claim Status
   ========================= */

export async function updateClaimStatus(
  claimId: string,
  nextStatus: string
) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("claims")
    .update({ status: nextStatus })
    .eq("id", claimId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
