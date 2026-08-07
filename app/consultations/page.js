import Link from 'next/link'
import ConsultationRequestForm from '../components/ConsultationRequestForm'
import { getConsultations } from '../lib/tlu'

export const metadata = {
  title: 'Consultations | The Lifestyle University',
  description: 'Strategy sessions, implementation deep dives, VIP intensives and private advisory through The Lifestyle University.',
}

function durationLabel(minutes) {
  if (!minutes) return 'Custom'
  if (minutes < 60) return `${minutes} min`
  if (minutes < 1440) return `${Math.round((minutes / 60) * 10) / 10} hrs`
  const days = Math.round(minutes / 1440)
  if (days < 28) return `${days} days`
  return 'Ongoing'
}

export default async function ConsultationsPage() {
  const offers = await getConsultations()
  const consultations = offers.filter((offer) => offer.offer_kind === 'consultation')
  const programs = offers.filter((offer) => offer.offer_kind !== 'consultation')

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <nav className="sticky top-0 z-50 bg-[#080604]/95 backdrop-blur border-b border-[#D4B87A]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-[10px] tracking-[0.2em] text-[#D4B87A] uppercase">← University</Link>
          <div className="flex gap-4 text-[10px] tracking-[0.12em] uppercase text-[#F5F0E8]/45"><Link href="/resources" className="hover:text-[#D4B87A]">Resources</Link><Link href="/services" className="hover:text-[#D4B87A]">Services</Link></div>
        </div>
      </nav>

      <section className="px-6 py-20 md:py-28 border-b border-[#D4B87A]/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-end">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4B87A] mb-4">Direct Strategy & Advisory</p>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[0.95]">Use a call when the bottleneck is a <span className="italic text-[#D4B87A]">decision.</span></h1>
          </div>
          <p className="text-[#F5F0E8]/45 leading-7">Consultations are for diagnosis, decisions, architecture and acceleration. When the answer is “someone needs to build this,” the engagement should move into the Services Studio instead of consuming advisory time.</p>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B7340] mb-2">Advisory Menu</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-10">Choose the depth of access.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {consultations.map((offer, index) => (
              <article key={offer.slug} className="bg-white border border-[#080604]/10 p-6 flex flex-col">
                <div className="flex justify-between items-center"><span className="text-[9px] tracking-[0.15em] uppercase text-[#8B7340]">{offer.billing_period === 'monthly' ? 'Advisory' : 'Consultation'}</span><span className="font-mono text-xs text-[#080604]/20">{String(index + 1).padStart(2,'0')}</span></div>
                <h3 className="font-display text-3xl mt-4">{offer.name}</h3>
                <p className="text-sm text-[#080604]/55 leading-6 mt-3 flex-1">{offer.description}</p>
                <div className="mt-6 pt-5 border-t border-[#080604]/10">
                  <div className="flex items-end justify-between gap-4"><span className="font-display text-2xl text-[#8B7340]">{offer.price_label}</span><span className="text-[9px] uppercase tracking-[0.12em] text-[#080604]/35">{durationLabel(offer.duration_minutes)}</span></div>
                  {offer.transformation_promise && <p className="mt-4 text-xs leading-5 text-[#080604]/45">{offer.transformation_promise}</p>}
                  {(offer.includes || []).length > 0 && <ul className="mt-4 space-y-2 text-xs text-[#080604]/55">{offer.includes.slice(0,5).map((item) => <li key={item}>◆ {item}</li>)}</ul>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {programs.length > 0 && (
        <section className="px-6 py-16 border-b border-[#D4B87A]/10">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4B87A] mb-2">Higher-Touch Programs</p>
            <h2 className="font-display text-4xl font-light mb-8">When one session is not enough.</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {programs.map((offer) => (
                <div key={offer.slug} className="border border-[#D4B87A]/12 bg-[#0f0d0a] p-6">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#D4B87A]/55">{offer.offer_kind.replace('_',' ')}</span>
                  <h3 className="font-display text-2xl mt-2">{offer.name}</h3>
                  <div className="text-[#D4B87A] font-display text-xl mt-4">{offer.price_label}</div>
                  <p className="text-xs text-[#F5F0E8]/40 leading-5 mt-3">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="apply" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">Consultation Intake</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-3">Bring a decision worth solving.</h2>
          <p className="text-sm text-[#F5F0E8]/40 leading-6 mb-8 max-w-2xl">State the current situation, desired outcome, budget, timeline, and the exact decision or bottleneck. This lets the review process route you to the right level instead of forcing every request into the same call.</p>
          <ConsultationRequestForm offers={offers} />
        </div>
      </section>
    </main>
  )
}
