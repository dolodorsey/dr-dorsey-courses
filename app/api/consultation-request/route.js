import { NextResponse } from 'next/server'
import { SUPABASE_URL, SUPABASE_KEY } from '../../lib/tlu'

async function findOffer(slug) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/tlu_consultation_offers?select=id,slug,price_cents&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`, {
    headers: { apikey: SUPABASE_KEY },
    cache: 'no-store',
  })
  if (!response.ok) return null
  const rows = await response.json()
  return rows[0] || null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const email = String(body.contact_email || '').trim().toLowerCase()
    const name = String(body.contact_name || '').trim()
    const goal = String(body.primary_goal || '').trim()
    const challenge = String(body.current_challenge || '').trim()
    const outcome = String(body.desired_outcome || '').trim()
    const offerSlug = String(body.offer_slug || '').trim()

    if (!offerSlug || name.length < 2 || !email.includes('@') || goal.length < 5 || challenge.length < 10 || outcome.length < 10) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }

    const offer = await findOffer(offerSlug)
    if (!offer) return NextResponse.json({ error: 'Consultation offer not found.' }, { status: 404 })

    const payload = {
      user_id: null,
      offer_id: offer.id,
      brand_key: 'dr_dorsey',
      contact_name: name,
      contact_email: email,
      contact_phone: body.contact_phone || null,
      company_name: body.company_name || null,
      website_url: body.website_url || null,
      primary_goal: goal,
      current_challenge: challenge,
      desired_outcome: outcome,
      budget_range: body.budget_range || null,
      timeline: body.timeline || null,
      amount_cents: offer.price_cents || null,
      source: 'university_consultations_page',
      answers: {
        offer_slug: offerSlug,
        primary_goal: goal,
        current_challenge: challenge,
        desired_outcome: outcome,
        budget_range: body.budget_range || null,
        timeline: body.timeline || null,
      },
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/tlu_consultation_applications`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Consultation request insert failed', response.status, await response.text())
      return NextResponse.json({ error: 'Unable to save consultation request.' }, { status: 500 })
    }

    const rows = await response.json()
    return NextResponse.json({ success: true, applicationId: rows?.[0]?.id || null })
  } catch (error) {
    console.error('Consultation request error', error)
    return NextResponse.json({ error: 'Unable to submit consultation request.' }, { status: 500 })
  }
}
