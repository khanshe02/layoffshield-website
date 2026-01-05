"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <div style={{ padding: 32 }}>
      {email && (
        <div style={{ marginBottom: 16, color: "#000", fontSize: 14 }}>
          Logged in as <strong>{email}</strong>
        </div>
      )}

      <h2>Profile</h2>
      {/* existing form */}
    </div>
  );
}
