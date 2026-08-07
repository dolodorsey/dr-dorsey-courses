"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LMS_FUNCTION } from "../lib/tlu";

const SESSION_KEY = "tlu_session";
function readSession(){try{const s=JSON.parse(localStorage.getItem(SESSION_KEY)||"null");if(!s)return null;if(s.refresh_token||(s.access_token&&s.access_token!=="cookie-session")){localStorage.removeItem(SESSION_KEY);return null}return s.authenticated||s.access_token?{authenticated:true,access_token:"cookie-session",user:s.user||null}:null}catch{return null}}
async function invoke(token,body){const res=await fetch(LMS_FUNCTION,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const data=await res.json().catch(()=>({}));if(!res.ok){if(res.status===401){localStorage.removeItem(SESSION_KEY);window.location.href=`/login?next=${encodeURIComponent(window.location.pathname)}`}throw new Error(data?.error||"Tool request failed")}return data}
function download(name,type,content){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}
function labelize(key){return String(key).replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase())}
function number(values,key){const value=Number(values[key]||0);return Number.isFinite(value)?value:0}
function safeDivide(a,b){return b===0?0:a/b}
function pct(a,b){return safeDivide(a,b)*100}
function currency(value){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(value||0)}
function formatValue(output,value){if(value===null||Number.isNaN(value))return "—";const format=output?.format||((output?.key||"").includes("pct")?"percent":"number");if(format==="currency")return currency(value);if(format==="percent")return `${Number(value).toFixed(1)}%`;if(format==="integer")return new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(value);if(format==="multiple")return `${Number(value).toFixed(2)}×`;return new Intl.NumberFormat("en-US",{maximumFractionDigits:2}).format(value)}

function calculateOutputs(schema,values){
  const type=schema?.calculator_type||"generic_profit";
  const v=(key)=>number(values,key);
  switch(type){
    case "event_break_even": {
      const other=v("table_revenue")+v("sponsor_revenue")+v("bar_share_revenue");
      const ticketRevenue=v("paid_attendees")*v("avg_ticket_price");
      const grossRevenue=ticketRevenue+other;
      const totalCost=v("fixed_costs")+v("paid_attendees")*v("per_attendee_cost");
      const profit=grossRevenue-totalCost;
      const contribution=v("avg_ticket_price")-v("per_attendee_cost");
      return {ticket_revenue:ticketRevenue,gross_revenue:grossRevenue,total_cost:totalCost,projected_profit:profit,margin_pct:pct(profit,grossRevenue),break_even_attendees:contribution<=0?null:Math.max(0,(v("fixed_costs")-other)/contribution),revenue_per_attendee:safeDivide(grossRevenue,v("paid_attendees"))};
    }
    case "event_pnl": {
      const totalRevenue=v("ticket_revenue")+v("table_revenue")+v("sponsor_revenue")+v("bar_revenue")+v("other_revenue");
      const totalExpenses=v("venue_cost")+v("talent_cost")+v("production_cost")+v("marketing_cost")+v("staffing_security_cost")+v("other_costs");
      const profit=totalRevenue-totalExpenses;
      return {total_revenue:totalRevenue,total_expenses:totalExpenses,net_profit:profit,margin_pct:pct(profit,totalRevenue),roi_pct:pct(profit,totalExpenses)};
    }
    case "nightlife_pnl": {
      const totalRevenue=v("cover_revenue")+v("table_revenue")+v("bar_share_revenue")+v("sponsor_revenue")+v("other_revenue");
      const totalExpenses=v("venue_cost")+v("talent_cost")+v("promo_commissions")+v("staffing_security")+v("marketing")+v("other_costs");
      const profit=totalRevenue-totalExpenses;
      return {total_revenue:totalRevenue,total_expenses:totalExpenses,net_profit:profit,margin_pct:pct(profit,totalRevenue),expense_ratio_pct:pct(totalExpenses,totalRevenue)};
    }
    case "table_pricing": {
      const targetMargin=Math.min(Math.max(v("desired_margin_pct")/100,0),0.95);
      const baseMinimum=targetMargin>=1?0:safeDivide(v("package_cost"),1-targetMargin);
      const allIn=baseMinimum*(1+v("tax_service_pct")/100);
      return {base_minimum:baseMinimum,all_in_minimum:allIn,minimum_per_guest:safeDivide(allIn,v("table_capacity")),gross_profit_per_table:baseMinimum-v("package_cost"),projected_night_revenue:allIn*v("expected_table_sales")};
    }
    case "venue_deal": {
      const shareCost=v("projected_revenue")*v("venue_share_pct")/100;
      const rentProfit=v("projected_revenue")-v("direct_event_costs")-v("fixed_rent");
      const shareProfit=v("projected_revenue")-v("direct_event_costs")-shareCost;
      return {venue_share_cost:shareCost,rent_model_profit:rentProfit,share_model_profit:shareProfit,better_deal_savings:Math.abs(rentProfit-shareProfit),rent_profit_margin_pct:pct(rentProfit,v("projected_revenue")),share_profit_margin_pct:pct(shareProfit,v("projected_revenue"))};
    }
    case "food_cost": {
      const base=v("ingredient_cost")+v("packaging_cost");
      const adjusted=base*(1+v("waste_pct")/100);
      const labor=v("labor_minutes")/60*v("labor_rate_hour");
      return {adjusted_food_cost:adjusted,food_cost_pct:pct(adjusted,v("menu_price")),gross_profit_before_labor:v("menu_price")-adjusted,contribution_after_labor:v("menu_price")-adjusted-labor,suggested_price_30pct:safeDivide(adjusted,0.30)};
    }
    case "restaurant_pnl": {
      const expenses=v("food_cost")+v("labor_cost")+v("occupancy_cost")+v("marketing")+v("utilities")+v("delivery_fees")+v("other_operating_costs");
      const profit=v("monthly_sales")-expenses;
      return {total_expenses:expenses,operating_profit:profit,operating_margin_pct:pct(profit,v("monthly_sales")),prime_cost_pct:pct(v("food_cost")+v("labor_cost"),v("monthly_sales")),occupancy_pct:pct(v("occupancy_cost"),v("monthly_sales"))};
    }
    case "landed_margin": {
      const landed=v("product_cost")+v("freight_per_unit")+v("duty_per_unit")+v("packaging_per_unit");
      const paymentFee=v("retail_price")*v("payment_fee_pct")/100;
      const variable=landed+paymentFee;
      const profit=v("retail_price")-variable;
      return {landed_cost_before_fees:landed,payment_fee:paymentFee,total_variable_cost:variable,gross_profit_per_unit:profit,gross_margin_pct:pct(profit,v("retail_price")),markup_multiple:safeDivide(v("retail_price"),landed)};
    }
    case "service_pricing": {
      const labor=v("delivery_hours")*v("labor_cost_hour");
      const loadedLabor=labor*(1+v("overhead_pct")/100);
      const internalCost=loadedLabor+v("pass_through_costs");
      const targetMargin=Math.min(Math.max(v("desired_margin_pct")/100,0),0.95);
      const price=targetMargin>=1?0:safeDivide(internalCost,1-targetMargin);
      return {internal_delivery_cost:internalCost,recommended_price:price,gross_profit:price-internalCost,effective_hourly_rate:safeDivide(price,v("delivery_hours")),target_margin_pct:pct(price-internalCost,price)};
    }
    case "venue_monthly_pnl": {
      const revenue=v("private_event_revenue")+v("ticketed_event_revenue")+v("bar_revenue")+v("rental_revenue")+v("other_revenue");
      const expenses=v("payroll")+v("occupancy")+v("entertainment")+v("marketing")+v("security")+v("utilities")+v("other_expenses");
      const profit=revenue-expenses;
      return {total_revenue:revenue,total_expenses:expenses,operating_profit:profit,operating_margin_pct:pct(profit,revenue),revenue_to_occupancy_multiple:safeDivide(revenue,v("occupancy"))};
    }
    case "revenue_per_hour": {
      const profit=v("event_revenue")-v("direct_costs");
      return {revenue_per_hour:safeDivide(v("event_revenue"),v("event_hours")),profit_per_hour:safeDivide(profit,v("event_hours")),revenue_per_guest:safeDivide(v("event_revenue"),v("attendance")),event_profit:profit,event_margin_pct:pct(profit,v("event_revenue"))};
    }
    default: {
      const grossRevenue=v("units")*v("price")+v("other_revenue");
      const totalCost=v("fixed_costs")+v("units")*v("variable_cost");
      const profit=grossRevenue-totalCost;
      return {gross_revenue:grossRevenue,total_cost:totalCost,profit,margin_pct:pct(profit,grossRevenue),break_even_units:v("price")<=v("variable_cost")?null:safeDivide(v("fixed_costs"),v("price")-v("variable_cost"))};
    }
  }
}

export default function ToolWorkspace({ toolSlug }){
  const [tool,setTool]=useState(null);const [error,setError]=useState("");const [values,setValues]=useState({});
  useEffect(()=>{const session=readSession();if(!session?.access_token){window.location.href=`/login?next=/vault/${toolSlug}`;return}invoke(session.access_token,{action:"template",template_slug:toolSlug}).then(d=>setTool(d.template)).catch(e=>setError(e.message))},[toolSlug]);
  const schema=tool?.template_schema||{};
  const outputs=useMemo(()=>tool?.tool_type==="calculator"?calculateOutputs(schema,values):{},[tool,schema,values]);
  if(error)return <div className="status-card error"><small>TOOL VAULT ACCESS</small><h2>{error}</h2><Link href="/vault">Return to Tool Vault →</Link></div>;
  if(!tool)return <div className="status-card loading-card"><small>TOOL VAULT</small><h2>Opening operating asset…</h2></div>;
  function downloadAsset(){download(tool.download_filename||`${tool.slug}.md`,"text/markdown;charset=utf-8",tool.content_md||"")}
  function exportResults(){const rows=[["FIELD","VALUE"],...(schema.inputs||[]).map(input=>[input.label||labelize(input.key),values[input.key]||0]),...(schema.outputs||[]).map(output=>[output.label||labelize(output.key),outputs[output.key]??""])];download(`${tool.slug}-results.csv`,"text/csv;charset=utf-8",rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n"))}
  return <div className="tool-workspace">
    <div className="tool-workspace-top"><div><Link href="/vault">← TOOL VAULT</Link><small>{String(tool.tool_type||tool.tool_kind||"tool").toUpperCase()}</small></div><div><button className="ghost-action" onClick={downloadAsset}>Download working file</button>{tool.tool_type==="calculator"?<button className="primary-action" onClick={exportResults}>Export results</button>:null}</div></div>
    <section className="tool-title-block"><div><span>TOOL VAULT / {tool.category||"OPERATING ASSET"}</span><h1>{tool.title}</h1><p>{tool.description}</p></div><div className="tool-version"><small>VERSION</small><b>{String(tool.version||1).padStart(2,"0")}</b><span>{tool.access_level==="free"?"OPEN ACCESS":"PROGRAM ACCESS"}</span></div></section>
    {tool.tool_type==="calculator"?<section className="calculator-shell"><div className="calculator-inputs"><small>OPERATING INPUTS</small><h2>Run the real model.</h2>{(schema.inputs||[]).map(input=><label key={input.key}>{input.label||labelize(input.key)}<div className="calc-input-wrap">{input.type==="currency"?<span>$</span>:null}<input type="number" step="any" value={values[input.key]??""} onChange={e=>setValues(v=>({...v,[input.key]:e.target.value}))}/>{input.type==="percent"?<span>%</span>:null}</div></label>)}</div><div className="calculator-outputs"><small>DECISION OUTPUTS</small><h2>What the economics say.</h2>{(schema.outputs||Object.keys(outputs).map(key=>({key}))).map(output=><article key={output.key}><span>{output.label||labelize(output.key)}</span><b>{formatValue(output,outputs[output.key])}</b></article>)}<div className="calculator-rule">Use the outputs to make the decision. A calculator is not a strategy; it is evidence.</div></div></section>:<section className="tool-document"><div className="tool-document-rail"><small>HOW TO USE IT</small><p>Complete this against a real operating decision. Download the finished working file when it is ready to hand to a partner, team member, or reviewer.</p><button className="primary-action" onClick={downloadAsset}>Download asset</button></div><div className="tool-markdown">{String(tool.content_md||"").split("\n").map((line,i)=>line.startsWith("## ")?<h2 key={i}>{line.slice(3)}</h2>:line.startsWith("# ")?<h1 key={i}>{line.slice(2)}</h1>:line.startsWith("- ")?<li key={i}>{line.slice(2)}</li>:line.trim()?<p key={i}>{line.replace(/\*\*/g,"")}</p>:<br key={i}/>)}</div></section>}
  </div>
}
