import Link from 'next/link'
import { getFaqs, getGlossary, getTemplates, getDocs } from '../lib/tlu'

export const metadata = {
  title: 'Resource Center | The Lifestyle University',
  description: 'FAQs, glossary, templates, operator documents, and implementation tools from The Lifestyle University.',
}

function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-[#080604]/95 backdrop-blur border-b border-[#D4B87A]/10 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-mono text-[10px] tracking-[0.2em] text-[#D4B87A] uppercase">← University</Link>
        <div className="flex gap-4 text-[10px] tracking-[0.12em] uppercase text-[#F5F0E8]/45">
          <Link href="/services" className="hover:text-[#D4B87A]">Services</Link>
          <Link href="/consultations" className="hover:text-[#D4B87A]">Consultations</Link>
        </div>
      </div>
    </nav>
  )
}

export default async function ResourcesPage() {
  const [faqs, glossary, templates, docs] = await Promise.all([getFaqs(), getGlossary(), getTemplates(), getDocs()])

  return (
    <main className="min-h-screen bg-[#080604] text-[#F5F0E8]">
      <Header />
      <section className="px-6 py-20 border-b border-[#D4B87A]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] text-[#D4B87A] uppercase mb-4">Operator Resource Center</p>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-none max-w-4xl">Don’t rebuild what already has a <span className="italic text-[#D4B87A]">system.</span></h1>
          <p className="text-[#F5F0E8]/45 max-w-2xl mt-6 leading-7">Use the vault when you need language, structure, a working document, or a fast answer. Education lives in the courses; implementation lives in the tools.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#D4B87A]/10 border border-[#D4B87A]/10 mt-10 max-w-3xl">
            {[[templates.length,'Templates'],[glossary.length,'Glossary Terms'],[docs.length,'Operator Docs'],[faqs.length,'FAQs']].map(([n,l]) => (
              <div key={l} className="bg-[#080604] p-5"><div className="font-display text-3xl text-[#D4B87A]">{n}</div><div className="text-[9px] tracking-[0.14em] uppercase text-[#F5F0E8]/30">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div><p className="text-[10px] tracking-[0.25em] uppercase text-[#8B7340] mb-2">Template Vault</p><h2 className="font-display text-4xl md:text-5xl font-light">Start from structure.</h2></div>
            <p className="text-xs text-[#080604]/40 max-w-md">Access levels are enforced by the student platform as files are attached. Course-linked tools are already tagged to their matching flagship.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map((item) => (
              <article key={item.slug} className="bg-white border border-[#080604]/10 p-5">
                <div className="flex justify-between gap-4 mb-4"><span className="text-[9px] tracking-[0.16em] uppercase text-[#8B7340]">{item.category}</span><span className="text-[9px] uppercase text-[#080604]/35">{item.access_level}</span></div>
                <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                <p className="text-sm text-[#080604]/55 leading-6">{item.description}</p>
                {item.preview_text && <p className="text-xs text-[#080604]/35 mt-4 italic">{item.preview_text}</p>}
                {item.file_url ? <a href={item.file_url} className="inline-block mt-5 text-xs text-[#8B7340] underline">Open template</a> : <span className="inline-block mt-5 text-[10px] tracking-[0.12em] uppercase text-[#080604]/30">Asset attachment pending</span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="px-6 py-20 border-b border-[#D4B87A]/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4B87A] mb-2">Operator Docs</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-10">Read this before you make it complicated.</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {docs.map((doc) => (
              <details key={doc.slug} className="border border-[#D4B87A]/12 bg-[#0f0d0a] p-5">
                <summary className="cursor-pointer list-none">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#D4B87A]/60">{doc.category} · {doc.access_level}</span>
                  <h3 className="font-display text-2xl mt-2">{doc.title}</h3>
                  <p className="text-sm text-[#F5F0E8]/40 mt-2 leading-6">{doc.summary}</p>
                </summary>
                <div className="mt-5 pt-5 border-t border-[#D4B87A]/10 whitespace-pre-wrap text-sm text-[#F5F0E8]/60 leading-7">{doc.content_md}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="glossary" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#D4B87A] mb-2">Glossary</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-10">Know the language. Move faster.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {glossary.map((term) => (
              <article key={term.slug} className="border border-[#D4B87A]/10 bg-[#0f0d0a] p-5">
                <span className="text-[9px] tracking-[0.14em] uppercase text-[#D4B87A]/55">{term.category}</span>
                <h3 className="font-display text-2xl text-[#D4B87A] mt-1">{term.term}</h3>
                <p className="text-sm leading-6 text-[#F5F0E8]/55 mt-3">{term.definition}</p>
                {term.example && <p className="text-xs leading-5 text-[#F5F0E8]/30 mt-3">Example: {term.example}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-6 py-20 bg-[#F5F0E8] text-[#080604]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B7340] mb-2">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-10">The questions that should not need a call.</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="border border-[#080604]/10 bg-white p-5">
                <summary className="cursor-pointer font-medium flex items-center justify-between gap-4"><span>{faq.question}</span><span className="text-[#8B7340]">+</span></summary>
                <p className="mt-4 text-sm leading-6 text-[#080604]/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
