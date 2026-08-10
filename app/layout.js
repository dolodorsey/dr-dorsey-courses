import './globals.css'
import './premium.css'
import './platform.css'
import './ops-v3.css'
import './media.css'

export const metadata = {
  title: 'The Lifestyle University | Operator Education',
  description: 'Premium operator education for founders, curators, creators and executives building revenue systems across culture, hospitality, media, products, services and technology.',
  openGraph: {
    title: 'The Lifestyle University | Build What Pays',
    description: '10 flagship operator programs. 320 Plays. Stage Gates, Proof Builds, Tool Vaults and proof-based Operator Credentials.',
    type: 'website',
  }
}

const legacySessionCleanup = `try{const k='tlu_session';const s=JSON.parse(localStorage.getItem(k)||'null');if(s&&(s.refresh_token||(s.access_token&&s.access_token!=='cookie-session'))){localStorage.removeItem(k)}}catch(e){try{localStorage.removeItem('tlu_session')}catch(_){}}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: legacySessionCleanup }} /></head>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  )
}
