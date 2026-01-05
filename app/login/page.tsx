"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/onboarding/profile");
      }
    });
  }, [router]);

  const login = async () => {
    await supabase.auth.signInWithOtp({ email });
  };

  return (
    <div style={{ maxWidth: 420, margin: "80px auto" }}>
      <h1 style={{ fontWeight: 700, color: "#000", marginBottom: 16 }}>
        Sign in to LayoffShield
      </h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: 12,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "12px",
          background: "#000",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Continue
      </button>
    </div>
  );
}
