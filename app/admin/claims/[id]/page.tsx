"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Claim = {
  id: string;
  status: string;
  amount: number;
  created_at: string;

  eligibility_status?: string | null;
  eligibility_reason?: string | null;

  auto_approved?: boolean;
  auto_approval_reason?: string | null;

  risk_score?: number | null;
  risk_flags?: string[] | null;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const rawId = params?.id;
  const claimId = typeof rawId === "string" ? rawId : "";

  // 🔒 LayoffShield hard guard — MUST be inside component
  const isInvalidId =
    !claimId ||
    claimId.includes("<") ||
    claimId.includes(">") ||
    claimId.toLowerCase().includes("real_uuid");

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalidId) return;

    const fetchClaim = async () => {
      try {
        const res = await fetch(`/api/admin/claims/${claimId}`);
        const body = await res.json();
        if (!res.ok) throw new Error(body.error);
        setClaim(body);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [claimId, isInvalidId]);

  const run = async (url: string, method = "POST", body?: any) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClaim(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------- RENDER STATES ---------- */

  if (isInvalidId) {
    return (
      <div className="p-10 text-red-600">
        <h2 className="font-semibold">Invalid Claim URL</h2>
        <p className="mt-2 text-sm">
          This page must be opened using a real claim UUID.
        </p>
        <p className="mt-2 text-xs text-gray-600">
          Example: /admin/claims/5c97515f-a6ab-499f-92f9-3291207a4b70
        </p>
      </div>
    );
  }

  if (loading) return <div className="p-10">Loading claim…</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;
  if (!claim) return <div className="p-10">Claim not found</div>;

  return (
    <div className="max-w-4xl p-10 space-y-8">
      <h1 className="text-2xl font-semibold">
        Claim Review – LayoffShield
      </h1>

      {/* Risk Section */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-medium">Fraud & Risk Assessment</h2>

        <Row
          label="Risk Score"
          value={
            claim.risk_score !== null && claim.risk_score !== undefined
              ? `${claim.risk_score} / 100`
              : "Not scored"
          }
        />

        {claim.risk_flags && claim.risk_flags.length > 0 && (
          <ul className="text-sm text-gray-600 list-disc ml-5">
            {claim.risk_flags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        )}

        <button
          onClick={() =>
            run(`/api/admin/claims/${claimId}/risk-score`)
          }
          disabled={actionLoading}
          className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md disabled:opacity-50"
        >
          Run Risk Scoring
        </button>
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
