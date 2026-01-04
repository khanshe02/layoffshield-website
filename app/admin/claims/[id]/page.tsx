"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Claim = {
  id: string;
  status: string;
  amount: number;
  created_at: string;
  paid_at?: string | null;
};

export default function ReviewClaimPage() {
  const params = useParams();
  const claimId = params.id as string;

  const [claim, setClaim] = useState<Claim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Hard safety guard (LayoffShield standard)
  if (!claimId || claimId.includes("<") || claimId.includes(">")) {
    return (
      <div className="p-8 text-red-600">
        Invalid claim identifier in URL.
      </div>
    );
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

  if (loading) {
    return <div className="p-8">Loading claim details…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!claim) {
    return <div className="p-8">Claim not found.</div>;
  }

  return (
    <div className="max-w-3xl p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Claim Review</h1>
        <p className="text-sm text-gray-500">
          Admin review & payout control
        </p>
      </header>

      <section className="border rounded-lg p-6 space-y-3">
        <Detail label="Claim ID" value={claim.id} />
        <Detail label="Status" value={claim.status} />
        <Detail label="Amount" value={`₹ ${claim.amount}`} />
        <Detail label="Submitted" value={new Date(claim.created_at).toLocaleString()} />
        <Detail
          label="Paid At"
          value={claim.paid_at ? new Date(claim.paid_at).toLocaleString() : "Not paid"}
        />
      </section>

      <section className="flex gap-4">
        <ActionButton
          label="Approve Claim"
          disabled={claim.status === "APPROVED" || actionLoading}
          onClick={() => updateStatus("APPROVED")}
          variant="approve"
        />

        <ActionButton
          label="Reject Claim"
          disabled={claim.status === "REJECTED" || actionLoading}
          onClick={() => updateStatus("REJECTED")}
          variant="reject"
        />

        <ActionButton
          label="Trigger Payout"
          disabled={
            claim.status !== "APPROVED" ||
            !!claim.paid_at ||
            actionLoading
          }
          onClick={triggerPayout}
          variant="pay"
        />
      </section>

      {actionLoading && (
        <p className="text-sm text-gray-500">
          Processing admin action…
        </p>
      )}
    </div>
  );
}

/* ---------- Small internal components (UI only) ---------- */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  disabled,
  variant,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  variant: "approve" | "reject" | "pay";
}) {
  const styles: Record<typeof variant, string> = {
    approve: "bg-green-600 hover:bg-green-700",
    reject: "bg-red-600 hover:bg-red-700",
    pay: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-sm text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]}`}
    >
      {label}
    </button>
  );
}
