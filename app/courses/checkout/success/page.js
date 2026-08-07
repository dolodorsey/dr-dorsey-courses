import Link from "next/link";
import { CheckoutSuccess } from "../../../components/StudentActions";

export const dynamic = "force-dynamic";

export default function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id || "";
  return <main><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link></nav><section className="success-page"><small>SECURE FULFILLMENT</small><h1>PAYMENT RECEIVED.</h1><CheckoutSuccess sessionId={sessionId} /></section></main>;
}
