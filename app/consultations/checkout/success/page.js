import Link from "next/link";
import { ConsultationCheckoutSuccess } from "../../../components/ConsultationActions";
import "../../consultations.module.css";

export const dynamic = "force-dynamic";

export default async function ConsultationSuccessPage({searchParams}){
  const query=await searchParams;
  const sessionId=query?.session_id||"";
  return <main className="consult-success-shell"><div style={{width:"100%",maxWidth:900}}><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><ConsultationCheckoutSuccess sessionId={sessionId}/></div></main>;
}
