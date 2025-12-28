"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"individual" | "business">("individual");

  // Individual
  const [income, setIncome] = useState(15000);
  const [supportLevel, setSupportLevel] = useState(50);
  const [duration, setDuration] = useState<3 | 6>(6);

  // Business
  const [employees, setEmployees] = useState(10);
  const [bizSupportLevel, setBizSupportLevel] = useState(50);
  const [bizDuration, setBizDuration] = useState<3 | 6>(6);

  /**
   * Platform logic:
   * - Subscription-based support platform
   * - Not insurance
   * - Mandatory 6-month waiting period
   */

  const individualPrice = Math.max(
    199,
    Math.round((income * supportLevel * duration) / 10000)
  );

  const businessPrice = Math.max(
    1999,
    Math.round((employees * bizSupportLevel * bizDuration * 99) / 10)
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
          Financial Stability During{" "}
          <span className="text-blue-600">Career Disruption</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          LayoffShield is a subscription-based platform providing conditional,
          income-linked support and career transition resources when layoffs
          and restructuring happen.
        </p>

        <p className="mt-4 text-sm text-gray-500 max-w-3xl mx-auto">
          This is not insurance. LayoffShield offers supplemental support,
          subject to eligibility rules and waiting periods.
        </p>

        <a
          href="#pricing"
          className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          See your pricing
        </a>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-lg">Subscribe early</h3>
            <p className="mt-3 text-gray-600">
              Choose a plan based on your income and support needs.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-lg">Complete waiting period</h3>
            <p className="mt-3 text-gray-600">
              A mandatory 6-month waiting period ensures long-term fairness.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-lg">Get support if impacted</h3>
            <p className="mt-3 text-gray-600">
              Eligible members receive income support and career assistance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="bg-white py-28">
        <div className="max-w-3xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Pricing aligned to your earnings
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Transparent subscription pricing with clear eligibility rules
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Mandatory 6-month waiting period applies to all plans
            </p>
          </div>

          {/* MODE TOGGLE */}
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

            {/* ========== INDIVIDUAL ========== */}
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
                    Support level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[40, 50, 60].map((p) => (
                      <button
                        key={p}
                        onClick={() => setSupportLevel(p)}
                        className={`py-4 rounded-xl font-semibold ${
                          supportLevel === p
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
                    Support duration
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

            {/* ========== BUSINESS ========== */}
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
                    Support level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[40, 50, 60].map((p) => (
                      <button
                        key={p}
                        onClick={() => setBizSupportLevel(p)}
                        className={`py-4 rounded-xl font-semibold ${
                          bizSupportLevel === p
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
                    Support duration
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

      {/* ================= FAQ ================= */}
      <section className="bg-gray-50 py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Frequently asked questions
          </h2>

          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-semibold text-lg">
                Is LayoffShield an insurance product?
              </h3>
              <p className="mt-2 text-gray-600">
                No. LayoffShield is a subscription-based support platform. It does
                not provide insurance, guaranteed payouts, or regulated insurance
                benefits.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                When do I become eligible for support?
              </h3>
              <p className="mt-2 text-gray-600">
                Eligibility begins after completing a mandatory 6-month waiting
                period from your subscription start date.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                What events qualify for support?
              </h3>
              <p className="mt-2 text-gray-600">
                Involuntary layoffs, company-wide restructuring, or role
                redundancy may qualify, subject to verification and platform
                rules.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                How is support calculated?
              </h3>
              <p className="mt-2 text-gray-600">
                Support is linked to your selected income level, support
                percentage, and duration, and is capped per plan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Can I cancel my subscription anytime?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes. You can cancel at any time. However, eligibility resets if
                you cancel before completing the waiting period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WAITLIST ================= */}
      <section
        id="waitlist"
        className="bg-blue-600 text-white py-28 text-center"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold">
            Join the early access waitlist
          </h2>
          <p className="mt-6 text-blue-100 text-lg">
            Be part of shaping the future of workforce resilience.
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