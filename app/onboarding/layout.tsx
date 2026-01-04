export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <img
            src="/LayoffShield-logo.png"
            alt="LayoffShield"
            style={styles.logo}
          />
          <h2 style={styles.title}>Secure your income</h2>
        </div>

        {children}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f6f9ff, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    borderRadius: 16,
    padding: 28,
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  logo: {
    height: 36,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#0f172a',
  },
}