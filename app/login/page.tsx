'use client'

import { useState } from 'react'
import { supabase } from '../../src/supabase/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendLink = async () => {
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Brand */}
        <h1 style={styles.logo}>LayoffShield</h1>
        <p style={styles.subtitle}>
          Income protection when layoffs strike
        </p>

        {!sent ? (
          <>
            <label style={styles.label}>Work Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />

            <button onClick={sendLink} style={styles.button}>
              Send secure login link
            </button>

            {error && <p style={styles.error}>{error}</p>}
          </>
        ) : (
          <div style={styles.successBox}>
            <p style={{ marginBottom: 8 }}>
              We’ve sent a secure login link to:
            </p>
            <strong>{email}</strong>
            <p style={{ marginTop: 12, fontSize: 14, color: '#666' }}>
              Please check your inbox.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f7f8'
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: '#ffffff',
    padding: '40px 36px',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  logo: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 14,
    color: '#555'
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    display: 'block'
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid #ccc',
    marginBottom: 16,
    fontSize: 14
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    background: '#000000',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer'
  },
  error: {
    marginTop: 12,
    color: '#d93025',
    fontSize: 13
  },
  successBox: {
    textAlign: 'center',
    padding: '16px 0'
  }
}