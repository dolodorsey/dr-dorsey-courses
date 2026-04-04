'use client'
import { useState } from 'react'

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
const SCHOOLS=[{name:'The Experience Economy School',key:'experience',flagship:'Event Money Machine',sk:'event_money_machine',price:'$1,997',serves:'Event curators, festival founders, pop-up operators',topics:['Launch a Profitable Event','Build an Event Brand','Ticketing, Sponsors & Upsells','Event Marketing Systems','Cultural Experience Design'],college:'Experience Design'},{name:'The Hospitality & Nightlife Growth School',key:'hospitality',flagship:'Nightlife Money Machine',sk:'nightlife_money',price:'$1,997',serves:'Club owners, promoters, venue operators',topics:['Build a Profitable Nightlife Brand','Venue Marketing That Fills Rooms','Promoter Systems','VIP Experience Design','Sponsorship Strategy'],college:'Hospitality'},{name:'The Personal Brand Monetization School',key:'personal_brand',flagship:'The Lifestyle Specialist Blueprint',sk:'lifestyle_specialist',price:'$1,997',serves:'Influencers, creators, coaches, experts',topics:['Personal Brand That Sells','Turn Attention Into Income','Offer Creation','Brand Partnerships','Audience-to-Revenue'],college:'Brand Architecture'},{name:'The Automation Operator School',key:'automation',flagship:'Automate Your Business OS',sk:'automate_biz_os',price:'$2,497',serves:'Founders, agency owners, operators',topics:['Build a Business OS','CRM & Pipeline Design','AI for Sales & Content','SOP Building','AI Agents'],college:'Operational Systems'},{name:'The Food Brand Launch School',key:'food',flagship:'Restaurant & QSR Launch Blueprint',sk:'restaurant_qsr_blueprint',price:'$1,997',serves:'Restaurant founders, food trucks, QSR',topics:['Launch a Food Brand Fast','Menu Engineering','Digital Ordering','Multi-Unit Expansion','Food SOPs'],college:'Hospitality'},{name:'The Audience Growth School',key:'audience',flagship:'Audience to Income System',sk:'audience_to_income',price:'$1,497',serves:'Marketers, promoters, brand builders',topics:['Grow Organically','Promoter Systems','Street + Digital','Lead Gen','Campaign Building'],college:'Brand Architecture'},{name:'The Brand Merch & E-Commerce School',key:'merch',flagship:'Culture Brand E-Commerce Blueprint',sk:'culture_ecom',price:'$1,997',serves:'Apparel founders, Shopify, culture brands',topics:['Merch With Cultural Weight','Shopify Launch','Drops & Scarcity','Photography','Brand Worldbuilding'],college:'Commercial Strategy'},{name:'The Expert Service Business School',key:'service',flagship:'Service Business Scale Blueprint',sk:'service_scale_blueprint',price:'$1,497',serves:'Coaches, consultants, advisors',topics:['Package Expertise','Client Acquisition','Booking Automation','Premium Pricing','Retention'],college:'Enterprise'},{name:'The App Launch & Growth School',key:'app',flagship:'App Launch Blueprint',sk:'app_launch_blueprint',price:'$1,497',serves:'App founders, startups',topics:['Launch Without Waste','MVP Strategy','User Acquisition','Retention','Founder GTM'],college:'Operational Systems'},{name:'The Venue & Lifestyle Development School',key:'venue',flagship:'Venue Revenue Blueprint',sk:'venue_revenue',price:'$497',serves:'Venue owners, RE developers',topics:['Venue That Prints Money','Space Programming','Experience Development','Day-to-Night','Monetization'],college:'Hospitality'}]
const TIERS=[{name:'The Taste',price:'FREE',annual:null,sm:null,sa:null,features:['1 mini-lesson per school','Weekly newsletter','Public community','Free training library'],cta:'Start Free'},{name:'The Lifestyle Pass',price:'$29/mo',annual:'$249/yr',sm:'lifestyle_pass_monthly',sa:'lifestyle_pass_annual',features:['Full course library','Monthly live Q&A','Community','Weekly drops','Templates','10% off events & merch'],discount:'Save $99/yr',cta:'Subscribe'},{name:'The Operator',price:'$79/mo',annual:'$699/yr',sm:'operator_monthly',sa:'operator_annual',features:['Everything in Pass','Masterclasses','Full SOP library','Private channel','Group coaching','20% off events & merch'],discount:'Save $249/yr',popular:true,cta:'Go Operator'},{name:'The Inner Circle',price:'$199/mo',annual:'$1,799/yr',sm:'inner_circle_monthly',sa:'inner_circle_annual',features:['Everything in Operator','Monthly 1-on-1 (30 min)','VIP event access','Early launch access','Direct DM','Co-branding','30% off'],discount:'Save $419/yr',cta:'Apply Now'},{name:'The Apprentice',price:'$2,500–$5,000',annual:'Per 8-week cohort',sm:null,sa:null,features:['8-week live cohort','Choose track','KHG assignments','Certificate','2 private 1-on-1s','Alumni network','100% access'],cta:'Apply for Cohort'}]
const CONSULTS=[{name:'Strategy Call',price:'$250',dur:'30 min',sk:'strategy_call',desc:'Pick one topic. Direct operator-level advice.'},{name:'Brand Audit',price:'$500',dur:'60 min + report',sk:'brand_audit',desc:'Full written audit + competitive analysis.'},{name:'Full Day',price:'$2,500',dur:'4 hours',sk:'full_day',desc:'Deep dive. Complete action plan.'},{name:'Monthly Retainer',price:'$5,000/mo',dur:'Ongoing',sk:'retainer',desc:'Two calls/month + async access.',isSub:true}]

export default function Home(){
  const[as,setAs]=useState(0)
  const[bc,setBc]=useState('monthly')
  const[buying,setBuying]=useState(null)
  const[fd,setFd]=useState({name:'',email:'',phone:'',industry:''})
  const[sent,setSent]=useState(false)
  const[sub,setSub]=useState(false)

  const checkout=async(sk,mode='payment')=>{
    setBuying(sk)
    try{const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({priceId:STRIPE[sk],mode,programKey:sk})});const d=await r.json();if(d.url)window.location.href=d.url}catch(e){console.error(e)}
    setBuying(null)
  }
  const submit=async(e)=>{e.preventDefault();setSub(true);try{await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fd)});setSent(true)}catch(e){console.error(e)}setSub(false)}
  const Buy=({sk,mode,label,filled})=>(<button onClick={()=>checkout(sk,mode)} disabled={buying===sk} className={`px-6 py-3 text-sm font-semibold tracking-wider transition-all ${filled?'bg-gold text-bg hover:bg-gold/90':'border border-gold/30 text-gold hover:bg-gold/10'} ${buying===sk?'opacity-50':''}`}>{buying===sk?'...':label||'ENROLL'}</button>)

  return(<main className="min-h-screen">
    {typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('success')&&<div className="bg-green-900/40 border-b border-green-500/30 px-6 py-4 text-center"><p className="text-green-400 font-mono text-sm tracking-wider">PAYMENT SUCCESSFUL — Check your email for access.</p></div>}

    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080604] via-[#0a0806] to-[#080604]"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,184,122,0.06),transparent_70%)]"/>
      <div className="relative text-center max-w-4xl mx-auto fade-in">
        <p className="font-mono text-[10px] tracking-[6px] text-gold/60 mb-6 uppercase">The Lifestyle University</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-[0.9] mb-8">DR. DORSEY<br/><span className="text-gold">COURSES</span></h1>
        <p className="font-body text-base md:text-lg text-cream/50 max-w-2xl mx-auto mb-10 leading-relaxed">Real operator-level courses on events, hospitality, branding, automation, and e-commerce. Built from experience, not theory.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#schools" className="px-8 py-4 bg-gold text-bg font-body font-semibold text-sm tracking-wider hover:bg-gold/90">CHOOSE YOUR SCHOOL</a>
          <a href="#pricing" className="px-8 py-4 border border-gold/30 text-gold font-body text-sm tracking-wider hover:border-gold hover:bg-gold/5">VIEW PRICING</a>
        </div>
        <div className="mt-16 flex justify-center gap-12">{[['10','Schools'],['30','Programs'],['6','Colleges'],['5','Sub Tiers']].map(([n,l])=>(<div key={l}><div className="font-display text-3xl text-gold">{n}</div><div className="font-mono text-[9px] tracking-[2px] text-cream/30 mt-1 uppercase">{l}</div></div>))}</div>
      </div>
    </section>

    <div className="py-4 border-y border-gold/10 overflow-hidden"><div className="marquee"><div className="marquee-inner">{Array(2).fill('EVENTS  ◆  HOSPITALITY  ◆  BRANDING  ◆  AUTOMATION  ◆  E-COMMERCE  ◆  FOOD  ◆  VENUES  ◆  APPS  ◆  ').map((t,i)=>(<span key={i} className="font-mono text-[10px] tracking-[4px] text-gold/30 mx-4">{t}</span>))}</div></div></div>

    <section id="schools" className="py-24 px-6 max-w-7xl mx-auto">
      <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Choose Your Industry</p>
      <h2 className="font-display text-4xl md:text-5xl text-center mb-16 font-light tracking-wider">10 Industry Schools</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">{SCHOOLS.map((s,i)=>(<button key={s.key} onClick={()=>setAs(i)} className={`text-left p-6 border rounded-lg transition-all ${as===i?'border-gold bg-gold/5':'border-gold/10 hover:border-gold/30 bg-surface'}`}><div className="flex items-start justify-between"><div><span className="font-mono text-[9px] tracking-[2px] text-gold/40 uppercase">{i<4?'WAVE 1':'PRIORITY '+(i+1)}</span><h3 className="font-display text-lg mt-1">{s.name}</h3><p className="text-cream/30 text-xs mt-1">College of {s.college}</p></div><span className="font-mono text-gold text-sm">{s.price}</span></div></button>))}</div>
      <div className="border border-gold/20 rounded-xl p-8 md:p-12 bg-surface">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8"><div><span className="font-mono text-[9px] tracking-[2px] text-gold/60 uppercase">Flagship Program</span><h3 className="font-display text-3xl mt-2">{SCHOOLS[as].flagship}</h3><p className="font-mono text-2xl text-gold mt-2">{SCHOOLS[as].price}</p></div><Buy sk={SCHOOLS[as].sk} label="ENROLL NOW" filled/></div>
        <div className="grid md:grid-cols-2 gap-8"><div><h4 className="font-mono text-[10px] tracking-[3px] text-gold/60 mb-4 uppercase">Who It Serves</h4><p className="text-cream/60 text-sm">{SCHOOLS[as].serves}</p></div><div><h4 className="font-mono text-[10px] tracking-[3px] text-gold/60 mb-4 uppercase">Core Topics</h4><ul className="space-y-2">{SCHOOLS[as].topics.map(t=>(<li key={t} className="text-cream/60 text-sm flex items-center gap-2"><span className="text-gold text-[6px]">◆</span>{t}</li>))}</ul></div></div>
      </div>
    </section>

    <section id="pricing" className="py-24 px-6 bg-surface2/50"><div className="max-w-7xl mx-auto">
      <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Subscriptions At All Levels</p>
      <h2 className="font-display text-4xl md:text-5xl text-center mb-4 font-light tracking-wider">Membership Tiers</h2>
      <div className="flex justify-center gap-4 my-8">
        <button onClick={()=>setBc('monthly')} className={`px-6 py-2 text-xs font-mono tracking-wider ${bc==='monthly'?'bg-gold text-bg':'border border-gold/20 text-cream/50'}`}>MONTHLY</button>
        <button onClick={()=>setBc('annual')} className={`px-6 py-2 text-xs font-mono tracking-wider ${bc==='annual'?'bg-gold text-bg':'border border-gold/20 text-cream/50'}`}>ANNUAL <span className="text-green-400 text-[10px]">SAVE</span></button>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">{TIERS.map(t=>(<div key={t.name} className={`relative rounded-xl p-6 border ${t.popular?'border-gold bg-gold/5 scale-[1.02]':'border-gold/10 bg-surface hover:border-gold/30'}`}>
        {t.popular&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg font-mono text-[8px] tracking-[2px] px-4 py-1 rounded-full">MOST POPULAR</div>}
        <h3 className="font-display text-xl mb-2">{t.name}</h3>
        <div className="font-mono text-2xl text-gold mb-1">{t.price}</div>
        {t.annual&&<div className="font-mono text-[10px] text-cream/30">{t.annual}</div>}
        {t.discount&&<div className="font-mono text-[10px] text-green-400">{t.discount}</div>}
        <ul className="mt-4 space-y-2 mb-6">{t.features.map(f=>(<li key={f} className="text-cream/50 text-xs flex items-start gap-2"><span className="text-gold text-[6px] mt-1.5">◆</span>{f}</li>))}</ul>
        {t.sm?<button onClick={()=>checkout(bc==='annual'?t.sa:t.sm,'subscription')} className={`w-full py-3 text-sm font-semibold tracking-wider ${t.popular?'bg-gold text-bg hover:bg-gold/90':'border border-gold/30 text-gold hover:bg-gold/10'}`}>{t.cta}</button>:<a href="#enroll" className="block text-center py-3 text-sm font-semibold tracking-wider border border-gold/30 text-gold hover:bg-gold/10">{t.cta}</a>}
      </div>))}</div>
    </div></section>

    <section id="consultations" className="py-24 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-[10px] tracking-[5px] text-gold/60 mb-3 uppercase text-center">Work Directly With Dr. Dorsey</p>
      <h2 className="font-display text-4xl md:text-5xl text-center mb-16 font-light tracking-wider">Consultations</h2>
      <div className="space-y-4">{CONSULTS.map(c=>(<div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between border border-gold/10 rounded-lg p-6 bg-surface hover:border-gold/30 gap-4">
        <div className="flex-1"><h3 className="font-display text-xl">{c.name}</h3><p className="text-cream/40 text-sm mt-1">{c.desc}</p></div>
        <div className="text-right"><div className="font-mono text-2xl text-gold">{c.price}</div><div className="font-mono text-[10px] text-cream/30 uppercase">{c.dur}</div></div>
        <Buy sk={c.sk} mode={c.isSub?'subscription':'payment'} label="BOOK"/>
      </div>))}</div>
    </section>

    <section className="py-24 px-6 bg-surface2/50"><div className="max-w-5xl mx-auto">
      <h2 className="font-display text-4xl text-center mb-16 font-light tracking-wider">6 Founding Colleges</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[{n:'College of Brand Architecture',o:'Personal brand, identity, positioning, authority'},{n:'College of Experience Design',o:'Events, nightlife, activations, cultural moments'},{n:'College of Enterprise',o:'Business models, expansion, leadership, wealth'},{n:'College of Operational Systems',o:'Automation, AI, SOPs, CRM, delegation'},{n:'College of Commercial Strategy',o:'E-commerce, retail, merch, pricing, conversion'},{n:'College of Hospitality & Cultural Leadership',o:'Hospitality, nightlife, venues, guest experience'}].map(c=>(<div key={c.n} className="border border-gold/10 rounded-lg p-6 bg-surface hover:border-gold/30"><h3 className="font-display text-lg mb-3">{c.n}</h3><p className="text-cream/40 text-xs">{c.o}</p></div>))}</div>
    </div></section>

    <section id="enroll" className="py-24 px-6"><div className="max-w-lg mx-auto">
      <h2 className="font-display text-4xl text-center mb-4 font-light tracking-wider">{sent?'You\'re In.':'Get Early Access'}</h2>
      {sent?<div className="text-center py-12"><div className="text-gold text-6xl mb-4">◆</div><p className="text-cream/60">Check your email for next steps.</p></div>:
      <form onSubmit={submit} className="space-y-4">
        <input type="text" placeholder="Full Name" required value={fd.name} onChange={e=>setFd({...fd,name:e.target.value})} className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none"/>
        <input type="email" placeholder="Email" required value={fd.email} onChange={e=>setFd({...fd,email:e.target.value})} className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none"/>
        <input type="tel" placeholder="Phone" value={fd.phone} onChange={e=>setFd({...fd,phone:e.target.value})} className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm placeholder:text-cream/20 focus:border-gold/50 focus:outline-none"/>
        <select value={fd.industry} onChange={e=>setFd({...fd,industry:e.target.value})} required className="w-full bg-surface border border-gold/10 rounded-lg px-5 py-4 text-cream text-sm focus:border-gold/50 focus:outline-none appearance-none"><option value="">Select Your Industry</option>{SCHOOLS.map(s=><option key={s.key} value={s.key}>{s.name}</option>)}</select>
        <button type="submit" disabled={sub} className="w-full py-4 bg-gold text-bg font-bold text-sm tracking-widest hover:bg-gold/90 disabled:opacity-50">{sub?'SUBMITTING...':'GET EARLY ACCESS'}</button>
      </form>}
    </div></section>

    <footer className="py-12 px-6 border-t border-gold/10"><div className="max-w-5xl mx-auto text-center">
      <p className="font-display text-2xl mb-4 font-light tracking-wider">Dr. Dorsey Courses</p>
      <p className="text-cream/20 text-xs">A Kollective Hospitality Group Enterprise · © 2026</p>
    </div></footer>
  </main>)
}
