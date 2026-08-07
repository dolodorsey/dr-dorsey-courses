import { NextResponse } from 'next/server'
import { SUPABASE_URL, SUPABASE_KEY } from '../../lib/tlu'

function splitLinks(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const fullName = String(body.full_name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const projectBrief = String(body.project_brief || '').trim()
    const serviceSlug = String(body.service_slug || '').trim()

    if (fullName.length < 2 || !email.includes('@') || projectBrief.length < 10 || !serviceSlug) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }

    const payload = {
      service_slug: serviceSlug,
      full_name: fullName,
      email,
      phone: body.phone || null,
      company: body.company || null,
      website: body.website || null,
      budget_range: body.budget_range || null,
      timeline: body.timeline || null,
      project_brief: projectBrief,
      inspiration_urls: splitLinks(body.inspiration_urls),
      source: 'university_services_studio',
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/tlu_service_requests`, {
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
      console.error('Service request insert failed', response.status, await response.text())
      return NextResponse.json({ error: 'Unable to save request.' }, { status: 500 })
    }

    const rows = await response.json()
    return NextResponse.json({ success: true, requestId: rows?.[0]?.id || null })
  } catch (error) {
    console.error('Service request error', error)
    return NextResponse.json({ error: 'Unable to submit request.' }, { status: 500 })
  }
}
