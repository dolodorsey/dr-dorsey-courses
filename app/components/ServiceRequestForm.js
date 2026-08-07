'use client'

import { useState } from 'react'

export default function ServiceRequestForm({ offers = [] }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    setStatus('sending')
    setMessage('')
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Request failed')
      event.currentTarget.reset()
      setStatus('sent')
      setMessage('Request received. We’ll use your brief to qualify and scope the project.')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage('We could not submit your request. Please review the form and try again.')
    }
  }

  const inputClass = 'w-full bg-[#0f0d0a] border border-[#D4B87A]/15 px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/25 focus:outline-none focus:border-[#D4B87A]/60'

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      <select name="service_slug" required className={`${inputClass} md:col-span-2`} defaultValue="">
        <option value="" disabled>Select a service</option>
        {offers.map((offer) => <option key={offer.slug} value={offer.slug}>{offer.title} — {offer.price_label || 'Custom quote'}</option>)}
      </select>
      <input className={inputClass} name="full_name" required placeholder="Full name" />
      <input className={inputClass} name="email" required type="email" placeholder="Email" />
      <input className={inputClass} name="phone" placeholder="Phone" />
      <input className={inputClass} name="company" placeholder="Company / brand" />
      <input className={inputClass} name="website" placeholder="Current website or social link" />
      <select className={inputClass} name="budget_range" defaultValue="">
        <option value="">Budget range</option>
        <option>$750–$1,500</option>
        <option>$1,500–$3,000</option>
        <option>$3,000–$7,500</option>
        <option>$7,500–$15,000</option>
        <option>$15,000+</option>
      </select>
      <input className={`${inputClass} md:col-span-2`} name="timeline" placeholder="Desired deadline / timeline" />
      <textarea className={`${inputClass} md:col-span-2 min-h-36`} name="project_brief" required minLength={10} placeholder="What are we building? What outcome do you need? Include requirements, integrations, deliverables, and anything that cannot change." />
      <input className={`${inputClass} md:col-span-2`} name="inspiration_urls" placeholder="Inspiration links (comma separated)" />
      <button disabled={status === 'sending'} className="md:col-span-2 bg-[#D4B87A] text-[#080604] px-6 py-4 text-xs tracking-[0.18em] font-semibold uppercase hover:bg-[#E2CC9A] transition disabled:opacity-50">
        {status === 'sending' ? 'Submitting…' : 'Submit Project Request'}
      </button>
      {message && <p className={`md:col-span-2 text-sm ${status === 'error' ? 'text-red-300' : 'text-[#D4B87A]'}`}>{message}</p>}
    </form>
  )
}
