import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultationActions } from "../../components/ConsultationActions";
import { getConsultation, money } from "../../lib/tlu";
import "../consultations.module.css";

export const dynamic = "force-dynamic";

const PRODUCT_BY_OFFER = {
  "discovery-call": "consult-discovery-call",
  "strategy-session": "consult-strategy-session",
  "implementation-deep-dive": "consult-implementation-deep-dive-deposit",
  "vip-intensive": "consult-vip-intensive-deposit",
  "private-advisory": "consult-private-advisory-deposit",
  "premium-cohort": "consult-premium-cohort-deposit",
  "elite-mentorship": "consult-elite-mentorship-deposit",
  "mastery-certification": "consult-mastery-certification-deposit"
};

export default async function ConsultationPage({params,searchParams}){
  const route=await params;
  const query=await searchParams;
  const offer=await getConsultation(route.slug);
  if(!offer)notFound();
  const productSlug=PRODUCT_BY_OFFER[offer.slug];
  const includes=Array.isArray(offer.includes)?offer.includes:[];
  const deliverables=Array.isArray(offer.deliverables)?offer.deliverables:[];
  const prep=Array.isArray(offer.preparation_required)?offer.preparation_required:[];
  const accessLabel=offer.requires_application?`${money(offer.deposit_cents)} deposit after approval`:offer.price_label||money(offer.price_cents);

  return <main className="site-shell consultation-detail">
    <div className="utility-strip"><span>THE LIFESTYLE UNIVERSITY</span><span>THE STRATEGY ROOM</span><span>DECIDE WITH CLARITY</span></div>
    <nav className="nav nav-premium"><Link className="brand" href="/"><b>THE LIFESTYLE</b><span>UNIVERSITY</span></Link><div><Link href="/#programs">Flagships</Link><Link href="/vault">Tool Vault</Link><Link href="/#consultations">Strategy Room</Link><Link className="console-link" href="/dashboard">Operator Console</Link></div></nav>
    <section className="consultation-hero">
      <Link className="back-link" href="/#consultations">← STRATEGY ROOM INDEX</Link>
      <div><div className="consultation-kicker">{offer.offer_kind?.replaceAll("_"," ")||"ADVISORY"}</div><h1>{offer.name}</h1><p className="consultation-hero-copy">{offer.transformation_promise||offer.description}</p></div>
      <div className="consultation-investment"><small>{offer.requires_application?"ENGAGEMENT TARGET":"DIRECT ACCESS"}</small><b>{offer.price_label||money(offer.price_cents)}</b><span>{offer.duration_minutes>=1440?"Extended advisory engagement":`${offer.duration_minutes||60} minutes`}</span><span>{offer.requires_application?`Approval unlocks a ${money(offer.deposit_cents)} deposit checkout.`:"Payment confirms the engagement and opens scheduling handoff."}</span></div>
    </section>
    <section className="consultation-body">
      <div>
        <div className="consult-section"><small>BUILT FOR</small><h2>{offer.target_customer||"Operators facing a high-cost decision, bottleneck or growth opportunity."}</h2><p>{offer.description}</p></div>
        {includes.length?<div className="consult-section"><small>WHAT IS INCLUDED</small><h2>The working session.</h2><ul>{includes.map((item,i)=><li key={i}>{item}</li>)}</ul></div>:null}
        {deliverables.length?<div className="consult-section"><small>WHAT YOU LEAVE WITH</small><h2>Concrete operating assets.</h2><ul>{deliverables.map((item,i)=><li key={i}>{item}</li>)}</ul></div>:null}
        {prep.length?<div className="consult-section"><small>PREPARATION</small><h2>Come ready to work.</h2><ul>{prep.map((item,i)=><li key={i}>{item}</li>)}</ul></div>:null}
        <div className="consult-section"><small>ACCESS STANDARD</small><h2>{offer.requires_application?"Qualification before checkout.":"Secure the session directly."}</h2><p>{offer.requires_application?`Applications are reviewed against fit, timing and scope${offer.minimum_qualification_score?` with a ${offer.minimum_qualification_score}+ qualification target`:""}. Once approved, deposit access opens on this page.`:`Current access is ${accessLabel}. Your payment record is tied directly to your Strategy Room engagement.`}</p></div>
      </div>
      <ConsultationActions offer={offer} productSlug={productSlug} resumeProduct={query?.product||""} resumeApplicationId={query?.application||""}/>
    </section>
  </main>;
}
