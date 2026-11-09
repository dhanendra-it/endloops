import { useCallback, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Solutions, Tools } from './components/Offerings'
import HowItWorks from './components/HowItWorks'
import { Capabilities, Why } from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Tool/solution cards set this so the contact form opens with the right interest selected.
  const [interest, setInterest] = useState('')

  const inquire = useCallback((name) => {
    setInterest(name)
    const el = document.getElementById('contact')
    el?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 450)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Solutions onInquire={inquire} />
        <Tools onInquire={inquire} />
        <HowItWorks />
        <Capabilities />
        <Why />
        <Contact interest={interest} setInterest={setInterest} />
      </main>
      <Footer />
    </>
  )
}
