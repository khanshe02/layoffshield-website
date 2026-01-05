"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Claim = {
  id: string;
  status: string;
  amount: number;
  created_at: string;
  eligibility_status?: string;
  eligibility_reason?: string;
  auto_approved?: boolean;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;
  const claimId = typeof rawId === "string" ? rawId : "";

  // 🔒 HARD STOP — NEVER allow placeholders
  if (
    !claimId ||
    claimId.includes("<") ||
    claimId.includes(">") ||
    claimId === "REAL_UUID"
  ) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        Invalid Claim URL.<br />
        This page must be opened with a real UUID.<br />
        <br />
        Example:<br />
        /admin/claims/5c97515f-a6ab-499f-92f9-3291207a4b70
      </div>
    );
  }

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClaim = async () => {
    try {
      const res = await fetch(`/api/admin/claims/${claimId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClaim(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaim();
  }, [claimId]);

  const run = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClaim(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 32 }}>Loading…</div>;
  if (error) return <div style={{ padding: 32, color: "red" }}>{error}</div>;
  if (!claim) return <div style={{ padding: 32 }}>Claim not found</div>;

  return (
    <div style={{ padding: 32 }}>
      <h1>Claim Review</h1>

      <p><b>ID:</b> {claim.id}</p>
      <p><b>Status:</b> {claim.status}</p>
      <p><b>Eligibility:</b> {claim.eligibility_status ?? "PENDING"}</p>
      {claim.eligibility_reason && <p>{claim.eligibility_reason}</p>}
      <p><b>Auto Approved:</b> {claim.auto_approved ? "Yes" : "No"}</p>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => run(`/api/admin/claims/${claimId}/eligibility`)}>
          Check Eligibility
        </button>

        <button onClick={() => run(`/api/admin/claims/${claimId}/auto-approve`)}>
          Auto Approve
        </button>
      </div>
    </div>
  );
}
