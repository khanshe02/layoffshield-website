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
};

export default function ReviewClaimPage() {
  const params = useParams();
  const claimId = params.id as string;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  if (!claimId || claimId.includes("<") || claimId.includes(">")) {
    return <div className="p-8 text-red-600">Invalid claim ID</div>;
  }

  const fetchClaim = async () => {
    try {
      const res = await fetch(`/api/admin/claims/${claimId}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setClaim(body);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimId]);

  const updateStatus = async (status: "APPROVED" | "REJECTED") => {
    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/claims/${claimId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setClaim(body);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const checkEligibility = async () => {
    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/claims/${claimId}/eligibility`,
        { method: "POST" }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setClaim(body);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const triggerPayout = async () => {
    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/admin/claims/${claimId}/payout`,
        { method: "POST" }
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error);
      setClaim(body);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8">Loading…</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!claim) return <div className="p-8">Claim not found</div>;

  return (
    <div className="max-w-3xl p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Claim Review</h1>

      <div className="border rounded-lg p-6 space-y-2 text-sm">
        <Row label="Claim ID" value={claim.id} />
        <Row label="Status" value={claim.status} />
        <Row label="Amount" value={`₹ ${claim.amount}`} />
        <Row label="Submitted" value={new Date(claim.created_at).toLocaleString()} />
        <Row label="Eligibility" value={claim.eligibility_status ?? "PENDING"} />
        {claim.eligibility_reason && (
          <Row label="Eligibility Reason" value={claim.eligibility_reason} />
        )}
        <Row label="Paid At" value={claim.paid_at ?? "Not paid"} />
      </div>

      <div className="flex gap-3">
        <Button
          label="Approve"
          onClick={() => updateStatus("APPROVED")}
          disabled={claim.status === "APPROVED" || actionLoading}
        />
        <Button
          label="Reject"
          onClick={() => updateStatus("REJECTED")}
          disabled={claim.status === "REJECTED" || actionLoading}
        />
        <Button
          label="Check Eligibility"
          onClick={checkEligibility}
          disabled={actionLoading}
        />
        <Button
          label="Pay"
          onClick={triggerPayout}
          disabled={
            claim.status !== "APPROVED" ||
            !!claim.paid_at ||
            actionLoading
          }
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Button({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
    >
      {label}
    </button>
  );
}
