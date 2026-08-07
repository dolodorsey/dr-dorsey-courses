"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginPanel } from "../components/StudentActions";

export default function LoginPage() {
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const product = params.get("product") || "";
  return <main className="auth-page"><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link></nav><section className="auth-layout"><div><small>STUDENT ACCESS</small><h1>BUILD MODE.<br/><em>ON.</em></h1><p>Sign in to continue your program, access your implementation vault, submit work, and track certification.</p></div><LoginPanel nextPath={next} productSlug={product} /></section></main>;
}
