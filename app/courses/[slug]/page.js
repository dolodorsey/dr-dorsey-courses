import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutButton } from "../../components/StudentActions";
import { getCourse, money } from "../../lib/tlu";
import { LINGO, stageLabel } from "../../lib/lingo";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();
  const curriculum = Array.isArray(course.curriculum_json) ? course.curriculum_json : [];
  const outcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : [];
  const bonuses = Array.isArray(course.bonuses) ? course.bonuses : [];
  const faqs = Array.isArray(course.course_faq) ? course.course_faq : [];
  return <main className="site-shell program-detail">
    <div className="utility-strip"><span>{course.school_name || "OPERATOR STUDIES"}</span><span>FLAGSHIP PROGRAM</span><span>PROOF-BASED CREDENTIAL</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagships</Link><Link href="/#resources">Tool Vault</Link><Link href="/#consultations">Strategy Room</Link><Link className="console-link" href="/dashboard">Operator Console</Link></div></nav>

    <section className="course-hero course-hero-v2">
      <Link className="back-link" href="/#programs">← FLAGSHIP INDEX</Link>
      <div className="program-badge-row"><span>{course.school_name || "FLAGSHIP PROGRAM"}</span><span>8-STAGE OPERATOR PROGRAM</span></div>
      <h1>{course.title}</h1>
      <p className="course-subtitle">{course.subtitle || course.transformation_promise}</p>
      <div className="course-hero-grid course-hero-grid-v2"><div><span>32</span><small>PLAYS</small></div><div><span>8</span><small>STAGES</small></div><div><span>8</span><small>STAGE GATES</small></div><div><span>1</span><small>PROOF BUILD</small></div><div><span>{course.completion_threshold || 80}%</span><small>CREDENTIAL STANDARD</small></div></div>
      <div className="enroll-box enroll-box-v2"><div><small>PROGRAM INVESTMENT</small><b>{course.price_label || money(course.price_cents)}</b><p>One-time access · lifetime program library · Tool Vault included</p></div><CheckoutButton productSlug={`course-${course.slug}`} label="Unlock program access" /></div>
    </section>

    <section className="program-principle"><div><small>THE STANDARD</small><h2>WATCH LESS.<br/><em>BUILD MORE.</em></h2></div><p>Every Stage contains four Plays. Every Play ends in a Build. Every Stage closes with a Gate. The program ends with a Proof Build that demonstrates you can actually operate the system.</p></section>

    <section className="section course-intro course-intro-v2"><div><small>BUILT FOR</small><h2>{course.target_customer || "Operators ready to convert knowledge into execution."}</h2></div><div><small>WHAT CHANGES</small><p>{course.transformation_promise || course.description}</p></div></section>

    {outcomes.length ? <section className="section outcomes-section"><header className="section-head section-head-v2"><div><small>OPERATOR OUTCOMES</small><p>What should exist in your business after the program.</p></div><h2>LEAVE WITH<br/><em>PROOF OF WORK.</em></h2></header><div className="outcome-grid outcome-grid-v2">{outcomes.map((o,i)=><article key={i}><span>{String(i+1).padStart(2,"0")}</span><p>{o}</p></article>)}</div></section> : null}

    <section className="section curriculum curriculum-v2"><header className="section-head section-head-v2"><div><small>THE OPERATOR CURRICULUM</small><p>Eight Stages. Thirty-two Plays. No filler units.</p></div><h2>BUILD IN<br/><em>SEQUENCE.</em></h2></header><div className="module-grid module-grid-v2">{curriculum.map((m,i)=><article key={i}><div className="module-number">{stageLabel(i+1)}</div><div className="stage-status">4 PLAYS · 1 GATE</div><h3>{m.title || `Stage ${i+1}`}</h3><p>{m.description || m.outcome || "Install the next layer of the operating system."}</p><ol>{(m.lessons || []).map((l,j)=><li key={j}><span>PLAY {String(j+1).padStart(2,"0")}</span><b>{typeof l === "string" ? l : l.title}</b></li>)}</ol><small>STAGE EXIT: COMPLETE THE GATE</small></article>)}</div></section>

    {bonuses.length ? <section className="section toolkit toolkit-v2"><header className="section-head section-head-v2"><div><small>{LINGO.resources.toUpperCase()}</small><p>Templates, calculators and working systems attached to the curriculum.</p></div><h2>TAKE THE<br/><em>TOOLS WITH YOU.</em></h2></header><div className="tool-grid tool-grid-v2">{bonuses.map((b,i)=><article key={i}><span>VAULT {String(i+1).padStart(2,"0")}</span><h3>{typeof b === "string" ? b : b.title}</h3><p>Working operator asset with instructions, completion standard and review prompts.</p></article>)}</div></section> : null}

    <section className="section capstone capstone-v2"><div><small>THE PROOF BUILD</small><h2>CREDENTIALS REQUIRE<br/><em>EVIDENCE.</em></h2><p>Complete all 32 Plays, clear the eight Stage Gates, and submit the final Proof Build. Your Operator Credential unlocks only when the work meets the program standard.</p><div className="credential-chain"><span>32 PLAYS</span><i>→</i><span>8 GATES</span><i>→</i><span>PROOF BUILD</span><i>→</i><span>OPERATOR CREDENTIAL</span></div></div><div className="capstone-score"><b>{course.completion_threshold || 80}%</b><span>MINIMUM PROOF STANDARD</span></div></section>

    {faqs.length ? <section className="section faq faq-v2"><header className="section-head section-head-v2"><div><small>BEFORE YOU ENTER</small><p>Program access, expectations and operating standard.</p></div><h2>KNOW THE PROGRAM.<br/><em>THEN COMMIT.</em></h2></header><div>{faqs.map((f,i)=><details key={i}><summary><span>{String(i+1).padStart(2,"0")}</span>{f.question || f.q}</summary><p>{f.answer || f.a}</p></details>)}</div></section> : null}

    <section className="closing closing-v2"><small>{course.title}</small><h2>YOUR NEXT MOVE<br/><em>SHOULD CREATE LEVERAGE.</em></h2><p>Unlock the program, enter Stage 01 and finish the first Build before you consume anything else.</p><CheckoutButton productSlug={`course-${course.slug}`} label={`Unlock ${course.title}`} /></section>
  </main>;
}
