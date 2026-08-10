import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY
const GHL_PIT = process.env.GHL_PIT
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'FTJ4gOGLsZazXuve0YSY'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, industry } = body

    if (!name || !email || !industry) {
      return NextResponse.json({ success: false, error: 'Name, email, and industry are required.' }, { status: 400 })
    }

    if (!SUPABASE_KEY) {
      console.error('Enrollment configuration error: missing Supabase publishable/anon key')
      return NextResponse.json({ success: false, error: 'Enrollment is temporarily unavailable.' }, { status: 503 })
    }

    const leadData = {
      full_name: name,
      email,
      phone: phone || null,
      industry_interest: industry,
      school_selected: industry,
      lead_source: 'website',
      funnel_stage: 'new_lead',
      buyer_status: 'prospect'
    }

    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/lu_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(leadData)
    })

    if (!supabaseResponse.ok) {
      const detail = await supabaseResponse.text()
      console.error('Supabase enrollment insert failed:', supabaseResponse.status, detail)
      return NextResponse.json({ success: false, error: 'We could not save your enrollment request.' }, { status: 502 })
    }

    // CRM sync is secondary. A missing CRM credential must never block lead capture.
    if (GHL_PIT) {
      const schoolTagMap = {
        experience_economy: 'lu_experience_design',
        hospitality_nightlife: 'lu_hospitality_cultural',
        personal_brand: 'lu_brand_architecture',
        automation_operator: 'lu_operational_systems',
        food_brand: 'lu_hospitality_cultural',
        audience_growth: 'lu_brand_architecture',
        merch_ecommerce: 'lu_commercial_strategy',
        service_business: 'lu_enterprise',
        app_launch: 'lu_operational_systems',
        venue_development: 'lu_hospitality_cultural'
      }

      const tags = ['lu_lead', 'lu_waitlist', 'course_student']
      if (schoolTagMap[industry]) tags.push(schoolTagMap[industry])

      const nameParts = name.trim().split(/\s+/)
      const ghlContact = {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email,
        phone: phone || undefined,
        locationId: GHL_LOCATION_ID,
        tags,
        source: 'Dr. Dorsey Courses Website'
      }

      const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GHL_PIT}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28'
        },
        body: JSON.stringify(ghlContact)
      })

      if (!ghlResponse.ok) {
        console.error('GHL sync failed:', ghlResponse.status, await ghlResponse.text())
      }
    }

    return NextResponse.json({ success: true, message: 'Enrollment request received.' })
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json({ success: false, error: 'Unexpected enrollment error.' }, { status: 500 })
  }
}
