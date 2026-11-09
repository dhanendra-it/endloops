import { useState } from 'react'
import { Check, AlertTriangle, RotateCcw } from 'lucide-react'
import { AUDIENCE } from '../data'

const ROWS = [
  { id: 1, ref: 'Supplier A · INV-1042', amount: 'AED 12,400', note: 'Matches ledger entry' },
  { id: 2, ref: 'Supplier B · INV-1043', amount: 'AED 8,950', note: 'Matches ledger entry' },
  { id: 3, ref: 'Supplier B · INV-1044', amount: 'AED 8,950', note: 'Possible duplicate of INV-1043', flag: true },
  { id: 4, ref: 'Supplier C · INV-1051', amount: 'AED 21,300', note: 'Total is AED 1,200 above the purchase order', flag: true },
  { id: 5, ref: 'Supplier D · INV-1057', amount: 'AED 4,200', note: 'Matches ledger entry' },
]

function ReviewDesk() {
  const [decisions, setDecisions] = useState({}) // id -> 'accepted' | 'queried'
  const [signed, setSigned] = useState(false)
  const flagged = ROWS.filter((r) => r.flag)
  const open = flagged.filter((r) => !decisions[r.id]).length

  const reset = () => { setDecisions({}); setSigned(false) }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-desk" role="group" aria-label="Interactive example of an invoice review">
      <div className="h-1 w-full bg-gradient-to-r from-green via-teal to-purple" />
      <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
        <div>
          <p className="font-display text-[15px] font-semibold">Invoice check</p>
          <p className="text-[13px] text-ink">Illustrative sample, not client data</p>
        </div>
        <button type="button" onClick={reset} className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium text-ink hover:text-navy">
          <RotateCcw size={14} aria-hidden /> Reset
        </button>
      </div>

      <div className="mx-5 h-1 overflow-hidden rounded-full bg-mist" aria-hidden>
        <div className="scan h-full w-full rounded-full bg-gradient-to-r from-green to-teal" />
      </div>
      <p className="px-5 pb-2 pt-2 text-[13px] text-ink"><span className="font-semibold text-green-deep">Prepared by Endloops:</span> 5 documents read, matched and checked</p>

      <ul className="divide-y divide-line border-t border-line">
        {ROWS.map((r, i) => {
          const d = decisions[r.id]
          return (
            <li key={r.id} className="row-in px-5 py-3.5" style={{ animationDelay: `${0.5 + i * 0.28}s` }}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${r.flag ? (d === 'accepted' ? 'bg-green/15 text-green-deep' : d === 'queried' ? 'bg-purple/15 text-purple-deep' : 'bg-[#FFF1D6] text-[#8A5A00]') : 'bg-green/15 text-green-deep'}`}>
                  {r.flag && !d ? <AlertTriangle size={13} aria-hidden /> : <Check size={14} aria-hidden />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-[14px] font-semibold">{r.ref}</p>
                    <p className="shrink-0 text-[14px] tabular-nums text-ink">{r.amount}</p>
                  </div>
                  <p className="text-[13px] text-ink">
                    {r.note}
                    {d && <span className={`ml-1.5 font-semibold ${d === 'accepted' ? 'text-green-deep' : 'text-purple-deep'}`}>· {d === 'accepted' ? 'Accepted by you' : 'Queried by you'}</span>}
                  </p>
                  {r.flag && !d && (
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => setDecisions((s) => ({ ...s, [r.id]: 'accepted' }))} className="rounded-md border border-line px-3 py-1.5 text-[13px] font-semibold hover:border-green-deep hover:text-green-deep">Accept</button>
                      <button type="button" onClick={() => setDecisions((s) => ({ ...s, [r.id]: 'queried' }))} className="rounded-md border border-line px-3 py-1.5 text-[13px] font-semibold hover:border-purple-deep hover:text-purple-deep">Query with supplier</button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-mist px-5 py-4" aria-live="polite">
        <p className="text-[14px] font-medium">
          {signed ? 'Signed off. The working paper is ready.' : open > 0 ? `${open} ${open === 1 ? 'item needs' : 'items need'} your judgement` : 'All items reviewed. Ready for your sign-off.'}
        </p>
        <button type="button" disabled={open > 0 || signed} onClick={() => setSigned(true)} className="btn bg-purple-deep !py-2 text-white hover:bg-purple disabled:cursor-not-allowed disabled:bg-line disabled:text-ink">
          {signed ? 'Signed off' : 'Sign off'}
        </button>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl">
            Finance work, prepared for your review.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
            Endloops builds automation for accountants, auditors, finance teams and property management companies. The software prepares the work. You review and decide.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Request a demo</a>
            <a href="#solutions" className="btn-ghost">See what we build</a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink" aria-label="Who Endloops is built for">
            {AUDIENCE.map((a) => (
              <li key={a.label} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${a.dot}`} aria-hidden />{a.label}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6"><ReviewDesk /></div>
      </div>
    </section>
  )
}
