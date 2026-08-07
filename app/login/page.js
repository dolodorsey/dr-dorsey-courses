import Link from "next/link";
import { LoginPanel } from "../components/StudentActions";

export const dynamic = "force-dynamic";

export default function LoginPage({ searchParams }) {
  const next = searchParams?.next || "/dashboard";
  const product = searchParams?.product || "";
  return <main className="auth-page auth-page-v2">
    <div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>PRIVATE OPERATOR ACCESS</span><span>AUTHORIZED PROFILES ONLY</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagship Index</Link><Link href="/#resources">Tool Vault</Link></div></nav>
    <section className="auth-layout auth-layout-v2"><div><small>OPERATOR ACCESS</small><h1>RETURN TO<br/><em>BUILD MODE.</em></h1><p>Open your Operator Console to continue Plays, complete Builds, clear Stage Gates, access the Tool Vault and advance toward your Operator Credential.</p><div className="auth-proof"><span>PROGRAM ACCESS</span><span>BUILD PROGRESS</span><span>PROOF STANDARD</span></div></div><LoginPanel nextPath={next} productSlug={product} /></section>
  </main>;
}
