import Link from "next/link";
import { StudentDashboard } from "../components/StudentActions";
import OperatorLogout from "../components/OperatorLogout";

export default function DashboardPage() {
  return <main className="site-shell console-page">
    <div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>PRIVATE OPERATOR ENVIRONMENT</span><span>BUILD · MEASURE · ADVANCE</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagship Index</Link><Link href="/vault">Tool Vault</Link><Link className="console-link" href="/dashboard">Operator Console</Link><OperatorLogout /></div></nav>
    <section className="portal-hero portal-hero-v2"><div><small>OPERATOR CONSOLE</small><h1>YOUR BUILD<br/><em>PORTFOLIO.</em></h1></div><p>Programs, Build Progress, system recommendations and proof milestones—organized around what moves next.</p></section>
    <section className="section dashboard-section"><StudentDashboard /></section>
  </main>;
}
