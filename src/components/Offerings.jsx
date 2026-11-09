import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { END_TO_END, TOOLS } from '../data'
import { IconChip } from './Icon'

export function Solutions({ onInquire }) {
  const [idx, setIdx] = useState(0)
  const refs = useRef([])
  const item = END_TO_END[idx]

  // Roving keyboard support for the vertical tablist (arrows, Home, End).
  const onKey = (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next = idx
    if (keys[e.key]) next = (idx + keys[e.key] + END_TO_END.length) % END_TO_END.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = END_TO_END.length - 1
    else return
    e.preventDefault()
    setIdx(next)
    refs.current[next]?.focus()
  }

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="section-y bg-mist">
      <div className="container-x">
        <h2 id="solutions-title" className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Two ways to bring automation into your work
        </h2>

        {/* Plain-language comparison of the two product types */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          <div className="bg-white p-7">
            <p className="font-display text-xl font-semibold text-green-deep">End-to-end solutions</p>
            <p className="mt-2 text-ink">Complete software that runs a whole process or financial service, from the first document to the finished working paper.</p>
          </div>
          <div className="bg-white p-7">
            <p className="font-display text-xl font-semibold text-blue-deep">Standalone tools</p>
            <p className="mt-2 text-ink">Focused tools that solve one specific need. Use them on their own, alongside your current way of working.</p>
          </div>
        </div>

        <h3 className="mt-16 font-display text-2xl font-semibold">End-to-end solutions</h3>
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div role="tablist" aria-label="End-to-end solutions" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {END_TO_END.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (refs.current[i] = el)}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === idx}
                aria-controls="solution-panel"
                tabIndex={i === idx ? 0 : -1}
                onClick={() => setIdx(i)}
                className={`shrink-0 rounded-xl border px-4 py-3.5 text-left font-semibold transition-colors lg:w-full ${i === idx ? 'border-navy bg-white text-navy' : 'border-transparent text-ink hover:bg-white'}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div id="solution-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`} className="rounded-2xl border border-line bg-white p-7 md:p-9 lg:col-span-8">
            <h4 className="text-2xl font-semibold">{item.name}</h4>
            {item.audience && <p className="mt-1 text-sm font-medium text-teal-deep">{item.audience}</p>}
            <p className="mt-3 max-w-2xl text-lg text-ink">{item.summary}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-display font-semibold text-green-deep">Endloops prepares</p>
                <ul className="mt-3 space-y-2.5 text-[15px]">
                  {item.prepares.map((p) => (<li key={p} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />{p}</li>))}
                </ul>
              </div>
              <div className="rounded-xl bg-purple/[.07] p-5">
                <p className="font-display font-semibold text-purple-deep">You review and decide</p>
                <p className="mt-3 text-[15px]">{item.you}</p>
              </div>
            </div>
            <button type="button" onClick={() => onInquire(item.name)} className="btn-primary mt-8">
              Ask about {item.name.toLowerCase()} <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Tools({ onInquire }) {
  return (
    <section id="tools" aria-labelledby="tools-title" className="section-y">
      <div className="container-x">
        <div className="max-w-3xl">
          <h2 id="tools-title" className="text-4xl font-semibold leading-tight md:text-5xl">Standalone tools for one job at a time</h2>
          <p className="mt-5 text-lg text-ink">Each tool takes on one repetitive task. Some are already in use and others are in development, and the range will keep growing. Ask us which fits your work today.</p>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.id} className="border-t border-line py-6">
              <div className="flex gap-4">
                <IconChip name={t.icon} tone={t.tone} />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1.5 text-ink">{t.text}</p>
                  <button type="button" onClick={() => onInquire(t.name)} className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-deep hover:underline">
                    Ask about this tool <ArrowRight size={15} aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
