import { CAPABILITIES, WHY } from '../data'
import { IconChip } from './Icon'

export function Capabilities() {
  return (
    <section id="technology" aria-labelledby="tech-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="tech-title" className="text-4xl font-semibold leading-tight">What the technology does</h2>
          <p className="mt-5 text-lg text-ink">Five capabilities sit underneath every Endloops product, so the same careful checks apply whether you use one tool or a full solution.</p>
        </div>
        <ul className="lg:col-span-8">
          {CAPABILITIES.map((c) => (
            <li key={c.name} className="flex gap-5 border-t border-line py-6 first:border-t-0 first:pt-0">
              <IconChip name={c.icon} tone={c.tone} />
              <div>
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <p className="mt-1 max-w-xl text-ink">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="pb-20 md:pb-28">
      <div className="container-x">
        <div className="rounded-3xl bg-navy px-6 py-14 text-white md:px-14 md:py-20">
          <h2 id="why-title" className="max-w-3xl text-4xl font-semibold leading-tight !text-white md:text-5xl">
            Reliability and clarity matter as much as speed.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">Finance work is detailed and time-sensitive. We build tools you can check, understand and trust.</p>
          <dl className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {WHY.map((w) => (
              <div key={w.title} className="border-t border-white/20 pt-5">
                <dt className="font-display text-xl font-semibold">{w.title}</dt>
                <dd className="mt-2 text-white/75">{w.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
