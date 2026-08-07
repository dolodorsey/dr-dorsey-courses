import Link from "next/link";
import { CheckoutSuccess } from "../../../components/StudentActions";

export const dynamic = "force-dynamic";

export default async function SuccessPage({ searchParams }) {
  const query = await searchParams;
  const sessionId = query?.session_id || "";
  return <main><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link></nav><section className="success-page"><small>SECURE FULFILLMENT</small><h1>PAYMENT RECEIVED.</h1><CheckoutSuccess sessionId={sessionId} /></section></main>;
}
