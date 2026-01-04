'use client'
import { useRouter } from 'next/navigation'

export default function Coverage() {
  const router = useRouter()

  return (
    <>
      <h3>Coverage activated</h3>
      <p>You are now protected by LayoffShield.</p>

      <button
        style={styles.button}
        onClick={async () => {
          await fetch('/api/onboarding', {
            method: 'POST',
            body: JSON.stringify({ step: 'coverage' }),
          })
          router.push('/onboarding/complete')
        }}
      >
        Finish
      </button>
    </>
  )
}

const styles = {
  button: {
    width: '100%',
    padding: 14,
    background: '#1e40af',
    color: '#fff',
    borderRadius: 12,
    border: 'none',
    fontWeight: 600,
    marginTop: 20,
  },
}