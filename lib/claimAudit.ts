import { supabaseServer } from "@/lib/supabaseServer";

type AuditInput = {
  claimId: string;
  action: string;
  previousStatus?: string;
  newStatus?: string;
  metadata?: Record<string, any>;
};

export async function insertClaimAudit({
  claimId,
  action,
  previousStatus,
  newStatus,
  metadata,
}: AuditInput) {
  const supabase = supabaseServer();

  const { error } = await supabase.from("claim_audit").insert({
    claim_id: claimId,
    action,
    previous_status: previousStatus,
    new_status: newStatus,
    actor: "ADMIN",
    metadata: metadata ?? null,
  });

  if (error) {
    // Audit must never break core flow
    console.error("AUDIT LOG FAILED:", error.message);
  }
}
