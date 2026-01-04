"use client";

import { useEffect, useState } from "react";

type Claim = {
  id: string;
  employer: string;
  reason: string;
  status: string;
  eligibility_status: string | null;
};

const pill = (text: string, color: string) => (
  <span
    style={{
      background: color,
      color: "#fff",
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
      textTransform: "uppercase",
    }}
  >
    {text}
  </span>
);

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClaims = async () => {
    try {
      const res = await fetch("/api/admin/claims");
      if (!res.ok) throw new Error("Failed to load claims");
      const data = await res.json();
      setClaims(data);
    } catch {
      setError("Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const runEligibility = async (id: string) => {
    await fetch("/api/admin/claims/eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadClaims();
  };

  const updateStatus = async (id: string, nextStatus: string) => {
    await fetch("/api/admin/claims/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nextStatus }),
    });
    loadClaims();
  };

  if (loading) return <p style={{ padding: 40 }}>Loading claims…</p>;
  if (error) return <p style={{ padding: 40, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
        Claims Review
      </h1>

      <table
        width="100%"
        cellPadding={12}
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
            <th>Employer</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Eligibility</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td>{c.employer}</td>
              <td>{c.reason}</td>

              <td>
                {pill(
                  c.status,
                  c.status === "PENDING"
                    ? "#f59e0b"
                    : c.status === "APPROVED"
                    ? "#10b981"
                    : "#ef4444"
                )}
              </td>

              <td>
                {c.eligibility_status
                  ? pill(
                      c.eligibility_status,
                      c.eligibility_status === "ELIGIBLE"
                        ? "#22c55e"
                        : "#ef4444"
                    )
                  : "—"}
              </td>

              <td>
                <a
                  href={`/admin/claims/${c.id}`}
                  style={{
                    marginRight: 10,
                    color: "#2563eb",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Review
                </a>

                {!c.eligibility_status && (
                  <button
                    onClick={() => runEligibility(c.id)}
                    style={{ marginRight: 8 }}
                  >
                    Run Eligibility
                  </button>
                )}

                {c.eligibility_status === "ELIGIBLE" &&
                  c.status === "PENDING" && (
                    <button
                      onClick={() => updateStatus(c.id, "APPROVED")}
                      style={{ marginRight: 8 }}
                    >
                      Approve
                    </button>
                  )}

                {c.status === "PENDING" && (
                  <button onClick={() => updateStatus(c.id, "REJECTED")}>
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
