import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, industry } = body

    // 1. Insert into Supabase lu_leads
    const supabaseUrl = 'https://dzlmtvodpyhetvektfuo.supabase.co'
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bG10dm9kcHloZXR2ZWt0ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MTI2NTUsImV4cCI6MjA1NDk4ODY1NX0.GBMkm3ELPmqa2GCamAecPa5GaGsnoRg6WvLMSHCLMj4'
    
    const leadData = {
      full_name: name,
      email: email,
      phone: phone || null,
      industry_interest: industry,
      school_selected: industry,
      lead_source: 'website',
      funnel_stage: 'new_lead',
      buyer_status: 'prospect'
    }

    await fetch(`${supabaseUrl}/rest/v1/lu_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(leadData)
    })

    // 2. Create/update GHL contact with tags
    const ghlPit = 'pit-77a1f83f-1c3a-42e6-b8f4-49575ee4cd97'
    const locationId = 'FTJ4gOGLsZazXuve0YSY'

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
      venue_development: 'lu_hospitality_cultural',
    }

    const tags = ['lu_lead', 'lu_waitlist', 'course_student']
    if (schoolTagMap[industry]) tags.push(schoolTagMap[industry])

    const nameParts = (name || '').split(' ')
    const ghlContact = {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: email,
      phone: phone || undefined,
      locationId: locationId,
      tags: tags,
      source: 'Dr. Dorsey Courses Website'
    }

    await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlPit}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(ghlContact)
    })

    return NextResponse.json({ success: true, message: 'Enrolled successfully' })
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
