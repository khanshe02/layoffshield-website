"use client";

import { useState } from "react";

const TERMINATION_REASONS = [
  { value: "layoff", label: "Layoff / Workforce Reduction", covered: true },
  { value: "redundancy", label: "Role Redundancy", covered: true },
  { value: "company_shutdown", label: "Company Shutdown / Closure", covered: true },
  { value: "project_ended", label: "Project / Contract Ended", covered: true },
  { value: "restructuring", label: "Business Restructuring", covered: true },
  { value: "performance", label: "Performance Related (Not Covered)", covered: false },
  { value: "misconduct", label: "Misconduct / Policy Violation (Not Covered)", covered: false },
  { value: "resignation", label: "Voluntary Resignation (Not Covered)", covered: false },
];

export default function ClaimsPage() {
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedReason = TERMINATION_REASONS.find(
    (r) => r.value === reason
  );

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!lastWorkingDay || !reason || !selectedReason) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employer: "LayoffShield User",
          reason,
          last_working_day: lastWorkingDay,
          is_covered: selectedReason.covered,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLastWorkingDay("");
      setReason("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Submit a Claim</h1>

        <p style={subtitleStyle}>
          We’ll securely verify your information to assess eligibility for
          income protection.
        </p>

        <div style={fieldGroup}>
          <label style={labelStyle}>Last working day</label>
          <input
            type="date"
            value={lastWorkingDay}
            onChange={(e) => setLastWorkingDay(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={fieldGroup}>
          <label style={labelStyle}>Reason for job loss</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select a reason</option>
            {TERMINATION_REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {selectedReason && !selectedReason.covered && (
          <div style={eligibilityWarning}>
            This reason is typically not covered. You may still submit your
            claim for review.
          </div>
        )}

        {error && <p style={errorStyle}>{error}</p>}
        {success && (
          <p style={successStyle}>
            Claim submitted successfully. We’ll review this shortly.
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={buttonStyle(loading)}
        >
          {loading ? "Submitting…" : "Submit Claim"}
        </button>

        <p style={footerText}>
          Your information is encrypted and reviewed confidentially.
        </p>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f4f7fb",
  padding: 24,
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  background: "#ffffff",
  padding: "40px 42px",
  borderRadius: 18,
  boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  marginBottom: 8,
  letterSpacing: "-0.3px",
};

const subtitleStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: 14,
  marginBottom: 28,
};

const fieldGroup = { marginBottom: 20 };
const labelStyle = { fontWeight: 600, marginBottom: 6, display: "block" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
};

const buttonStyle = (loading: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: 10,
  fontWeight: 600,
  opacity: loading ? 0.7 : 1,
});

const eligibilityWarning: React.CSSProperties = {
  background: "#fff7ed",
  color: "#92400e",
  padding: "10px 12px",
  borderRadius: 8,
  fontSize: 13,
  marginBottom: 14,
  border: "1px solid #fed7aa",
};

const errorStyle = { color: "#dc2626", marginBottom: 12 };
const successStyle = { color: "#16a34a", marginBottom: 12 };
const footerText = {
  marginTop: 18,
  fontSize: 12,
  color: "#6b7280",
  textAlign: "center",
};
