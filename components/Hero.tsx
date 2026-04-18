'use client'
import { useEffect, useState } from 'react'
import NebulaCanvas from './NebulaCanvas'

const PHRASES = [
  'in 2 Days.',
  'without Code.',
  'starting April 21.',
  'in Frisco, TX.',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]

    if (!deleting) {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 32)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % PHRASES.length)
      }
    }
  }, [text, deleting, phraseIdx])

  return (
    <>
      <span className="gradient-text">{text}</span>
      <span className="type-cursor" aria-hidden="true" />
    </>
  )
}

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return <>{count}</>
}

function Countdown() {
  const target = new Date('2026-04-21T10:00:00-05:00').getTime()
  const [time, setTime] = useState({ d: '--', h: '--', m: '--', s: '--' })

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setTime({ d: '0', h: '0', m: '0', s: '0' }); return }
      setTime({
        d: String(Math.floor(diff / 86400000)),
        h: String(Math.floor(diff / 3600000) % 24).padStart(2, '0'),
        m: String(Math.floor(diff / 60000) % 60).padStart(2, '0'),
        s: String(Math.floor(diff / 1000) % 60).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { val: time.d, label: 'Days' },
    { val: time.h, label: 'Hours' },
    { val: time.m, label: 'Mins' },
    { val: time.s, label: 'Secs' },
  ]

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6" aria-label="Countdown to workshop">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl"
            style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.18)', minWidth: '60px' }}>
            <span className="font-display font-bold tabular-nums leading-none"
              style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#0A2540' }}>{u.val}</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] mt-1.5" style={{ color: '#2563EB' }}>{u.label}</span>
          </div>
          {i < 3 && <span className="font-display text-lg font-bold" style={{ color: 'rgba(37,99,235,0.35)' }}>:</span>}
        </div>
      ))}
    </div>
  )
}

export default function Hero({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <section id="hero" className="relative min-h-[85svh] sm:min-h-screen flex items-center justify-center pt-8 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#FFFFFF' }}>
      {/* Hide scroll animation canvas entirely on mobile */}
      <div className="hidden sm:block absolute inset-0">
        <NebulaCanvas />
      </div>

      {/* Desktop radial scrim — lightens center for text legibility */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.1) 75%, transparent 100%)' }} />

      {/* Fade nebula into the white page below */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Live badge */}
        <div className="hidden sm:inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full mb-5 text-sm"
          style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)', backdropFilter: 'blur(12px)' }}>
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#425466' }}>
            <strong style={{ color: '#2563EB' }}>88% of SMBs</strong> <span className="hidden sm:inline">want to use AI — but </span>don&apos;t know <span className="hidden sm:inline">how to </span>start
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.1] tracking-tight mb-4"
          style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.03em' }}>
          <span className="gradient-text">Become AI-Fluent</span>
          <br />
          <Typewriter />
          <br />
          <span style={{ color: '#1e3a5c' }}>In Person.</span>
        </h1>

        {/* Sub */}
        <p className="text-lg leading-relaxed max-w-xl mx-auto mb-6"
          style={{ color: '#425466', lineHeight: '1.75' }}>
          A hands-on workshop for small business owners who want face-to-face guidance learning Claude, ChatGPT, and practical AI automation — not another online course you&apos;ll never finish.
        </p>

        {/* Countdown */}
        <Countdown />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-5">
          <a href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 32px rgba(37,99,235,0.3), 0 4px 16px rgba(0,0,0,0.1)' }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.55), 0 8px 24px rgba(6,182,212,0.3), 0 4px 16px rgba(0,0,0,0.15)')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.3), 0 4px 16px rgba(0,0,0,0.1)')}>
            Reserve My Seat — $697
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <button onClick={onOpenQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold px-8 py-4 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'transparent', border: '1.5px solid rgba(37,99,235,0.35)', color: '#2563EB' }}>
            Check My AI Readiness
          </button>
        </div>

        {/* Social trust */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex -space-x-2">
            {['#2563EB','#8B5CF6','#EC4899','#F97316'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: c, borderColor: '#FFFFFF', zIndex: 4 - i }}>
                {['M','S','D','K'][i]}
              </div>
            ))}
          </div>
          <span className="text-sm" style={{ color: '#697386' }}>
            <strong style={{ color: '#0A2540' }}><CountUp target={12} /> owners</strong> already registered
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 justify-center mb-10">
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l.93 2.86h3.01l-2.44 1.77.93 2.87L7 6.73l-2.43 1.77.93-2.87L3.06 3.86h3.01L7 1z" stroke="#3B82F6" strokeWidth="1.2" strokeLinejoin="round"/></svg>, label: 'Frisco, TX' },
            { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="9" rx="1.5" stroke="#3B82F6" strokeWidth="1.2"/><path d="M5 2v2M9 2v2M2 6h10" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/></svg>, label: 'April 21–22, 2026' },
            { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#3B82F6" strokeWidth="1.2"/><path d="M7 4v3.5l2 1.5" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/></svg>, label: '10am – 3:30pm' },
            { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5h10M2 5v6a1 1 0 001 1h6a1 1 0 001-1V5M5 5V4a2 2 0 014 0v1" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'Lunch Included' },
            { icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l.93 2.86h3.01l-2.44 1.77.93 2.87L7 6.73l-2.43 1.77.93-2.87L3.06 3.86h3.01L7 1z" stroke="#3B82F6" strokeWidth="1.2" strokeLinejoin="round"/></svg>, label: 'Only 40 Seats' },
          ].map(b => (
            <span key={b.label} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#697386' }}>
              {b.icon}
              <span style={{ color: '#425466' }}>{b.label}</span>
            </span>
          ))}
        </div>

        {/* Scroll invitation */}
        <div className="flex justify-center">
          <div className="animate-bounce opacity-40" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 7l6 6 6-6" stroke="#2563EB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
