import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR'

export async function GET() {
  const fields = [
    'slug','title','subtitle','description','school_name','cover_url','duration_minutes',
    'lesson_count','price_cents','price_label','certificate_enabled','published','featured',
    'sort_order','build_status','sales_status','curriculum_complete_pct'
  ].join(',')

  const url = `${SUPABASE_URL}/rest/v1/tlu_courses?select=${encodeURIComponent(fields)}&published=eq.true&order=featured.desc,sort_order.asc,title.asc`
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    next: { revalidate: 300 }
  })

  if (!response.ok) {
    console.error('Course catalog fetch failed:', response.status, await response.text())
    return NextResponse.json({ error: 'Unable to load courses.' }, { status: 502 })
  }

  return NextResponse.json({ courses: await response.json() })
}
