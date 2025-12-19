"use client";

import { useEffect, useState } from "react";

export default function Home() {
  /* =======================
     PRICING CONSTANTS
  ======================== */
  const BASE_RISK_RATE = 0.01;
  const SIX_MONTH_DISCOUNT = 0.85;
  const PLATFORM_BUFFER = 1.2;
  const MAX_MONTHLY_PAYOUT = 75000;
  const MIN_INCOME = 15000;

  /* =======================
     STATE
  ======================== */
  const [income, setIncome] = useState(60000);
  const [coverage, setCoverage] = useState(0.5);
  const [duration, setDuration] = useState(3);

  /* =======================
     PERSISTENCE
  ======================== */
  useEffect(() => {
    const stored = localStorage.getItem("ls_pricing");
    if (stored) {
      const p = JSON.parse(stored);
      setIncome(p.income ?? 60000);
      setCoverage(p.coverage ?? 0.5);
      setDuration(p.duration ?? 3);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ls_pricing",
      JSON.stringify({ income, coverage, duration })
    );
  }, [income, coverage, duration]);

  /* =======================
     HELPERS
  ======================== */
  const formatINR = (v: number) => v.toLocaleString("en-IN");

  const calculatePrice = () => {
    let covered = income * coverage;
    if (covered > MAX_MONTHLY_PAYOUT) covered = MAX_MONTHLY_PAYOUT;
    let rate = BASE_RISK_RATE;
    if (duration === 6) rate *= SIX_MONTH_DISCOUNT;
    return Math.round(covered * rate * PLATFORM_BUFFER);
  };

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-white border-b z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <img
            src="/layoffshield-logo.png"
            alt="LayoffShield logo"
            className="h-10"
          />
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Financial Stability During{" "}
            <span className="text-blue-600">Career Disruption</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            LayoffShield provides income-linked support to professionals
            navigating layoffs, restructuring, and AI-driven change.
          </p>

          <a
            href="#pricing"
            className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            See your pricing
          </a>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            ["Predictable support", "Monthly assistance after verified job loss"],
            ["Designed for AI era", "Built for restructuring & automation"],
            ["Transparent pricing", "Income-based, capped subscriptions"],
          ].map(([title, desc]) => (
            <div key={title} className="p-8 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-28 bg-gray-50">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Pricing based on your income
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Fair, transparent, and aligned to your earnings
          </p>

          <div className="mt-14 bg-white rounded-2xl shadow-sm p-10 space-y-8">

            {/* Income */}
            <div>
              <label className="block font-semibold mb-2">
                Monthly take-home income (₹)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={income === 0 ? "" : formatINR(income)}
                placeholder="e.g. 60,000"
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "").replace(/^0+/, "");
                  const num = Number(raw);
                  if (!isNaN(num)) setIncome(num);
                }}
                onBlur={() => {
                  if (income < MIN_INCOME) setIncome(MIN_INCOME);
                }}
                className="w-full border rounded-lg px-4 py-3 text-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum ₹15,000 · Verified later
              </p>
            </div>

            {/* Coverage */}
            <div>
              <label className="block font-semibold mb-3">
                Income protection level
              </label>
              <div className="flex gap-4">
                {[0.4, 0.5, 0.6].map((v) => (
                  <button
                    key={v}
                    onClick={() => setCoverage(v)}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      coverage === v
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {v * 100}%
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block font-semibold mb-3">
                Support duration
              </label>
              <div className="flex gap-4">
                {[3, 6].map((v) => (
                  <button
                    key={v}
                    onClick={() => setDuration(v)}
                    className={`flex-1 py-3 rounded-lg font-semibold ${
                      duration === v
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {v} months
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="border-t pt-6 text-center">
              <p className="text-gray-500">Your monthly subscription</p>
              <p className="mt-2 text-5xl font-bold">
                ₹{formatINR(calculatePrice())}
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Covers up to ₹
                {formatINR(Math.min(income * coverage, MAX_MONTHLY_PAYOUT))}
                /month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WAITLIST (RESTORED) ================= */}
      <section
        id="waitlist"
        className="bg-blue-600 text-white py-28"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Join the early access waitlist
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Help shape LayoffShield before launch and get priority access.
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
      <footer className="bg-white border-t py-12 text-center text-gray-500">
        <img
          src="/layoffshield-logo.png"
          alt="LayoffShield logo"
          className="h-8 mx-auto mb-4"
        />
        <p>India first · Global next</p>
        <p className="mt-2 text-sm">
          ©️ {new Date().getFullYear()} LayoffShield
        </p>
      </footer>

    </main>
  );
}