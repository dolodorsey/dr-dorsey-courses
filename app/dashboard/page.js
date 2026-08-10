import Link from "next/link";
import { StudentDashboard } from "../components/StudentActions";
import OperatorLogout from "../components/OperatorLogout";
import { MEDIA, layeredBackground } from "../lib/media";

export default function DashboardPage() {
  return <main className="site-shell console-page">
    <div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>PRIVATE OPERATOR ENVIRONMENT</span><span>BUILD · MEASURE · ADVANCE</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagship Index</Link><Link href="/vault">Tool Vault</Link><Link className="console-link" href="/dashboard">Operator Console</Link><OperatorLogout /></div></nav>
    <section className="portal-hero portal-hero-v2 media-dashboard-hero" style={layeredBackground(MEDIA.dashboardWelcome,"linear-gradient(90deg,rgba(5,8,18,.94),rgba(5,8,18,.72) 58%,rgba(5,8,18,.4))")}><div><small>OPERATOR CONSOLE</small><h1>YOUR BUILD<br/><em>PORTFOLIO.</em></h1></div><p>Programs, Build Progress, system recommendations and proof milestones—organized around what moves next.</p></section>
    <section className="dashboard-visual-band" style={layeredBackground(MEDIA.dashboardProgress,"linear-gradient(90deg,rgba(6,9,20,.88),rgba(6,9,20,.52))")}><div><small>PROGRESS COMMAND</small><h2>TRACK THE PLAYS.<br/>CLEAR THE GATES.</h2><p>Every completed Build should move you closer to proof—not just completion.</p></div></section>
    <section className="section dashboard-section"><StudentDashboard /></section>
  </main>;
}
