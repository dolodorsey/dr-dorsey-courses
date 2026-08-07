const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR'

async function readTable(table, query = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ''}`
  const response = await fetch(url, {
    headers: { apikey: SUPABASE_KEY },
    next: { revalidate: 300 },
  })
  if (!response.ok) {
    console.error(`TLU data read failed: ${table}`, response.status, await response.text())
    return []
  }
  return response.json()
}

export async function getFlagshipCourses() {
  return readTable('tlu_courses', 'select=slug,title,subtitle,description,school_name,price_label,price_cents,duration_minutes,lesson_count,target_customer,transformation_promise,learning_outcomes,bonuses,featured,sort_order&published=eq.true&school_name=not.is.null&order=sort_order.asc')
}

export async function getCourse(slug) {
  const rows = await readTable('tlu_courses', `select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`)
  return rows[0] || null
}

export async function getFaqs() {
  return readTable('tlu_faqs', 'select=category,question,answer,sort_order&published=eq.true&order=sort_order.asc')
}

export async function getGlossary() {
  return readTable('tlu_glossary_terms', 'select=term,slug,definition,category,example,related_terms,sort_order&published=eq.true&order=category.asc,sort_order.asc')
}

export async function getTemplates() {
  return readTable('tlu_templates', 'select=slug,title,description,category,file_url,file_type,access_level,course_slug,preview_text,sort_order&published=eq.true&order=sort_order.asc')
}

export async function getDocs() {
  return readTable('tlu_docs', 'select=slug,title,summary,content_md,category,access_level,sort_order&published=eq.true&order=sort_order.asc')
}

export async function getServiceOffers() {
  return readTable('tlu_service_offers', 'select=slug,title,category,description,starting_price_cents,price_label,turnaround_label,deliverables,intake_fields,sort_order&active=eq.true&order=sort_order.asc')
}

export async function getConsultations() {
  return readTable('tlu_consultation_offers', 'select=slug,name,description,duration_minutes,price_cents,price_label,requires_application,target_customer,transformation_promise,includes,deliverables,preparation_required,capacity_per_week,booking_url,checkout_url,sales_status,offer_kind,billing_period,sort_order&published=eq.true&sales_status=eq.live&order=sort_order.asc')
}

export async function getMembershipTiers() {
  return readTable('lu_subscription_tiers', 'select=tier_name,tier_key,monthly_price_cents,annual_price_cents,annual_savings_display,includes,perks,event_discount_pct,merch_discount_pct,consultation_included,consultation_minutes,consultation_frequency,community_access,stripe_monthly_price_id,stripe_annual_price_id&status=eq.active&order=monthly_price_cents.asc.nullslast')
}

export { SUPABASE_URL, SUPABASE_KEY }
