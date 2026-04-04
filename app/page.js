'use client'
import { useState, useEffect, useRef } from 'react'

const S = {
  lifestyle_pass_monthly:'price_1TIJHtKUVDzsdWUxSHmG8MIY',
  operator_monthly:'price_1TIJIbKUVDzsdWUxQd9TWNHo',
  inner_circle_monthly:'price_1TIJIbKUVDzsdWUx5QPHt9N2',
  event_money_machine:'price_1TIJIcKUVDzsdWUxlLoXpTQ8',
  nightlife_money:'price_1TIJIdKUVDzsdWUxz5ezooe4',
  lifestyle_specialist:'price_1TIJIeKUVDzsdWUx2FQYkyeB',
  automate_biz_os:'price_1TIJIgKUVDzsdWUxptHr3Qk8',
  strategy_call:'price_1TIJJ1KUVDzsdWUx9aJVErFU',
  brand_audit:'price_1TIJJ2KUVDzsdWUxOJhlreiJ',
  full_day:'price_1TIJJ2KUVDzsdWUxccLV6EgK',
  retainer:'price_1TIJJ3KUVDzsdWUxIesNwBy3',
}

const IMG = 'https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website/'

export default function Home() {
  const [buying, setBuying] = useState(null)
  const [formData, setFormData] = useState({name:'',email:'',phone:'',industry:''})
  const [sent, setSent] = useState(false)
  const [sub, setSub] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const p = document.getElementById('preloader')
      if (p) p.style.opacity = '0'
      setTimeout(() => { if (p) p.style.display = 'none' }, 1200)
    }, 2400)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => { clearTimeout(t); obs.disconnect() }
  }, [])

  const checkout = async (key, mode='payment') => {
    setBuying(key)
    try {
      const r = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({priceId:S[key],mode,programKey:key})})
      const d = await r.json()
      if (d.url) window.location.href = d.url
    } catch(e) { console.error(e) }
    setBuying(null)
  }

  const submit = async (e) => {
    e.preventDefault(); setSub(true)
    try { await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)}); setSent(true) } catch(e){}
    setSub(false)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#0A0804;color:#F2EBD9;font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
        ::selection{background:#C8963C;color:#0A0804}
        .grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.3;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")}
        .reveal{opacity:0;transform:translateY(50px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
        .reveal.revealed{opacity:1;transform:translateY(0)}
        .reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}.reveal-d4{transition-delay:.4s}
        .glow-border{border:1px solid rgba(200,150,60,.2);transition:border-color .4s,box-shadow .4s}
        .glow-border:hover{border-color:rgba(200,150,60,.5);box-shadow:0 0 30px rgba(200,150,60,.1),inset 0 0 30px rgba(200,150,60,.03)}
        .photo-cover{position:absolute;inset:0;object-fit:cover;width:100%;height:100%}
        .btn-gold{display:inline-block;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;padding:16px 40px;border:1.5px solid #C8963C;color:#F2EBD9;background:transparent;cursor:pointer;transition:all .4s;text-decoration:none}
        .btn-gold:hover{background:#C8963C;color:#0A0804}
        .btn-gold-fill{display:inline-block;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;padding:16px 40px;border:none;color:#0A0804;background:linear-gradient(135deg,#C8963C,#E8C068);cursor:pointer;transition:all .4s;text-decoration:none;box-shadow:0 4px 25px rgba(200,150,60,.25)}
        .btn-gold-fill:hover{box-shadow:0 8px 40px rgba(200,150,60,.4);transform:translateY(-2px)}
        .section-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(200,150,60,.3),transparent)}
      `}</style>

      <div className="grain" />

      {/* PRELOADER */}
      <div id="preloader" style={{position:'fixed',inset:0,background:'#0A0804',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1.2s cubic-bezier(.16,1,.3,1)'}}>
        <div style={{fontSize:'48px',marginBottom:12,filter:'drop-shadow(0 0 20px rgba(200,150,60,.4))'}}>⚜</div>
        <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(24px,4vw,42px)',fontWeight:300,letterSpacing:'.15em',color:'#F2EBD9',animation:'breathe 2s ease-in-out infinite'}}>THE LIFESTYLE UNIVERSITY</div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.4em',color:'#C8963C',opacity:.5,marginTop:10}}>BY DR. DORSEY</div>
        <style>{`@keyframes breathe{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      </div>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:1000,padding:'16px clamp(20px,4vw,60px)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(10,8,4,.85)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(200,150,60,.08)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:20,filter:'drop-shadow(0 0 8px rgba(200,150,60,.3))'}}>⚜</span>
          <span style={{fontFamily:'Cormorant Garamond,serif',fontSize:16,fontWeight:500,letterSpacing:'.08em'}}>The Lifestyle University</span>
        </div>
        <div style={{display:'flex',gap:28,alignItems:'center'}}>
          {['Schools','Programs','Pricing','Apply'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,.7vw,10px)',letterSpacing:'.15em',textTransform:'uppercase',color:l==='Apply'?'#0A0804':'rgba(242,235,217,.4)',textDecoration:'none',transition:'color .3s',...(l==='Apply'?{background:'#C8963C',padding:'8px 20px'}:{})}}>{l}</a>
          ))}
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        <img src={IMG+'luxury-venue.jpg'} alt="" className="photo-cover" style={{opacity:.4,filter:'brightness(.7) saturate(1.1)'}} />
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 30%,rgba(200,150,60,.08) 0%,transparent 60%)'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,8,4,.4) 0%,rgba(10,8,4,.1) 30%,rgba(10,8,4,.1) 60%,rgba(10,8,4,.85) 90%,#0A0804 100%)'}} />
        <div style={{position:'relative',zIndex:2,textAlign:'center',maxWidth:800,padding:'0 24px'}}>
          <div style={{fontSize:56,marginBottom:16,filter:'drop-shadow(0 0 30px rgba(200,150,60,.3))'}}>⚜</div>
          <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,7vw,80px)',fontWeight:300,fontStyle:'italic',lineHeight:1,letterSpacing:'.02em',marginBottom:16}}>
            Build the Life.<br/><span style={{color:'#E8C068'}}>Lead the Room.</span>
          </h1>
          <p style={{fontFamily:'DM Sans,sans-serif',fontSize:'clamp(13px,1.2vw,16px)',color:'rgba(242,235,217,.5)',letterSpacing:'.05em',marginBottom:40}}>A New Institution for the Ambitious & Elite.</p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#apply" className="btn-gold-fill">Apply Now</a>
            <a href="#schools" className="btn-gold">Explore Schools</a>
          </div>
        </div>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#C8963C,transparent)',opacity:.4}} />
      </section>

      {/* ============ PILLARS OF MASTERY ============ */}
      <section style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,80px)',textAlign:'center'}}>
        <div className="section-divider" style={{marginBottom:48}} />
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,marginBottom:48}}>Our Pillars of <em style={{fontStyle:'italic',color:'#E8C068'}}>Mastery</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:32,maxWidth:800,margin:'0 auto'}}>
          {[
            {icon:'◇',name:'Business & Ownership'},
            {icon:'⚜',name:'Brand & Influence'},
            {icon:'◆',name:'Lifestyle & Power'},
            {icon:'⚙',name:'Systems & Automation'},
          ].map((p,i) => (
            <div key={p.name} className={`reveal reveal-d${i+1}`} style={{textAlign:'center'}}>
              <div style={{fontSize:28,color:'#C8963C',marginBottom:12,filter:'drop-shadow(0 0 10px rgba(200,150,60,.2))'}}>{p.icon}</div>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(14px,1.3vw,17px)',fontWeight:500,fontStyle:'italic',letterSpacing:'.03em'}}>{p.name}</div>
            </div>
          ))}
        </div>
        <div className="section-divider" style={{marginTop:48}} />
      </section>

      {/* ============ SCHOOLS OF EXCELLENCE ============ */}
      <section id="schools" style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,60px)'}}>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:48}}>Schools of <em style={{fontStyle:'italic',color:'#E8C068'}}>Excellence</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,maxWidth:1200,margin:'0 auto'}}>
          {[
            {name:'Business & Ownership',desc:'Launch, structure, and scale businesses with real operator-level systems.',sk:'event_money_machine',img:'thesis-bg.jpg'},
            {name:'Brand & Influence',desc:'Build authority, monetize attention, and create brands that command rooms.',sk:'lifestyle_specialist',img:'hero-bg.jpg'},
            {name:'Wealth & Negotiation',desc:'Master revenue strategy, deal structure, and high-value partnerships.',sk:'nightlife_money',img:'rooftop-lounge.jpg'},
            {name:'Lifestyle & Power',desc:'Design the life, build the network, and operate at the highest level.',sk:'automate_biz_os',img:'luxury-venue.jpg'},
          ].map((s,i) => (
            <div key={s.name} className={`reveal reveal-d${i+1} glow-border`} style={{position:'relative',overflow:'hidden',minHeight:280,background:'#0D0A06',cursor:'pointer'}}
              onClick={() => checkout(s.sk)}>
              <img src={IMG+s.img} alt="" className="photo-cover" style={{opacity:.3,filter:'brightness(.6)'}} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,8,4,.3) 0%,rgba(10,8,4,.85) 100%)'}} />
              <div style={{position:'relative',zIndex:1,padding:'clamp(24px,3vw,36px)',display:'flex',flexDirection:'column',justifyContent:'flex-end',height:'100%'}}>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.2em',color:'#C8963C',marginBottom:8}}>SCHOOL OF</div>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(22px,2.5vw,30px)',fontWeight:600,marginBottom:10}}>{s.name}</h3>
                <p style={{fontSize:12,color:'rgba(242,235,217,.45)',lineHeight:1.6,marginBottom:20}}>{s.desc}</p>
                <span className="btn-gold" style={{padding:'10px 24px',fontSize:10,alignSelf:'flex-start'}}>EXPLORE SCHOOL</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SIGNATURE PROGRAMS ============ */}
      <section id="programs" style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,60px)'}}>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:48}}>Signature <em style={{fontStyle:'italic',color:'#E8C068'}}>Programs</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,maxWidth:1200,margin:'0 auto'}}>
          {[
            {name:'Event Money Machine',desc:'The complete system for launching, scaling, and monetizing events. 8 modules. 6.5 hours.',price:'$1,997',sk:'event_money_machine',img:'thesis-bg.jpg'},
            {name:'Nightlife Money Machine',desc:'Build profitable nightlife brands, venues, and promoter teams that print money.',price:'$1,997',sk:'nightlife_money',img:'rooftop-lounge.jpg'},
            {name:'Lifestyle Specialist',desc:'Turn your personal brand into a premium income engine. Authority by design.',price:'$1,997',sk:'lifestyle_specialist',img:'hero-bg.jpg'},
            {name:'Automate & Scale',desc:'Build the business OS that runs your empire. CRM, AI, SOPs, delegation.',price:'$2,497',sk:'automate_biz_os',img:'luxury-venue.jpg'},
          ].map((p,i) => (
            <div key={p.name} className={`reveal reveal-d${i+1} glow-border`} style={{position:'relative',overflow:'hidden',minHeight:240,background:'#0D0A06',cursor:'pointer'}}
              onClick={() => checkout(p.sk)}>
              <img src={IMG+p.img} alt="" className="photo-cover" style={{opacity:.25,filter:'brightness(.5) saturate(1.2)'}} />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(10,8,4,.7) 0%,rgba(10,8,4,.9) 100%)'}} />
              <div style={{position:'relative',zIndex:1,padding:'clamp(24px,3vw,36px)',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                <div>
                  <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(22px,2.5vw,28px)',fontWeight:600,fontStyle:'italic',marginBottom:8}}>{p.name}</h3>
                  <p style={{fontSize:12,color:'rgba(242,235,217,.4)',lineHeight:1.6}}>{p.desc}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:20}}>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(16px,1.5vw,22px)',color:'#E8C068'}}>{p.price}</span>
                  <span className="btn-gold" style={{padding:'8px 20px',fontSize:9}}>LEARN MORE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ THE RESULTS ============ */}
      <section style={{position:'relative',padding:'clamp(60px,8vw,100px) clamp(20px,4vw,80px)',overflow:'hidden'}}>
        <img src={IMG+'penthouse-skyline.jpg'} alt="" className="photo-cover" style={{opacity:.2,filter:'brightness(.4)'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0A0804 0%,transparent 30%,transparent 70%,#0A0804 100%)'}} />
        <div style={{position:'relative',zIndex:1}}>
          <div className="section-divider" style={{marginBottom:40}} />
          <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:48}}>The <em style={{fontStyle:'italic',color:'#E8C068'}}>Results</em></h2>
          <div className="reveal" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32,maxWidth:900,margin:'0 auto',textAlign:'center'}}>
            {[['57+','Brands Built'],['8','Cities Active'],['$0','VC Raised']].map(([n,l]) => (
              <div key={l}>
                <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,6vw,72px)',fontWeight:300,color:'#E8C068',lineHeight:1}}>{n}</div>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(9px,.8vw,11px)',letterSpacing:'.25em',textTransform:'uppercase',color:'rgba(242,235,217,.35)',marginTop:8}}>{l}</div>
              </div>
            ))}
          </div>
          <div className="section-divider" style={{marginTop:40}} />
        </div>
      </section>

      {/* ============ THE STUDENT EXPERIENCE ============ */}
      <section style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,60px)'}}>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:48}}>The Student <em style={{fontStyle:'italic',color:'#E8C068'}}>Experience</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16,maxWidth:1000,margin:'0 auto'}}>
          {[
            {name:'Elite Workshops',desc:'Live cohort-based programs with hands-on assignments.',img:'thesis-bg.jpg'},
            {name:'Private Community',desc:'Access the network. Connect with operators building at your level.',img:'garden-district.jpg'},
            {name:'Live Mentorship',desc:'Direct 1-on-1 time with Dr. Dorsey. Strategy sessions. Real advice.',img:'rooftop-lounge.jpg'},
          ].map((e,i) => (
            <div key={e.name} className={`reveal reveal-d${i+1} glow-border`} style={{overflow:'hidden',background:'#0D0A06'}}>
              <div style={{position:'relative',height:180,overflow:'hidden'}}>
                <img src={IMG+e.img} alt="" className="photo-cover" style={{opacity:.5,filter:'brightness(.7)'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 40%,rgba(10,8,4,.9) 100%)'}} />
              </div>
              <div style={{padding:'20px 24px 28px'}}>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:20,fontWeight:600,marginBottom:6}}>{e.name}</h3>
                <p style={{fontSize:12,color:'rgba(242,235,217,.4)',lineHeight:1.6}}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,60px)',background:'rgba(200,150,60,.03)'}}>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:12}}>Membership <em style={{fontStyle:'italic',color:'#E8C068'}}>Tiers</em></h2>
        <p className="reveal" style={{textAlign:'center',fontSize:13,color:'rgba(242,235,217,.35)',marginBottom:48}}>Subscriptions at all levels. Pick where you are.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:2,maxWidth:1200,margin:'0 auto'}}>
          {[
            {name:'The Taste',price:'FREE',features:['1 mini-lesson per school','Weekly newsletter','Public community'],cta:'Start Free'},
            {name:'Lifestyle Pass',price:'$29/mo',features:['Full course library','Monthly live Q&A','Community','10% off events & merch'],sk:'lifestyle_pass_monthly',cta:'Subscribe'},
            {name:'The Operator',price:'$79/mo',pop:true,features:['Everything in Pass','Masterclasses & SOPs','Private channel','Group coaching','20% off everything'],sk:'operator_monthly',cta:'Go Operator'},
            {name:'Inner Circle',price:'$199/mo',features:['Everything in Operator','Monthly 1-on-1','VIP access','Direct DM','Co-branding','30% off'],sk:'inner_circle_monthly',cta:'Apply'},
            {name:'Apprentice',price:'$2,500+',features:['8-week live cohort','Choose your track','Certificate','2 private 1-on-1s','Alumni network','100% access'],cta:'Apply for Cohort'},
          ].map((t,i) => (
            <div key={t.name} className={`reveal reveal-d${i<5?i+1:4}`}
              style={{background:t.pop?'rgba(200,150,60,.06)':'rgba(242,235,217,.02)',border:`1px solid ${t.pop?'rgba(200,150,60,.4)':'rgba(200,150,60,.1)'}`,padding:'clamp(24px,2vw,36px)',position:'relative',transition:'all .4s'}}>
              {t.pop && <div style={{position:'absolute',top:0,left:0,right:0,background:'#C8963C',color:'#0A0804',fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'.2em',textAlign:'center',padding:5,textTransform:'uppercase'}}>Most Popular</div>}
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2vw,24px)',fontWeight:500,marginTop:t.pop?20:0,marginBottom:6}}>{t.name}</div>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(20px,2.5vw,30px)',color:'#E8C068',marginBottom:16}}>{t.price}</div>
              <ul style={{listStyle:'none',padding:0,margin:'0 0 20px'}}>
                {t.features.map(f => (
                  <li key={f} style={{fontSize:11,color:'rgba(242,235,217,.45)',padding:'5px 0',borderBottom:'1px solid rgba(200,150,60,.06)',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{width:4,height:4,background:'#C8963C',flexShrink:0}} />{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => t.sk ? checkout(t.sk,'subscription') : document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})}
                className={t.pop?'btn-gold-fill':'btn-gold'} style={{width:'100%',padding:'12px',fontSize:10,textAlign:'center',display:'block'}}>
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============ MEET THE FOUNDER ============ */}
      <section style={{position:'relative',padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',overflow:'hidden'}}>
        <img src={IMG+'hero-bg.jpg'} alt="" className="photo-cover" style={{opacity:.15,filter:'brightness(.4)'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(10,8,4,.95) 0%,rgba(10,8,4,.95) 40%,rgba(10,8,4,.3) 100%)'}} />
        <div className="reveal" style={{position:'relative',zIndex:1,maxWidth:500}}>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.4em',color:'#C8963C',marginBottom:16}}>MEET THE FOUNDER</div>
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,5vw,56px)',fontWeight:300,lineHeight:1.1,marginBottom:16}}>
            Dr. DoLo Dorsey
          </h2>
          <p style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(18px,2vw,24px)',fontStyle:'italic',color:'#E8C068',marginBottom:24}}>Building Tomorrow's Leaders</p>
          <p style={{fontSize:'clamp(13px,1.2vw,15px)',color:'rgba(242,235,217,.45)',lineHeight:1.8,marginBottom:32}}>
            57+ ventures. 8 cities. 198 AI agents. 34 automated departments. $0 VC raised. Everything bootstrapped, everything proven. Now he's giving you the blueprint.
          </p>
          <a href="https://doctordorsey.com" target="_blank" rel="noopener" className="btn-gold">Learn More</a>
        </div>
      </section>

      {/* ============ CONSULTATIONS ============ */}
      <section style={{padding:'clamp(60px,8vw,100px) clamp(20px,4vw,60px)',background:'rgba(200,150,60,.03)'}}>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,textAlign:'center',marginBottom:48}}>Private <em style={{fontStyle:'italic',color:'#E8C068'}}>Advisory</em></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:2,maxWidth:1000,margin:'0 auto'}}>
          {[
            {name:'Strategy Call',desc:'30-min focused session. Direct operator-level advice.',price:'$250',sk:'strategy_call',num:'01'},
            {name:'Brand Audit',desc:'Full written audit. Competitive analysis. Action plan.',price:'$500',sk:'brand_audit',num:'02'},
            {name:'Full Day',desc:'4-hour deep dive. Complete action plan. 60-day support.',price:'$2,500',sk:'full_day',num:'03'},
            {name:'Monthly Retainer',desc:'Two calls/month. Async access. KHG network.',price:'$5,000/mo',sk:'retainer',num:'04'},
          ].map((c,i) => (
            <div key={c.name} className={`reveal reveal-d${i+1} glow-border`}
              onClick={() => checkout(c.sk, c.sk==='retainer'?'subscription':'payment')}
              style={{background:'rgba(242,235,217,.02)',padding:'clamp(28px,3vw,40px)',cursor:'pointer',position:'relative',overflow:'hidden'}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(48px,5vw,72px)',fontWeight:300,color:'rgba(200,150,60,.06)',position:'absolute',top:-8,right:12,lineHeight:1}}>{c.num}</div>
              <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(20px,2vw,26px)',fontWeight:600,marginBottom:8,position:'relative'}}>{c.name}</h3>
              <p style={{fontSize:12,color:'rgba(242,235,217,.4)',lineHeight:1.6,position:'relative',marginBottom:16}}>{c.desc}</p>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(16px,1.5vw,22px)',color:'#E8C068',position:'relative'}}>{c.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ APPLY / ENROLL ============ */}
      <section id="apply" style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',textAlign:'center',position:'relative'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:500,height:500,borderRadius:'50%',border:'1px solid rgba(200,150,60,.04)',pointerEvents:'none'}} />
        <div style={{fontSize:40,marginBottom:16,filter:'drop-shadow(0 0 20px rgba(200,150,60,.2))'}}>⚜</div>
        <h2 className="reveal" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,5vw,64px)',fontWeight:300,lineHeight:1.1,marginBottom:16}}>
          Your legacy starts <em style={{fontStyle:'italic',color:'#E8C068'}}>here.</em>
        </h2>
        <p className="reveal" style={{fontSize:'clamp(13px,1.2vw,16px)',color:'rgba(242,235,217,.4)',maxWidth:480,margin:'0 auto 40px',lineHeight:1.7}}>Join the institution. Pick your school. Build what you've been planning.</p>

        {sent ? (
          <div className="reveal revealed" style={{maxWidth:400,margin:'0 auto'}}>
            <div style={{fontSize:48,color:'#C8963C',marginBottom:16}}>⚜</div>
            <p style={{fontFamily:'Cormorant Garamond,serif',fontSize:24,marginBottom:8}}>You're In.</p>
            <p style={{fontSize:13,color:'rgba(242,235,217,.4)'}}>Check your email for next steps from Dr. Dorsey's team.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="reveal" style={{maxWidth:420,margin:'0 auto',display:'flex',flexDirection:'column',gap:12}}>
            {[{p:'Full Name',k:'name',t:'text'},{p:'Email',k:'email',t:'email'},{p:'Phone (optional)',k:'phone',t:'tel'}].map(f => (
              <input key={f.k} type={f.t} placeholder={f.p} required={f.k!=='phone'} value={formData[f.k]} onChange={e => setFormData({...formData,[f.k]:e.target.value})}
                style={{width:'100%',background:'rgba(242,235,217,.03)',border:'1px solid rgba(200,150,60,.15)',padding:'14px 20px',color:'#F2EBD9',fontSize:13,fontFamily:'DM Sans,sans-serif',outline:'none',transition:'border-color .3s'}} />
            ))}
            <select value={formData.industry} onChange={e => setFormData({...formData,industry:e.target.value})} required
              style={{width:'100%',background:'rgba(242,235,217,.03)',border:'1px solid rgba(200,150,60,.15)',padding:'14px 20px',color:'#F2EBD9',fontSize:13,fontFamily:'DM Sans,sans-serif',outline:'none',appearance:'none'}}>
              <option value="" style={{background:'#0A0804'}}>Select Your School</option>
              {['Business & Ownership','Brand & Influence','Wealth & Negotiation','Lifestyle & Power','Events & Experiences','Hospitality & Nightlife','Food & Beverage','Automation & Systems','Merch & E-Commerce','Service Business'].map(s => (
                <option key={s} value={s.toLowerCase().replace(/\s+/g,'_')} style={{background:'#0A0804'}}>{s}</option>
              ))}
            </select>
            <button type="submit" disabled={sub} className="btn-gold-fill" style={{width:'100%',padding:16,opacity:sub?.5:1}}>
              {sub ? 'SUBMITTING...' : 'APPLY NOW'}
            </button>
            <p style={{fontSize:10,fontFamily:'DM Mono,monospace',letterSpacing:'.15em',color:'rgba(242,235,217,.2)'}}>SECURE · NO SPAM · FREE TRAINING INCLUDED</p>
          </form>
        )}
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{padding:'32px clamp(20px,4vw,60px)',borderTop:'1px solid rgba(200,150,60,.08)',display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',gap:16}}>
        <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
          {['Schools','Programs','Admissions','Partnerships','About','Contact','FAQs'].map(l => (
            <a key={l} href="#" style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.1em',color:'rgba(242,235,217,.25)',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
        <div style={{display:'flex',gap:16}}>
          {['Privacy Policy','Terms of Service'].map(l => (
            <span key={l} style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'rgba(242,235,217,.15)'}}>{l}</span>
          ))}
        </div>
      </footer>
    </>
  )
}
