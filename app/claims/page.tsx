"use client";

import React, { useState } from "react";

export default function ClaimsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // placeholder submit logic
      await new Promise((res) => setTimeout(res, 1000));
      alert("Claim submitted");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>Submit Your Claim</h1>

      <p style={description}>
        Please provide accurate information. Claims are reviewed securely and
        confidentially.
      </p>

      <button style={button} onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Claim"}
      </button>

      <p style={footerText}>
        Your information is encrypted and reviewed confidentially.
      </p>
    </div>
  );
}

/* =========================
   Styles (STRICTLY TYPED)
   ========================= */

const container: React.CSSProperties = {
  maxWidth: 480,
  margin: "40px auto",
  padding: 24,
  borderRadius: 8,
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const title: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 12,
  textAlign: "center",
};

const description: React.CSSProperties = {
  fontSize: 14,
  color: "#444",
  marginBottom: 24,
  textAlign: "center",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontSize: 14,
  fontWeight: 600,
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const footerText: React.CSSProperties = {
  marginTop: 24,
  fontSize: 12,
  color: "#666",
  textAlign: "center", // ✅ properly typed
};
