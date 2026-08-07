"use client";

import { useEffect, useMemo, useState } from "react";
import { COMMERCE_FUNCTION, LMS_FUNCTION, SUPABASE_KEY, SUPABASE_URL } from "../lib/tlu";

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
  if (!res.ok) throw new Error(data?.msg || data?.error_description || data?.message || "Authentication failed");
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

export function CheckoutButton({ productSlug, label = "Enroll now" }) {
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
  return <><button className="primary-action" onClick={checkout} disabled={busy}>{busy ? "Opening secure checkout…" : label}</button>{error ? <p className="form-error">{error}</p> : null}</>;
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
        setMessage("Account created. Check your email to confirm your address, then sign in.");
      }
    } catch (e) { setMessage(e.message); } finally { setBusy(false); }
  }
  return <div className="auth-card">
    <div className="auth-tabs"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign in</button><button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button></div>
    <form onSubmit={submit}>
      {mode === "signup" ? <label>Full name<input required value={name} onChange={e => setName(e.target.value)} /></label> : null}
      <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className="primary-action" disabled={busy}>{busy ? "Working…" : mode === "login" ? "Enter the University" : "Create my account"}</button>
    </form>
    {message ? <p className="form-message">{message}</p> : null}
  </div>;
}

export function CheckoutSuccess({ sessionId }) {
  const [state, setState] = useState({ status: "working", message: "Verifying payment and activating access…" });
  useEffect(() => {
    const session = readSession();
    if (!session?.access_token) { setState({ status: "error", message: "Sign in with the account used for checkout to activate access." }); return; }
    invoke(COMMERCE_FUNCTION, session.access_token, { action: "confirm_checkout", session_id: sessionId })
      .then(() => setState({ status: "done", message: "Payment verified. Your access is active." }))
      .catch(e => setState({ status: "error", message: e.message }));
  }, [sessionId]);
  return <div className={`status-card ${state.status}`}><span>{state.status === "done" ? "✓" : state.status === "error" ? "!" : "↻"}</span><h2>{state.message}</h2>{state.status === "done" ? <a className="primary-action link-button" href="/dashboard">Open student dashboard</a> : state.status === "error" ? <a href="/login?next=/dashboard">Sign in</a> : null}</div>;
}

export function StudentDashboard() {
  const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(() => {
    const session = readSession();
    if (!session?.access_token) { window.location.href = "/login?next=/dashboard"; return; }
    invoke(LMS_FUNCTION, session.access_token, { action: "dashboard" }).then(setData).catch(e => setError(e.message));
  }, []);
  if (error) return <div className="status-card error"><h2>{error}</h2></div>;
  if (!data) return <div className="status-card"><h2>Loading your operating system…</h2></div>;
  const enrollments = data.enrollments || [];
  return <div className="dashboard-stack">
    <section><div className="section-label">MY PROGRAMS</div><div className="dashboard-grid">{enrollments.length ? enrollments.map(e => <a className="dashboard-course" href={`/learn/${e.tlu_courses?.slug}`} key={e.id}><small>{e.progress_pct || 0}% COMPLETE</small><h3>{e.tlu_courses?.title}</h3><div className="progress"><i style={{ width: `${e.progress_pct || 0}%` }} /></div><span>Continue →</span></a>) : <div className="empty-card"><h3>No programs yet.</h3><p>Choose a flagship and start building.</p><a href="/">Browse programs →</a></div>}</div></section>
    {data.recommendations?.length ? <section><div className="section-label">NEXT BEST MOVES</div><div className="recommendation-grid">{data.recommendations.map(r => <article key={r.id}><small>{r.recommendation_type}</small><h3>{r.headline}</h3><p>{r.body}</p></article>)}</div></section> : null}
    {data.notifications?.length ? <section><div className="section-label">ACTIVITY</div><div className="notification-list">{data.notifications.slice(0,8).map(n => <article key={n.id}><small>{new Date(n.created_at).toLocaleDateString()}</small><h4>{n.title}</h4><p>{n.body}</p></article>)}</div></section> : null}
  </div>;
}

export function LearningWorkspace({ courseSlug }) {
  const [data, setData] = useState(null); const [error, setError] = useState(""); const [active, setActive] = useState(null);
  useEffect(() => {
    const session = readSession(); if (!session?.access_token) { window.location.href = `/login?next=/learn/${courseSlug}`; return; }
    invoke(LMS_FUNCTION, session.access_token, { action: "course_detail", course_slug: courseSlug }).then(d => { setData(d); setActive(d.lessons?.find(l => !(d.progress || []).find(p => p.lesson_id === l.id && p.completed_at)) || d.lessons?.[0]); }).catch(e => setError(e.message));
  }, [courseSlug]);
  async function complete() {
    const session = readSession(); if (!session?.access_token || !active) return;
    await invoke(LMS_FUNCTION, session.access_token, { action: "save_lesson_progress", lesson_id: active.id, completed: true, progress_seconds: (active.estimated_minutes || 10) * 60 });
    const refreshed = await invoke(LMS_FUNCTION, session.access_token, { action: "course_detail", course_slug: courseSlug }); setData(refreshed);
    const idx = refreshed.lessons.findIndex(l => l.id === active.id); setActive(refreshed.lessons[idx + 1] || active);
  }
  const completed = useMemo(() => new Set((data?.progress || []).filter(p => p.completed_at).map(p => p.lesson_id)), [data]);
  if (error) return <div className="status-card error"><h2>{error}</h2><a href={`/courses/${courseSlug}`}>View enrollment options</a></div>;
  if (!data || !active) return <div className="status-card"><h2>Loading course…</h2></div>;
  return <div className="learning-shell"><aside><a href="/dashboard">← Dashboard</a><h2>{data.course.title}</h2>{[1,2,3,4,5,6,7,8].map(m => <div className="module-list" key={m}><strong>MODULE {m}</strong>{data.lessons.filter(l => l.module_order === m).map(l => <button className={active.id === l.id ? "active" : ""} key={l.id} onClick={() => setActive(l)}><span>{completed.has(l.id) ? "✓" : `${l.lesson_order}.`}</span>{l.title}</button>)}</div>)}</aside><main><small>MODULE {active.module_order} · LESSON {active.lesson_order}</small><h1>{active.title}</h1><p className="lesson-summary">{active.summary}</p><div className="lesson-body">{String(active.content_md || "").split("\n").map((line, i) => line.startsWith("## ") ? <h2 key={i}>{line.slice(3)}</h2> : line.startsWith("# ") ? null : line.startsWith("- ") ? <li key={i}>{line.slice(2)}</li> : line.trim() ? <p key={i}>{line.replace(/\*\*/g, "")}</p> : <br key={i} />)}</div><div className="assignment"><small>IMPLEMENTATION CARD</small><p>{active.action_assignment}</p></div><button className="primary-action" onClick={complete}>{completed.has(active.id) ? "Completed ✓" : "Mark complete & continue"}</button></main></div>;
}
