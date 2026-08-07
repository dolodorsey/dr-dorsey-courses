import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutButton } from "../../components/StudentActions";
import { getCourse, money } from "../../lib/tlu";

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();
  const curriculum = Array.isArray(course.curriculum_json) ? course.curriculum_json : [];
  const outcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : [];
  const bonuses = Array.isArray(course.bonuses) ? course.bonuses : [];
  const faqs = Array.isArray(course.course_faq) ? course.course_faq : [];
  return <main>
    <nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Programs</Link><Link href="/#resources">Resources</Link><Link href="/dashboard">Student Portal</Link></div></nav>
    <section className="course-hero"><Link className="back-link" href="/#programs">← ALL PROGRAMS</Link><small>{course.school_name || "FLAGSHIP PROGRAM"}</small><h1>{course.title}</h1><p className="course-subtitle">{course.subtitle || course.transformation_promise}</p><div className="course-hero-grid"><div><span>32</span><small>LESSONS</small></div><div><span>8</span><small>MODULES</small></div><div><span>8</span><small>MODULE CHECKS</small></div><div><span>1</span><small>CAPSTONE</small></div></div><div className="enroll-box"><div><small>PROGRAM INVESTMENT</small><b>{course.price_label || money(course.price_cents)}</b><p>One-time enrollment · lifetime course access</p></div><CheckoutButton productSlug={`course-${course.slug}`} label="Enroll & start building" /></div></section>

    <section className="section course-intro"><div><small>WHO THIS IS FOR</small><h2>{course.target_customer || "Operators ready to turn knowledge into execution."}</h2></div><div><small>THE TRANSFORMATION</small><p>{course.transformation_promise || course.description}</p></div></section>

    {outcomes.length ? <section className="section"><header className="section-head"><small>WHAT YOU LEAVE WITH</small><h2>Outcomes that exist<br/><em>outside the classroom.</em></h2></header><div className="outcome-grid">{outcomes.map((o,i)=><article key={i}><span>{String(i+1).padStart(2,"0")}</span><p>{o}</p></article>)}</div></section> : null}

    <section className="section curriculum"><header className="section-head"><small>THE CURRICULUM</small><h2>Eight modules.<br/><em>Thirty-two installations.</em></h2></header><div className="module-grid">{curriculum.map((m,i)=><article key={i}><div className="module-number">MODULE {String(i+1).padStart(2,"0")}</div><h3>{m.title || `Module ${i+1}`}</h3><p>{m.description || m.outcome || "Build the next layer of the operating system."}</p><ol>{(m.lessons || []).map((l,j)=><li key={j}><span>{j+1}</span>{typeof l === "string" ? l : l.title}</li>)}</ol><small>Ends with implementation check</small></article>)}</div></section>

    {bonuses.length ? <section className="section toolkit"><header className="section-head"><small>PROGRAM TOOLKIT</small><h2>Your implementation<br/><em>vault is included.</em></h2></header><div className="tool-grid">{bonuses.map((b,i)=><article key={i}><span>TOOL {String(i+1).padStart(2,"0")}</span><h3>{typeof b === "string" ? b : b.title}</h3><p>Working template, instructions, completion standard and operator QA prompts.</p></article>)}</div></section> : null}

    <section className="section capstone"><div><small>CERTIFICATION STANDARD</small><h2>Finish with proof.<br/><em>Not attendance.</em></h2><p>Complete every lesson, finish the module implementation checks, and submit the capstone operating build. Certification unlocks only after the capstone meets the program rubric.</p></div><div className="capstone-score"><b>{course.completion_threshold || 80}%</b><span>MINIMUM CAPSTONE STANDARD</span></div></section>

    {faqs.length ? <section className="section faq"><header className="section-head"><small>PROGRAM FAQ</small><h2>Know before you start.</h2></header><div>{faqs.map((f,i)=><details key={i}><summary>{f.question || f.q}</summary><p>{f.answer || f.a}</p></details>)}</div></section> : null}

    <section className="closing"><small>{course.title}</small><h2>You already know enough<br/><em>to start building.</em></h2><CheckoutButton productSlug={`course-${course.slug}`} label={`Enroll in ${course.title}`} /></section>
  </main>;
}
