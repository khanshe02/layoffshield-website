"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"individual" | "business">("individual");

  // Individual inputs
  const [income, setIncome] = useState(15000);
  const [protection, setProtection] = useState(50);
  const [duration, setDuration] = useState<3 | 6>(6);

  // Business inputs
  const [employees, setEmployees] = useState(10);
  const [bizProtection, setBizProtection] = useState(50);
  const [bizDuration, setBizDuration] = useState<3 | 6>(6);

  /**
   * ACTUARIAL NOTE:
   * 6-month waiting period applies to ALL plans.
   * Pricing assumes:
   * - No claims allowed in first 6 months
   * - Reduced anti-selection
   * - Lower effective claim probability
   */

  const individualPrice = Math.max(
    199,
    Math.round((income * protection * duration) / 10000)
  );

  const businessPrice = Math.max(
    1999,
    Math.round((employees * bizProtection * bizDuration * 99) / 10)
  );

  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-white border-b z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <span className="text-xl font-semibold tracking-tight">
            LayoffShield
          </span>
        </div>
      </header>

      <div className="h-20" />

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Income Protection for an Uncertain Job Market
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Financial support during verified layoffs — for individuals and
          employers.
        </p>

        <a
          href="#pricing"
          className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          View pricing
        </a>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="bg-white py-28">
        <div className="max-w-3xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Pricing</h2>
            <p className="mt-4 text-gray-600 text-lg">
              All plans include a mandatory 6-month waiting period
            </p>
          </div>

          {/* MODE SWITCH */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
              <button
                onClick={() => setMode("individual")}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  mode === "individual"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setMode("business")}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  mode === "business"
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Business
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-10 shadow-sm space-y-10">

            {/* ================= INDIVIDUAL ================= */}
            {mode === "individual" && (
              <>
                <div>
                  <label className="block font-semibold mb-2">
                    Monthly take-home income (₹)
                  </label>
                  <input
                    type="number"
                    min={15000}
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full border rounded-xl px-4 py-3 text-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-4">
                    Income protection
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[40, 50, 60].map((p) => (
                      <button
                        key={p}
                        onClick={() => setProtection(p)}
                        className={`py-4 rounded-xl font-semibold ${
                          protection === p
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-4">
                    Protection duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[3, 6].map((m) => (
                      <button
                        key={m}
                        onClick={() => setDuration(m as 3 | 6)}
                        className={`py-4 rounded-xl font-semibold ${
                          duration === m
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Monthly subscription
                  </p>
                  <p className="text-5xl font-bold text-blue-600 mt-3">
                    ₹{individualPrice}
                  </p>
                </div>
              </>
            )}

            {/* ================= BUSINESS ================= */}
            {mode === "business" && (
              <>
                <div>
                  <label className="block font-semibold mb-2">
                    Employees covered
                  </label>
                  <input
                    type="number"
                    min={5}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full border rounded-xl px-4 py-3 text-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-4">
                    Coverage level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[40, 50, 60].map((p) => (
                      <button
                        key={p}
                        onClick={() => setBizProtection(p)}
                        className={`py-4 rounded-xl font-semibold ${
                          bizProtection === p
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        {p}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-4">
                    Protection duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[3, 6].map((m) => (
                      <button
                        key={m}
                        onClick={() => setBizDuration(m as 3 | 6)}
                        className={`py-4 rounded-xl font-semibold ${
                          bizDuration === m
                            ? "bg-blue-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Monthly business subscription
                  </p>
                  <p className="text-5xl font-bold text-blue-600 mt-3">
                    ₹{businessPrice}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= WAITLIST (RESTORED) ================= */}
      <section
        id="waitlist"
        className="bg-blue-600 text-white py-28 text-center"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold">
            Join the early access waitlist
          </h2>
          <p className="mt-6 text-blue-100 text-lg">
            Help shape LayoffShield before launch.
          </p>

          <a
            href="https://forms.gle/FnycZcZDr8bDkTY7A"
            target="_blank"
            className="inline-block mt-10 bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-12 text-center">
        <p className="font-semibold">LayoffShield</p>
        <p className="text-sm text-gray-600 mt-2">
          India first · Global next
        </p>
        <p className="mt-2 text-xs text-gray-400">
          ©️ {new Date().getFullYear()} LayoffShield
        </p>
      </footer>

    </main>
  );
}