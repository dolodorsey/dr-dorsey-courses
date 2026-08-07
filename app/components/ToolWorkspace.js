"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LMS_FUNCTION, SUPABASE_KEY } from "../lib/tlu";

const SESSION_KEY = "tlu_session";
function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||"null")}catch{return null}}
async function invoke(token,body){const res=await fetch(LMS_FUNCTION,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(body)});const data=await res.json();if(!res.ok)throw new Error(data?.error||"Tool request failed");return data}
function download(name,type,content){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
function labelize(key){return String(key).replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}
function formatValue(key,value){if(value===null||Number.isNaN(value))return "—";if(key.includes("pct"))return `${value.toFixed(1)}%`;if(["gross_revenue","total_cost","profit"].includes(key))return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(value);return new Intl.NumberFormat("en-US",{maximumFractionDigits:2}).format(value)}

export default function ToolWorkspace({ toolSlug }){
  const [tool,setTool]=useState(null);const [error,setError]=useState("");const [values,setValues]=useState({});
  useEffect(()=>{const session=readSession();if(!session?.access_token){window.location.href=`/login?next=/vault/${toolSlug}`;return}invoke(session.access_token,{action:"template",template_slug:toolSlug}).then(d=>setTool(d.template)).catch(e=>setError(e.message))},[toolSlug]);
  const outputs=useMemo(()=>{if(tool?.tool_type!=="calculator")return{};const units=Number(values.units||0),price=Number(values.price||0),variable_cost=Number(values.variable_cost||0),fixed_costs=Number(values.fixed_costs||0),other_revenue=Number(values.other_revenue||0);const gross_revenue=units*price+other_revenue,total_cost=fixed_costs+units*variable_cost,profit=gross_revenue-total_cost,margin_pct=gross_revenue===0?0:(profit/gross_revenue)*100,break_even_units=price<=variable_cost?null:fixed_costs/(price-variable_cost);return{gross_revenue,total_cost,profit,margin_pct,break_even_units}},[tool,values]);
  if(error)return <div className="status-card error"><small>TOOL VAULT ACCESS</small><h2>{error}</h2><Link href="/vault">Return to Tool Vault →</Link></div>;
  if(!tool)return <div className="status-card loading-card"><small>TOOL VAULT</small><h2>Opening operating asset…</h2></div>;
  const schema=tool.template_schema||{};
  function downloadAsset(){download(tool.download_filename||`${tool.slug}.md`,"text/markdown;charset=utf-8",tool.content_md||"")}
  function exportResults(){const rows=[["FIELD","VALUE"],...(schema.inputs||[]).map(input=>[input.label||labelize(input.key),values[input.key]||0]),...Object.entries(outputs).map(([k,v])=>[labelize(k),v??""])];download(`${tool.slug}-results.csv`,"text/csv;charset=utf-8",rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n"))}
  return <div className="tool-workspace">
    <div className="tool-workspace-top"><div><Link href="/vault">← TOOL VAULT</Link><small>{String(tool.tool_type||tool.tool_kind||"tool").toUpperCase()}</small></div><div><button className="ghost-action" onClick={downloadAsset}>Download working file</button>{tool.tool_type==="calculator"?<button className="primary-action" onClick={exportResults}>Export results</button>:null}</div></div>
    <section className="tool-title-block"><div><span>TOOL VAULT / {tool.category||"OPERATING ASSET"}</span><h1>{tool.title}</h1><p>{tool.description}</p></div><div className="tool-version"><small>VERSION</small><b>{String(tool.version||1).padStart(2,"0")}</b><span>{tool.access_level==="free"?"OPEN ACCESS":"PROGRAM ACCESS"}</span></div></section>
    {tool.tool_type==="calculator"?<section className="calculator-shell"><div className="calculator-inputs"><small>OPERATING INPUTS</small><h2>Run the numbers.</h2>{(schema.inputs||[]).map(input=><label key={input.key}>{input.label||labelize(input.key)}<div className="calc-input-wrap">{input.type==="currency"?<span>$</span>:null}<input type="number" step="any" value={values[input.key]??""} onChange={e=>setValues(v=>({...v,[input.key]:e.target.value}))}/></div></label>)}</div><div className="calculator-outputs"><small>DECISION OUTPUTS</small><h2>What the economics say.</h2>{Object.entries(outputs).map(([key,value])=><article key={key}><span>{labelize(key)}</span><b>{formatValue(key,value)}</b></article>)}<div className="calculator-rule">Use the outputs to make the decision. A calculator is not a strategy; it is evidence.</div></div></section>:<section className="tool-document"><div className="tool-document-rail"><small>HOW TO USE IT</small><p>Complete the working fields against a real business decision. Download a copy when you need to hand the asset to a partner, team member or reviewer.</p><button className="primary-action" onClick={downloadAsset}>Download asset</button></div><div className="tool-markdown">{String(tool.content_md||"").split("\n").map((line,i)=>line.startsWith("## ")?<h2 key={i}>{line.slice(3)}</h2>:line.startsWith("# ")?<h1 key={i}>{line.slice(2)}</h1>:line.startsWith("- ")?<li key={i}>{line.slice(2)}</li>:line.trim()?<p key={i}>{line.replace(/\*\*/g,"")}</p>:<br key={i}/>)}</div></section>}
  </div>
}
