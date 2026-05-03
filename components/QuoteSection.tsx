'use client'
import { useEffect, useRef, useState } from 'react'

const WORDS = "You don't need more YouTube tutorials — you need two days, a room full of peers, and someone who's done it inside real businesses. That's what this workshop is.".split(' ')

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 = section top at viewport bottom, 1 = section bottom at viewport top
      const p = (vh - top) / (vh + height)
      setProgress(Math.min(Math.max(p, 0), 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[60vh] flex items-center py-24 sm:py-36 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040C18 0%, #0A1628 55%, #0D1F3C 100%)' }}
    >
      {/* Subtle top glow — depth only */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Decorative quote mark */}
        <div className="flex justify-center mb-8">
          <svg width="48" height="38" viewBox="0 0 48 38" fill="none" aria-hidden="true">
            <path d="M0 38V21C0 12.2 5.6 5.1 16.8 0L20 5.9C13.6 8.4 10.4 11.8 10 16H20V38H0ZM28 38V21C28 12.2 33.6 5.1 44.8 0L48 5.9C41.6 8.4 38.4 11.8 38 16H48V38H28Z"
              fill="white" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Scroll-driven word reveal */}
        <p className="font-display font-bold text-center leading-relaxed"
          style={{ fontSize: 'clamp(22px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
          {WORDS.map((word, i) => {
            // Each word starts illuminating spread across 25%–75% of scroll progress
            const start = (i / WORDS.length) * 0.5 + 0.25
            const wp = Math.min(Math.max((progress - start) / 0.1, 0), 1)
            return (
              <span
                key={i}
                style={{
                  color: '#FFFFFF',
                  opacity: 0.22 + wp * 0.78,
                  transition: 'opacity 0.15s linear',
                  display: 'inline',
                }}
              >
                {word}{' '}
              </span>
            )
          })}
        </p>

      </div>
    </section>
  )
}
