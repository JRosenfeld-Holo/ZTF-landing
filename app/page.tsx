'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ToolsCarousel from '@/components/ToolsCarousel'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Instructor from '@/components/Instructor'
import Curriculum from '@/components/Curriculum'
import WhoIsThisFor from '@/components/WhoIsThisFor'
import ValueStack from '@/components/ValueStack'
import Pricing from '@/components/Pricing'
import Community from '@/components/Community'
import FAQ from '@/components/FAQ'
import Venue from '@/components/Venue'
import FinalCTA from '@/components/FinalCTA'
import QuizModal from '@/components/QuizModal'
import ToastRegion, { showToast } from '@/components/Toast'

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className="fixed top-0 left-0 z-[200] h-[2px] pointer-events-none"
      style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #2563EB, #0EA5E9, #06B6D4)', transition: 'width 0.1s linear' }}
    />
  )
}

export default function Page() {
  const [quizOpen, setQuizOpen] = useState(false)
  const [seatsRemaining, setSeatsRemaining] = useState(28)
  const [showMobileCta, setShowMobileCta] = useState(false)

  // Social proof: simulate a registration after 60 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSeatsRemaining(prev => {
        const next = prev - 1
        showToast('info', 'New Registration', `Someone in DFW just reserved their seat — ${next} remaining`)
        return next
      })
    }, 60_000)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll position to toggle mobile CTA past hero
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      if (hero) {
        setShowMobileCta(window.scrollY > hero.offsetHeight - 50)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Header onOpenQuiz={() => setQuizOpen(true)} />

      <main>
        <Hero onOpenQuiz={() => setQuizOpen(true)} />
        <ToolsCarousel />
        <Problem />
        <Solution />
<Instructor />
        <Curriculum />
        <WhoIsThisFor />
<ValueStack />
        <Pricing onOpenQuiz={() => setQuizOpen(true)} seatsRemaining={seatsRemaining} />
        <Community />
        <FAQ />
        <Venue />
        <FinalCTA onOpenQuiz={() => setQuizOpen(true)} />
      </main>

      <footer className="relative z-10 py-10 pb-24 md:pb-10 px-6 text-center" style={{ borderTop: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="flex justify-center mb-4">
          <span className="glass-badge glass-badge--indigo">
            <span className="glass-badge__dot" />
            April 21–22, 2026 · Frisco, TX
          </span>
        </div>
        <div className="flex justify-center mb-1">
          <Image src="/logo-nav.webp" alt="Zero to Fluent" width={120} height={47} className="object-contain opacity-60" style={{ height: '28px', width: 'auto' }} />
        </div>
        <p className="text-xs" style={{ color: '#8898aa' }}>
          © 2026 Zero to Fluent. All rights reserved. ·{' '}
          <a href="mailto:hello@zerotofluent.ai" className="transition-colors" style={{ color: '#697386' }}
            onMouseOver={e => (e.currentTarget.style.color = '#425466')}
            onMouseOut={e => (e.currentTarget.style.color = '#697386')}>
            hello@zerotofluent.ai
          </a>
        </p>
      </footer>

      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}

      {/* Mobile sticky CTA */}
      <div className={`mobile-cta-bar md:hidden transition-transform duration-300 ${showMobileCta ? 'translate-y-0' : 'translate-y-[150%]'}`}>
        {/* Urgency copy */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold font-display" style={{ color: '#3B82F6' }}>
            Starts April 21 · Frisco, TX
          </p>
          <p className="text-sm font-bold font-display leading-tight mt-0.5" style={{ color: '#0A2540' }}>
            Only {seatsRemaining} seats remaining
          </p>
        </div>
        {/* Compact buttons */}
        <div className="flex gap-2 flex-shrink-0 items-center">
          <button onClick={() => setQuizOpen(true)}
            className="font-display font-semibold text-xs py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-200"
            style={{ background: 'transparent', border: '1.5px solid rgba(37,99,235,0.45)', color: '#2563EB' }}>
            Take Quiz
          </button>
          <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
            className="font-display font-bold text-xs text-white py-2.5 px-4 rounded-lg"
            style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', boxShadow: '0 2px 12px rgba(37,99,235,0.35)' }}>
            Reserve — $697
          </a>
        </div>
      </div>

      {/* Toast notification system */}
      <ToastRegion />
    </>
  )
}
