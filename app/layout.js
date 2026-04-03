import './globals.css'

export const metadata = {
  title: 'Dr. Dorsey Courses | The Lifestyle University',
  description: 'Real operator-level courses on events, hospitality, branding, automation, and e-commerce. Built from experience, not theory. 10 Industry Schools. 6 Founding Colleges.',
  openGraph: {
    title: 'Dr. Dorsey Courses | The Lifestyle University',
    description: 'Real courses on the things Dr. Dorsey has actually built. Events, hospitality, branding, automation, e-commerce. Not theory. Receipts.',
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
