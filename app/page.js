import Link from 'next/link'
import CheckoutButton from './components/CheckoutButton'
import { getFlagshipCourses, getMembershipTiers, getFaqs, getServiceOffers, getConsultations } from './lib/tlu'

const FALLBACK_TIERS = [
  { tier_name:'The Taste', tier_key:'free', monthly_price_cents:0, includes:['Preview training','Weekly education drops','Public resource center'], sort_order:0 },
  { tier_name:'The Lifestyle Pass', tier_key:'lifestyle_pass', monthly_price_cents:4900, includes:['Full course library','Monthly live Q&A','Community access','Templates & playbooks'], stripe_monthly_price_id:'price_1TJ4vBKUVDzsdWUxUoKkKYBe', sort_order:1 },
  { tier_name:'The Operator', tier_key:'operator', monthly_price_cents:12900, includes:['Everything in Lifestyle Pass','Deep-dive masterclasses','Full SOP library','Group coaching'], stripe_monthly_price_id:'price_1TJ4vBKUVDzsdWUx3Poj9UCc', sort_order:2 },
  { tier_name:'The Inner Circle', tier_key:'inner_circle', monthly_price_cents:34900, includes:['Everything in Operator','Monthly private consultation','VIP access','Direct advisory layer'], stripe_monthly_price_id:'price_1TJ4vCKUVDzsdWUx641KpnKu', sort_order:3 },
  { tier_name:'The Apprentice', tier_key:'apprentice', monthly_price_cents:null, annual_savings_display:'Cohort-based pricing', includes:['Live cohort','Real implementation assignments','Private sessions','Certificate track'], sort_order:4 },
]

function money(cents) {
  if (cents === 0) return 'FREE'
  if (!cents) return null
  return `$${(cents / 100).toLocaleString()}/mo`
}

export default async function HomePage() {
  const [courses, dbTiers, faqs, services, consultations] = await Promise.all([
    getFlagshipCourses(),
    getMembershipTiers(),
    getFaqs(),
    getServiceOffers(),
    getConsultations(),
  ])
  const tiers = dbTiers.length ? dbTiers : FALLBACK_TIERS
  const advisory = consultations.filter((item) => item.offer_kind === 'consultation').slice(0, 4)

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <nav className="sticky top-0 z-50 bg-[#080604]/95 backdrop-blur border-b border-[#D4B87A]/10 px-5 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <Link href="/" className="font-display text-lg tracking-[0.08em]">THE LIFESTYLE <span className="text-[#D4B87A] italic">UNIVERSITY</span></Link>
          <div className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.15em] uppercase text-[#F5F0E8]/45">
            <a href="#programs" className="hover:text-[#D4B87A]">Programs</a>
            <a href="#membership" className="hover:text-[#D4B87A]">Membership</a>
            <Link href="/resources" className="hover:text-[#D4B87A]">Resources</Link>
            <Link href="/consultations" className="hover:text-[#D4B87A]">Consultations</Link>
            <Link href="/services" className="hover:text-[#D4B87A]">Services</Link>
          </div>
          <a href="#programs" className="bg-[#D4B87A] text-[#080604] px-4 py-2 text-[10px] tracking-[0.15em] font-semibold uppercase">Choose a Program</a>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 py-24 md:py-36 border-b border-[#D4B87A]/10">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_20%,rgba(212,184,122,.18),transparent_35%),radial-gradient(circle_at_10%_70%,rgba(212,184,122,.08),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#D4B87A] uppercase mb-6">Practical Education for Builders</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] font-light">Learn it.<br/><span className="italic text-[#D4B87A]">Build it.</span><br/>Own it.</h1>
          </div>
          <div className="pb-2">
            <p className="text-lg md:text-xl leading-8 text-[#F5F0E8]/50 max-w-xl">Ten flagship programs built around real operating systems: events, nightlife, personal brand, automation, food, audience, e-commerce, services, apps, and venue revenue.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#programs" className="bg-[#D4B87A] text-[#080604] px-7 py-3 text-xs font-semibold tracking-[0.15em] uppercase">Explore 10 Programs</a>
              <Link href="/resources" className="border border-[#D4B87A]/30 text-[#D4B87A] px-7 py-3 text-xs tracking-[0.15em] uppercase">Open Free Resources</Link>
            </div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-[#D4B87A]/10 border border-[#D4B87A]/10 mt-16">
          {[[courses.length || 10,'Flagship Programs'],[(courses.length || 10)*8,'Core Modules'],[(courses.length || 10)*8,'Course Toolkits'],['3','Ways to Work']].map(([value,label]) => (
            <div key={label} className="bg-[#080604] p-5 md:p-7"><div className="font-display text-3xl md:text-4xl text-[#D4B87A]">{value}</div><div className="text-[9px] uppercase tracking-[0.16em] text-[#F5F0E8]/30 mt-1">{label}</div></div>
          ))}
        </div>
      </section>

      <section className="px-6 py-18 md:py-24 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B7340] mb-3">Choose the right relationship</p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-10">Education is not the only product.</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ['01','LEARN IT','Courses + Membership','Use the curriculum, templates and resource center to build the capability yourself.','#programs','Explore Programs'],
              ['02','DECIDE IT','Consultations + Advisory','Use direct strategy when the bottleneck is a high-value decision, architecture problem or operating choice.','/consultations','View Consultations'],
              ['03','BUILD IT','À La Carte Services','Request websites, brands, logos, graphics, decks, automation, CRM, app MVPs and event creative.','/services','Open Services Studio'],
            ].map(([n,kicker,title,desc,href,cta]) => (
              <article key={n} className="bg-white border border-[#080604]/10 p-7 min-h-[300px] flex flex-col">
                <span className="font-mono text-xs text-[#8B7340]">{n}</span>
                <p className="mt-8 text-[9px] tracking-[0.18em] uppercase text-[#8B7340]">{kicker}</p>
                <h3 className="font-display text-3xl mt-2">{title}</h3>
                <p className="text-sm text-[#080604]/50 leading-6 mt-4 flex-1">{desc}</p>
                {href.startsWith('/') ? <Link href={href} className="text-xs uppercase tracking-[0.15em] text-[#8B7340] mt-6">{cta} →</Link> : <a href={href} className="text-xs uppercase tracking-[0.15em] text-[#8B7340] mt-6">{cta} →</a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div><p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">The Flagship Catalog</p><h2 className="font-display text-4xl md:text-6xl font-light">10 different businesses.<br/><span className="italic text-[#D4B87A]">10 operating systems.</span></h2></div>
            <p className="text-sm text-[#F5F0E8]/35 max-w-sm leading-6">Every program has 8 modules, course-specific FAQs, implementation outcomes, prerequisites, certificate settings, and an 8-tool bonus vault.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {courses.map((course, index) => (
              <Link key={course.slug} href={`/courses/${course.slug}`} className="group border border-[#D4B87A]/10 bg-[#0f0d0a] p-6 md:p-7 hover:border-[#D4B87A]/45 transition min-h-[330px] flex flex-col">
                <div className="flex items-center justify-between gap-4"><span className="text-[9px] tracking-[0.16em] uppercase text-[#D4B87A]/65">School of {course.school_name}</span><span className="font-mono text-xs text-[#F5F0E8]/20">{String(index+1).padStart(2,'0')}</span></div>
                <h3 className="font-display text-3xl mt-7 group-hover:text-[#D4B87A] transition">{course.title}</h3>
                <p className="text-sm text-[#F5F0E8]/42 leading-6 mt-3 flex-1">{course.subtitle}</p>
                <div className="pt-6 mt-6 border-t border-[#D4B87A]/8 flex items-end justify-between gap-4">
                  <div><div className="font-display text-2xl text-[#D4B87A]">{course.price_label}</div><div className="text-[9px] uppercase tracking-[0.12em] text-[#F5F0E8]/25 mt-1">8 modules · 8 tools</div></div>
                  <span className="text-xs text-[#D4B87A]">View Program →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#0f0d0a] border-y border-[#D4B87A]/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">Resource Center</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">FAQ. Glossary. Docs. Templates.</h2>
            <p className="text-sm text-[#F5F0E8]/40 leading-6 mt-5">The course should not have to explain the same term ten times, and the student should not have to recreate the same operating document ten times.</p>
            <Link href="/resources" className="inline-block mt-7 border border-[#D4B87A]/30 px-6 py-3 text-xs tracking-[0.15em] uppercase text-[#D4B87A]">Open Resource Center</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ['Template Vault','Reusable worksheets, scorecards, trackers, proposals, briefs, checklists and operating documents.'],
              ['Glossary','Plain-language definitions for the terms used across business, growth, hospitality, automation, technology and finance.'],
              ['Operator Docs','Short implementation guides for using the University, preparing a project, QA, consultation prep and automation discipline.'],
              ['FAQ','Central answers for course access, membership, certificates, payments, consultations, services and support.'],
            ].map(([title,desc]) => <div key={title} className="border border-[#D4B87A]/10 bg-[#080604] p-6"><h3 className="font-display text-2xl text-[#D4B87A]">{title}</h3><p className="text-sm text-[#F5F0E8]/40 leading-6 mt-3">{desc}</p></div>)}
          </div>
        </div>
      </section>

      <section id="membership" className="px-6 py-20 md:py-28 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#8B7340] mb-3">Membership</p>
          <h2 className="text-center font-display text-4xl md:text-6xl font-light mb-12">Buy one transformation — or join the <span className="italic text-[#8B7340]">library.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {tiers.map((tier) => {
              const price = money(tier.monthly_price_cents) || tier.annual_savings_display || 'Apply'
              const canSubscribe = Boolean(tier.stripe_monthly_price_id)
              return (
                <article key={tier.tier_key} className={`border p-6 flex flex-col min-h-[390px] ${tier.tier_key === 'operator' ? 'bg-[#080604] text-[#F5F0E8] border-[#D4B87A]' : 'bg-white border-[#080604]/10'}`}>
                  <span className={`text-[9px] tracking-[0.15em] uppercase ${tier.tier_key === 'operator' ? 'text-[#D4B87A]' : 'text-[#8B7340]'}`}>{tier.tier_key === 'operator' ? 'Most Popular' : 'Access Level'}</span>
                  <h3 className="font-display text-2xl mt-4">{tier.tier_name}</h3>
                  <div className={`font-display text-2xl mt-2 ${tier.tier_key === 'operator' ? 'text-[#D4B87A]' : 'text-[#8B7340]'}`}>{price}</div>
                  <ul className={`mt-6 space-y-2 text-xs leading-5 flex-1 ${tier.tier_key === 'operator' ? 'text-[#F5F0E8]/55' : 'text-[#080604]/55'}`}>{(tier.includes || []).slice(0,6).map((item) => <li key={item}>◆ {item}</li>)}</ul>
                  {canSubscribe ? <CheckoutButton priceId={tier.stripe_monthly_price_id} programKey={`membership_${tier.tier_key}`} mode="subscription" label="Join Monthly" className="w-full mt-6" /> : tier.tier_key === 'free' ? <Link href="/resources" className="text-center bg-[#080604] text-[#D4B87A] px-4 py-3 text-[10px] uppercase tracking-[0.15em] mt-6">Start Free</Link> : <Link href="/consultations#apply" className="text-center border border-[#080604]/20 px-4 py-3 text-[10px] uppercase tracking-[0.15em] mt-6">Apply</Link>}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-b border-[#D4B87A]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10"><div><p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">Direct Access</p><h2 className="font-display text-4xl md:text-5xl font-light">Consult when the question is expensive.</h2></div><Link href="/consultations" className="text-xs text-[#D4B87A] uppercase tracking-[0.15em]">See full advisory menu →</Link></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {advisory.map((offer) => <article key={offer.slug} className="border border-[#D4B87A]/10 bg-[#0f0d0a] p-6"><h3 className="font-display text-2xl">{offer.name}</h3><div className="font-display text-xl text-[#D4B87A] mt-3">{offer.price_label}</div><p className="text-xs text-[#F5F0E8]/38 leading-5 mt-3">{offer.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-12 items-start">
            <div><p className="text-[10px] tracking-[0.3em] uppercase text-[#8B7340] mb-3">Services Studio</p><h2 className="font-display text-4xl md:text-5xl font-light">Need execution, not another lesson?</h2><p className="text-sm text-[#080604]/45 leading-6 mt-5">Submit an à la carte project brief and route it into a defined production scope.</p><Link href="/services" className="inline-block mt-7 bg-[#080604] text-[#D4B87A] px-6 py-3 text-xs tracking-[0.15em] uppercase">Request a Build</Link></div>
            <div className="grid md:grid-cols-2 gap-3">
              {services.slice(0,6).map((service) => <div key={service.slug} className="bg-white border border-[#080604]/10 p-5"><span className="text-[9px] tracking-[0.15em] uppercase text-[#8B7340]">{service.category}</span><h3 className="font-display text-2xl mt-2">{service.title}</h3><div className="text-[#8B7340] text-sm mt-3">{service.price_label}</div></div>)}
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && <section className="px-6 py-20"><div className="max-w-4xl mx-auto"><p className="text-[10px] tracking-[0.3em] uppercase text-[#D4B87A] mb-3">FAQ</p><h2 className="font-display text-4xl md:text-5xl font-light mb-8">Know before you buy.</h2><div className="space-y-3">{faqs.slice(0,6).map((faq) => <details key={faq.question} className="border border-[#D4B87A]/10 bg-[#0f0d0a] p-5"><summary className="cursor-pointer font-medium">{faq.question}</summary><p className="text-sm text-[#F5F0E8]/45 leading-6 mt-4">{faq.answer}</p></details>)}</div><Link href="/resources#faq" className="inline-block mt-6 text-xs text-[#D4B87A] uppercase tracking-[0.15em]">View all FAQs →</Link></div></section>}

      <footer className="px-6 py-12 border-t border-[#D4B87A]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div><div className="font-display text-xl">THE LIFESTYLE <span className="italic text-[#D4B87A]">UNIVERSITY</span></div><p className="text-xs text-[#F5F0E8]/25 mt-2">Practical education. Direct strategy. Real implementation.</p></div>
          <div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.15em] text-[#F5F0E8]/35"><a href="#programs">Programs</a><a href="#membership">Membership</a><Link href="/resources">Resources</Link><Link href="/consultations">Consultations</Link><Link href="/services">Services</Link></div>
        </div>
      </footer>
    </main>
  )
}
