import { useRef, useState } from 'react'
import { Check, AlertTriangle } from 'lucide-react'
import { STEPS } from '../data'
import { TONES } from './Icon'

const Bar = ({ w = 'w-full', c = 'bg-line' }) => <span className={`block h-2 rounded-full ${c} ${w}`} />

// Small illustrative visuals, one per stage. Content is generic sample data.
function Visual({ id }) {
  if (id === 'read')
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs font-semibold text-ink">Invoice (sample)</p>
          <div className="mt-3 space-y-2.5"><Bar w="w-2/3" /><Bar c="bg-green/40" w="w-full" /><Bar w="w-1/2" /><Bar c="bg-green/40" w="w-3/4" /><Bar w="w-2/5" /><Bar c="bg-green/40" w="w-1/2" /></div>
        </div>
        <dl className="space-y-2 text-sm">
          {[['Supplier', 'Supplier A'], ['Invoice date', '12 Mar'], ['Total', 'AED 12,400']].map(([k, v]) => (
            <div key={k} className="flex justify-between rounded-lg border border-green/40 bg-green/[.07] px-3 py-2.5"><dt className="text-ink">{k}</dt><dd className="font-semibold">{v}</dd></div>
          ))}
        </dl>
      </div>
    )
  if (id === 'compare')
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[['Ledger', ['INV-1042', 'INV-1043', 'INV-1057']], ['Statement', ['INV-1042', 'INV-1043', 'INV-1060']]].map(([t, rows]) => (
          <div key={t} className="rounded-lg border border-line bg-white p-4">
            <p className="text-xs font-semibold text-ink">{t} (sample)</p>
            <ul className="mt-3 space-y-2 text-sm">
              {rows.map((r, i) => (
                <li key={r} className={`flex items-center justify-between rounded-md px-3 py-2 ${i < 2 ? 'bg-teal/10 text-teal-deep' : 'bg-[#FFF1D6] text-[#8A5A00]'}`}>
                  {r}{i < 2 ? <Check size={14} aria-label="matched" /> : <span className="text-xs font-semibold">unmatched</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  if (id === 'check')
    return (
      <ul className="space-y-2.5 text-sm">
        {[['Totals agree with purchase orders', false], ['No duplicate invoices', true], ['Amounts within agreed limits', false], ['All required documents present', false]].map(([r, bad]) => (
          <li key={r} className={`flex items-center justify-between rounded-lg border px-4 py-3 ${bad ? 'border-[#F2D49A] bg-[#FFF8EA]' : 'border-line bg-white'}`}>
            <span>{r}</span>
            {bad ? <span className="flex items-center gap-1.5 font-semibold text-[#8A5A00]"><AlertTriangle size={14} aria-hidden /> Flagged</span> : <span className="flex items-center gap-1.5 font-semibold text-blue-deep"><Check size={14} aria-hidden /> Passed</span>}
          </li>
        ))}
      </ul>
    )
  if (id === 'prepare')
    return (
      <div className="rounded-lg border border-line bg-white p-4">
        <div className="flex items-center justify-between"><p className="text-sm font-semibold">Draft working paper</p><span className="rounded-full bg-blue/10 px-2.5 py-1 text-xs font-semibold text-blue-deep">For review</span></div>
        <div className="mt-4 space-y-3">{[1, 2, 3, 4].map((n) => (<div key={n} className="flex items-center gap-3"><Bar w="w-1/2" /><Bar w="w-1/4" c="bg-blue/25" /><Bar w="w-1/6" /></div>))}</div>
      </div>
    )
  return (
    <div className="rounded-lg border border-purple/30 bg-purple/[.06] p-6 text-center">
      <p className="font-display text-xl font-semibold text-purple-deep">Awaiting your sign-off</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink">Flagged items, matched records and the draft are in front of you. Nothing is final until you decide.</p>
    </div>
  )
}

export default function HowItWorks() {
  const [idx, setIdx] = useState(0)
  const refs = useRef([])
  const step = STEPS[idx]
  const t = TONES[step.tone]

  const onKey = (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    const n = (idx + d + STEPS.length) % STEPS.length
    setIdx(n)
    refs.current[n]?.focus()
  }

  return (
    <section id="how" aria-labelledby="how-title" className="section-y bg-mist">
      <div className="container-x">
        <h2 id="how-title" className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">From documents to a decision you can stand behind</h2>
        <p className="mt-5 max-w-2xl text-lg text-ink">Select a stage to see what Endloops does and where you take over.</p>

        <div className="mt-10 rounded-2xl border border-line bg-white p-5 md:p-8">
          <div role="tablist" aria-label="How Endloops works" onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (refs.current[i] = el)}
                role="tab"
                id={`step-${s.id}`}
                aria-selected={i === idx}
                aria-controls="step-panel"
                tabIndex={i === idx ? 0 : -1}
                onClick={() => setIdx(i)}
                className={`relative shrink-0 rounded-lg px-4 py-2.5 text-[15px] font-semibold transition-colors ${i === idx ? 'bg-navy text-white' : 'text-ink hover:bg-mist'}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-${step.id}`} className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className={`font-display text-3xl font-semibold ${t.text}`}>{step.name}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink">{step.text}</p>
            </div>
            <Visual id={step.id} />
          </div>
        </div>
      </div>
    </section>
  )
}
