'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Employment() {
  const router = useRouter()
  const [company, setCompany] = useState('')
  const [salary, setSalary] = useState('')

  return (
    <>
      <h3>Employment details</h3>

      <input
        placeholder="Company name"
        value={company}
        onChange={e => setCompany(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Last monthly salary"
        value={salary}
        onChange={e => setSalary(e.target.value)}
        style={styles.input}
      />

      <button
        style={styles.button}
        onClick={async () => {
          await fetch('/api/onboarding', {
            method: 'POST',
            body: JSON.stringify({
              step: 'employment',
              company,
              salary,
            }),
          })
          router.push('/onboarding/coverage')
        }}
      >
        Continue
      </button>
    </>
  )
}

const styles = {
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    border: '1px solid #e5e7eb',
  },
  button: {
    width: '100%',
    padding: 14,
    background: '#1e40af',
    color: '#fff',
    borderRadius: 12,
    border: 'none',
    fontWeight: 600,
  },
}