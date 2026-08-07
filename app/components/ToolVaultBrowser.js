"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const KIND_LABELS = {
  template: "TEMPLATE",
  calculator: "CALCULATOR",
  checklist: "CHECKLIST",
  workbook: "WORKBOOK",
  script: "SCRIPT",
  scorecard: "SCORECARD",
};

export default function ToolVaultBrowser({ tools = [], courses = [] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [course, setCourse] = useState("all");
  const [access, setAccess] = useState("all");

  const courseMap = useMemo(() => Object.fromEntries(courses.map(c => [c.slug, c.title])), [courses]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tools.filter(tool => {
      if (kind !== "all" && tool.tool_kind !== kind) return false;
      if (course !== "all" && tool.course_slug !== course) return false;
      if (access !== "all" && (access === "open" ? tool.access_level !== "free" : tool.access_level === "free")) return false;
      if (!needle) return true;
      const haystack = [tool.title, tool.description, tool.preview_text, tool.category, tool.tool_kind, courseMap[tool.course_slug], ...(tool.tags || [])].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [tools, query, kind, course, access, courseMap]);

  const kinds = ["all", "calculator", "workbook", "scorecard", "checklist", "script", "template"];

  return <div className="vault-browser">
    <div className="vault-filter-shell">
      <div className="vault-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tools, systems, calculators, scripts…" /></div>
      <div className="vault-filter-row">
        <div className="vault-pills">{kinds.map(item => <button key={item} className={kind === item ? "active" : ""} onClick={() => setKind(item)}>{item === "all" ? "ALL TOOLS" : KIND_LABELS[item]}</button>)}</div>
        <div className="vault-selects"><select value={course} onChange={e => setCourse(e.target.value)}><option value="all">All Flagships</option>{courses.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}</select><select value={access} onChange={e => setAccess(e.target.value)}><option value="all">All Access Types</option><option value="open">Open Access</option><option value="program">Program Access</option></select></div>
      </div>
      <div className="vault-result-line"><span>{filtered.length} OPERATING ASSETS</span><button onClick={() => { setQuery(""); setKind("all"); setCourse("all"); setAccess("all"); }}>RESET FILTERS</button></div>
    </div>

    <div className="vault-grid">{filtered.map((tool, i) => <Link className={`vault-card ${tool.featured ? "featured" : ""}`} href={`/vault/${tool.slug}`} key={tool.slug}>
      <div className="vault-card-top"><span>TV-{String(i + 1).padStart(3, "0")}</span><b>{KIND_LABELS[tool.tool_kind] || "TOOL"}</b></div>
      <small>{courseMap[tool.course_slug] || tool.category || "THE TOOL VAULT"}</small>
      <h3>{tool.title}</h3>
      <p>{tool.preview_text || tool.description || "Working operator asset with instructions, completion standard, and review prompts."}</p>
      <div className="vault-card-foot"><span>{tool.access_level === "free" ? "OPEN ACCESS" : "PROGRAM ACCESS"}</span><b>OPEN TOOL ↗</b></div>
    </Link>)}</div>

    {!filtered.length ? <div className="vault-empty"><small>NO MATCHES</small><h3>That filter combination returned no tools.</h3><button onClick={() => { setQuery(""); setKind("all"); setCourse("all"); setAccess("all"); }}>Reset the Tool Vault</button></div> : null}
  </div>;
}
