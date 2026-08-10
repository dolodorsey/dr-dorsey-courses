import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const COURSE_CATALOG_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co/functions/v1/tlu-course-catalog'

export async function GET() {
  const response = await fetch(COURSE_CATALOG_URL, { cache: 'no-store' })

  if (!response.ok) {
    console.error('Course catalog fetch failed:', response.status, await response.text())
    return NextResponse.json({ error: 'Unable to load courses.' }, { status: 502 })
  }

  return NextResponse.json(await response.json())
}
