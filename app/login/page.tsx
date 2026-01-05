"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const login = async () => {
    if (!email) return;
    setLoading(true);
    await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    setSent(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f7f7",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
<h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
  Sign in to LayoffShield
</h1>


        <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
          We’ll send you a secure magic link to access your account.
        </p>

        {!sent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 14,
                marginBottom: 16,
              }}
            />

            <button
              onClick={login}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 8,
                border: "none",
                background: "#000",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Sending link..." : "Send magic link"}
            </button>
          </>
        ) : (
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              background: "#f0f9ff",
              color: "#0369a1",
              fontSize: 14,
            }}
          >
            Magic link sent. Check your email to continue.
          </div>
        )}

        <p
          style={{
            marginTop: 24,
            fontSize: 12,
            color: "#888",
            textAlign: "center",
          }}
        >
          Your information is encrypted and reviewed confidentially.
        </p>
      </div>
    </div>
  );
}
