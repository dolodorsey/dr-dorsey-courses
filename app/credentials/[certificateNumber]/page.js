import Link from "next/link";
import { notFound } from "next/navigation";
import CredentialActions from "../../components/CredentialActions";
import { CREDENTIAL_FUNCTION, getCredential } from "../../lib/tlu";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const route = await params;
  const credential = await getCredential(route.certificateNumber).catch(() => null);
  if (!credential) return { title: "Credential Not Found | The Lifestyle University" };
  return { title: `${credential.operator_name} — ${credential.program_title} | Operator Credential`, description: `Verify ${credential.operator_name}'s proof-based Operator Credential for ${credential.program_title}.`, openGraph: { title: `${credential.operator_name} — Verified Operator Credential`, description: `${credential.program_title} · The Lifestyle University`, images: [`/credentials/${encodeURIComponent(route.certificateNumber)}/opengraph-image`] } };
}

export default async function CredentialPage({ params }) {
  const route = await params;
  const credential = await getCredential(route.certificateNumber); if (!credential) notFound();
  const issued = new Date(credential.issued_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return <main className="site-shell credential-page"><div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>PUBLIC CREDENTIAL VERIFICATION</span><span>{credential.status === "verified" ? "VERIFIED" : "REVOKED"}</span></div><nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagships</Link><Link href="/vault">Tool Vault</Link><Link className="console-link" href="/dashboard">Operator Console</Link></div></nav>
  <section className={`credential-sheet ${credential.status}`}><div className="credential-watermark">TLU</div><div className="credential-sheet-top"><div><small>THE LIFESTYLE UNIVERSITY</small><span>OPERATOR CREDENTIAL</span></div><div className="credential-verify-badge"><b>{credential.status === "verified" ? "VERIFIED" : "REVOKED"}</b><small>PROOF-BASED RECORD</small></div></div><div className="credential-main"><small>THIS CREDENTIAL CONFIRMS THAT</small><h1>{credential.operator_name}</h1><p>has met the published proof standard for</p><h2>{credential.program_title}</h2><span>{credential.school_name}</span></div><div className="credential-data"><article><small>ISSUED</small><b>{issued}</b></article><article><small>CREDENTIAL NUMBER</small><b>{credential.certificate_number}</b></article><article><small>STATUS</small><b>{credential.status.toUpperCase()}</b></article><article><small>PROOF SCORE</small><b>{credential.proof_score == null ? "PASSED" : `${Math.round(Number(credential.proof_score))}%`}</b></article></div><div className="credential-proof-chain"><span>PLAYS</span><i>→</i><span>BUILDS</span><i>→</i><span>STAGE GATES</span><i>→</i><span>PROOF BUILD</span><i>→</i><span>OPERATOR CREDENTIAL</span></div><div className="credential-bottom"><div><span>Dr. Dorsey</span><small>THE LIFESTYLE UNIVERSITY</small></div><div className="credential-qr"><img alt="QR code for credential verification" src={`${CREDENTIAL_FUNCTION}?certificate_number=${encodeURIComponent(credential.certificate_number)}&format=qr`} /><small>SCAN TO VERIFY</small></div></div>{credential.status === "revoked" ? <div className="credential-revoked"><b>CREDENTIAL REVOKED</b><p>{credential.revoke_reason || "This credential is no longer active."}</p></div> : null}</section>
  <section className="credential-verification-panel"><div><small>VERIFICATION RECORD</small><h3>{credential.status === "verified" ? "This credential is active and verified." : "This credential has been revoked."}</h3><p>The public record matches credential number <b>{credential.certificate_number}</b>. The credential represents completion of a private practical business program and is not an academic degree or government license.</p><div className="credential-verification-meta"><span>VERSION {credential.credential_version || 1}</span><span>{credential.verification_count || 1} PUBLIC VERIFICATIONS</span><span>PROOF BUILD REQUIRED</span></div></div><CredentialActions certificateNumber={credential.certificate_number} verificationUrl={credential.verification_url} /></section></main>;
}
