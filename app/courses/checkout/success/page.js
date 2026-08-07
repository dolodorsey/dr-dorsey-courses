"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckoutSuccess } from "../../../components/StudentActions";

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  return <main><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link></nav><section className="success-page"><small>SECURE FULFILLMENT</small><h1>PAYMENT RECEIVED.</h1><CheckoutSuccess sessionId={sessionId} /></section></main>;
}
