export const SUPABASE_URL = "https://dzlmtvodpyhetvektfuo.supabase.co";
export const SUPABASE_KEY = "sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR";
export const LMS_FUNCTION = `${SUPABASE_URL}/functions/v1/tlu-lms`;
export const COMMERCE_FUNCTION = `${SUPABASE_URL}/functions/v1/tlu-commerce`;
export const CREDENTIAL_FUNCTION = `${SUPABASE_URL}/functions/v1/tlu-credential`;

const baseHeaders = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

export async function supabaseRest(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...baseHeaders, ...(init.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase request failed: ${res.status}`);
  return res.json();
}

export async function getCatalog() {
  try {
    const [courses, faqs, services, consultations, templates, glossary] = await Promise.all([
      supabaseRest("tlu_courses?brand_key=eq.the_lifestyle_university&published=eq.true&select=id,slug,title,subtitle,description,school_name,target_customer,transformation_promise,learning_outcomes,prerequisites,price_cents,price_label,lesson_count,featured,sort_order,curriculum_json,bonuses,course_faq&order=sort_order.asc"),
      supabaseRest("tlu_faqs?published=eq.true&select=*&order=sort_order.asc"),
      supabaseRest("tlu_service_offers?active=eq.true&select=slug,title,category,description,starting_price_cents,price_label,turnaround_label,sort_order&order=sort_order.asc"),
      supabaseRest("tlu_consultation_offers?published=eq.true&select=slug,name,offer_kind,duration_minutes,price_cents,price_label,description,sort_order&order=sort_order.asc"),
      supabaseRest("tlu_templates?published=eq.true&select=slug,title,description,category,file_type,tool_kind,tags,featured,downloadable,access_level,course_slug,preview_text,sort_order&order=featured.desc,sort_order.asc,title.asc&limit=200"),
      supabaseRest("tlu_glossary_terms?published=eq.true&select=term,definition,category&order=term.asc&limit=200"),
    ]);
    return { courses, faqs, services, consultations, templates, glossary };
  } catch (error) {
    console.error("TLU catalog load failed", error);
    return { courses: [], faqs: [], services: [], consultations: [], templates: [], glossary: [] };
  }
}

export async function getCourse(slug) {
  const rows = await supabaseRest(`tlu_courses?brand_key=eq.the_lifestyle_university&published=eq.true&slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`);
  return rows?.[0] || null;
}

export async function getCredential(certificateNumber) {
  const res = await fetch(`${CREDENTIAL_FUNCTION}?certificate_number=${encodeURIComponent(certificateNumber)}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Credential lookup failed: ${res.status}`);
  return res.json();
}

export function money(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format((cents || 0) / 100);
}
