import Link from "next/link";
import { ConsultationCheckoutSuccess } from "../../../components/ConsultationActions";
import "../../consultations.module.css";

export const dynamic = "force-dynamic";

const STRATEGY_ROOM_BOOKING_URL = "https://link.oneelevenatl.com/widget/booking/dr-dorsey-strategy-consultation";

export default async function ConsultationSuccessPage({searchParams}){
  const query=await searchParams;
  const sessionId=query?.session_id||"";
  return <main className="consult-success-shell"><div style={{width:"100%",maxWidth:900}}><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><ConsultationCheckoutSuccess sessionId={sessionId}/><div className="status-card status-card-v2"><small>STRATEGY ROOM SCHEDULING</small><h2>Choose your confirmed scheduling window.</h2><p>Dr. Dorsey Strategy Room availability is maintained Monday–Friday, 10:00 AM–6:00 PM Eastern. Existing calendar conflicts always take priority.</p><a className="primary-action link-button" href={STRATEGY_ROOM_BOOKING_URL}>Open Strategy Room calendar</a></div></div></main>;
}
