'use client'

import { useEffect, useMemo, useState } from 'react'

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/courses')
      .then(async r => {
        const data = await r.json()
        if (!r.ok) throw new Error(data.error || 'Unable to load courses')
        setCourses(data.courses || [])
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const schools = useMemo(() => ['All', ...Array.from(new Set(courses.map(c => c.school_name).filter(Boolean)))], [courses])
  const visible = filter === 'All' ? courses : courses.filter(c => c.school_name === filter)

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <section className="border-b border-[#D4B87A]/10 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <a href="/" className="font-mono text-[10px] tracking-[3px] text-[#D4B87A]/60 hover:text-[#D4B87A]">← THE LIFESTYLE UNIVERSITY</a>
          <div className="mt-10 max-w-3xl">
            <p className="font-mono text-[10px] tracking-[5px] uppercase text-[#D4B87A]/60">Course Catalog</p>
            <h1 className="mt-4 text-5xl md:text-7xl font-light" style={{fontFamily:'Cormorant Garamond, serif'}}>Build the skill.<br/><span className="text-[#D4B87A]">Build the asset.</span></h1>
            <p className="mt-6 text-[#F5F0E8]/50 max-w-2xl">Operator-focused programs built around practical systems, templates, and implementation—not theory alone.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 border-b border-[#D4B87A]/10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          {schools.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 text-[9px] tracking-[2px] uppercase font-mono border transition-all ${filter === s ? 'bg-[#D4B87A] text-[#080604] border-[#D4B87A]' : 'border-[#D4B87A]/15 text-[#F5F0E8]/45 hover:border-[#D4B87A]/50'}`}>{s}</button>
          ))}
        </div>
      </section>

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          {loading && <p className="text-[#F5F0E8]/40 font-mono text-sm">Loading course catalog…</p>}
          {error && <div className="border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-200">{error}</div>}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map(course => (
                <a key={course.slug} href={`/courses/${course.slug}`} className="group border border-[#D4B87A]/10 bg-[#0f0d0a] hover:border-[#D4B87A]/35 transition-all p-6 min-h-[290px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="font-mono text-[9px] tracking-[2px] uppercase text-[#D4B87A]/65">{course.school_name || 'The Lifestyle University'}</span>
                      {course.featured && <span className="font-mono text-[8px] tracking-[1.5px] uppercase px-2 py-1 border border-[#D4B87A]/20 text-[#D4B87A]">Flagship</span>}
                    </div>
                    <h2 className="text-3xl font-light leading-tight group-hover:text-[#D4B87A] transition-colors" style={{fontFamily:'Cormorant Garamond, serif'}}>{course.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-[#F5F0E8]/45 line-clamp-4">{course.description || course.subtitle || 'Practical operator training with curriculum, templates, and implementation guidance.'}</p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-[#D4B87A]/8 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] text-[#F5F0E8]/30">{course.lesson_count || 0} LESSONS · {course.duration_minutes ? `${Math.round(course.duration_minutes / 6) / 10} HRS` : 'SELF-PACED'}</div>
                      <div className="mt-1 text-xl text-[#D4B87A]" style={{fontFamily:'Cormorant Garamond, serif'}}>{course.price_label || 'Included with membership'}</div>
                    </div>
                    <span className="text-[#D4B87A] text-lg">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
