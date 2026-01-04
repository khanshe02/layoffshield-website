"use client";

import { useEffect, useState } from "react";

type Claim = {
  id: string;
  employer: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  riskScore: number;
  reasons: string[];
};

export default function ReviewPage() {
  const [claims, setClaims] = useState<Claim[]>([]);

  const loadClaims = async () => {
    const res = await fetch("/api/claims");
    const data = await res.json();
    setClaims(data);
  };

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    await fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadClaims();
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const statusColor = (status: Claim["status"]) => {
    if (status === "APPROVED") return "#16a34a"; // green
    if (status === "REJECTED") return "#dc2626"; // red
    return "#f59e0b"; // amber
  };

  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Manual Claim Review
      </h1>

      {claims.length === 0 && (
        <p style={{ color: "#666" }}>No claims submitted yet.</p>
      )}

      {claims.map((claim) => (
        <div
          key={claim.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: "520px",
          }}
        >
          <p><strong>Employer:</strong> {claim.employer}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "20px",
                color: "#fff",
                fontSize: "12px",
                marginLeft: "8px",
                backgroundColor: statusColor(claim.status),
              }}
            >
              {claim.status}
            </span>
          </p>

          <p><strong>Risk Score:</strong> {claim.riskScore}</p>

          <div style={{ marginTop: "16px" }}>
            <button
              onClick={() => updateStatus(claim.id, "APPROVED")}
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(claim.id, "REJECTED")}
              style={{
                backgroundColor: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}