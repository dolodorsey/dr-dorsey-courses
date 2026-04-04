'use client'
import { useState, useEffect, useRef } from 'react'

const STRIPE = {
  lifestyle_pass_monthly:'price_1TIJHtKUVDzsdWUxSHmG8MIY',lifestyle_pass_annual:'price_1TIJHuKUVDzsdWUxK7S8Qy6A',
  operator_monthly:'price_1TIJIbKUVDzsdWUxQd9TWNHo',operator_annual:'price_1TIJIbKUVDzsdWUx7qpwotgk',
  inner_circle_monthly:'price_1TIJIbKUVDzsdWUx5QPHt9N2',inner_circle_annual:'price_1TIJIcKUVDzsdWUxrV9cxWMq',
  event_money_machine:'price_1TIJIcKUVDzsdWUxlLoXpTQ8',nightlife_money:'price_1TIJIdKUVDzsdWUxz5ezooe4',
  lifestyle_specialist:'price_1TIJIeKUVDzsdWUx2FQYkyeB',culture_ecom:'price_1TIJIfKUVDzsdWUxXpcYgQml',
  automate_biz_os:'price_1TIJIgKUVDzsdWUxptHr3Qk8',founder_empire:'price_1TIJIhKUVDzsdWUxvnxipPG9',
  restaurant_qsr_blueprint:'price_1TIJIiKUVDzsdWUxsikwYU6p',audience_to_income:'price_1TIJIjKUVDzsdWUxfrNM0I72',
  service_scale_blueprint:'price_1TIJIkKUVDzsdWUxS928s5Y4',app_launch_blueprint:'price_1TIJIlKUVDzsdWUxRY6X6Ybh',
  experience_blueprint:'price_1TIJImKUVDzsdWUxIcYpgAQ3',brand_monetization:'price_1TIJInKUVDzsdWUxvGh8DxZT',
  ai_operator:'price_1TIJIoKUVDzsdWUx9ez8Pb7B',offer_architecture:'price_1TIJIpKUVDzsdWUxhM9FdtAq',
  venue_revenue:'price_1TIJIqKUVDzsdWUxAbzwS9Vo',content_authority:'price_1TIJIrKUVDzsdWUxXQVBEsBM',
  merch_moves:'price_1TIJIrKUVDzsdWUxQDdIa9pN',menu_engineering:'price_1TIJIsKUVDzsdWUx0XBi7r9z',
  dayparty_launch:'price_1TIJItKUVDzsdWUxDwkwJHtn',sponsor_sales:'price_1TIJIuKUVDzsdWUx5cljIaNZ',
  shopify_drop_systems:'price_1TIJIvKUVDzsdWUxA0nkZKnW',sop_builder:'price_1TIJIwKUVDzsdWUxdhjFGMOl',
  authority_design:'price_1TIJIxKUVDzsdWUxBpkDMfeR',vip_experience:'price_1TIJIyKUVDzsdWUx6jjoO3vY',
  hospitality_brand_builder:'price_1TIJIzKUVDzsdWUxUq5Izjiz',crm_followup:'price_1TIJJ0KUVDzsdWUxk8RAX83L',
  strategy_call:'price_1TIJJ1KUVDzsdWUx9aJVErFU',brand_audit:'price_1TIJJ2KUVDzsdWUxOJhlreiJ',
  full_day:'price_1TIJJ2KUVDzsdWUxccLV6EgK',retainer:'price_1TIJJ3KUVDzsdWUxIesNwBy3',
}

const SB = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website'

const PILLARS = [
  { icon: '\u25C7', title: 'Business & Ownership', desc: 'Build enterprises that generate real wealth' },
  { icon: '\u25C8', title: 'Brand & Influence', desc: 'Craft brands that command attention and trust' },
  { icon: '\u25C6', title: 'Lifestyle & Power', desc: 'Design a life that reflects your ambition' },
  { icon: '\u2699', title: 'Systems & Automation', desc: 'Scale with AI, SOPs, and operator intelligence' },
]

const SCHOOLS = [
  { name:'Experience Economy', flagship:'Event Money Machine', sk:'event_money_machine', price:'$1,997', desc:'Launch, scale, and monetize events. Built from running 15+ event brands.', img:'thesis-bg.jpg' },
  { name:'Hospitality & Nightlife', flagship:'Nightlife Money Machine', sk:'nightlife_money', price:'$1,997', desc:'Build profitable nightlife brands and venue partnerships.', img:'rooftop-lounge.jpg' },
  { name:'Personal Brand', flagship:'Lifestyle Specialist Blueprint', sk:'lifestyle_specialist', price:'$1,997', desc:'Turn your expertise and attention into scalable income.', img:'hero-bg.jpg' },
  { name:'Automation & Systems', flagship:'Automate Your Business OS', sk:'automate_biz_os', price:'$2,497', desc:'Build the AI-powered operating system behind a real enterprise.', img:'luxury-venue.jpg' },
  { name:'Food Brand Launch', flagship:'Restaurant & QSR Blueprint', sk:'restaurant_qsr_blueprint', price:'$1,997', desc:'Launch restaurants, food trucks, and QSR concepts that scale.', img:'penthouse-skyline.jpg' },
  { name:'Audience Growth', flagship:'Audience to Income System', sk:'audience_to_income', price:'$1,497', desc:'Grow organically and convert followers into revenue.', img:'garden-district.jpg' },
  { name:'Merch & E-Commerce', flagship:'Culture Brand E-Commerce', sk:'culture_ecom', price:'$1,997', desc:'Build culture-first e-commerce brands on Shopify.', img:'thesis-bg.jpg' },
  { name:'Service Business', flagship:'Service Business Scale', sk:'service_scale_blueprint', price:'$1,497', desc:'Package expertise into offers that attract premium clients.', img:'luxury-venue.jpg' },
  { name:'App Launch', flagship:'App Launch Blueprint', sk:'app_launch_blueprint', price:'$1,497', desc:'Go from idea to App Store without burning capital.', img:'hero-bg.jpg' },
  { name:'Venue Development', flagship:'Venue Revenue Blueprint', sk:'venue_revenue', price:'$497', desc:'Program and monetize physical spaces for maximum revenue.', img:'rooftop-lounge.jpg' },
]

const PROGRAMS = [
  { name:'Event Money Machine', sk:'event_money_machine', price:'$1,997', cat:'Business & Ownership' },
  { name:'Nightlife Money Machine', sk:'nightlife_money', price:'$1,997', cat:'Lifestyle & Power' },
  { name:'Lifestyle Specialist', sk:'lifestyle_specialist', price:'$1,997', cat:'Brand & Influence' },
  { name:'Automate Your Business OS', sk:'automate_biz_os', price:'$2,497', cat:'Systems & Automation' },
]

const TIERS = [
  { name:'The Taste', price:'FREE', annual:null, sm:null, sa:null, features:['1 mini-lesson per school','Weekly newsletter','Public community','Free training library'], cta:'Start Free' },
  { name:'Lifestyle Pass', price:'$29/mo', annual:'$249/yr', sm:'lifestyle_pass_monthly', sa:'lifestyle_pass_annual', features:['Full course library','Monthly live Q&A','Community access','Templates & playbooks','10% off events & merch'], cta:'Subscribe' },
  { name:'The Operator', price:'$79/mo', annual:'$699/yr', sm:'operator_monthly', sa:'operator_annual', features:['Everything in Pass','Deep-dive masterclasses','Full SOP library','Private channel','Group coaching','20% off events & merch'], popular:true, cta:'Go Operator' },
  { name:'Inner Circle', price:'$199/mo', annual:'$1,799/yr', sm:'inner_circle_monthly', sa:'inner_circle_annual', features:['Everything in Operator','Monthly 1-on-1 (30 min)','VIP event access','Direct DM access','Co-branding opps','30% off everything'], cta:'Apply Now' },
  { name:'Apprentice', price:'$2,500+', annual:'Per cohort', sm:null, sa:null, features:['8-week live cohort','Choose your track','KHG assignments','Certificate','2 private 1-on-1s','Alumni network','100% access'], cta:'Apply' },
]

const CONSULTS = [
  { name:'Strategy Call', price:'$250', dur:'30 min', sk:'strategy_call', desc:'Pick one topic. Direct operator-level advice.' },
  { name:'Brand Audit', price:'$500', dur:'60 min + report', sk:'brand_audit', desc:'Full written audit. Competitive analysis. Action plan.' },
  { name:'Full Day', price:'$2,500', dur:'4 hours', sk:'full_day', desc:'Deep dive. Walk away with a complete action plan.' },
  { name:'Monthly Retainer', price:'$5,000/mo', dur:'Ongoing', sk:'retainer', desc:'Two calls/month. Async access. Quarterly review.', isSub:true },
]

const RESULTS = [
  { num:'57+', label:'Brands Built' },
  { num:'8', label:'Cities Active' },
  { num:'198', label:'AI Agents' },
  { num:'$0', label:'VC Raised' },
]

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.12 })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function Section({ children, className = '', id, light }) {
  const [ref, vis] = useReveal()
  return (
    <section ref={ref} id={id} className={`${className} ${light ? 'bg-cream text-bg' : ''}`}
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
      {children}
    </section>
  )
}

function Crest({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M50 5 L65 20 L80 15 L75 35 L95 45 L80 55 L85 75 L65 70 L50 90 L35 70 L15 75 L20 55 L5 45 L25 35 L20 15 L35 20 Z" stroke="#D4B87A" strokeWidth="1.5" fill="rgba(212,184,122,0.08)"/>
      <circle cx="50" cy="47" r="18" stroke="#D4B87A" strokeWidth="0.8" fill="none"/>
      <text x="50" y="44" textAnchor="middle" fill="#D4B87A" fontSize="10" fontFamily="Cormorant Garamond, serif" fontWeight="600">TLU</text>
      <text x="50" y="55" textAnchor="middle" fill="#D4B87A" fontSize="6" fontFamily="DM Mono, monospace" letterSpacing="1.5">EST. 2026</text>
    </svg>
  )
}

export default function Home() {
  const [buying, setBuying] = useState(null)
  const [bc, setBc] = useState('monthly')
  const [fd, setFd] = useState({ name:'', email:'', phone:'', industry:'' })
  const [sent, setSent] = useState(false)
  const [sub, setSub] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2400)
    const fn = () => setNavSolid(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const checkout = async (sk, mode = 'payment') => {
    setBuying(sk)
    try {
      const r = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ priceId: STRIPE[sk], mode, programKey: sk }) })
      const d = await r.json()
      if (d.url) window.location.href = d.url
    } catch (e) { console.error(e) }
    setBuying(null)
  }

  const submit = async (e) => {
    e.preventDefault(); setSub(true)
    try { await fetch('/api/enroll', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(fd) }); setSent(true) } catch(e) { console.error(e) }
    setSub(false)
  }

  return (
    <main className="min-h-screen">
      {/* PRELOADER */}
      <div className={`fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center transition-all duration-[1200ms] ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Crest size={60} />
        <p className="mt-6 text-cream text-2xl md:text-4xl font-light tracking-[0.15em] font-display" style={{ animation:'breathe 2s ease-in-out infinite' }}>THE LIFESTYLE UNIVERSITY</p>
        <p className="mt-2 text-[9px] tracking-[0.4em] text-gold/50 font-mono">DR. DORSEY COURSES</p>
      </div>
      <style>{`@keyframes breathe{0%,100%{opacity:.4}50%{opacity:1}}`}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${navSolid ? 'bg-bg/95 backdrop-blur-xl border-b border-gold/8' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <Crest size={28} />
          <span className="text-sm tracking-[0.1em] text-cream font-display">The Lifestyle University</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Schools','Programs','Pricing','Consultations'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[9px] tracking-[0.2em] uppercase text-cream/40 hover:text-gold transition-colors font-mono">{l}</a>
          ))}
          <a href="#enroll" className="text-[9px] tracking-[0.2em] uppercase bg-gold text-bg px-5 py-2 hover:bg-gold/80 transition-colors font-mono">Apply Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><img src={`${SB}/hero-bg.jpg`} alt="" className="w-full h-full object-cover opacity-40" /></div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/20 to-bg" />
        <div className="relative text-center max-w-4xl mx-auto px-6 pt-20">
          <div className="flex justify-center mb-8"><Crest size={80} /></div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6 font-display">
            <em className="italic text-gold">Build the Life.</em><br/>Lead the Room.
          </h1>
          <p className="text-sm md:text-base text-cream/45 max-w-lg mx-auto mb-10 leading-relaxed">A New Institution for the Ambitious & Elite. Real courses built from 57+ brands across 8 cities.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#enroll" className="px-10 py-4 bg-gold text-bg text-sm font-semibold tracking-[0.15em] uppercase hover:bg-gold/80 transition-all">Apply Now</a>
            <a href="#schools" className="px-10 py-4 border border-gold/30 text-gold text-sm tracking-[0.15em] uppercase hover:border-gold hover:bg-gold/5 transition-all">Explore Schools</a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 md:grid-cols-4 border-t border-cream/8">
          {RESULTS.map(r => (
            <div key={r.label} className="py-5 text-center border-r border-cream/5 last:border-r-0">
              <div className="text-2xl md:text-3xl text-gold font-light font-display">{r.num}</div>
              <div className="text-[8px] tracking-[0.25em] text-cream/25 mt-1 uppercase font-mono">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <Section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gold/20" />
            <h2 className="text-3xl md:text-4xl font-light tracking-wider font-display">Our Pillars of <em className="italic text-gold">Mastery</em></h2>
            <div className="h-px w-16 bg-gold/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {PILLARS.map(p => (
              <div key={p.title} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center text-gold text-xl">{p.icon}</div>
                <h3 className="text-sm font-medium tracking-wide font-display">{p.title}</h3>
                <p className="text-[11px] text-cream/35 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SCHOOLS */}
      <Section id="schools" light className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-[#8B7340]/20" />
              <h2 className="text-3xl md:text-5xl font-light font-display">Schools of <em className="italic text-[#8B7340]">Excellence</em></h2>
              <div className="h-px w-16 bg-[#8B7340]/20" />
            </div>
            <p className="text-sm text-bg/40 max-w-md mx-auto">10 industry-specific schools. Each built from real experience.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {SCHOOLS.map(s => (
              <div key={s.name} className="relative group overflow-hidden min-h-[200px] md:min-h-[240px] cursor-pointer" onClick={() => checkout(s.sk)}>
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105"><img src={`${SB}/${s.img}`} alt="" className="w-full h-full object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-bg/20" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                  <div>
                    <p className="text-[9px] tracking-[0.2em] text-gold uppercase mb-1 font-mono">School of</p>
                    <h3 className="text-xl md:text-2xl font-semibold text-cream tracking-wide font-display">{s.name}</h3>
                    <p className="text-[11px] text-cream/50 mt-2 max-w-[280px] leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-[9px] tracking-[0.15em] text-gold/70 uppercase border border-cream/15 px-3 py-1.5 bg-bg/30 backdrop-blur-sm hover:bg-gold hover:text-bg transition-all font-mono">Explore School</div>
                    <div className="text-right">
                      <div className="text-xs text-cream/40 font-mono">from</div>
                      <div className="text-xl text-gold font-light font-display">{s.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SIGNATURE PROGRAMS */}
      <Section id="programs" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gold/20" />
              <h2 className="text-3xl md:text-5xl font-light font-display">Signature <em className="italic text-gold">Programs</em></h2>
              <div className="h-px w-16 bg-gold/20" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROGRAMS.map((p, i) => (
              <div key={p.name} className="relative group overflow-hidden min-h-[220px] cursor-pointer" onClick={() => checkout(p.sk)}>
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105"><img src={`${SB}/${SCHOOLS[i].img}`} alt="" className="w-full h-full object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/50 to-bg/30" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-lg font-medium text-cream italic font-display">{p.name}</h3>
                    <p className="text-[9px] tracking-[0.15em] text-gold/60 mt-1 uppercase font-mono">{p.cat}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-[9px] tracking-[0.15em] text-gold/70 uppercase border border-cream/15 px-3 py-1.5 bg-bg/30 backdrop-blur-sm hover:bg-gold hover:text-bg transition-all font-mono">Learn More</div>
                    <div className="text-lg text-gold font-light font-display">{p.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* RESULTS */}
      <Section className="py-16 px-6 border-y border-gold/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-20 bg-gold/20" />
            <h2 className="text-2xl md:text-3xl font-light italic text-gold font-display">The Results</h2>
            <div className="h-px w-20 bg-gold/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {RESULTS.map(r => (
              <div key={r.label}>
                <div className="text-3xl md:text-5xl text-gold font-light font-display">{r.num}</div>
                <div className="text-[9px] tracking-[0.25em] text-cream/30 mt-2 uppercase font-mono">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STUDENT EXPERIENCE */}
      <Section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gold/20" />
              <h2 className="text-3xl md:text-4xl font-light font-display">The Student <em className="italic text-gold">Experience</em></h2>
              <div className="h-px w-16 bg-gold/20" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title:'Elite Workshops', desc:'Live deep-dives with Dr. Dorsey on building, scaling, and monetizing.', img:'rooftop-lounge.jpg' },
              { title:'Private Community', desc:'Network with other operators, founders, and ambitious builders.', img:'luxury-venue.jpg' },
              { title:'Live Mentorship', desc:'Direct access. Monthly coaching. Real accountability.', img:'garden-district.jpg' },
            ].map(exp => (
              <div key={exp.title} className="relative overflow-hidden min-h-[260px] group">
                <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105"><img src={`${SB}/${exp.img}`} alt="" className="w-full h-full object-cover" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl text-cream font-medium mb-2 font-display">{exp.title}</h3>
                  <p className="text-[12px] text-cream/50 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" light className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[9px] tracking-[0.4em] text-[#8B7340] mb-2 uppercase font-mono">Membership Tiers</p>
            <h2 className="text-3xl md:text-5xl font-light text-bg font-display">Choose Your <em className="italic text-[#8B7340]">Path</em></h2>
          </div>
          <div className="flex justify-center gap-3 my-8">
            <button onClick={() => setBc('monthly')} className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-mono transition-all ${bc==='monthly' ? 'bg-bg text-gold' : 'border border-bg/15 text-bg/50'}`}>Monthly</button>
            <button onClick={() => setBc('annual')} className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-mono transition-all ${bc==='annual' ? 'bg-bg text-gold' : 'border border-bg/15 text-bg/50'}`}>Annual <span className="text-green-700 text-[8px]">SAVE</span></button>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
            {TIERS.map(t => (
              <div key={t.name} className={`relative p-6 border transition-all ${t.popular ? 'border-gold bg-bg text-cream scale-[1.02]' : 'border-bg/10 bg-white hover:border-[#8B7340]/30'}`}>
                {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg text-[7px] tracking-[0.2em] px-4 py-1 uppercase font-mono">Most Popular</div>}
                <h3 className="text-lg mb-2 font-display">{t.name}</h3>
                <div className="text-2xl mb-1 font-mono" style={{ color: t.popular ? '#D4B87A' : '#8B7340' }}>{t.price}</div>
                {t.annual && <div className="text-[10px] opacity-40 mb-1 font-mono">{t.annual}</div>}
                <ul className="mt-4 space-y-2 mb-6">
                  {t.features.map(f => (
                    <li key={f} className={`text-xs flex items-start gap-2 ${t.popular ? 'text-cream/50' : 'text-bg/50'}`}>
                      <span className="text-gold text-[6px] mt-1.5">{'\u25C6'}</span>{f}
                    </li>
                  ))}
                </ul>
                {t.sm ? (
                  <button onClick={() => checkout(bc==='annual' ? t.sa : t.sm, 'subscription')}
                    className={`w-full py-3 text-[10px] tracking-[0.15em] uppercase font-semibold font-mono transition-all ${t.popular ? 'bg-gold text-bg hover:bg-gold/80' : 'border border-bg/20 text-bg hover:bg-bg/5'}`}>{t.cta}</button>
                ) : (
                  <a href="#enroll" className={`block text-center py-3 text-[10px] tracking-[0.15em] uppercase font-semibold font-mono transition-all ${t.name==='Apprentice' ? 'bg-bg text-gold hover:bg-bg/80' : 'border border-bg/20 text-bg hover:bg-bg/5'}`}>{t.cta}</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONSULTATIONS */}
      <Section id="consultations" className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[9px] tracking-[0.4em] text-gold mb-2 uppercase font-mono">Work Directly With Dr. Dorsey</p>
            <h2 className="text-3xl md:text-5xl font-light font-display">Book a Strategy <em className="italic text-gold">Session</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {CONSULTS.map((c, i) => (
              <div key={c.name} className="relative p-6 md:p-8 border border-gold/10 bg-surface hover:border-gold/30 transition-all cursor-pointer group overflow-hidden"
                onClick={() => checkout(c.sk, c.isSub ? 'subscription' : 'payment')}>
                <div className="absolute top-[-8px] right-3 text-6xl text-gold/5 font-light font-display">{String(i+1).padStart(2,'0')}</div>
                <h3 className="text-xl font-medium relative z-10 font-display">{c.name}</h3>
                <p className="text-[12px] text-cream/40 mt-2 leading-relaxed relative z-10">{c.desc}</p>
                <div className="flex items-end justify-between mt-4 relative z-10">
                  <div className="text-xl text-gold font-mono">{c.price}</div>
                  <div className="text-[9px] text-cream/30 uppercase tracking-wide font-mono">{c.dur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOUNDER */}
      <Section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[9px] tracking-[0.4em] text-gold mb-4 uppercase font-mono">Meet Our Founder</p>
              <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight font-display">Building Tomorrow&apos;s<br/><em className="italic text-gold">Leaders</em></h2>
              <p className="text-sm text-cream/45 leading-relaxed mb-6">Dr. DoLo Dorsey built a 57-brand enterprise spanning events, hospitality, tech, food, and consumer products across 8 cities &mdash; without a dollar of venture capital.</p>
              <p className="text-sm text-cream/45 leading-relaxed mb-8">The Lifestyle University isn&apos;t a course platform. It&apos;s the operating manual for building an empire.</p>
              <a href="#enroll" className="inline-block px-8 py-3 border border-gold/30 text-gold text-[10px] tracking-[0.2em] uppercase hover:bg-gold/10 transition-all font-mono">Learn More</a>
            </div>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <img src={`${SB}/hero-bg.jpg`} alt="Dr. Dorsey" className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Section>

      {/* ENROLL */}
      <Section id="enroll" light className="py-20 md:py-28 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center"><Crest size={48} /></div>
          <h2 className="text-3xl md:text-4xl font-light mt-6 mb-2 text-bg font-display">{sent ? "You're In." : 'Begin Your Journey'}</h2>
          <p className="text-sm text-bg/40 mb-8">Join The Lifestyle University and start building your empire today.</p>
          {sent ? (
            <div className="py-12">
              <div className="text-[#8B7340] text-5xl mb-4">{'\u25C6'}</div>
              <p className="text-bg/60">We received your info. Dr. Dorsey&apos;s team will reach out.</p>
              <p className="text-[9px] text-bg/25 tracking-[0.2em] mt-4 uppercase font-mono">Check your email for early access</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3 text-left">
              <input type="text" placeholder="Full Name" required value={fd.name} onChange={e => setFd({...fd, name:e.target.value})} className="w-full bg-white border border-bg/10 px-5 py-4 text-bg text-sm placeholder:text-bg/25 focus:border-[#8B7340] focus:outline-none transition-all" />
              <input type="email" placeholder="Email" required value={fd.email} onChange={e => setFd({...fd, email:e.target.value})} className="w-full bg-white border border-bg/10 px-5 py-4 text-bg text-sm placeholder:text-bg/25 focus:border-[#8B7340] focus:outline-none transition-all" />
              <input type="tel" placeholder="Phone (optional)" value={fd.phone} onChange={e => setFd({...fd, phone:e.target.value})} className="w-full bg-white border border-bg/10 px-5 py-4 text-bg text-sm placeholder:text-bg/25 focus:border-[#8B7340] focus:outline-none transition-all" />
              <select value={fd.industry} onChange={e => setFd({...fd, industry:e.target.value})} required className="w-full bg-white border border-bg/10 px-5 py-4 text-bg text-sm focus:border-[#8B7340] focus:outline-none transition-all appearance-none">
                <option value="">Select Your School</option>
                {SCHOOLS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <button type="submit" disabled={sub} className="w-full py-4 bg-bg text-gold font-semibold text-sm tracking-[0.2em] uppercase hover:bg-bg/80 transition-all disabled:opacity-50 font-mono">
                {sub ? 'Submitting...' : 'Get Early Access'}
              </button>
              <p className="text-center text-bg/20 text-[9px] tracking-[0.15em] uppercase font-mono">Free training included &middot; Secure checkout via Stripe</p>
            </form>
          )}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gold/8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              {['Schools','Programs','Admissions','Partnerships','About','Contact','FAQs'].map(l => (
                <a key={l} href={l === 'Admissions' ? '#enroll' : `#${l.toLowerCase()}`} className="text-[9px] tracking-[0.15em] text-cream/25 hover:text-gold transition-colors uppercase font-mono">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-6 text-cream/15 text-[9px] font-mono">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-cream/15 text-[10px] tracking-[0.1em] font-mono">&copy; 2026 Dr. DoLo Dorsey &mdash; The Kollective Hospitality Group</p>
          </div>
        </div>
      </footer>

      {typeof window !== 'undefined' && new URLSearchParams(window?.location?.search).get('success') && (
        <div className="fixed top-0 left-0 right-0 z-[10001] bg-green-900/80 backdrop-blur-sm px-6 py-4 text-center">
          <p className="text-green-300 text-sm tracking-wider font-mono">PAYMENT SUCCESSFUL &mdash; Welcome to The Lifestyle University.</p>
        </div>
      )}
    </main>
  )
}
