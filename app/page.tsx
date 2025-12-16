"use client";

import { useState } from "react";

export default function Home() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const prices = {
    monthly: [
      { name: "Starter", price: 349 },
      { name: "Core", price: 749 },
      { name: "Pro", price: 999 },
    ],
    annual: [
      { name: "Starter", price: 3499 },
      { name: "Core", price: 7499 },
      { name: "Pro", price: 9999 },
    ],
  };

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">LayoffShield</h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Income preparedness for professionals facing layoffs.
        </p>
        <a
          href="#waitlist"
          className="inline-block mt-10 bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Join Early Access
        </a>
        <p className="mt-6 text-gray-500">
          India-first · Built for an AI-driven global workforce
        </p>
      </section>

      {/* WHO IT IS FOR */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">Who LayoffShield is for</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {[
            "Tech & AI-exposed professionals",
            "Finance, operations & corporate roles",
            "Mid-career professionals with fixed expenses",
            "High performers vulnerable to restructuring",
          ].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-sm p-8 text-lg font-medium">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">
            <div className="p-8 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-semibold">1. Subscribe early</h3>
              <p className="mt-4 text-gray-600">
                Join while employed with a monthly or annual subscription.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-semibold">2. Job loss occurs</h3>
              <p className="mt-4 text-gray-600">
                If laid off, you activate LayoffShield.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50">
              <h3 className="text-xl font-semibold">3. Receive support</h3>
              <p className="mt-4 text-gray-600">
                Monthly financial support during your recovery period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center">Pricing</h2>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              billing === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-6 py-2 rounded-lg font-semibold ${
              billing === "annual" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Annual (Save ~15%)
          </button>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {prices[billing].map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-sm p-10 text-center ${
                plan.name === "Core" ? "border-2 border-blue-600 scale-105" : ""
              }`}
            >
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-bold">₹{plan.price}</p>
              <p className="mt-2 text-gray-500">
                {billing === "monthly" ? "per month" : "per year"}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          LayoffShield is currently in development and is not an insurance product.
        </p>
      </section>

      {/* UNIT ECONOMICS */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">How this works as a business</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Predictable revenue</h3>
              <p>Subscriptions create recurring, forecastable income.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Risk pooling</h3>
              <p>Only a small % of subscribers need support at any time.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Capital efficient</h3>
              <p>No large upfront claims infrastructure required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">Why this exists</h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
          LayoffShield was shaped by firsthand experience in restructuring,
          workforce risk, and financial planning — where layoffs are often
          predictable, but support systems react too late.
        </p>
        <p className="mt-4 font-medium text-gray-800">
          The mission is simple: reduce panic, protect income, and give people
          time to recover with dignity.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">FAQs</h2>

          <div className="mt-12 space-y-6 text-gray-700">
            <p><strong>Is this insurance?</strong><br />No. LayoffShield is a subscription-based financial support model.</p>
            <p><strong>When do payouts happen?</strong><br />After verified job loss, during a defined support period.</p>
            <p><strong>Can I cancel anytime?</strong><br />Yes, subscriptions are flexible.</p>
            <p><strong>Is this live?</strong><br />Currently in early access and validation.</p>
          </div>
        </div>
      </section>

      {/* INDIA VS GLOBAL */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">India first. Global next.</h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
          Designed for India’s workforce today, with future expansion planned
          for SEA, UAE, UK, and the US.
        </p>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="bg-blue-600 text-white py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Join the early access waitlist</h2>
          <p className="mt-6 text-lg text-blue-100">
            Help shape LayoffShield before launch.
          </p>
          <a
            href="https://forms.gle/FnycZcZDr8bDkTY7A"
            target="_blank"
            className="inline-block mt-10 bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

    </main>
  );
}