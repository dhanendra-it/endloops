import { NAV } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="#top" aria-label="Endloops, back to top"><img src="/logo.png" alt="Endloops" width="439" height="127" className="h-8 w-auto" loading="lazy" /></a>
          <p className="mt-4 max-w-sm text-[15px] text-ink">Automation for accountants, auditors, finance teams and property management companies. Based in Dubai.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <p className="font-display font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-[15px] text-ink">
            {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-navy hover:underline">{n.label}</a></li>)}
            <li><a href="#contact" className="hover:text-navy hover:underline">Request a demo</a></li>
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="font-display font-semibold">Our background</p>
          <p className="mt-3 text-[15px] text-ink">Endloops grew out of the technology department of Alkazim, an accounting and audit firm in Dubai.</p>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-line pt-6 text-[13px] text-ink">© 2026 Endloops. All rights reserved.</div>
    </footer>
  )
}
