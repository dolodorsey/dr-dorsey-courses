import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY

export async function GET(_request, { params }) {
  if (!SUPABASE_KEY) {
    return NextResponse.json({ error: 'Course catalog is not configured.' }, { status: 503 })
  }

  const { slug } = await params
  const fields = [
    'slug','title','subtitle','description','school_name','cover_url','trailer_url','instructor_name',
    'instructor_bio','duration_minutes','lesson_count','price_cents','price_label','stripe_price_id',
    'certificate_enabled','completion_threshold','published','featured','build_status','sales_status',
    'curriculum_complete_pct','curriculum_json','bonuses','course_faq','target_customer',
    'transformation_promise','learning_outcomes','prerequisites','delivery_model'
  ].join(',')

  const safeSlug = encodeURIComponent(slug)
  const url = `${SUPABASE_URL}/rest/v1/tlu_courses?select=${encodeURIComponent(fields)}&slug=eq.${safeSlug}&published=eq.true&limit=1`
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    next: { revalidate: 300 }
  })

  if (!response.ok) {
    console.error('Course detail fetch failed:', response.status, await response.text())
    return NextResponse.json({ error: 'Unable to load course.' }, { status: 502 })
  }

  const rows = await response.json()
  if (!rows.length) return NextResponse.json({ error: 'Course not found.' }, { status: 404 })

  return NextResponse.json({ course: rows[0] })
}
