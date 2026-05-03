'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from '@/hooks/useReveal'

/* ─── stat data ─── */
const stats: { num: number; prefix: string; suffix: string; decimals: number; label: string }[] = [
  { num: 85,  prefix: '',  suffix: 'M',  decimals: 0, label: 'Jobs displaced or transformed by AI by 2030' },
  { num: 40,  prefix: '',  suffix: '%',  decimals: 0, label: 'Faster task completion for AI-fluent small businesses' },
  { num: 76,  prefix: '',  suffix: '%',  decimals: 0, label: 'of SMB owners feel behind competitors on AI adoption' },
  { num: 4.4, prefix: '$', suffix: 'T',  decimals: 1, label: 'Annual productivity potential unlocked by AI in business' },
]

/* ─── animated counter hook ─── */
function useCountUp(target: number, decimals: number, started: boolean, duration = 2000) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return
    const t0 = performance.now()

    const tick = (now: number) => {
      const elapsed = now - t0
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [started, target, decimals, duration])

  return value
}

/* ─── individual stat card ─── */
function StatCard({ stat, delay, started }: { stat: typeof stats[0]; delay: number; started: boolean }) {
  const count = useCountUp(stat.num, stat.decimals, started, 2200)
  const formatted = stat.decimals > 0 ? count.toFixed(stat.decimals) : Math.round(count).toString()

  return (
    <div
      className="text-center rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-default ai-stat-card"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <p className="font-display font-bold gradient-text mb-3 leading-none"
        style={{ fontSize: 'clamp(36px,5vw,60px)', letterSpacing: '-0.03em' }}>
        {stat.prefix}{formatted}{stat.suffix}
      </p>
      <p className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {stat.label}
      </p>
    </div>
  )
}

/* ─── main component ─── */
export default function AIStats() {
  const ref = useReveal()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(e => {
      if (e.isIntersecting) setStarted(true)
    })
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [onIntersect])

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040C18 0%, #0A1628 55%, #0D1F3C 100%)' }}>
      {/* Subtle radial glow — depth only, no legibility impact */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />

      <div ref={ref} className="reveal relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(99,179,237,0.3)', color: '#93C5FD' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#60A5FA' }} />
            The Numbers Don&apos;t Lie
          </div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#FFFFFF' }}>
            The AI Gap Is Growing.{' '}
            <span style={{ color: '#38BDF8' }}>Every Month.</span>
          </h2>
          <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            These aren&apos;t predictions. They&apos;re already happening to businesses like yours.
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 150} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
