import { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { END_TO_END, TOOLS, ROLES } from '../data'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Optional: set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to deliver submissions. See README.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!v.email.trim()) e.email = 'Enter your work email.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter an email address like name@company.com.'
  if (!v.company.trim()) e.company = 'Enter your company name.'
  if (!v.role) e.role = 'Choose the option closest to your role.'
  if (v.message.length > 1000) e.message = 'Keep your message under 1,000 characters.'
  return e
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[13px] text-ink">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1 text-[13px] font-medium text-[#B42318]">{error}</p>}
    </div>
  )
}

export default function Contact({ interest, setInterest }) {
  const [v, setV] = useState({ name: '', email: '', company: '', role: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }
  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const submit = async (ev) => {
    ev.preventDefault()
    const found = validate(v)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return formRef.current.querySelector(`#${first}`)?.focus()
    setStatus('sending')
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...v, interest }) })
        if (!res.ok) throw new Error('bad response')
      } else {
        await new Promise((r) => setTimeout(r, 600))
      }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-mist">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-4xl font-semibold leading-tight md:text-5xl">Request a demo</h2>
          <p className="mt-5 text-lg text-ink">Tell us about your work and which products interest you. We will use it to prepare a walkthrough that fits how your team operates.</p>
          <ol className="mt-8 space-y-5">
            {[['Tell us your process', 'Share your role and the work that takes the most time.'], ['See it on your kind of work', 'We show the products that fit, with examples close to your documents.'], ['Decide what suits you', 'Start with one tool or a full solution. The choice is yours.']].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-semibold ring-1 ring-line">{i + 1}</span>
                <div><p className="font-semibold">{t}</p><p className="text-ink">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-white p-6 md:p-9">
            {status === 'sent' ? (
              <div role="status" className="py-8 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green/15 text-green-deep"><Check aria-hidden /></span>
                <h3 className="mt-5 text-2xl font-semibold">Thanks, {v.name.trim().split(' ')[0]}.</h3>
                <p className="mx-auto mt-2 max-w-md text-ink">Your demo request{interest ? ` about ${interest.toLowerCase()}` : ''} has been recorded for {v.email.trim()}.</p>
                <button type="button" onClick={() => { setV({ name: '', email: '', company: '', role: '', message: '' }); setInterest(''); setStatus('idle') }} className="btn-ghost mt-6">Send another request</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name}><input id="name" name="name" autoComplete="name" className="field" value={v.name} onChange={set('name')} {...aria('name')} /></Field>
                <Field id="email" label="Work email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" className="field" value={v.email} onChange={set('email')} {...aria('email')} /></Field>
                <Field id="company" label="Company" error={errors.company}><input id="company" name="company" autoComplete="organization" className="field" value={v.company} onChange={set('company')} {...aria('company')} /></Field>
                <Field id="role" label="Your role" error={errors.role}>
                  <select id="role" name="role" className="field" value={v.role} onChange={set('role')} {...aria('role')}>
                    <option value="">Select</option>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id="interest" label="Interested in" hint="Optional. Choose a solution or tool, or leave as is.">
                    <select id="interest" name="interest" className="field" value={interest} onChange={(e) => setInterest(e.target.value)} aria-describedby="interest-hint">
                      <option value="">Not sure yet</option>
                      <optgroup label="End-to-end solutions">{END_TO_END.map((s) => <option key={s.id}>{s.name}</option>)}</optgroup>
                      <optgroup label="Standalone tools">{TOOLS.map((t) => <option key={t.id}>{t.name}</option>)}</optgroup>
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="Anything we should know?" error={errors.message}>
                    <textarea id="message" name="message" rows={4} className="field" value={v.message} onChange={set('message')} {...aria('message')} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Request a demo'}</button>
                  {status === 'error' && <p role="alert" className="mt-3 text-[14px] font-medium text-[#B42318]">The request did not go through. Check your connection and try again.</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
