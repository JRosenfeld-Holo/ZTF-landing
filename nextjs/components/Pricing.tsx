'use client'
import { useReveal } from '@/hooks/useReveal'

const includes = [
  'Both days of in-person training (April 21–22)',
  'Catered lunch both days + coffee all day',
  'All workshop materials and AI Prompt Library (100+ prompts)',
  'Personalized 90-day AI implementation roadmap',
  '30 days of community access post-workshop',
  'Session replay recordings',
  'Post-workshop email support',
]

export default function Pricing({ onOpenQuiz, seatsRemaining = 28 }: { onOpenQuiz: () => void; seatsRemaining?: number }) {
  const ref = useReveal()
  const seatsLeft = seatsRemaining
  const seatsClaimed = 40 - seatsLeft

  return (
    <section id="pricing" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div ref={ref} className="reveal max-w-lg mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>Pricing</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Reserve Your Seat
          </h2>
        </div>

        {/* Gradient-border premium card */}
        <div className="card-premium">
          <div className="glass rounded-[23px] overflow-hidden">
            {/* Early bird banner */}
            <div className="text-center py-2.5 text-xs font-bold uppercase tracking-[0.1em]"
              style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9)', color: '#FFFFFF' }}>
              Early Bird Rate — Ends April 14
            </div>

            <div className="p-8 md:p-10">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-3 mb-1.5">
                  <span className="text-slate-500 line-through text-xl font-medium">$897</span>
                  <span className="font-display font-bold text-6xl" style={{ color: '#0A2540' }}>$697</span>
                </div>
                <p className="text-sm font-medium" style={{ color: '#059669' }}>
                  <span className="mr-1">✓</span>You save $200 with early bird pricing
                </p>
              </div>

              {/* Seat scarcity */}
              <div className="mb-8 p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <div className="flex justify-between text-xs mb-2.5">
                  <span style={{ color: '#425466' }}>{seatsLeft} of 40 seats remaining</span>
                  <span className="font-semibold" style={{ color: '#FB923C' }}>{seatsClaimed} seats claimed</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.05)' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${(seatsClaimed / 40) * 100}%`, background: 'linear-gradient(90deg, #2563EB, #F97316)', boxShadow: '0 0 8px rgba(249,115,22,0.4)' }} />
                </div>
              </div>

              {/* Includes */}
              <ul className="space-y-3 mb-8">
                {includes.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#425466' }}>
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#2563EB" strokeWidth="1"/>
                      <path d="M5 8l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Primary CTA */}
              <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center font-display font-bold text-lg text-white py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 32px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.3)' }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65), 0 8px 24px rgba(6,182,212,0.3), 0 4px 16px rgba(0,0,0,0.2)')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.3)')}>
                Reserve My Seat — $697 →
              </a>

              <p className="text-center text-xs mt-3" style={{ color: '#697386' }}>
                Secure checkout · 30-day satisfaction guarantee
              </p>

              <div className="gradient-divider my-5" />

              <button onClick={onOpenQuiz}
                className="w-full text-center text-sm py-2 rounded-lg transition-colors cursor-pointer"
                style={{ color: '#3B82F6' }}
                onMouseOver={e => (e.currentTarget.style.color = '#1D4ED8')}
                onMouseOut={e => (e.currentTarget.style.color = '#3B82F6')}>
                Not sure yet? Check your AI readiness first →
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: '#697386' }}>
          April 21–22, 2026 · Frisco, TX · 10am–3:30pm each day
        </p>
      </div>
    </section>
  )
}
