import { NextResponse } from 'next/server'
import { SUPABASE_URL, SUPABASE_KEY } from '../../lib/tlu'

export async function POST(request) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const phone = String(body.phone || '').trim() || null
    const industry = String(body.industry || '').trim() || null

    if (name.length < 2 || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Name and valid email are required.' }, { status: 400 })
    }

    const leadData = {
      full_name: name,
      email,
      phone,
      industry_interest: industry,
      school_selected: industry,
      lead_source: 'university_website',
      funnel_stage: 'new_lead',
      buyer_status: 'prospect',
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/lu_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(leadData),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Enrollment insert failed', response.status, await response.text())
      return NextResponse.json({ success: false, error: 'Unable to save enrollment interest.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Enrollment interest saved.' })
  } catch (error) {
    console.error('Enrollment error', error)
    return NextResponse.json({ success: false, error: 'Unable to save enrollment interest.' }, { status: 500 })
  }
}
