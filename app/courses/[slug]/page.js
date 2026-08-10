'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function hoursLabel(minutes) {
  if (!minutes) return 'Self-paced'
  const hours = Math.round((minutes / 60) * 10) / 10
  return `${hours} hours`
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params?.slug
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openModule, setOpenModule] = useState(0)
  const [buying, setBuying] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`/api/courses/${encodeURIComponent(slug)}`)
      .then(async r => {
        const data = await r.json()
        if (!r.ok) throw new Error(data.error || 'Unable to load course')
        setCourse(data.course)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  const checkout = async () => {
    if (!course?.stripe_price_id) return
    setBuying(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: course.stripe_price_id, mode: 'payment', programKey: course.slug.replaceAll('-', '_') })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Checkout unavailable')
      if (data.url) window.location.href = data.url
    } catch (e) {
      setError(e.message)
    } finally {
      setBuying(false)
    }
  }

  if (loading) return <main className="min-h-screen bg-[#080604] text-[#F5F0E8] flex items-center justify-center"><p className="font-mono text-xs tracking-[3px] text-[#D4B87A]/60">LOADING COURSE…</p></main>
  if (error && !course) return <main className="min-h-screen bg-[#080604] text-[#F5F0E8] flex items-center justify-center px-6"><div className="max-w-xl text-center"><p className="text-2xl mb-4" style={{fontFamily:'Cormorant Garamond, serif'}}>Course unavailable</p><p className="text-[#F5F0E8]/45 text-sm mb-8">{error}</p><a href="/courses" className="text-[#D4B87A] font-mono text-xs tracking-[2px]">← VIEW COURSE CATALOG</a></div></main>
  if (!course) return null

  const curriculum = Array.isArray(course.curriculum_json) ? course.curriculum_json : []
  const bonuses = Array.isArray(course.bonuses) ? course.bonuses : []
  const faq = Array.isArray(course.course_faq) ? course.course_faq : []
  const outcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : []
  const prerequisites = Array.isArray(course.prerequisites) ? course.prerequisites : []

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <section className="relative px-6 py-16 md:py-24 border-b border-[#D4B87A]/10 overflow-hidden">
        {course.cover_url && <img src={course.cover_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080604]/70 via-[#080604]/85 to-[#080604]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <a href="/courses" className="font-mono text-[10px] tracking-[3px] text-[#D4B87A]/60 hover:text-[#D4B87A]">← ALL COURSES</a>
          <p className="mt-10 font-mono text-[10px] tracking-[4px] uppercase text-[#D4B87A]/65">{course.school_name || 'The Lifestyle University'}</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-light tracking-wide" style={{fontFamily:'Cormorant Garamond, serif'}}>{course.title}</h1>
          {course.subtitle && <p className="mt-3 text-xl text-[#D4B87A]/75" style={{fontFamily:'Cormorant Garamond, serif'}}>{course.subtitle}</p>}
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-[#F5F0E8]/50">{course.description || course.transformation_promise}</p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border border-[#D4B87A]/10">
            {[
              [`${curriculum.length || 0}`, 'MODULES'],
              [`${course.lesson_count || 0}`, 'LESSONS'],
              [hoursLabel(course.duration_minutes), 'CONTENT'],
              [course.certificate_enabled ? 'YES' : 'NO', 'CERTIFICATE']
            ].map(([value, label]) => (
              <div key={label} className="p-5 border-r border-b md:border-b-0 border-[#D4B87A]/10 last:border-r-0">
                <div className="text-2xl text-[#D4B87A]" style={{fontFamily:'Cormorant Garamond, serif'}}>{value}</div>
                <div className="mt-1 font-mono text-[8px] tracking-[2px] text-[#F5F0E8]/30">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            {course.stripe_price_id ? (
              <button onClick={checkout} disabled={buying} className="px-10 py-4 bg-[#D4B87A] text-[#080604] font-semibold tracking-[2px] text-xs disabled:opacity-50">
                {buying ? 'OPENING CHECKOUT…' : `ENROLL NOW${course.price_label ? ` — ${course.price_label}` : ''}`}
              </button>
            ) : (
              <a href="/#enroll" className="px-10 py-4 border border-[#D4B87A]/30 text-[#D4B87A] font-semibold tracking-[2px] text-xs">JOIN WAITLIST</a>
            )}
            <span className="font-mono text-[9px] tracking-[1.5px] text-[#F5F0E8]/25">{course.delivery_model || 'SELF-PACED DIGITAL PROGRAM'}</span>
          </div>
          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </div>
      </section>

      {(course.transformation_promise || course.target_customer || outcomes.length > 0) && (
        <section className="px-6 py-16 md:py-20 border-b border-[#D4B87A]/10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-[9px] tracking-[3px] uppercase text-[#D4B87A]/60">Transformation</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light" style={{fontFamily:'Cormorant Garamond, serif'}}>What this program is built to change</h2>
              <p className="mt-5 text-[#F5F0E8]/50 leading-relaxed">{course.transformation_promise || course.description}</p>
              {course.target_customer && <p className="mt-6 text-sm text-[#F5F0E8]/35"><span className="text-[#D4B87A]">Best for:</span> {course.target_customer}</p>}
            </div>
            <div className="border border-[#D4B87A]/10 bg-[#0f0d0a] p-6">
              <p className="font-mono text-[9px] tracking-[3px] uppercase text-[#D4B87A]/60 mb-5">Learning Outcomes</p>
              <ul className="space-y-3">
                {(outcomes.length ? outcomes : ['Understand the operating model','Build a practical implementation plan','Use the included templates and systems','Apply the framework to a real business']).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#F5F0E8]/55"><span className="text-[#D4B87A]">◆</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-16 md:py-24 bg-[#0f0d0a]/40 border-b border-[#D4B87A]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[4px] uppercase text-[#D4B87A]/60">Full Curriculum</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-light" style={{fontFamily:'Cormorant Garamond, serif'}}>{curriculum.length} modules · {course.lesson_count || 0} lessons</h2>
          </div>

          {curriculum.length ? (
            <div className="space-y-3">
              {curriculum.map((module, i) => {
                const lessons = Array.isArray(module.lessons) ? module.lessons : []
                return (
                  <div key={`${module.module || i}-${module.title}`} className="border border-[#D4B87A]/10 bg-[#0f0d0a]">
                    <button onClick={() => setOpenModule(openModule === i ? -1 : i)} className="w-full p-5 md:p-6 flex items-center justify-between gap-5 text-left">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[#D4B87A] text-sm">{String(module.module || i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3 className="text-xl" style={{fontFamily:'Cormorant Garamond, serif'}}>{module.title}</h3>
                          <p className="font-mono text-[9px] tracking-[1.5px] text-[#F5F0E8]/25 mt-1">{lessons.length} LESSONS</p>
                        </div>
                      </div>
                      <span className="text-[#D4B87A] text-xl">{openModule === i ? '−' : '+'}</span>
                    </button>
                    {openModule === i && (
                      <div className="px-6 pb-6 pt-5 border-t border-[#D4B87A]/8">
                        <ol className="space-y-3 md:ml-10">
                          {lessons.map((lesson, li) => <li key={li} className="flex gap-3 text-sm text-[#F5F0E8]/55"><span className="font-mono text-[9px] text-[#D4B87A]/50 mt-1">{String(li + 1).padStart(2, '0')}</span><span>{lesson}</span></li>)}
                        </ol>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="border border-[#D4B87A]/10 p-8 text-center text-[#F5F0E8]/40">Curriculum is being finalized. Join the waitlist for release access.</div>
          )}
        </div>
      </section>

      {bonuses.length > 0 && (
        <section className="px-6 py-16 md:py-20 border-b border-[#D4B87A]/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-light mb-10" style={{fontFamily:'Cormorant Garamond, serif'}}>Templates & Bonuses Included</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {bonuses.map((bonus, i) => <div key={i} className="border border-[#D4B87A]/10 bg-[#0f0d0a] p-4 flex gap-3"><span className="font-mono text-[10px] text-[#D4B87A]">{String(i + 1).padStart(2, '0')}</span><span className="text-sm text-[#F5F0E8]/55">{bonus}</span></div>)}
            </div>
          </div>
        </section>
      )}

      {(faq.length > 0 || prerequisites.length > 0) && (
        <section className="px-6 py-16 md:py-20 border-b border-[#D4B87A]/10 bg-[#0f0d0a]/35">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-light mb-6" style={{fontFamily:'Cormorant Garamond, serif'}}>FAQ</h2>
              <div className="space-y-5">
                {faq.map((item, i) => <div key={i}><h3 className="text-[#D4B87A] text-sm">{item.q}</h3><p className="mt-2 text-sm leading-relaxed text-[#F5F0E8]/45">{item.a}</p></div>)}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6" style={{fontFamily:'Cormorant Garamond, serif'}}>Before You Start</h2>
              {prerequisites.length ? <ul className="space-y-3">{prerequisites.map((p, i) => <li key={i} className="flex gap-3 text-sm text-[#F5F0E8]/50"><span className="text-[#D4B87A]">◆</span>{p}</li>)}</ul> : <p className="text-sm text-[#F5F0E8]/45">No special credentials required. Come ready to implement.</p>}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light" style={{fontFamily:'Cormorant Garamond, serif'}}>Ready to execute?</h2>
          <p className="mt-4 text-[#F5F0E8]/45">Move from information to implementation with a complete course, templates, and operating framework.</p>
          <div className="mt-8">
            {course.stripe_price_id ? <button onClick={checkout} disabled={buying} className="px-10 py-4 bg-[#D4B87A] text-[#080604] font-semibold tracking-[2px] text-xs">{buying ? 'OPENING…' : `ENROLL NOW${course.price_label ? ` — ${course.price_label}` : ''}`}</button> : <a href="/#enroll" className="px-10 py-4 border border-[#D4B87A]/30 text-[#D4B87A] font-semibold tracking-[2px] text-xs">JOIN WAITLIST</a>}
          </div>
        </div>
      </section>
    </main>
  )
}
