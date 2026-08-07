import './globals.css'
import './premium.css'

export const metadata = {
  title: 'The Lifestyle University | Operator Education',
  description: 'Premium operator education for founders, curators, creators and executives building revenue systems across culture, hospitality, media, products, services and technology.',
  openGraph: {
    title: 'The Lifestyle University | Build What Pays',
    description: '10 flagship operator programs. 320 Plays. Stage Gates, Proof Builds, Tool Vaults and proof-based Operator Credentials.',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  )
}
