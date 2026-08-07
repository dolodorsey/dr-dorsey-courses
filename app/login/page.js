import Link from "next/link";
import { LoginPanel } from "../components/StudentActions";

export const dynamic = "force-dynamic";

export default function LoginPage({ searchParams }) {
  const next = searchParams?.next || "/dashboard";
  const product = searchParams?.product || "";
  return <main className="auth-page"><nav className="nav"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link></nav><section className="auth-layout"><div><small>STUDENT ACCESS</small><h1>BUILD MODE.<br/><em>ON.</em></h1><p>Sign in to continue your program, access your implementation vault, submit work, and track certification.</p></div><LoginPanel nextPath={next} productSlug={product} /></section></main>;
}
