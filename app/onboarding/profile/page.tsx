'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    phone: '',
    pan: '',
    country: 'India',
  })

  return (
    <>
      <h3>Verify your details</h3>

      {['email', 'phone', 'pan'].map(k => (
        <input
          key={k}
          placeholder={k.toUpperCase()}
          value={(form as any)[k]}
          onChange={e => setForm({ ...form, [k]: e.target.value })}
          style={styles.input}
        />
      ))}

      <button
        style={styles.button}
        onClick={async () => {
          await fetch('/api/onboarding', {
            method: 'POST',
            body: JSON.stringify({ step: 'profile', ...form }),
          })
          router.push('/onboarding/employment')
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