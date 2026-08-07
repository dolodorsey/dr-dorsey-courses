import Link from "next/link";
import { getCatalog, money } from "./lib/tlu";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { courses, faqs, services, consultations, templates, glossary } = await getCatalog();
  return <main>
    <nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><a href="#programs">Programs</a><a href="#resources">Resources</a><a href="#services">Services</a><Link href="/dashboard">Student Portal</Link></div></nav>

    <section className="hero"><div className="hero-kicker">STUDY THE LIFESTYLE. BUILD THE EMPIRE.</div><h1>DON’T JUST LEARN IT.<br/><em>INSTALL IT.</em></h1><p>Operator-built education for people turning ideas, audiences, venues, brands, apps, services and experiences into real companies.</p><div className="hero-actions"><a className="primary-action link-button" href="#programs">Choose your program</a><Link className="ghost-action" href="/dashboard">Open student portal →</Link></div><div className="hero-stats"><div><b>{courses.length || 10}</b><span>Flagship programs</span></div><div><b>320</b><span>Implementation lessons</span></div><div><b>105</b><span>Tools & templates</span></div><div><b>90</b><span>Checks + capstones</span></div></div></section>

    <section className="three-paths"><article><small>01 · LEARN IT</small><h2>Programs</h2><p>Structured 8-module operating programs with 32 lessons, implementation cards, module checks, capstones and certification.</p><a href="#programs">Explore programs →</a></article><article><small>02 · DECIDE IT</small><h2>Advisory</h2><p>When the issue is a decision—not information—move into a focused consultation or private advisory lane.</p><a href="#consultations">See advisory →</a></article><article><small>03 · BUILD IT</small><h2>Services Studio</h2><p>When you already know what needs to happen, hand the implementation package to the build team.</p><a href="#services">See services →</a></article></section>

    <section id="programs" className="section"><header className="section-head"><small>THE 10 FLAGSHIPS</small><h2>Build the part of the business<br/><em>that changes your economics.</em></h2></header><div className="course-grid">{courses.map((c, i) => <article className="course-card" key={c.id}><div className="course-index">{String(i+1).padStart(2,"0")}</div><small>{c.school_name || "OPERATOR SCHOOL"}</small><h3>{c.title}</h3><p>{c.transformation_promise || c.description}</p><div className="course-meta"><span>{c.lesson_count || 32} lessons</span><span>8 modules</span><span>Capstone</span></div><div className="course-foot"><b>{c.price_label || money(c.price_cents)}</b><Link href={`/courses/${c.slug}`}>View program →</Link></div></article>)}</div></section>

    <section id="resources" className="section resources"><header className="section-head"><small>RESOURCE VAULT</small><h2>Not PDFs that collect dust.<br/><em>Working operating assets.</em></h2></header><div className="resource-metrics"><div><b>{templates.length || 105}+</b><span>Templates & tools</span></div><div><b>{glossary.length || 30}+</b><span>Operator terms</span></div><div><b>8</b><span>Core guides</span></div><div><b>{faqs.length || 15}+</b><span>Answers</span></div></div><div className="resource-list">{templates.slice(0,12).map(t => <article key={t.slug}><small>{t.category}</small><h3>{t.title}</h3><p>{t.preview_text || t.description}</p><span>{t.access_level === "free" ? "FREE RESOURCE" : "PROGRAM RESOURCE"}</span></article>)}</div></section>

    <section id="consultations" className="section split-section"><header className="section-head"><small>DECIDE IT</small><h2>Get the right brain<br/><em>on the right problem.</em></h2></header><div className="offer-list">{consultations.slice(0,8).map(o => <article key={o.slug}><div><small>{o.offer_kind || "ADVISORY"}</small><h3>{o.name}</h3><p>{o.description || `${o.duration_minutes || 60}-minute focused advisory session.`}</p></div><b>{o.price_label || money(o.price_cents)}</b></article>)}</div></section>

    <section id="services" className="section services"><header className="section-head"><small>BUILD IT</small><h2>You can learn the system.<br/><em>Or hand us the build.</em></h2></header><div className="service-grid">{services.map(s => <article key={s.slug}><small>{s.category}</small><h3>{s.title}</h3><p>{s.description || "Done-for-you implementation built from the operating strategy."}</p><div><b>{s.price_label || (s.starting_price_cents ? `From ${money(s.starting_price_cents)}` : "Request scope")}</b><span>{s.turnaround_label || "Scoped delivery"}</span></div></article>)}</div></section>

    <section className="section faq"><header className="section-head"><small>FAQ</small><h2>Before you enroll.</h2></header><div>{faqs.slice(0,12).map(f => <details key={f.id || f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div></section>

    <section className="closing"><small>THE LIFESTYLE UNIVERSITY</small><h2>Knowledge is cheap.<br/><em>Installed systems are not.</em></h2><p>Pick the program closest to your current bottleneck. Build while you learn. Leave with operating assets, not notes.</p><a className="primary-action link-button" href="#programs">Start building</a></section>
    <footer><div className="brand"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></div><p>Education division. Built for operators.</p><Link href="/dashboard">Student Portal →</Link></footer>
  </main>;
}
