'use client'
import { useState } from 'react'

const COURSE = {
  title: 'Event Money Machine',
  price: '$1,997',
  priceId: 'price_1TIJIcKUVDzsdWUxlLoXpTQ8',
  school: 'The Experience Economy School',
  college: 'College of Experience Design',
  hours: '6.5 hours',
  modules: 8,
  certification: 'Event Money Machine Certified Producer',
  format: 'Pre-recorded video + live Q&A + worksheets + templates',
  description: 'The complete system for launching, scaling, and monetizing events. Built from running 15+ event brands across 8 cities. Not theory. Receipts.',
  whoItsFor: [
    'Event curators ready to turn their concept into real revenue',
    'Party organizers who want to go from one-offs to a brand',
    'Festival founders building their first or fifth event',
    'Promoters ready to own the event instead of just promoting it',
    'Cultural producers who want to monetize experiences',
    'Anyone who has ever said "I should throw an event"',
  ],
  curriculum: [
    { num:1, title:'The Event Money Machine Framework', time:'45 min', lessons:['Why 99% of events lose money — and how yours won\'t','The 4 revenue streams every event must have','Case study: How I built 15+ event brands across 8 cities','Your Event Money Machine Blueprint (worksheet)'] },
    { num:2, title:'Concept to Brand: Building an Event People Talk About', time:'60 min', lessons:['Finding your event DNA — what makes people NEED to be there','Naming, branding, and positioning your event','The visual identity system (flyers, socials, atmosphere)','Building cultural credibility before your first event','Case study: HugLife, NOIR, WRST BHVR — 3 different playbooks'] },
    { num:3, title:'Venue Selection & Negotiation', time:'40 min', lessons:['How to evaluate a venue in 15 minutes','The venue deal structure (revenue share vs flat fee vs hybrid)','Negotiation scripts that save you $2K–$10K per event','Red flags that kill events before they start','Building venue relationships that last years'] },
    { num:4, title:'The Revenue Stack: Tickets, Tables, Sponsors, Vendors', time:'75 min', lessons:['Ticket pricing psychology and tier structure','Table/section/VIP packaging that maximizes per-head revenue','How to build a sponsor deck that gets $5K–$50K deals','Vendor partnerships and revenue share models','The upsell ladder: free entry → GA → VIP → table → sponsor','Setting up direct ticketing (bypass Eventbrite fees)'] },
    { num:5, title:'Event Marketing That Fills Rooms', time:'60 min', lessons:['The 21-day event marketing countdown system','Social content strategy (what to post and when)','Influencer and ambassador activation playbook','Street marketing + digital marketing hybrid approach','The urgency engine: scarcity, FOMO, countdowns','Email and SMS sequences that convert'] },
    { num:6, title:'Operations: Run of Show, Team, and Execution', time:'50 min', lessons:['Building your event team (who you need and what they do)','The run of show template (minute-by-minute)','Door management, check-in systems, and crowd flow','DJ coordination, sound, lighting, and atmosphere','Crisis management: what to do when things go wrong','Post-event debrief template'] },
    { num:7, title:'Scaling: From One Event to a Brand Empire', time:'55 min', lessons:['When to repeat vs when to retire an event concept','Multi-city expansion strategy (the KHG playbook)','Building recurring revenue from events','The event brand portfolio: complementary concepts','Licensing, franchising, and partnership models','Case study: How one event became 15+ brands'] },
    { num:8, title:'Advanced Monetization & Legacy Building', time:'45 min', lessons:['Creating media from events (content, brand deals, press)','Building a customer database that compounds','Event-to-product pipeline (merch, apps, experiences)','The forever brand: building events that outlive trends','Your 90-day action plan (personalized worksheet)'] },
  ],
  bonuses: [
    'Event Budget Calculator (spreadsheet)',
    'Sponsor Pitch Deck Template',
    '21-Day Marketing Countdown Calendar',
    'Run of Show Template',
    'Venue Evaluation Scorecard',
    'Ambassador Onboarding Kit',
    'Post-Event Debrief Template',
    'Event P&L Tracker',
  ]
}

export default function CoursePage() {
  const [buying, setBuying] = useState(false)
  const [openModule, setOpenModule] = useState(0)

  const handleBuy = async () => {
    setBuying(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: COURSE.priceId, mode: 'payment', programKey: 'event_money_machine' })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) { console.error(e) }
    setBuying(false)
  }

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      {/* HERO */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080604] via-[#0d0b08] to-[#080604]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <a href="/" className="inline-block font-mono text-[10px] tracking-[4px] text-[#D4B87A]/50 mb-8 hover:text-[#D4B87A] transition-colors">← BACK TO ALL COURSES</a>
          <p className="font-mono text-[10px] tracking-[5px] text-[#D4B87A]/60 mb-4 uppercase">{COURSE.school} · {COURSE.college}</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-wider mb-6" style={{fontFamily:'Cormorant Garamond, serif'}}>{COURSE.title}</h1>
          <p className="text-[#F5F0E8]/50 text-lg max-w-2xl mx-auto mb-8">{COURSE.description}</p>
          <div className="flex justify-center gap-8 mb-10">
            {[[COURSE.modules + ' Modules','CURRICULUM'],[COURSE.hours,'OF CONTENT'],['8','BONUS TEMPLATES'],['1','CERTIFICATION']].map(([n,l]) => (
              <div key={l} className="text-center"><div className="text-2xl text-[#D4B87A]" style={{fontFamily:'Cormorant Garamond, serif'}}>{n}</div><div className="font-mono text-[8px] tracking-[2px] text-[#F5F0E8]/30 mt-1">{l}</div></div>
            ))}
          </div>
          <button onClick={handleBuy} disabled={buying} className="px-12 py-5 bg-[#D4B87A] text-[#080604] font-semibold text-sm tracking-widest hover:bg-[#D4B87A]/90 transition-all disabled:opacity-50">
            {buying ? 'LOADING CHECKOUT...' : `ENROLL NOW — ${COURSE.price}`}
          </button>
          <p className="mt-4 font-mono text-[10px] text-[#F5F0E8]/25 tracking-wider">{COURSE.certification} · {COURSE.format}</p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 px-6 border-t border-[#D4B87A]/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-center mb-12 font-light tracking-wider" style={{fontFamily:'Cormorant Garamond, serif'}}>Who This Is For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {COURSE.whoItsFor.map(w => (
              <div key={w} className="flex items-start gap-3 p-4 border border-[#D4B87A]/10 rounded-lg bg-[#0f0d0a]">
                <span className="text-[#D4B87A] text-sm mt-0.5">◆</span>
                <p className="text-[#F5F0E8]/60 text-sm">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-20 px-6 bg-[#0f0d0a]/50">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] tracking-[5px] text-[#D4B87A]/60 mb-3 uppercase text-center">Full Curriculum</p>
          <h2 className="text-4xl text-center mb-16 font-light tracking-wider" style={{fontFamily:'Cormorant Garamond, serif'}}>{COURSE.modules} Modules · {COURSE.hours}</h2>
          <div className="space-y-3">
            {COURSE.curriculum.map((m, i) => (
              <div key={m.num} className="border border-[#D4B87A]/10 rounded-lg overflow-hidden bg-[#0f0d0a] hover:border-[#D4B87A]/30 transition-all">
                <button onClick={() => setOpenModule(openModule === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-lg text-[#D4B87A] w-8">{String(m.num).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg" style={{fontFamily:'Cormorant Garamond, serif'}}>{m.title}</h3>
                      <p className="font-mono text-[10px] text-[#F5F0E8]/30 mt-1">{m.lessons.length} LESSONS · {m.time}</p>
                    </div>
                  </div>
                  <span className="text-[#D4B87A] text-xl transition-transform" style={{transform: openModule === i ? 'rotate(45deg)' : 'none'}}>+</span>
                </button>
                {openModule === i && (
                  <div className="px-6 pb-6 pt-0 border-t border-[#D4B87A]/5">
                    <ul className="space-y-3 ml-12">
                      {m.lessons.map((l, li) => (
                        <li key={li} className="flex items-start gap-3">
                          <span className="font-mono text-[10px] text-[#D4B87A]/40 mt-1">{String(li + 1).padStart(2, '0')}</span>
                          <span className="text-[#F5F0E8]/60 text-sm">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUSES */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl text-center mb-12 font-light tracking-wider" style={{fontFamily:'Cormorant Garamond, serif'}}>8 Bonus Templates Included</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {COURSE.bonuses.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border border-[#D4B87A]/10 rounded-lg bg-[#0f0d0a]">
                <span className="text-[#D4B87A] text-lg" style={{fontFamily:'Cormorant Garamond, serif'}}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[#F5F0E8]/60 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[#D4B87A]/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl mb-6 font-light tracking-wider" style={{fontFamily:'Cormorant Garamond, serif'}}>Ready to Build Your<br/><span className="text-[#D4B87A]">Event Money Machine?</span></h2>
          <p className="text-[#F5F0E8]/40 mb-10">8 modules. 6.5 hours. 8 bonus templates. One certification. Built from 15+ real event brands.</p>
          <button onClick={handleBuy} disabled={buying} className="px-12 py-5 bg-[#D4B87A] text-[#080604] font-semibold text-sm tracking-widest hover:bg-[#D4B87A]/90 transition-all disabled:opacity-50">
            {buying ? 'LOADING...' : `ENROLL NOW — ${COURSE.price}`}
          </button>
          <p className="mt-6 font-mono text-[10px] text-[#F5F0E8]/20 tracking-wider">PROMO CODES ACCEPTED · SECURE CHECKOUT VIA STRIPE</p>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-[#D4B87A]/10 text-center">
        <a href="/" className="text-[#F5F0E8]/30 hover:text-[#D4B87A] text-xs font-mono tracking-wider">← BACK TO DR. DORSEY COURSES</a>
      </footer>
    </main>
  )
}
