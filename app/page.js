'use client'
import { useState, useEffect } from 'react'

const STRIPE={lifestyle_pass_monthly:'price_1TIJHtKUVDzsdWUxSHmG8MIY',lifestyle_pass_annual:'price_1TIJHuKUVDzsdWUxK7S8Qy6A',operator_monthly:'price_1TIJIbKUVDzsdWUxQd9TWNHo',operator_annual:'price_1TIJIbKUVDzsdWUx7qpwotgk',inner_circle_monthly:'price_1TIJIbKUVDzsdWUx5QPHt9N2',inner_circle_annual:'price_1TIJIcKUVDzsdWUxrV9cxWMq',event_money_machine:'price_1TIJIcKUVDzsdWUxlLoXpTQ8',nightlife_money:'price_1TIJIdKUVDzsdWUxz5ezooe4',lifestyle_specialist:'price_1TIJIeKUVDzsdWUx2FQYkyeB',automate_biz_os:'price_1TIJIgKUVDzsdWUxptHr3Qk8',founder_empire:'price_1TIJIhKUVDzsdWUxvnxipPG9',culture_ecom:'price_1TIJIfKUVDzsdWUxXpcYgQml',restaurant_qsr:'price_1TIJIiKUVDzsdWUxsikwYU6p',audience_to_income:'price_1TIJIjKUVDzsdWUxfrNM0I72',strategy_call:'price_1TIJJ1KUVDzsdWUx9aJVErFU',brand_audit:'price_1TIJJ2KUVDzsdWUxOJhlreiJ',full_day:'price_1TIJJ2KUVDzsdWUxccLV6EgK',retainer:'price_1TIJJ3KUVDzsdWUxIesNwBy3'}
const SB='https://dzlmtvodpyhetvektfuo.supabase.co/storage/v1/object/public/brand-graphics/dr_dorsey/website'

export default function Home(){
  const[buying,setBuying]=useState(null)
  const[bc,setBc]=useState('monthly')
  const[fd,setFd]=useState({name:'',email:'',phone:'',industry:''})
  const[sent,setSent]=useState(false)
  const[sub,setSub]=useState(false)
  const[menuOpen,setMenuOpen]=useState(false)

  useEffect(()=>{
    const pl=document.getElementById('pl')
    if(pl)setTimeout(()=>{pl.style.opacity='0';pl.style.visibility='hidden';pl.style.pointerEvents='none'},2600)
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis')}})},{threshold:.1})
    document.querySelectorAll('.rv').forEach(el=>obs.observe(el))
    return()=>obs.disconnect()
  },[])

  const checkout=async(sk,mode='payment')=>{setBuying(sk);try{const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({priceId:STRIPE[sk],mode,programKey:sk})});const d=await r.json();if(d.url)window.location.href=d.url}catch(e){console.error(e)};setBuying(null)}
  const doSubmit=async e=>{e.preventDefault();setSub(true);try{await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fd)});setSent(true)}catch(e){console.error(e)};setSub(false)}

  return(<>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}
      html{scroll-behavior:smooth}
      body{background:#0A0806;color:#F2EBE0;font-family:'DM Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
      ::selection{background:#C9A84C;color:#0A0806}

      /* Grain overlay */
      .grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.3;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")}

      /* Scroll reveals */
      .rv{opacity:0;transform:translateY(40px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
      .rv.vis{opacity:1;transform:translateY(0)}
      .rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}.rv.d4{transition-delay:.32s}.rv.d5{transition-delay:.4s}.rv.d6{transition-delay:.48s}.rv.d7{transition-delay:.56s}

      /* Preloader */
      @keyframes breathe{0%,100%{opacity:.3}50%{opacity:1}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

      /* Marquee */
      @keyframes marq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      .marq-track{display:flex;width:max-content;animation:marq 55s linear infinite}
      .marq-track:hover{animation-play-state:paused}

      /* School/program cards */
      .scard{position:relative;overflow:hidden;min-height:clamp(240px,30vw,340px);cursor:pointer;background:#0D0A07;transition:border-color .4s}
      .scard:hover .scard-img{opacity:.55;transform:scale(1.04)}
      .scard-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35;filter:sepia(.12) saturate(1.2);transition:opacity .6s,transform 5s cubic-bezier(.37,0,.63,1)}
      .scard::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,6,.35) 0%,rgba(10,8,6,.1) 35%,rgba(10,8,6,.8) 100%)}
      .scard-inner{position:absolute;inset:0;z-index:1;padding:clamp(20px,2.5vw,36px);display:flex;flex-direction:column;justify-content:space-between}

      /* Tier cards */
      .tcard{background:rgba(242,235,224,.02);border:1px solid rgba(242,235,224,.06);padding:clamp(24px,2.5vw,40px);transition:all .4s;position:relative;overflow:hidden}
      .tcard:hover{border-color:rgba(201,168,76,.25)}
      .tcard.pop{border-color:#C9A84C;background:rgba(201,168,76,.04)}

      /* Consult cards (light bg) */
      .ccard{background:#FFFDF8;border:1px solid rgba(10,8,6,.06);padding:clamp(28px,3vw,48px);cursor:pointer;position:relative;overflow:hidden;transition:all .4s;height:100%}
      .ccard:hover{border-color:rgba(139,115,64,.3);box-shadow:0 12px 40px rgba(0,0,0,.08);transform:translateY(-3px)}

      /* Mobile menu */
      .mob-overlay{position:fixed;inset:0;background:rgba(10,8,6,.97);z-index:9998;display:flex;flex-direction:column;justify-content:center;padding:80px 40px;transform:translateX(100%);transition:transform .5s cubic-bezier(.16,1,.3,1)}
      .mob-overlay.open{transform:translateX(0)}
      .mob-overlay a{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,48px);font-weight:400;text-decoration:none;display:block;padding:12px 0;border-bottom:1px solid rgba(242,235,224,.06);color:#F2EBE0}

      /* Responsive */
      @media(max-width:900px){.desk-links{display:none!important}.mob-btn{display:flex!important}}
      @media(max-width:768px){.school-grid{grid-template-columns:1fr!important}.tier-grid{grid-template-columns:1fr!important}.consult-grid{grid-template-columns:1fr!important}.stats-grid{grid-template-columns:1fr!important}.exp-grid{grid-template-columns:1fr!important}.pillars-grid{grid-template-columns:repeat(2,1fr)!important}}
    `}</style>

    <div className="grain"/>

    {/* === PRELOADER === */}
    <div id="pl" style={{position:'fixed',inset:0,background:'#0A0806',zIndex:10000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',transition:'opacity 1.2s cubic-bezier(.16,1,.3,1),visibility 1.2s'}}>
      <div style={{fontSize:52,color:'#C9A84C',marginBottom:12,animation:'float 3s ease-in-out infinite'}}>&#9878;</div>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(22px,4vw,36px)',fontWeight:400,letterSpacing:'.08em',animation:'breathe 2.5s ease-in-out infinite'}}>The Lifestyle University</div>
      <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.5em',color:'#C9A84C',opacity:.5,marginTop:14}}>DR. DORSEY COURSES</div>
    </div>

    {/* === MOBILE MENU === */}
    <div className={`mob-overlay ${menuOpen?'open':''}`}>
      {['Schools','Programs','Pricing','Admissions','Apply'].map(l=>(
        <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)}>{l}</a>
      ))}
    </div>

    {/* === NAV === */}
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:9990,padding:'14px clamp(20px,4vw,80px)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(10,8,6,.88)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(201,168,76,.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <span style={{fontSize:22,color:'#C9A84C'}}>&#9878;</span>
        <span style={{fontFamily:'Playfair Display,serif',fontSize:15,fontWeight:500,letterSpacing:'.06em'}}>The Lifestyle University</span>
      </div>
      <div className="desk-links" style={{display:'flex',gap:28,alignItems:'center'}}>
        {['Schools','Programs','Pricing','Admissions'].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,.7vw,10px)',letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(242,235,224,.4)',textDecoration:'none'}}>{l}</a>
        ))}
        <a href="#apply" style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(8px,.7vw,10px)',letterSpacing:'.18em',textTransform:'uppercase',color:'#0A0806',background:'linear-gradient(135deg,#C9A84C,#E8D5A3)',padding:'10px 22px',textDecoration:'none'}}>Apply Now</a>
      </div>
      <button className="mob-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{display:'none',background:'none',border:'none',cursor:'pointer',flexDirection:'column',gap:5,padding:4}}>
        <span style={{width:22,height:1,background:'#F2EBE0',display:'block',transition:'all .3s',transform:menuOpen?'rotate(45deg) translateY(4px)':'none'}}/>
        <span style={{width:22,height:1,background:'#F2EBE0',display:'block',transition:'all .3s',opacity:menuOpen?0:1}}/>
        <span style={{width:22,height:1,background:'#F2EBE0',display:'block',transition:'all .3s',transform:menuOpen?'rotate(-45deg) translateY(-4px)':'none'}}/>
      </button>
    </nav>

    {/* ======= HERO — Ornate Ballroom ======= */}
    <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
      <img src={`${SB}/luxury-venue.jpg`} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.4,filter:'brightness(.75) saturate(1.3) sepia(.12)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(10,8,6,.55) 0%,rgba(10,8,6,.15) 25%,rgba(10,8,6,.2) 55%,rgba(10,8,6,.85) 88%,#0A0806 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 25%,rgba(201,168,76,.07) 0%,transparent 55%)'}}/>
      <div style={{position:'relative',zIndex:2,textAlign:'center',maxWidth:820,padding:'140px 24px 120px'}}>
        <div className="rv" style={{fontSize:56,color:'#C9A84C',marginBottom:20,animation:'float 4s ease-in-out infinite'}}>&#9878;</div>
        <h1 className="rv d1" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,7.5vw,84px)',fontWeight:400,lineHeight:.98,letterSpacing:'-.01em',marginBottom:20}}>
          <em style={{fontStyle:'italic'}}>Build the Life.</em><br/>Lead the Room.
        </h1>
        <p className="rv d2" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(16px,2vw,24px)',fontWeight:300,color:'rgba(242,235,224,.55)',letterSpacing:'.06em',marginBottom:44}}>A New Institution for the Ambitious &amp; Elite</p>
        <div className="rv d3" style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#apply" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(11px,1.1vw,15px)',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'#0A0806',background:'linear-gradient(135deg,#C9A84C,#E8D5A3,#C9A84C)',padding:'16px 44px',textDecoration:'none',boxShadow:'0 4px 40px rgba(201,168,76,.25)',transition:'all .4s'}}>Apply Now</a>
          <a href="#schools" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(11px,1.1vw,15px)',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#E8D5A3',border:'1px solid rgba(201,168,76,.3)',padding:'16px 44px',textDecoration:'none',transition:'all .4s'}}>Explore Schools</a>
        </div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,width:'100%',height:2,background:'linear-gradient(90deg,transparent,#C9A84C,transparent)',opacity:.25,zIndex:3}}/>
    </section>

    {/* ======= PILLARS OF MASTERY ======= */}
    <section style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)',textAlign:'center'}}>
      <div className="rv" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
        <div style={{width:60,height:1,background:'#C9A84C'}}/>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C'}}>FOUNDATION</span>
        <div style={{width:60,height:1,background:'#C9A84C'}}/>
      </div>
      <h2 className="rv d1" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400,marginBottom:52}}>Our Pillars of <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Mastery</em></h2>
      <div className="rv d2 pillars-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'clamp(24px,3vw,48px)',maxWidth:900,margin:'0 auto'}}>
        {[{icon:'&#9826;',label:'Business & Ownership',sub:'Build empires, not side projects'},{icon:'&#9878;',label:'Brand & Influence',sub:'Authority that opens doors'},{icon:'&#9670;',label:'Lifestyle & Power',sub:'Design life on your terms'},{icon:'&#9881;',label:'Systems & Automation',sub:'Scale without the chaos'}].map((p,i)=>(
          <div key={i} style={{textAlign:'center'}}>
            <div style={{fontSize:30,color:'#C9A84C',marginBottom:14}} dangerouslySetInnerHTML={{__html:p.icon}}/>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(13px,1.2vw,16px)',fontWeight:500,marginBottom:6}}>{p.label}</div>
            <div style={{fontSize:11,color:'rgba(242,235,224,.3)',lineHeight:1.5}}>{p.sub}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ======= SCHOOLS OF EXCELLENCE ======= */}
    <section id="schools" style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)'}}>
      <div className="rv" style={{textAlign:'center',marginBottom:48}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C'}}>DEPARTMENTS</span>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400}}>Schools of <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Excellence</em></h2>
      </div>
      <div className="school-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:3,maxWidth:1400,margin:'0 auto'}}>
        {[
          {name:'Business & Ownership',sub:'Launch ventures, acquire assets, build real equity',flagship:'Event Money Machine',price:'$1,997',sk:'event_money_machine',img:'thesis-bg.jpg'},
          {name:'Brand & Influence',sub:'Personal brand, media authority, cultural capital',flagship:'Lifestyle Specialist Blueprint',price:'$1,997',sk:'lifestyle_specialist',img:'hero-bg.jpg'},
          {name:'Wealth & Negotiation',sub:'Revenue architecture, deal structure, negotiation',flagship:'Founder to Empire',price:'$2,997',sk:'founder_empire',img:'luxury-venue.jpg'},
          {name:'Lifestyle & Power',sub:'Design your environment, network, and daily life',flagship:'Nightlife Money Machine',price:'$1,997',sk:'nightlife_money',img:'rooftop-lounge.jpg'},
          {name:'Systems & Automation',sub:'AI, CRM, SOPs, delegation, operational scale',flagship:'Automate Your Business OS',price:'$2,497',sk:'automate_biz_os',img:'penthouse-skyline.jpg'},
          {name:'Hospitality & Culture',sub:'Venues, restaurants, food brands, guest experience',flagship:'QSR Launch Blueprint',price:'$1,997',sk:'restaurant_qsr',img:'garden-district.jpg'},
          {name:'Commerce & Product',sub:'Shopify, merch, drops, e-commerce, brand retail',flagship:'Culture Brand E-Com',price:'$1,997',sk:'culture_ecom',img:'thesis-bg.jpg'},
          {name:'Growth & Promotion',sub:'Audience building, marketing, lead generation',flagship:'Audience to Income System',price:'$1,497',sk:'audience_to_income',img:'rooftop-lounge.jpg'},
        ].map((s,i)=>(
          <div key={i} className={`rv d${Math.min(i+1,7)} scard`} onClick={()=>s.sk&&checkout(s.sk)}>
            <img className="scard-img" src={`${SB}/${s.img}`} alt=""/>
            <div className="scard-inner">
              <div>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.2em',color:'#C9A84C',marginBottom:6}}>SCHOOL OF</div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,2.5vw,32px)',fontWeight:600,textShadow:'0 2px 20px rgba(0,0,0,.8)'}}>{s.name}</div>
                <div style={{fontSize:12,color:'rgba(242,235,224,.4)',marginTop:6}}>{s.sub}</div>
              </div>
              <div>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.12em',color:'#E8D5A3',marginBottom:10}}>FLAGSHIP: {s.flagship}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(22px,2.5vw,34px)',fontWeight:300,color:'#E8D5A3'}}>{s.price}</span>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.18em',color:'#C9A84C',border:'1px solid rgba(201,168,76,.3)',padding:'7px 16px'}}>EXPLORE SCHOOL</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ======= SIGNATURE PROGRAMS ======= */}
    <section id="programs" style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)'}}>
      <div className="rv" style={{textAlign:'center',marginBottom:48}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C'}}>FLAGSHIP</span>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400}}>Signature <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Programs</em></h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:3,maxWidth:1200,margin:'0 auto'}}>
        {[
          {name:'Executive Mastery',sub:'Build and lead a multi-brand enterprise from vision to operations',price:'$2,997',sk:'founder_empire',img:'luxury-venue.jpg'},
          {name:'Influence & Media',sub:'Turn your name into a brand, your brand into a business',price:'$1,997',sk:'lifestyle_specialist',img:'hero-bg.jpg'},
          {name:'Investment & Wealth',sub:'Revenue architecture, deal flow, and asset strategy',price:'$1,997',sk:'event_money_machine',img:'penthouse-skyline.jpg'},
          {name:'Automate & Scale',sub:'AI agents, CRM, SOPs, delegation — the full operator toolkit',price:'$2,497',sk:'automate_biz_os',img:'thesis-bg.jpg'},
        ].map((p,i)=>(
          <div key={i} className={`rv d${i+1} scard`} style={{minHeight:280}} onClick={()=>p.sk&&checkout(p.sk)}>
            <img className="scard-img" src={`${SB}/${p.img}`} alt=""/>
            <div className="scard-inner" style={{justifyContent:'flex-end'}}>
              <div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,2.2vw,28px)',fontWeight:600,fontStyle:'italic',color:'#E8D5A3',marginBottom:8,textShadow:'0 2px 16px rgba(0,0,0,.7)'}}>{p.name}</div>
                <div style={{fontSize:12,color:'rgba(242,235,224,.4)',lineHeight:1.6,marginBottom:16}}>{p.sub}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:15,color:'#C9A84C'}}>{p.price}</span>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.18em',color:'#E8D5A3',border:'1px solid rgba(232,213,163,.2)',padding:'7px 16px'}}>LEARN MORE</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ======= THE RESULTS — Stats bar ======= */}
    <section style={{position:'relative',padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)',overflow:'hidden'}}>
      <img src={`${SB}/penthouse-skyline.jpg`} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.2,filter:'sepia(.15)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0A0806 0%,rgba(10,8,6,.4) 50%,#0A0806 100%)'}}/>
      <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:1000,margin:'0 auto'}}>
        <div className="rv" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:40}}>
          <div style={{width:80,height:1,background:'#C9A84C'}}/>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,48px)',fontWeight:400}}>The <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Results</em></h2>
          <div style={{width:80,height:1,background:'#C9A84C'}}/>
        </div>
        <div className="rv d1 stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>
          {[['57+','Brands Built'],['8','Cities Active'],['$0','VC Raised']].map(([n,l],i)=>(
            <div key={i}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(40px,6vw,72px)',fontWeight:300,color:'#E8D5A3',lineHeight:1}}>{n}</div>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:'.2em',color:'rgba(242,235,224,.3)',marginTop:8}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ======= THE STUDENT EXPERIENCE ======= */}
    <section style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)'}}>
      <div className="rv" style={{textAlign:'center',marginBottom:48}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C'}}>EXPERIENCE</span>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400}}>The Student <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Experience</em></h2>
      </div>
      <div className="rv d1 exp-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3,maxWidth:1100,margin:'0 auto'}}>
        {[{title:'Elite Workshops',sub:'Live sessions with real operators, not talking heads',img:'rooftop-lounge.jpg'},{title:'Private Community',sub:'Connect with builders at your level across 8 cities',img:'hero-bg.jpg'},{title:'Live Mentorship',sub:'Direct access to Dr. Dorsey and the KHG network',img:'thesis-bg.jpg'}].map((e,i)=>(
          <div key={i} style={{position:'relative',overflow:'hidden',minHeight:260,background:'#0D0A07'}}>
            <img src={`${SB}/${e.img}`} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.4,filter:'sepia(.1)'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 40%,rgba(10,8,6,.9) 100%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'clamp(20px,2vw,32px)',zIndex:1}}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(18px,2vw,24px)',fontWeight:500,marginBottom:6}}>{e.title}</div>
              <div style={{fontSize:12,color:'rgba(242,235,224,.4)',lineHeight:1.5}}>{e.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ======= PRICING / MEMBERSHIP ======= */}
    <section id="pricing" style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)'}}>
      <div className="rv" style={{textAlign:'center',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C'}}>MEMBERSHIP</span>
          <div style={{width:60,height:1,background:'#C9A84C'}}/>
        </div>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400}}>Choose Your <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Level</em></h2>
      </div>
      <div className="rv d1" style={{display:'flex',justifyContent:'center',gap:8,marginBottom:40}}>
        {['monthly','annual'].map(v=>(
          <button key={v} onClick={()=>setBc(v)} style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.2em',padding:'8px 20px',background:bc===v?'#C9A84C':'transparent',color:bc===v?'#0A0806':'rgba(242,235,224,.4)',border:'1px solid rgba(201,168,76,.3)',cursor:'pointer',textTransform:'uppercase'}}>{v}{v==='annual'&&<span style={{color:bc==='annual'?'#0A0806':'#4ADE80',fontSize:9,marginLeft:6}}>SAVE</span>}</button>
        ))}
      </div>
      <div className="rv d2 tier-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:2,maxWidth:1200,margin:'0 auto'}}>
        {[
          {name:'The Taste',price:'FREE',annual:'',sm:null,sa:null,features:['1 mini-lesson per school','Weekly newsletter','Public community','Free training library'],cta:'Start Free'},
          {name:'Lifestyle Pass',price:'$29/mo',annual:'$249/yr',sm:'lifestyle_pass_monthly',sa:'lifestyle_pass_annual',features:['Full course library','Monthly live Q&A','Community','Templates & playbooks','10% off events & merch'],cta:'Subscribe'},
          {name:'The Operator',price:'$79/mo',annual:'$699/yr',sm:'operator_monthly',sa:'operator_annual',pop:true,features:['Everything in Pass','Masterclasses','Full SOP library','Private channel','Group coaching','20% off events & merch'],cta:'Go Operator'},
          {name:'Inner Circle',price:'$199/mo',annual:'$1,799/yr',sm:'inner_circle_monthly',sa:'inner_circle_annual',features:['Everything in Operator','Monthly 1-on-1','VIP event access','Direct DM','Co-branding','30% off'],cta:'Apply'},
          {name:'Apprentice',price:'$2,500+',annual:'Per cohort',sm:null,sa:null,features:['8-week live cohort','Choose track','KHG assignments','Certificate','2 private 1-on-1s','Alumni network','100% access'],cta:'Apply'},
        ].map((t,i)=>(
          <div key={i} className={`tcard ${t.pop?'pop':''}`}>
            {t.pop&&<div style={{position:'absolute',top:0,left:0,right:0,background:'#C9A84C',color:'#0A0806',fontFamily:'DM Mono,monospace',fontSize:7,letterSpacing:'.2em',textAlign:'center',padding:5}}>MOST POPULAR</div>}
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(18px,2vw,24px)',fontWeight:500,marginTop:t.pop?16:0,marginBottom:8}}>{t.name}</div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(22px,2.5vw,28px)',color:'#C9A84C'}}>{t.price}</div>
            {t.annual&&<div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(242,235,224,.2)',marginBottom:12}}>{t.annual}</div>}
            <ul style={{listStyle:'none',margin:'16px 0 20px'}}>
              {t.features.map((f,fi)=>(
                <li key={fi} style={{fontSize:12,color:'rgba(242,235,224,.4)',padding:'5px 0',borderBottom:'1px solid rgba(242,235,224,.03)',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{width:4,height:4,background:'#C9A84C',flexShrink:0}}/>
                  {f}
                </li>
              ))}
            </ul>
            {t.sm?(
              <button onClick={()=>checkout(bc==='annual'?t.sa:t.sm,'subscription')} disabled={buying} style={{width:'100%',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.18em',padding:14,background:t.pop?'linear-gradient(135deg,#C9A84C,#E8D5A3)':'transparent',color:t.pop?'#0A0806':'#C9A84C',border:t.pop?'none':'1px solid rgba(201,168,76,.3)',cursor:'pointer'}}>{t.cta}</button>
            ):(
              <a href="#apply" style={{display:'block',width:'100%',textAlign:'center',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.18em',padding:14,color:'#C9A84C',border:'1px solid rgba(201,168,76,.3)',textDecoration:'none'}}>{t.cta}</a>
            )}
          </div>
        ))}
      </div>
    </section>

    {/* ======= CONSULTATIONS (Light section) ======= */}
    <section id="admissions" style={{padding:'clamp(64px,9vw,110px) clamp(20px,4vw,80px)',background:'#F2EBE0',color:'#0A0806'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div className="rv" style={{textAlign:'center',marginBottom:48}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:16,marginBottom:16}}>
            <div style={{width:60,height:1,background:'#8B7340'}}/>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#8B7340'}}>PRIVATE ADVISORY</span>
            <div style={{width:60,height:1,background:'#8B7340'}}/>
          </div>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,4.5vw,52px)',fontWeight:400,color:'#0A0806'}}>Book a Strategy <em style={{fontStyle:'italic',color:'#8B7340'}}>Session</em></h2>
        </div>
        <div className="rv d1 consult-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:1}}>
          {[
            {name:'Strategy Call',desc:'30-minute focused session. Pick one topic. Operator-level advice.',price:'$250',num:'01',sk:'strategy_call'},
            {name:'Brand Audit',desc:'Full written audit, competitive analysis, and action plan.',price:'$500',num:'02',sk:'brand_audit'},
            {name:'Full Day',desc:'4-hour deep dive. Complete action plan and all templates.',price:'$2,500',num:'03',sk:'full_day'},
            {name:'Monthly Retainer',desc:'Two calls/month. Async access. KHG network.',price:'$5,000/mo',num:'04',sk:'retainer',isSub:true},
          ].map((c,i)=>(
            <div key={i} className="ccard" onClick={()=>checkout(c.sk,c.isSub?'subscription':'payment')}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(48px,5vw,72px)',fontWeight:300,color:'rgba(139,115,64,.06)',position:'absolute',top:-8,right:12,lineHeight:1}}>{c.num}</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(20px,2vw,28px)',fontWeight:700,color:'#0A0806',marginBottom:8,position:'relative'}}>{c.name}</div>
              <div style={{fontSize:13,color:'rgba(10,8,6,.45)',lineHeight:1.7,position:'relative',marginBottom:16}}>{c.desc}</div>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:'clamp(16px,1.8vw,22px)',color:'#8B7340',position:'relative'}}>{c.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ======= MEET THE FOUNDER ======= */}
    <section style={{position:'relative',padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',overflow:'hidden'}}>
      <img src={`${SB}/hero-bg.jpg`} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.18,filter:'sepia(.15)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(10,8,6,.95) 0%,rgba(10,8,6,.7) 50%,rgba(10,8,6,.3) 100%)'}}/>
      <div style={{position:'relative',zIndex:1,maxWidth:580}}>
        <div className="rv" style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.4em',color:'#C9A84C',marginBottom:16}}>THE FOUNDER</div>
        <h2 className="rv d1" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1.1,marginBottom:20}}>Meet Our <em style={{fontStyle:'italic',color:'#E8D5A3'}}>Founder</em></h2>
        <p className="rv d2" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(16px,1.8vw,22px)',fontWeight:300,fontStyle:'italic',color:'#E8D5A3',marginBottom:24,lineHeight:1.5}}>Building Tomorrow&#39;s Leaders</p>
        <p className="rv d3" style={{fontSize:14,color:'rgba(242,235,224,.45)',lineHeight:1.8,marginBottom:32}}>57+ brands. 8 cities. 198 AI agents. 34 automated departments. $0 in VC. Built from nothing but vision, systems, and relentless execution. This is The Lifestyle University — the institution built by an operator, for operators.</p>
        <a className="rv d4" href="#apply" style={{display:'inline-block',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'.2em',color:'#C9A84C',border:'1px solid rgba(201,168,76,.3)',padding:'14px 36px',textDecoration:'none'}}>LEARN MORE</a>
      </div>
    </section>

    {/* ======= APPLY / ENROLL ======= */}
    <section id="apply" style={{padding:'clamp(80px,10vw,140px) clamp(20px,4vw,80px)',textAlign:'center',position:'relative'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:500,height:500,borderRadius:'50%',border:'1px solid rgba(201,168,76,.04)',pointerEvents:'none'}}/>
      <div className="rv" style={{fontSize:40,color:'#C9A84C',marginBottom:20}}>&#9878;</div>
      <h2 className="rv d1" style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(32px,6vw,72px)',fontWeight:400,lineHeight:1.05,marginBottom:16}}>Ready to build<br/>your <em style={{fontStyle:'italic',color:'#E8D5A3'}}>empire?</em></h2>
      <p className="rv d2" style={{fontSize:15,color:'rgba(242,235,224,.4)',maxWidth:480,margin:'0 auto 40px',lineHeight:1.7}}>10 schools. 30 programs. 5 membership tiers. The exact systems behind a 57-brand enterprise. Apply today.</p>
      {sent?(
        <div className="rv" style={{padding:40}}>
          <div style={{fontSize:40,color:'#C9A84C',marginBottom:16}}>&#9878;</div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:24}}>Application Received.</div>
          <div style={{fontSize:13,color:'rgba(242,235,224,.4)',marginTop:8}}>Check your email for next steps.</div>
        </div>
      ):(
        <form className="rv d3" onSubmit={doSubmit} style={{maxWidth:440,margin:'0 auto',display:'flex',flexDirection:'column',gap:12}}>
          {[{ph:'Full Name',k:'name',type:'text',req:true},{ph:'Email',k:'email',type:'email',req:true},{ph:'Phone',k:'phone',type:'tel',req:false}].map(f=>(
            <input key={f.k} type={f.type} placeholder={f.ph} required={f.req} value={fd[f.k]} onChange={e=>setFd({...fd,[f.k]:e.target.value})} style={{width:'100%',background:'rgba(242,235,224,.04)',border:'1px solid rgba(201,168,76,.1)',padding:'16px 20px',color:'#F2EBE0',fontSize:14,fontFamily:'DM Sans',outline:'none'}}/>
          ))}
          <select value={fd.industry} onChange={e=>setFd({...fd,industry:e.target.value})} required style={{width:'100%',background:'rgba(242,235,224,.04)',border:'1px solid rgba(201,168,76,.1)',padding:'16px 20px',color:fd.industry?'#F2EBE0':'rgba(242,235,224,.3)',fontSize:14,fontFamily:'DM Sans',outline:'none',appearance:'none'}}>
            <option value="" style={{background:'#0A0806'}}>Select Your School</option>
            {['Business & Ownership','Brand & Influence','Wealth & Negotiation','Lifestyle & Power','Systems & Automation','Hospitality & Culture','Commerce & Product','Growth & Promotion'].map(s=><option key={s} value={s.toLowerCase().replace(/\s+&\s+/g,'_')} style={{background:'#0A0806'}}>{s}</option>)}
          </select>
          <button type="submit" disabled={sub} style={{width:'100%',fontFamily:'Playfair Display,serif',fontSize:14,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',padding:18,background:'linear-gradient(135deg,#C9A84C,#E8D5A3)',color:'#0A0806',border:'none',cursor:'pointer',boxShadow:'0 4px 30px rgba(201,168,76,.3)',opacity:sub?.5:1}}>{sub?'SUBMITTING...':'APPLY NOW'}</button>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.2em',color:'rgba(242,235,224,.15)'}}>SECURE CHECKOUT VIA STRIPE · FREE TRAINING INCLUDED</div>
        </form>
      )}
    </section>

    {/* ======= FOOTER ======= */}
    <footer style={{padding:'40px clamp(20px,4vw,80px)',borderTop:'1px solid rgba(201,168,76,.08)'}}>
      <div style={{maxWidth:1400,margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:20}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
            <span style={{fontSize:16,color:'#C9A84C'}}>&#9878;</span>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:14}}>The Lifestyle University</span>
          </div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:8,letterSpacing:'.2em',color:'rgba(242,235,224,.15)'}}>&#169; 2026 DR. DORSEY · THE KOLLECTIVE HOSPITALITY GROUP</div>
        </div>
        <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
          {['Schools','Programs','Admissions','Partnerships','About','Contact','FAQs'].map(l=>(
            <a key={l} href="#" style={{fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'.1em',color:'rgba(242,235,224,.2)',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:8,color:'rgba(242,235,224,.12)'}}>Privacy Policy · Terms of Service</div>
      </div>
    </footer>
  </>)
}
