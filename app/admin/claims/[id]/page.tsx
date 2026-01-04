"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Claim = {
  id: string;
  status: string;
  amount: number;
  created_at: string;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const claimId = params.id as string;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!claimId) return;

    fetch(`/api/admin/claims/${claimId}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error);
        return body;
      })
      .then(setClaim)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [claimId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!claim) return <div>No claim found</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Review Claim</h1>
      <p><strong>ID:</strong> {claim.id}</p>
      <p><strong>Status:</strong> {claim.status}</p>
      <p><strong>Amount:</strong> {claim.amount}</p>
      <p><strong>Created:</strong> {claim.created_at}</p>
    </div>
  );
}
