"use client";

import { useState } from "react";
import { CREDENTIAL_FUNCTION } from "../lib/tlu";

export default function CredentialActions({ certificateNumber, verificationUrl }) {
  const [copied,setCopied]=useState(false);
  async function copy(){await navigator.clipboard.writeText(verificationUrl);setCopied(true);setTimeout(()=>setCopied(false),1800)}
  const encoded=encodeURIComponent(verificationUrl);
  return <div className="credential-actions"><a className="primary-action link-button" href={`${CREDENTIAL_FUNCTION}?certificate_number=${encodeURIComponent(certificateNumber)}&format=pdf`}>Download Credential PDF</a><a className="ghost-action" href={`${CREDENTIAL_FUNCTION}?certificate_number=${encodeURIComponent(certificateNumber)}&format=card`}>Download Social Card</a><button className="ghost-action" onClick={copy}>{copied?"Verification Link Copied ✓":"Copy Verification Link"}</button><a className="text-action" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}>Share on LinkedIn ↗</a><a className="text-action" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent("Verified Operator Credential — The Lifestyle University")}`}>Share on X ↗</a></div>
}
