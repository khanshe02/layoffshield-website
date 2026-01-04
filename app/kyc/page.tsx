'use client'

import { useState } from 'react'

export default function KYCPage() {
  const [aadhaar, setAadhaar] = useState('')
  const [pan, setPan] = useState('')
  const [dob, setDob] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitKYC = async () => {
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar_number: aadhaar,
          pan_number: pan,
          date_of_birth: dob,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'KYC failed')
      }

      setSuccess(true)
      setAadhaar('')
      setPan('')
      setDob('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        KYC Verification
      </h1>

      <input
        placeholder="Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="PAN Number"
        value={pan}
        onChange={(e) => setPan(e.target.value.toUpperCase())}
        style={inputStyle}
      />

      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={submitKYC}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? 'Submitting…' : 'Submit KYC'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 10 }}>KYC submitted successfully</p>}
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: '1px solid #ccc',
}

const buttonStyle = {
  width: '100%',
  padding: 12,
  background: '#0f172a',
  color: '#fff',
  borderRadius: 6,
  border: 'none',
  fontWeight: 600,
}