'use client'
import { useEffect, useRef, useState } from 'react'

const features = [
  {
    num: '01',
    title: 'Hands-On, Not Lecture',
    desc: "You'll open your laptop and build real prompts from minute one. Every exercise is live — you type, AI responds, you iterate. This isn't a seminar. It's a workshop.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="12" rx="2" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M6 7h8M6 10h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 16l3-4 3 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Built for Business Owners',
    desc: 'Every exercise uses your real business scenarios — not hypothetical Fortune 500 examples. You bring your context. You leave with your solution.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 7h14M3 7v9a1 1 0 001 1h12a1 1 0 001-1V7M3 7l2-4h10l2 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 11h4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'In Person, In Frisco',
    desc: 'Face-to-face instruction in a professional conference room. Ask questions, get immediate answers, and learn alongside your DFW peers.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5"/>
        <circle cx="14" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M1 17c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'From Zero to Fluent',
    desc: "We start from absolute zero. By the end of Day 2, you'll have a personalized 90-day AI implementation roadmap for your specific business.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16L10 4L16 16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 11.5h7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Solution() {
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    )
    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="solution" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: sticky text */}
          <div className="md:sticky md:top-28">
            <div className="section-label mb-6" style={{ display: 'inline-flex' }}>The Solution</div>
            <h2 className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
              Two Days. Face to Face.<br />
              <span className="gradient-text">From Zero to Fluent.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#425466', lineHeight: '1.8' }}>
              Zero to Fluent is a 2-day, in-person AI workshop designed for small business owners in DFW. No tech background required. Just practical, hands-on training you can use Monday morning.
            </p>

            {/* Step dots — desktop only */}
            <div className="hidden md:flex gap-2 mt-10">
              {features.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300"
                  style={{
                    width: activeIdx === i ? 24 : 8,
                    height: 8,
                    background: activeIdx === i ? '#2563EB' : 'rgba(0,0,0,0.08)',
                  }} />
              ))}
            </div>
          </div>

          {/* Right: scrolling feature cards */}
          <div className="flex flex-col gap-5">
            {features.map((f, i) => (
              <div
                key={f.num}
                ref={el => { cardRefs.current[i] = el }}
                className={`sol-card glass rounded-2xl p-7`}
                style={{ border: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}>
                    {f.icon}
                  </div>
                  <p className="text-xs font-bold font-display tracking-widest" style={{ color: 'rgba(37,99,235,0.5)' }}>{f.num}</p>
                </div>
                <h3 className="font-display font-bold text-lg mb-2.5" style={{ color: '#0A2540' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#425466' }}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
