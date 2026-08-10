import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const COURSE_CATALOG_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/tlu-course-catalog'

export async function GET(_request, { params }) {
  const { slug } = await params
  const response = await fetch(`${COURSE_CATALOG_URL}?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })

  if (!response.ok) {
    const body = await response.text()
    console.error('Course detail fetch failed:', response.status, body)
    const status = response.status === 404 ? 404 : 502
    return NextResponse.json({ error: status === 404 ? 'Course not found.' : 'Unable to load course.' }, { status })
  }

  return NextResponse.json(await response.json())
}
