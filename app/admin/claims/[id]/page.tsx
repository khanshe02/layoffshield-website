"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Claim = {
  id: string;
  status: string;
  amount: number;
  created_at: string;
  paid_at?: string | null;

  eligibility_status?: string | null;
  eligibility_reason?: string | null;

  auto_approved?: boolean;
  auto_approval_reason?: string | null;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const rawId = params?.id;
  const claimId = typeof rawId === "string" ? rawId : "";

  // 🔒 LayoffShield hard guard
  if (!claimId || claimId.includes("<") || claimId.includes(">")) {
    return (
      <div className="p-10 text-red-600">
        <h1 className="text-lg font-semibold">Invalid Claim URL</h1>
        <p className="text-sm mt-2">
          This page must be accessed using a real claim UUID.
        </p>
      </div>
    );
  }

  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchClaim();
  }, [claimId]);

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

  if (loading) return <div className="p-10">Loading claim…</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;
  if (!claim) return <div className="p-10">Claim not found</div>;

  return (
    <div className="max-w-4xl p-10 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">
          Claim Review – LayoffShield
        </h1>
        <p className="text-sm text-gray-500">
          Internal admin workflow
        </p>
      </header>

      {/* Claim Summary */}
      <section className="border rounded-lg p-6 space-y-3 text-sm">
        <Row label="Claim ID" value={claim.id} />
        <Row label="Status" value={claim.status} />
        <Row label="Amount" value={`₹ ${claim.amount}`} />
        <Row
          label="Submitted At"
          value={new Date(claim.created_at).toLocaleString()}
        />
        <Row
          label="Paid At"
          value={claim.paid_at ? new Date(claim.paid_at).toLocaleString() : "Not paid"}
        />
      </section>

      {/* Eligibility */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-medium">Eligibility Assessment</h2>

        <Row
          label="Eligibility Status"
          value={claim.eligibility_status ?? "PENDING"}
        />

        {claim.eligibility_reason && (
          <p className="text-sm text-gray-600">
            Reason: {claim.eligibility_reason}
          </p>
        )}

        <button
          onClick={() =>
            run(`/api/admin/claims/${claimId}/eligibility`)
          }
          disabled={actionLoading}
          className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
        >
          Run Eligibility Check
        </button>
      </section>

      {/* Auto Approval */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-medium">Auto-Approval (System Decision)</h2>

        <Row
          label="Auto Approved"
          value={claim.auto_approved ? "Yes" : "No"}
        />

        {claim.auto_approval_reason && (
          <p className="text-sm text-gray-600">
            {claim.auto_approval_reason}
          </p>
        )}

        <button
          onClick={() =>
            run(`/api/admin/claims/${claimId}/auto-approve`)
          }
          disabled={
            actionLoading ||
            claim.status !== "SUBMITTED" ||
            claim.eligibility_status !== "ELIGIBLE"
          }
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          Attempt Auto-Approval
        </button>
      </section>

      {/* Manual Override */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-medium">Manual Admin Action</h2>
        <p className="text-sm text-gray-600">
          Use only if system decision is insufficient.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() =>
              run(
                `/api/admin/claims/${claimId}/status`,
                "PATCH",
                { status: "APPROVED" }
              )
            }
            disabled={actionLoading || claim.status === "APPROVED"}
            className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
          >
            Approve Claim
          </button>

          <button
            onClick={() =>
              run(
                `/api/admin/claims/${claimId}/status`,
                "PATCH",
                { status: "REJECTED" }
              )
            }
            disabled={actionLoading || claim.status === "REJECTED"}
            className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
          >
            Reject Claim
          </button>
        </div>
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
