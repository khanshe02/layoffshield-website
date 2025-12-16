export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
      <h1 style={{ fontSize: "36px" }}>LayoffShield</h1>

      <p style={{ fontSize: "18px", maxWidth: "600px" }}>
        Financial protection when layoffs strike.
      </p>

      <section style={{ marginTop: "40px" }}>
        <h2>What is LayoffShield?</h2>
        <p style={{ maxWidth: "700px" }}>
          LayoffShield is a subscription-based financial safety net designed to
          support professionals during unexpected job loss.
        </p>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>How it works</h2>
        <ol>
          <li>Subscribe while employed</li>
          <li>Get monthly financial support during layoffs</li>
          <li>Stay focused on recovery, not panic</li>
        </ol>
      </section>

      <section style={{ marginTop: "40px" }}>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Join Early Access
        </button>
      </section>
    </main>
  );
}