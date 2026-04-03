'use client'
import { useState } from 'react'

const SCHOOLS = [
  { name: 'The Experience Economy School', key: 'experience', flagship: 'Event Money Machine', price: '$1,997', serves: 'Event curators, festival founders, pop-up operators, cultural producers', topics: ['Launch a Profitable Event','Build an Event Brand','Ticketing, Sponsors & Upsells','Event Marketing Systems','Cultural Experience Design'], priority: 1, college: 'Experience Design' },
  { name: 'The Hospitality & Nightlife Growth School', key: 'hospitality', flagship: 'Nightlife Money Machine', price: '$1,997', serves: 'Club owners, promoters, venue operators, hospitality entrepreneurs', topics: ['Build a Profitable Nightlife Brand','Venue Marketing That Fills Rooms','Promoter Systems & Team Mgmt','VIP Experience Design','Partnership & Sponsorship Strategy'], priority: 2, college: 'Hospitality & Cultural Leadership' },
  { name: 'The Personal Brand Monetization School', key: 'personal_brand', flagship: 'The Lifestyle Specialist Blueprint', price: '$1,997', serves: 'Influencers, creators, coaches, experts, public figures', topics: ['Building a Personal Brand That Sells','Turn Attention Into Income','Offer Creation for Creators','Brand Partnerships & Endorsements','Audience-to-Revenue Systems'], priority: 3, college: 'Brand Architecture' },
  { name: 'The Automation Operator School', key: 'automation', flagship: 'Automate Your Business OS', price: '$2,497', serves: 'Founders, agency owners, operators, startups scaling without chaos', topics: ['Build a Business OS','CRM Setup & Pipeline Design','AI for Sales, Content & Admin','SOP Building & Delegation','Workflow Mapping & AI Agents'], priority: 4, college: 'Operational Systems' },
  { name: 'The Food Brand Launch School', key: 'food', flagship: 'Restaurant & QSR Launch Blueprint', price: '$1,997', serves: 'Restaurant founders, food truck owners, ghost kitchens, QSR', topics: ['Launch a Food Brand Fast','Menu Engineering for Profit','Delivery & Digital Ordering','Multi-Unit Expansion','SOPs for Food Businesses'], priority: 5, college: 'Hospitality & Cultural Leadership' },
  { name: 'The Audience Growth & Promotion School', key: 'audience', flagship: 'Audience to Income System', price: '$1,497', serves: 'Marketers, promoters, social media managers, local businesses', topics: ['Grow a Brand Organically','Promoter Systems That Work','Street + Digital Hybrid Strategy','Lead Generation Systems','Campaign Building'], priority: 6, college: 'Brand Architecture' },
  { name: 'The Brand Merch & E-Commerce School', key: 'merch', flagship: 'Culture Brand E-Commerce Blueprint', price: '$1,997', serves: 'Apparel founders, Shopify owners, culture brands, POD founders', topics: ['Build a Merch Brand With Cultural Weight','Shopify Launch Systems','Drops, Scarcity & Collabs','Product Photography','Brand Worldbuilding'], priority: 7, college: 'Commercial Strategy' },
  { name: 'The Expert Service Business School', key: 'service', flagship: 'Service Business Scale Blueprint', price: '$1,497', serves: 'Therapists, coaches, consultants, advisors, telehealth operators', topics: ['Package Expertise Into High-Value Offers','Client Acquisition Systems','Booking & Follow-Up Automation','Premium Pricing Strategy','Retention & Referrals'], priority: 8, college: 'Enterprise' },
  { name: 'The App Launch & Growth School', key: 'app', flagship: 'App Launch Blueprint', price: '$1,497', serves: 'App founders, startup founders, marketplace builders', topics: ['Launch an App Without Wasting Money','MVP Strategy','User Acquisition','Retention & Engagement','Founder-Led GTM Systems'], priority: 9, college: 'Operational Systems' },
  { name: 'The Venue & Lifestyle Development School', key: 'venue', flagship: 'Venue Revenue Blueprint', price: '$497', serves: 'Venue owners, real estate developers, entertainment builders', topics: ['Build a Venue That Prints Money','Program a Space for Revenue','Experience-Led Development','Day-to-Night Programming','Space Monetization Systems'], priority: 10, college: 'Hospitality & Cultural Leadership' },
]

const TIERS = [
  { name: 'The Taste', price: 'FREE', annual: null, features: ['1 mini-lesson per school','Weekly newsletter','Public community','Free training library'], discount: null, cta: 'Start Free' },
  { name: 'The Lifestyle Pass', price: '$29/mo', annual: '$249/yr', features: ['Full course library (self-paced)','Monthly live Q&A','Community access','Weekly insider drops','Templates & playbooks','10% off events & merch'], discount: 'Save $99/yr', cta: 'Join Now' },
  { name: 'The Operator', price: '$79/mo', annual: '$699/yr', features: ['Everything in Lifestyle Pass','Deep-dive masterclasses','Full SOP & playbook library','Private community channel','Monthly group coaching','20% off events & merch','Behind-the-scenes content'], discount: 'Save $249/yr', popular: true, cta: 'Go Operator' },
  { name: 'The Inner Circle', price: '$199/mo', annual: '$1,799/yr', features: ['Everything in Operator','Monthly 1-on-1 with Dr. Dorsey (30 min)','VIP event access','Early access to launches','Direct DM access','Co-branding opportunities','30% off events & merch'], discount: 'Save $419/yr', cta: 'Apply Now' },
  { name: 'The Apprentice', price: '$2,500–$5,000', annual: 'Per 8-week cohort', features: ['8-week live cohort program','Choose your track','Hands-on KHG assignments','Certificate of completion','2 private 1-on-1 sessions','Alumni network for life','100% event & merch access'], discount: null, cta: 'Apply for Cohort' },
]

const CONSULTATIONS = [
  { name: 'Strategy Call', price: '$250', duration: '30 min', desc: 'Pick one topic. Get direct operator-level advice.' },
  { name: 'Brand Audit', price: '$500', duration: '60 min + report', desc: 'Full written audit of your brand. Competitive analysis. Action plan.' },
  { name: 'Full Consultation Day', price: '$2,500', duration: '4 hours', desc: 'Deep dive. Walk away with a complete action plan for your business.' },
  { name: 'Monthly Advisory Retainer', price: '$5,000/mo', duration: 'Ongoing', desc: 'Two calls/month. Async access. Quarterly review. KHG network.' },
]

export default function Home() {
  const [activeSchool, setActiveSchool] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', industry: '' })
  const [formSent, setFormSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080604] via-[#0a0806] to-[#080604]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,184,122,0.06),transparent_70%)]" />
        <div className="relative text-center max-w-4xl mx-auto fade-in">
          <p className="font-mono text-[10px] tracking-[6px] text-gold/60 mb-6 uppercase">The Lifestyle University</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-[0.9] mb-8">
            DR. DORSEY<br/>
            <span className="text-gold">COURSES</span>
          </h1>
          <p className="font-body text-base md:text-lg text-cream/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Real operator-level courses on events, hospitality, branding, automation, and e-commerce.
            Built from experience, not theory. 57+ entities. 8 cities. Receipts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#schools" className="px-8 py-4 bg-gold text-bg font-body font-semibold text-sm tracking-wider hover:bg-gold/90 transition-all">
              CHOOSE YOUR SCHOOL
            </a>
            <a href="#pricing" className="px-8 py-4 border border-gold/30 text-gold font-body text-sm tracking-wider hover:border-gold hover:bg-gold/5 transition-all">
              VIEW PRICING
            </a>
          </div>
          <div className="mt-16 flex justify-center gap-12 text-center">
            {[['10','Industry Schools'],['30','Programs'],['6','Colleges'],['5','Subscription Tiers']].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-gold">{n}</div>
                <div className="font-mono text-[9px] tracking-[2px] text-cream/30 mt-1 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 14L4 8h12L10 14z" fill="rgba(212,184,122,0.3)"/></svg>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="py-4 border-y border-gold/10 overflow-hidden">
        <div className="marquee">
          <div className="marquee-inner">
            {Array(2).fill('EVENTS  ◆  HOSPITALITY  ◆  BRANDING  ◆  AUTOMATION  ◆  E-COMMERCE  ◆  FOOD & BEVERAGE  ◆  VENUES  ◆  APPS  ◆  SERVICE BUSINESS  ◆  AUDIENCE GROWTH  ◆  ').map((t,i) => (
              <span key={i} className="font-mono text-[10px] tracking-[4px] text-gold/30 mx-4">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SCHOOLS ===== */}
      <section id="schools" className="py-24 px-6 max-w-7xl mx-auto">
        <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Choose Your Industry</p>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-4 font-light tracking-wider">10 Industry Schools</h2>
        <p className="text-cream/40 text-center mb-16 max-w-xl mx-auto">Each school is built around a specific industry. Pick your lane and learn from someone who's actually done it.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {SCHOOLS.map((s, i) => (
            <button key={s.key} onClick={() => setActiveSchool(i)}
              className={`text-left p-6 border rounded-lg transition-all ${activeSchool === i ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30 bg-surface'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-[2px] text-gold/40 uppercase">{s.priority <= 4 ? 'WAVE 1 LAUNCH' : `PRIORITY ${s.priority}`}</span>
                  <h3 className="font-display text-lg mt-1">{s.name}</h3>
                  <p className="text-cream/30 text-xs mt-1">College of {s.college}</p>
                </div>
                <span className="font-mono text-gold text-sm">{s.price}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active school detail */}
        <div className="border border-gold/20 rounded-xl p-8 md:p-12 bg-surface">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-[9px] tracking-[2px] text-gold/60 uppercase">Flagship Program</span>
              <h3 className="font-display text-3xl mt-2">{SCHOOLS[activeSchool].flagship}</h3>
              <p className="font-mono text-2xl text-gold mt-2">{SCHOOLS[activeSchool].price}</p>
            </div>
            <a href="#enroll" className="px-8 py-3 bg-gold text-bg font-body font-semibold text-sm tracking-wider hover:bg-gold/90 transition-all self-start">
              GET EARLY ACCESS
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-gold/60 mb-4 uppercase">Who It Serves</h4>
              <p className="text-cream/60 text-sm leading-relaxed">{SCHOOLS[activeSchool].serves}</p>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[3px] text-gold/60 mb-4 uppercase">Core Topics</h4>
              <ul className="space-y-2">
                {SCHOOLS[activeSchool].topics.map(t => (
                  <li key={t} className="text-cream/60 text-sm flex items-center gap-2">
                    <span className="text-gold text-[6px]">◆</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUBSCRIPTION TIERS ===== */}
      <section id="pricing" className="py-24 px-6 bg-surface2/50">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Subscriptions At All Levels</p>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4 font-light tracking-wider">Membership Tiers</h2>
          <p className="text-cream/40 text-center mb-16 max-w-xl mx-auto">From free to full apprenticeship. Pick the level that matches where you are right now.</p>

          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {TIERS.map((t, i) => (
              <div key={t.name} className={`relative rounded-xl p-6 border transition-all ${t.popular ? 'border-gold bg-gold/5 scale-[1.02]' : 'border-gold/10 bg-surface hover:border-gold/30'}`}>
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg font-mono text-[8px] tracking-[2px] px-4 py-1 rounded-full uppercase">Most Popular</div>
                )}
                <h3 className="font-display text-xl mb-2">{t.name}</h3>
                <div className="font-mono text-2xl text-gold mb-1">{t.price}</div>
                {t.annual && <div className="font-mono text-[10px] text-cream/30 mb-1">{t.annual}</div>}
                {t.discount && <div className="font-mono text-[10px] text-green-400">{t.discount}</div>}
                <ul className="mt-4 space-y-2 mb-6">
                  {t.features.map(f => (
                    <li key={f} className="text-cream/50 text-xs flex items-start gap-2">
                      <span className="text-gold text-[6px] mt-1.5">◆</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#enroll" className={`block text-center py-3 text-sm font-semibold tracking-wider transition-all ${t.popular ? 'bg-gold text-bg hover:bg-gold/90' : 'border border-gold/30 text-gold hover:bg-gold/10'}`}>
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSULTATIONS ===== */}
      <section id="consultations" className="py-24 px-6 max-w-5xl mx-auto">
        <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Work Directly With Dr. Dorsey</p>
        <h2 className="font-display text-4xl md:text-5xl text-center mb-4 font-light tracking-wider">Consultations</h2>
        <p className="text-cream/40 text-center mb-16 max-w-xl mx-auto">Not theory. Not generic. Real operator-to-operator advice from someone running 57+ entities across 8 cities.</p>

        <div className="space-y-4">
          {CONSULTATIONS.map(c => (
            <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between border border-gold/10 rounded-lg p-6 bg-surface hover:border-gold/30 transition-all gap-4">
              <div className="flex-1">
                <h3 className="font-display text-xl">{c.name}</h3>
                <p className="text-cream/40 text-sm mt-1">{c.desc}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl text-gold">{c.price}</div>
                <div className="font-mono text-[10px] text-cream/30 uppercase">{c.duration}</div>
              </div>
              <a href="#enroll" className="px-6 py-3 border border-gold/30 text-gold font-body text-sm tracking-wider hover:bg-gold/10 transition-all text-center">
                BOOK
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== UNIVERSITY STRUCTURE ===== */}
      <section className="py-24 px-6 bg-surface2/50">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">The Structure</p>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16 font-light tracking-wider">6 Founding Colleges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'College of Brand Architecture', owns: 'Personal brand, identity, positioning, authority, media image, storytelling' },
              { name: 'College of Experience Design', owns: 'Events, nightlife, activations, museums, hospitality programming, cultural moments' },
              { name: 'College of Enterprise', owns: 'Business models, expansion, leadership, wealth strategy, deal structure, partnerships' },
              { name: 'College of Operational Systems', owns: 'Automation, AI workflows, SOPs, CRM, dashboards, process design, delegation' },
              { name: 'College of Commercial Strategy', owns: 'E-commerce, retail, merch, product drops, pricing, monetization, conversion' },
              { name: 'College of Hospitality & Cultural Leadership', owns: 'Hospitality leadership, nightlife economics, venues, guest experience, cultural influence' },
            ].map(c => (
              <div key={c.name} className="border border-gold/10 rounded-lg p-6 bg-surface hover:border-gold/30 transition-all">
                <h3 className="font-display text-lg mb-3">{c.name}</h3>
                <p className="text-cream/40 text-xs leading-relaxed">{c.owns}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEAD CAPTURE / ENROLL ===== */}
      <section id="enroll" className="py-24 px-6">
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Get Started</p>
          <h2 className="font-display text-4xl text-center mb-4 font-light tracking-wider">
            {formSent ? 'You\'re In.' : 'Choose Your Industry'}
          </h2>

          {formSent ? (
            <div className="text-center py-12">
              <div className="text-gold text-6xl mb-4">◆</div>
              <p className="text-cream/60 mb-2">We received your info. Dr. Dorsey's team will reach out with your next steps.</p>
              <p className="font-mono text-[10px] text-cream/30 tracking-wider">CHECK YOUR EMAIL AND TEXT FOR EARLY ACCESS</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none transition-all" />
              <input type="email" placeholder="Email" required
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none transition-all" />
              <input type="tel" placeholder="Phone (optional)"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none transition-all" />
              <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} required
                className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm focus:border-gold/50 focus:outline-none transition-all appearance-none">
                <option value="" className="bg-bg">Select Your Industry</option>
                {SCHOOLS.map(s => <option key={s.key} value={s.key} className="bg-bg">{s.name}</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-gold text-bg font-body font-bold text-sm tracking-widest hover:bg-gold/90 transition-all">
                GET EARLY ACCESS
              </button>
              <p className="text-center text-cream/20 text-[10px] font-mono tracking-wider">FREE TRAINING INCLUDED · NO SPAM EVER</p>
            </form>
          )}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-gold/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[5px] text-gold/40 mb-2">THE LIFESTYLE UNIVERSITY</p>
          <p className="font-display text-2xl mb-4 font-light tracking-wider">Dr. Dorsey Courses</p>
          <p className="text-cream/20 text-xs">A Kollective Hospitality Group Enterprise · © 2026</p>
          <div className="flex justify-center gap-8 mt-8">
            {['Schools','Pricing','Consultations','Enroll'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-cream/30 hover:text-gold text-xs font-mono tracking-wider transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
