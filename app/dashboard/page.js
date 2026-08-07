import Link from "next/link";
import { StudentDashboard } from "../components/StudentActions";

export default function DashboardPage() {
  return <main><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/">Catalog</Link><Link href="/#resources">Resource Vault</Link></div></nav><section className="portal-hero"><small>STUDENT COMMAND CENTER</small><h1>KEEP BUILDING.</h1><p>Your programs, progress, next-best moves and operating milestones in one place.</p></section><section className="section dashboard-section"><StudentDashboard /></section></main>;
}
