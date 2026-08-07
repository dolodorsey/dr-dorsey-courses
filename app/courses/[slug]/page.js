import { notFound } from 'next/navigation'
import Link from 'next/link'
import CheckoutButton from '../../components/CheckoutButton'
import { getCourse } from '../../lib/tlu'

export async function generateMetadata({ params }) {
  const course = await getCourse(params.slug)
  if (!course) return { title: 'Course Not Found | The Lifestyle University' }
  return {
    title: `${course.title} | The Lifestyle University`,
    description: course.description,
  }
}

export default async function CoursePage({ params }) {
  const course = await getCourse(params.slug)
  if (!course) notFound()

  const curriculum = Array.isArray(course.curriculum_json) ? course.curriculum_json : []
  const bonuses = Array.isArray(course.bonuses) ? course.bonuses : []
  const faqs = Array.isArray(course.course_faq) ? course.course_faq : []
  const outcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : []
  const prerequisites = Array.isArray(course.prerequisites) ? course.prerequisites : []
  const duration = course.duration_minutes ? `${Math.round((course.duration_minutes / 60) * 10) / 10} hrs` : 'Self-paced'

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <nav className="sticky top-0 z-50 bg-[#080604]/95 backdrop-blur border-b border-[#D4B87A]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="font-mono text-[10px] tracking-[0.2em] text-[#D4B87A] uppercase">← University</Link>
          <div className="flex gap-4 text-[10px] tracking-[0.12em] uppercase text-[#F5F0E8]/45">
            <Link href="/resources" className="hover:text-[#D4B87A]">Resources</Link>
            <Link href="/services" className="hover:text-[#D4B87A]">Services</Link>
            <Link href="/consultations" className="hover:text-[#D4B87A]">Consultations</Link>
          </div>
        </div>
      </nav>

      <section className="px-6 py-20 md:py-28 border-b border-[#D4B87A]/10">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[#D4B87A]/70 uppercase mb-5">School of {course.school_name}</p>
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-end">
            <div>
              <h1 className="font-display text-5xl md:text-7xl leading-[0.95] font-light mb-6">{course.title}</h1>
              <p className="text-xl md:text-2xl text-[#D4B87A] font-display italic mb-6">{course.subtitle}</p>
              <p className="max-w-3xl text-[#F5F0E8]/55 leading-7">{course.description}</p>
            </div>
            <div className="border border-[#D4B87A]/15 p-6 bg-[#0f0d0a]">
              <div className="text-3xl font-display text-[#D4B87A] mb-1">{course.price_label}</div>
              <p className="text-[10px] text-[#F5F0E8]/35 tracking-[0.12em] uppercase mb-5">One-time flagship enrollment</p>
              <CheckoutButton priceId={course.stripe_price_id} programKey={course.slug} label={`Enroll — ${course.price_label}`} className="w-full" />
              <p className="mt-4 text-[10px] text-[#F5F0E8]/25 leading-5">Secure checkout. Certificate enabled at {course.completion_threshold}% completion.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#D4B87A]/10 mt-12 border border-[#D4B87A]/10">
            {[
              [curriculum.length, 'Modules'],
              [duration, 'Curriculum'],
              [bonuses.length, 'Tools'],
              [course.completion_threshold + '%', 'Certificate Gate'],
            ].map(([value, label]) => (
              <div key={label} className="bg-[#080604] p-5">
                <div className="text-2xl text-[#D4B87A] font-display">{value}</div>
                <div className="text-[9px] tracking-[0.16em] uppercase text-[#F5F0E8]/30 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#D4B87A] uppercase mb-3">Built For</p>
            <p className="text-lg leading-8 text-[#F5F0E8]/65">{course.target_customer}</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#D4B87A] uppercase mb-3">Transformation</p>
            <p className="text-lg leading-8 text-[#F5F0E8]/65">{course.transformation_promise}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] text-[#8B7340] uppercase mb-3">What You Will Be Able To Do</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-10">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {outcomes.map((outcome, index) => (
              <div key={outcome} className="border border-[#080604]/10 bg-white p-5 flex gap-4">
                <span className="font-mono text-[#8B7340] text-xs">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-6 text-[#080604]/70">{outcome}</p>
              </div>
            ))}
          </div>
          {prerequisites.length > 0 && (
            <div className="mt-8 p-5 border border-[#080604]/10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8B7340] mb-2">Bring With You</p>
              <ul className="space-y-1 text-sm text-[#080604]/60">{prerequisites.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-[10px] tracking-[0.3em] text-[#D4B87A] uppercase mb-3">Full Curriculum</p>
          <h2 className="text-center font-display text-4xl md:text-5xl font-light mb-12">8 Modules. One Operating System.</h2>
          <div className="space-y-3">
            {curriculum.map((module) => (
              <details key={module.module} className="group border border-[#D4B87A]/12 bg-[#0f0d0a] open:border-[#D4B87A]/35">
                <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[#D4B87A] text-sm">{String(module.module).padStart(2, '0')}</span>
                    <h3 className="font-display text-xl md:text-2xl">{module.title}</h3>
                  </div>
                  <span className="text-[#D4B87A] text-xl group-open:rotate-45 transition">+</span>
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-[#D4B87A]/8">
                  <ol className="ml-11 space-y-3">
                    {(module.lessons || []).map((lesson, index) => (
                      <li key={lesson} className="flex gap-4 text-sm text-[#F5F0E8]/55">
                        <span className="font-mono text-[10px] text-[#D4B87A]/50 mt-1">{String(index + 1).padStart(2, '0')}</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-y border-[#D4B87A]/10 bg-[#0f0d0a]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] text-[#D4B87A] uppercase mb-3">Implementation Vault</p>
          <h2 className="font-display text-4xl font-light mb-10">{bonuses.length} Tools Included</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {bonuses.map((bonus, index) => (
              <div key={bonus} className="border border-[#D4B87A]/10 p-5 flex gap-4 bg-[#080604]">
                <span className="font-mono text-[#D4B87A]/50 text-xs">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-sm text-[#F5F0E8]/65">{bonus}</span>
              </div>
            ))}
          </div>
          <Link href="/resources" className="inline-block mt-8 text-xs text-[#D4B87A] tracking-[0.15em] uppercase border-b border-[#D4B87A]/30 pb-1">Open the Resource Center →</Link>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] text-[#D4B87A] uppercase mb-3">Course FAQ</p>
            <h2 className="font-display text-4xl font-light mb-8">Before You Enroll</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="border border-[#D4B87A]/10 p-5 bg-[#0f0d0a]">
                  <summary className="cursor-pointer font-medium">{faq.q}</summary>
                  <p className="mt-4 text-sm leading-6 text-[#F5F0E8]/55">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20 text-center border-t border-[#D4B87A]/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-light mb-5">Learn It. Build It. <span className="text-[#D4B87A] italic">Own It.</span></h2>
          <p className="text-[#F5F0E8]/45 mb-8">Take the program yourself, add a strategy session when you need a decision, or use the Services Studio when you want implementation handled for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <CheckoutButton priceId={course.stripe_price_id} programKey={course.slug} label={`Enroll — ${course.price_label}`} />
            <Link href="/services" className="px-7 py-3 border border-[#D4B87A]/30 text-[#D4B87A] text-xs tracking-[0.15em] uppercase hover:bg-[#D4B87A]/5">Request Implementation</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
