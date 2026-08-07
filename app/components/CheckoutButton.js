'use client'

import { useState } from 'react'

export default function CheckoutButton({ priceId, programKey, label = 'Enroll Now', className = '' }) {
  const [loading, setLoading] = useState(false)

  async function checkout() {
    if (!priceId || loading) return
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode: 'payment', programKey }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error(error)
      alert('Checkout could not start. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={checkout}
      disabled={!priceId || loading}
      className={`px-7 py-3 bg-[#D4B87A] text-[#080604] text-xs font-semibold tracking-[0.15em] uppercase disabled:opacity-40 hover:bg-[#E2CC9A] transition ${className}`}
    >
      {loading ? 'Opening Checkout…' : label}
    </button>
  )
}
