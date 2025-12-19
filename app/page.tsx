"use client";

import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState(15000);
  const [protection, setProtection] = useState(50);
  const [duration, setDuration] = useState(6);

  const monthlyPrice = Math.max(
    199,
    Math.round((income * protection * duration) / 10000)
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

      {/* Spacer */}
      <div className="h-20" />

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Financial Stability During{" "}
          <span className="text-blue-600">Career Disruption</span>
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          LayoffShield provides income-linked support to professionals navigating
          layoffs, restructuring, and AI-driven change.
        </p>

        <a
          href="#pricing"
          className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          See your pricing
        </a>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="bg-white py-28">
        <div className="max-w-3xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Pricing based on your income
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Fair, transparent, and aligned to your earnings
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-10 shadow-sm space-y-10">

            {/* Income */}
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
              <p className="text-sm text-gray-500 mt-2">
                Minimum ₹15,000 · Verified later
              </p>
            </div>

            {/* Protection */}
            <div>
              <label className="block font-semibold mb-4">
                Income protection level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[40, 50, 60].map((p) => (
                  <button
                    key={p}
                    onClick={() => setProtection(p)}
                    className={`py-4 rounded-xl font-semibold text-lg ${
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

            {/* Duration */}
            <div>
              <label className="block font-semibold mb-4">
                Support duration
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[3, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDuration(m)}
                    className={`py-4 rounded-xl font-semibold text-lg ${
                      duration === m
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    {m} months
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Longer duration lowers your monthly price
              </p>
            </div>

            {/* Result */}
            <div className="border-t pt-8 text-center">
              <p className="text-sm text-gray-500">
                Your monthly subscription
              </p>
              <p className="text-5xl font-bold text-blue-600 mt-3">
                ₹{monthlyPrice}
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