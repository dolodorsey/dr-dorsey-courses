import Link from "next/link";
import { ConsultationAdminQueue } from "../../components/ConsultationActions";
import "../../consultations/consultations.module.css";

export const dynamic = "force-dynamic";

export default function ConsultationAdminPage(){
  return <main className="consult-admin-shell"><nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/dashboard">Operator Console</Link><Link href="/#consultations">Strategy Room</Link></div></nav><section style={{paddingTop:48}}><div className="section-label">INTERNAL OPERATIONS</div><h1 style={{fontSize:"clamp(42px,6vw,78px)",margin:"12px 0 20px"}}>Strategy Room<br/>Qualification Queue</h1><ConsultationAdminQueue/></section></main>;
}
