import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV } from '../data'

function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    )
    ids.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [ids])
  return active
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection([...NAV.map((n) => n.id), 'contact'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const link = (id) =>
    `rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-navy ${active === id ? 'text-navy' : 'text-ink'}`

  return (
    <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_1px_0_#E3E8F0]' : ''}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" aria-label="Endloops, back to top" className="shrink-0">
          {/* Logo used exactly as supplied: native aspect ratio, no filters. */}
          <img src="/logo.png" alt="Endloops" width="439" height="127" className="h-8 w-auto" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={link(n.id)} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-primary hidden !py-2.5 sm:inline-flex">Request a demo</a>
          <button
            type="button"
            className="rounded-lg p-2.5 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rounded-md px-2 py-3.5 text-lg font-medium text-navy">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2">Request a demo</a>
          </div>
        </nav>
      )}
    </header>
  )
}
