import Link from 'next/link'
import ServiceRequestForm from '../components/ServiceRequestForm'
import { getServiceOffers } from '../lib/tlu'

export const metadata = {
  title: 'Services Studio | The Lifestyle University',
  description: 'À la carte implementation services for websites, branding, logos, graphics, decks, automation, CRM, apps, and event creative.',
}

export default async function ServicesPage() {
  const offers = await getServiceOffers()

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <nav className="sticky top-0 z-50 bg-[#080604]/95 backdrop-blur border-b border-[#D4B87A]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-[10px] tracking-[0.2em] text-[#D4B87A] uppercase">← University</Link>
          <div className="flex gap-4 text-[10px] tracking-[0.12em] uppercase text-[#F5F0E8]/45"><Link href="/resources" className="hover:text-[#D4B87A]">Resources</Link><Link href="/consultations" className="hover:text-[#D4B87A]">Consultations</Link></div>
        </div>
      </nav>

      <section className="px-6 py-20 md:py-28 border-b border-[#D4B87A]/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-end">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4B87A] mb-4">À La Carte Implementation</p>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[0.95]">You can learn the system — or have the right part <span className="italic text-[#D4B87A]">built.</span></h1>
          </div>
          <p className="text-[#F5F0E8]/45 leading-7">Services are separate from course tuition. Every project starts with a defined outcome, scope, assets, integrations, timeline, and QA standard so education and implementation do not get confused.</p>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {offers.map((offer, index) => (
              <article key={offer.slug} className="bg-white border border-[#080604]/10 p-6 flex flex-col">
                <div className="flex items-center justify-between gap-4"><span className="text-[9px] tracking-[0.16em] uppercase text-[#8B7340]">{offer.category}</span><span className="font-mono text-xs text-[#080604]/25">{String(index + 1).padStart(2,'0')}</span></div>
                <h2 className="font-display text-3xl mt-4">{offer.title}</h2>
                <p className="text-sm text-[#080604]/55 leading-6 mt-3 flex-1">{offer.description}</p>
                <div className="mt-6 pt-5 border-t border-[#080604]/10">
                  <div className="text-2xl font-display text-[#8B7340]">{offer.price_label || 'Custom quote'}</div>
                  <div className="text-[9px] tracking-[0.12em] uppercase text-[#080604]/30 mt-1">{offer.turnaround_label || 'Scope dependent'}</div>
                  <ul className="mt-4 space-y-2 text-xs text-[#080604]/55">{(offer.deliverables || []).slice(0,6).map((item) => <li key={item}>◆ {item}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">Project Intake</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-3">Tell us what needs to exist.</h2>
          <p className="text-sm text-[#F5F0E8]/40 leading-6 mb-8 max-w-2xl">One project per request. Give enough detail to scope it correctly: outcome, must-have deliverables, current assets, integrations, budget, deadline, references, and anything that cannot change.</p>
          <ServiceRequestForm offers={offers} />
        </div>
      </section>
    </main>
  )
}
