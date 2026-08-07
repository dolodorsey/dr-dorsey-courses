import { ImageResponse } from "next/og";
import { getCredential } from "../../lib/tlu";

export const runtime = "edge";
export const alt = "The Lifestyle University Operator Credential";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const c = await getCredential(params.certificateNumber).catch(() => null);
  if (!c) return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#090805",color:"#f4efe5",fontSize:54}}>Credential not found</div>, size);
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"linear-gradient(135deg,#090805,#171109 68%,#2a1d0c)",color:"#f4efe5",padding:"64px 72px",border:"18px solid #0c0a07"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid #7d6030",paddingBottom:28}}><div style={{display:"flex",flexDirection:"column",gap:10}}><span style={{fontSize:22,fontWeight:800}}>THE LIFESTYLE UNIVERSITY</span><span style={{fontSize:13,letterSpacing:5,color:"#cfa85d"}}>OPERATOR CREDENTIAL</span></div><div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}><span style={{fontSize:16,fontWeight:800,color:c.status==="verified"?"#d8b66e":"#e17b67"}}>{c.status==="verified"?"VERIFIED":"REVOKED"}</span><span style={{fontSize:11,color:"#9f9688"}}>PROOF-BASED RECORD</span></div></div>
    <div style={{display:"flex",flexDirection:"column",gap:14}}><span style={{fontSize:14,letterSpacing:3,color:"#9f9688"}}>OPERATOR</span><span style={{fontFamily:"serif",fontSize:60}}>{c.operator_name}</span><span style={{fontSize:14,letterSpacing:3,color:"#9f9688",marginTop:14}}>FLAGSHIP COMPLETED</span><span style={{fontFamily:"serif",fontSize:46,color:"#d8b66e"}}>{c.program_title}</span></div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderTop:"1px solid #47391f",paddingTop:24}}><div style={{display:"flex",flexDirection:"column",gap:8}}><span style={{fontSize:14}}>{c.certificate_number}</span><span style={{fontSize:11,color:"#857d72"}}>Stages → Plays → Builds → Gates → Proof Build → Credential</span></div><div style={{fontSize:15,color:"#cfa85d"}}>VERIFY · THELIFESTYLEUNIVERSITY.COM</div></div>
  </div>, size);
}
