"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Claim = {
  id: string;
  employer: string;
  reason: string;
  status: string;
  eligibility_status: string | null;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const claimId = params?.id as string;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!claimId) return;

    const loadClaim = async () => {
      try {
        const res = await fetch(`/api/admin/claims/${claimId}`);

        if (!res.ok) {
          const e = await res.json();
          throw new Error(e.error || "Failed");
        }

        const data = await res.json();
        setClaim(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadClaim();
  }, [claimId]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading claim…</div>;
  }

  if (error) {
    return <div style={{ padding: 40 }}>{error}</div>;
  }

  if (!claim) {
    return <div style={{ padding: 40 }}>Claim not found</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>
        Claim Review
      </h1>

      <p><strong>Employer:</strong> {claim.employer}</p>
      <p><strong>Reason:</strong> {claim.reason}</p>
      <p><strong>Status:</strong> {claim.status}</p>
      <p>
        <strong>Eligibility:</strong>{" "}
        {claim.eligibility_status ?? "Not evaluated"}
      </p>
    </div>
  );
}
