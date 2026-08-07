"use client";

import { useEffect, useMemo, useState } from "react";
import { COMMERCE_FUNCTION, LMS_FUNCTION, SUPABASE_KEY, SUPABASE_URL } from "../lib/tlu";
import { playLabel, stageLabel } from "../lib/lingo";

const SESSION_KEY = "tlu_session";

function readSession() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}

async function authRequest(path, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || data?.error_description || data?.message || "Access request failed");
  return data;
}

async function invoke(url, token, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data;
}

function recommendationLabel(type) {
  return ({ consultation: "STRATEGY ROOM", service: "BUILD DESK", membership: "ACCESS UPGRADE", next_course: "NEXT FLAGSHIP" })[type] || "NEXT MOVE";
}

export function CheckoutButton({ productSlug, label = "Unlock program access" }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    const session = readSession();
    if (!session?.access_token) {
      window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}&product=${encodeURIComponent(productSlug)}`;
      return;
    }
    setBusy(true); setError("");
    try {
      const data = await invoke(COMMERCE_FUNCTION, session.access_token, { action: "create_checkout", product_slug: productSlug, origin: window.location.origin });
      window.location.href = data.checkout_url;
    } catch (e) { setError(e.message); setBusy(false); }
  }
  return <><button className="primary-action" onClick={checkout} disabled={busy}>{busy ? "Preparing secure access…" : label}</button>{error ? <p className="form-error">{error}</p> : null}</>;
}

export function LoginPanel({ nextPath = "/dashboard", productSlug = "" }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const data = mode === "login"
        ? await authRequest("token?grant_type=password", { email, password })
        : await authRequest("signup", { email, password, data: { full_name: name } });
      if (data.access_token) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
        const target = productSlug ? `${nextPath}${nextPath.includes("?") ? "&" : "?"}product=${encodeURIComponent(productSlug)}` : nextPath;
        window.location.href = target;
      } else {
        setMessage("Operator profile created. Confirm your email, then return to unlock your Console.");
      }
    } catch (e) { setMessage(e.message); } finally { setBusy(false); }
  }
  return <div className="auth-card auth-card-v2">
    <div className="auth-card-code">TLU / OPERATOR ACCESS</div>
    <div className="auth-tabs"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Return operator</button><button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>New operator</button></div>
    <form onSubmit={submit}>
      {mode === "signup" ? <label>Operator name<input required value={name} onChange={e => setName(e.target.value)} /></label> : null}
      <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Access password<input type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className="primary-action" disabled={busy}>{busy ? "Authorizing…" : mode === "login" ? "Open Operator Console" : "Create operator profile"}</button>
    </form>
    {message ? <p className="form-message">{message}</p> : null}
  </div>;
}

export function CheckoutSuccess({ sessionId }) {
  const [state, setState] = useState({ status: "working", message: "Verifying payment and unlocking program access…" });
  useEffect(() => {
    const session = readSession();
    if (!session?.access_token) { setState({ status: "error", message: "Sign in with the operator profile used for checkout to finish access activation." }); return; }
    invoke(COMMERCE_FUNCTION, session.access_token, { action: "confirm_checkout", session_id: sessionId })
      .then(() => setState({ status: "done", message: "Program access unlocked. Your Operator Console is ready." }))
      .catch(e => setState({ status: "error", message: e.message }));
  }, [sessionId]);
  return <div className={`status-card status-card-v2 ${state.status}`}><span>{state.status === "done" ? "✓" : state.status === "error" ? "!" : "↻"}</span><small>ACCESS STATUS</small><h2>{state.message}</h2>{state.status === "done" ? <a className="primary-action link-button" href="/dashboard">Enter Operator Console</a> : state.status === "error" ? <a href="/login?next=/dashboard">Return to operator access</a> : null}</div>;
}

export function StudentDashboard() {
  const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(() => {
    const session = readSession();
    if (!session?.access_token) { window.location.href = "/login?next=/dashboard"; return; }
    invoke(LMS_FUNCTION, session.access_token, { action: "dashboard" }).then(setData).catch(e => setError(e.message));
  }, []);
  if (error) return <div className="status-card error"><small>CONSOLE ERROR</small><h2>{error}</h2></div>;
  if (!data) return <div className="status-card loading-card"><small>OPERATOR CONSOLE</small><h2>Loading your build portfolio…</h2></div>;
  const enrollments = data.enrollments || [];
  const avgProgress = enrollments.length ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress_pct || 0), 0) / enrollments.length) : 0;
  const activeAccess = (data.subscriptions || []).find(s => ["active", "trialing"].includes(s.status));
  return <div className="dashboard-stack dashboard-stack-v2">
    <section className="console-overview"><div className="console-kpi"><small>PROGRAMS UNLOCKED</small><b>{enrollments.length}</b><span>active builds</span></div><div className="console-kpi"><small>AVERAGE BUILD PROGRESS</small><b>{avgProgress}%</b><span>across your flagships</span></div><div className="console-kpi"><small>ACCESS LEVEL</small><b className="kpi-text">{activeAccess?.tier ? activeAccess.tier.replaceAll("_", " ") : "Program Access"}</b><span>{activeAccess ? activeAccess.status : "individual flagship"}</span></div><div className="console-kpi"><small>NEXT MOVES</small><b>{data.recommendations?.length || 0}</b><span>system recommendations</span></div></section>

    <section><div className="console-section-head"><div><div className="section-label">BUILD PORTFOLIO</div><p>Your active flagships and current operating progress.</p></div><a href="/#programs">Add a flagship →</a></div><div className="dashboard-grid dashboard-grid-v2">{enrollments.length ? enrollments.map((e,i) => <a className="dashboard-course dashboard-course-v2" href={`/learn/${e.tlu_courses?.slug}`} key={e.id}><div className="dashboard-course-top"><span>FLAGSHIP {String(i+1).padStart(2,"0")}</span><small>{e.progress_pct || 0}% BUILD PROGRESS</small></div><h3>{e.tlu_courses?.title}</h3><div className="progress progress-v2"><i style={{ width: `${e.progress_pct || 0}%` }} /></div><div className="dashboard-course-foot"><span>{e.progress_pct >= 100 ? "PLAYS COMPLETE · PROOF BUILD NEXT" : "CONTINUE THE BUILD"}</span><b>↗</b></div></a>) : <div className="empty-card empty-card-v2"><small>NO ACTIVE FLAGSHIPS</small><h3>Your build portfolio is empty.</h3><p>Choose the business system closest to your current constraint and unlock Stage 01.</p><a href="/#programs">Browse the flagship index →</a></div>}</div></section>

    {data.recommendations?.length ? <section><div className="console-section-head"><div><div className="section-label">NEXT BEST MOVES</div><p>Recommendations triggered by your Build Progress.</p></div></div><div className="recommendation-grid recommendation-grid-v2">{data.recommendations.map((r,i) => <article key={r.id}><div className="recommendation-top"><small>{recommendationLabel(r.recommendation_type)}</small><span>{String(i+1).padStart(2,"0")}</span></div><h3>{r.headline}</h3><p>{r.body}</p><div className="trigger-note">TRIGGER · {r.trigger_reason}</div></article>)}</div></section> : null}

    {data.notifications?.length ? <section><div className="console-section-head"><div><div className="section-label">OPERATOR FEED</div><p>Access, progress, gates and credential activity.</p></div></div><div className="notification-list notification-list-v2">{data.notifications.slice(0,8).map(n => <article key={n.id}><div><small>{n.kind?.toUpperCase()} · {new Date(n.created_at).toLocaleDateString()}</small><h4>{n.title}</h4><p>{n.body}</p></div>{n.cta_label && n.cta_url ? <a href={n.cta_url}>{n.cta_label} →</a> : null}</article>)}</div></section> : null}
  </div>;
}

export function LearningWorkspace({ courseSlug }) {
  const [data, setData] = useState(null); const [error, setError] = useState(""); const [active, setActive] = useState(null); const [saving, setSaving] = useState(false);
  useEffect(() => {
    const session = readSession(); if (!session?.access_token) { window.location.href = `/login?next=/learn/${courseSlug}`; return; }
    invoke(LMS_FUNCTION, session.access_token, { action: "course_detail", course_slug: courseSlug }).then(d => { setData(d); setActive(d.lessons?.find(l => !(d.progress || []).find(p => p.lesson_id === l.id && p.completed_at)) || d.lessons?.[0]); }).catch(e => setError(e.message));
  }, [courseSlug]);
  async function complete() {
    const session = readSession(); if (!session?.access_token || !active || saving) return;
    setSaving(true);
    try {
      await invoke(LMS_FUNCTION, session.access_token, { action: "save_lesson_progress", lesson_id: active.id, completed: true, progress_seconds: (active.estimated_minutes || 10) * 60 });
      const refreshed = await invoke(LMS_FUNCTION, session.access_token, { action: "course_detail", course_slug: courseSlug }); setData(refreshed);
      const idx = refreshed.lessons.findIndex(l => l.id === active.id); setActive(refreshed.lessons[idx + 1] || active);
    } finally { setSaving(false); }
  }
  const completed = useMemo(() => new Set((data?.progress || []).filter(p => p.completed_at).map(p => p.lesson_id)), [data]);
  const completionPct = data?.lessons?.length ? Math.round((completed.size / data.lessons.length) * 100) : 0;
  if (error) return <div className="status-card error"><small>ACCESS NOTICE</small><h2>{error}</h2><a href={`/courses/${courseSlug}`}>View program access options →</a></div>;
  if (!data || !active) return <div className="status-card loading-card"><small>PROGRAM WORKSPACE</small><h2>Loading your next Play…</h2></div>;
  return <div className="learning-shell learning-shell-v2">
    <aside>
      <div className="workspace-brand"><a href="/dashboard">← OPERATOR CONSOLE</a><small>BUILD PROGRESS · {completionPct}%</small></div>
      <h2>{data.course.title}</h2>
      <div className="workspace-progress"><i style={{ width: `${completionPct}%` }} /></div>
      {[1,2,3,4,5,6,7,8].map(m => <div className="module-list stage-list" key={m}><strong>{stageLabel(m)}</strong>{data.lessons.filter(l => l.module_order === m).map(l => <button className={active.id === l.id ? "active" : ""} key={l.id} onClick={() => setActive(l)}><span>{completed.has(l.id) ? "✓" : String(l.lesson_order).padStart(2,"0")}</span><b>{l.title}</b></button>)}</div>)}
    </aside>
    <main className="play-workspace">
      <div className="play-topbar"><span>{playLabel(active.module_order, active.lesson_order)}</span><span>{active.estimated_minutes || 10} MIN · OPERATOR PLAY</span></div>
      <h1>{active.title}</h1>
      <p className="lesson-summary">{active.summary}</p>
      {active.key_takeaways?.length ? <div className="play-objectives"><small>WHAT THIS PLAY INSTALLS</small><div>{active.key_takeaways.map((item,i) => <span key={i}>{String(i+1).padStart(2,"0")} · {item}</span>)}</div></div> : null}
      <div className="lesson-body lesson-body-v2">{String(active.content_md || "").split("\n").map((line, i) => line.startsWith("## ") ? <h2 key={i}>{line.slice(3)}</h2> : line.startsWith("# ") ? null : line.startsWith("- ") ? <li key={i}>{line.slice(2)}</li> : line.trim() ? <p key={i}>{line.replace(/\*\*/g, "")}</p> : <br key={i} />)}</div>
      <div className="assignment build-card"><div className="build-card-head"><small>THE BUILD</small><span>REQUIRED TO ADVANCE</span></div><h3>Turn the Play into an operating asset.</h3><p>{active.action_assignment}</p><div className="build-rule">COMPLETION STANDARD · Another capable operator should be able to execute the next step from what you documented.</div></div>
      <div className="play-complete-row"><div><small>PLAY STATUS</small><b>{completed.has(active.id) ? "LOCKED ✓" : "IN PROGRESS"}</b></div><button className="primary-action" onClick={complete} disabled={saving || completed.has(active.id)}>{saving ? "Locking Play…" : completed.has(active.id) ? "Play Locked ✓" : "Lock Play & Continue"}</button></div>
    </main>
  </div>;
}
