import Link from "next/link";
import ToolVaultBrowser from "../components/ToolVaultBrowser";
import { getCatalog } from "../lib/tlu";
import { MEDIA, layeredBackground } from "../lib/media";

export const dynamic = "force-dynamic";

export default async function ToolVaultPage() {
  const { templates, courses } = await getCatalog();
  const counts = templates.reduce((acc, tool) => { acc[tool.tool_kind] = (acc[tool.tool_kind] || 0) + 1; return acc; }, {});
  return <main className="site-shell vault-page">
    <div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>THE TOOL VAULT</span><span>{templates.length} OPERATING ASSETS</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagships</Link><Link href="/vault">Tool Vault</Link><Link href="/#consultations">Strategy Room</Link><Link href="/#services">Build Desk</Link><Link className="console-link" href="/dashboard">Operator Console</Link></div></nav>
    <section className="vault-hero media-dashboard-hero" style={layeredBackground(MEDIA.toolVaultExpanded,"linear-gradient(90deg,rgba(5,8,18,.94),rgba(5,8,18,.66) 58%,rgba(5,8,18,.38))")}><div><small>THE TOOL VAULT</small><h1>USE THE ASSET.<br/><em>MOVE THE NUMBER.</em></h1><p>Calculators, workbooks, scorecards, scripts, checklists and operating templates attached to the Flagship systems.</p></div><div className="vault-hero-stats"><article><b>{templates.length}</b><span>Total Assets</span></article><article><b>{counts.calculator || 0}</b><span>Calculators</span></article><article><b>{counts.scorecard || 0}</b><span>Scorecards</span></article><article><b>{counts.workbook || 0}</b><span>Workbooks</span></article><article><b>{counts.script || 0}</b><span>Scripts</span></article><article><b>{counts.checklist || 0}</b><span>Checklists</span></article></div></section>
    <section className="section vault-index"><ToolVaultBrowser tools={templates} courses={courses} /></section>
    <section className="closing closing-v2 media-closing" style={layeredBackground(MEDIA.toolVault,"linear-gradient(180deg,rgba(7,7,7,.7),rgba(7,7,7,.96))")}><small>THE TOOL VAULT</small><h2>THE TOOL ISN’T THE VALUE.<br/><em>THE DECISION IT ENABLES IS.</em></h2><p>Open the asset attached to the constraint you are solving. Complete it, save it, and move back into your Program Build.</p><Link className="primary-action link-button" href="/dashboard">Return to Operator Console</Link></section>
  </main>;
}
