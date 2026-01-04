"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Claim = {
  id: string;
  employer: string;
  reason: string;
  status: string;
  eligibility_status: string | null;
};

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/claims")
      .then((r) => r.json())
      .then(setClaims)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Claims Review</h1>

      <table width="100%" cellPadding={12}>
        <thead>
          <tr>
            <th>Employer</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Eligibility</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {claims.map((c) => (
            <tr key={c.id}>
              <td>{c.employer}</td>
              <td>{c.reason}</td>
              <td>{c.status}</td>
              <td>{c.eligibility_status ?? "—"}</td>
              <td>
                <Link href={`/admin/claims/${c.id}`}>
                  Review →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
