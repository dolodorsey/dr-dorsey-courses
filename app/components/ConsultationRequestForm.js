'use client'

import { useState } from 'react'

export default function ConsultationRequestForm({ offers = [] }) {
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')
  const inputClass = 'w-full bg-[#0f0d0a] border border-[#D4B87A]/15 px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/25 focus:outline-none focus:border-[#D4B87A]/60'

  async function submit(event) {
    event.preventDefault()
    setState('sending')
    setMessage('')
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries())

    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request failed')
      event.currentTarget.reset()
      setState('sent')
      setMessage('Application received. The request is now in the consultation review queue.')
    } catch (error) {
      console.error(error)
      setState('error')
      setMessage('We could not submit the application. Please review the form and try again.')
    }
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      <select name="offer_slug" required defaultValue="" className={`${inputClass} md:col-span-2`}>
        <option value="" disabled>Select consultation</option>
        {offers.filter((offer) => offer.offer_kind === 'consultation').map((offer) => (
          <option key={offer.slug} value={offer.slug}>{offer.name} — {offer.price_label}</option>
        ))}
      </select>
      <input className={inputClass} name="contact_name" required placeholder="Full name" />
      <input className={inputClass} name="contact_email" required type="email" placeholder="Email" />
      <input className={inputClass} name="contact_phone" placeholder="Phone" />
      <input className={inputClass} name="company_name" placeholder="Company / brand" />
      <input className={`${inputClass} md:col-span-2`} name="website_url" placeholder="Website / social link" />
      <input className={`${inputClass} md:col-span-2`} name="primary_goal" required placeholder="What decision or outcome do you need from the session?" />
      <textarea className={`${inputClass} md:col-span-2 min-h-28`} name="current_challenge" required placeholder="What is happening now? Include the real blocker, numbers, context, or decision pressure." />
      <textarea className={`${inputClass} md:col-span-2 min-h-28`} name="desired_outcome" required placeholder="What would a successful result look like after this engagement?" />
      <select className={inputClass} name="budget_range" defaultValue="">
        <option value="">Budget range</option>
        <option>$150–$750</option>
        <option>$750–$2,500</option>
        <option>$2,500–$7,500</option>
        <option>$7,500–$20,000</option>
        <option>$20,000+</option>
      </select>
      <input className={inputClass} name="timeline" placeholder="Decision / implementation timeline" />
      <button disabled={state === 'sending'} className="md:col-span-2 bg-[#D4B87A] text-[#080604] px-6 py-4 text-xs tracking-[0.18em] font-semibold uppercase hover:bg-[#E2CC9A] transition disabled:opacity-50">
        {state === 'sending' ? 'Submitting…' : 'Submit Consultation Request'}
      </button>
      {message && <p className={`md:col-span-2 text-sm ${state === 'error' ? 'text-red-300' : 'text-[#D4B87A]'}`}>{message}</p>}
    </form>
  )
}
