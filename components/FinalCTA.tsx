'use client'
import { useReveal } from '@/hooks/useReveal'

export default function FinalCTA({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040C18 0%, #0A1628 55%, #0D1F3C 100%)' }}>
      {/* Subtle radial glow for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

      <div ref={ref} className="reveal relative z-10 max-w-2xl mx-auto text-center">
        <p className="font-semibold text-xs uppercase tracking-[0.15em] mb-6" style={{ color: '#93C5FD' }}>
          August 12–13, 2026 · Frisco, TX
        </p>

        <h2 className="font-display font-bold mb-6 leading-tight"
          style={{ fontSize: 'clamp(32px,5.5vw,60px)', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
          48 Hours to Change<br />
          <span style={{ color: '#38BDF8' }}>How You Work Forever.</span>
        </h2>

        <p className="text-lg leading-relaxed mb-12 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Walk out of Frisco with live workflows already running, a personalized 90-day AI plan in hand, and the confidence your competitors are still trying to build. Two days. That&apos;s the distance between where you are and where you want to be.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-8">
          <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-display font-bold text-lg text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 40px rgba(37,99,235,0.5), 0 4px 20px rgba(0,0,0,0.3)', padding: '18px 40px' }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 64px rgba(37,99,235,0.7), 0 0 32px rgba(6,182,212,0.4), 0 8px 24px rgba(0,0,0,0.3)')}
            onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(37,99,235,0.5), 0 4px 20px rgba(0,0,0,0.3)')}>
            Reserve My Seat — $697
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <button onClick={onOpenQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-semibold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)', color: '#FFFFFF', padding: '18px 32px' }}>
            Check My AI Readiness
          </button>
        </div>

        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Only 40 seats · Lunch & materials included · August 12–13 in Frisco, TX
        </p>
      </div>
    </section>
  )
}
