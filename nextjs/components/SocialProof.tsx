'use client'
import { useReveal } from '@/hooks/useReveal'

const testimonials = [
  {
    quote: "I was automating proposals before lunch on Day 1. Genuinely shocked how fast it clicked. I walked out with workflows I'm actually using in my business.",
    name: 'Marcus Reed',
    role: 'Owner, Reed Roofing · Frisco, TX',
    initials: 'MR',
    from: '#2563EB',
    to: '#1D4ED8',
  },
  {
    quote: "My competitors were already using AI and I was falling behind. I left with a clear 90-day plan I'm already executing. Best investment in years.",
    name: 'Sarah Patel',
    role: 'Principal, Patel Financial · Dallas, TX',
    initials: 'SP',
    from: '#60A5FA',
    to: '#8B5CF6',
  },
  {
    quote: "I produce client deliverables in half the time now. The ROI was clear within a week. If you own a business in DFW and haven't done this — do it.",
    name: 'David Williams',
    role: 'Owner, Williams & Co. · Plano, TX',
    initials: 'DW',
    from: '#3B82F6',
    to: '#2563EB',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 14 14" fill="#FBBF24">
          <path d="M7 1.5l1.35 2.74 3.02.44-2.19 2.13.52 3.01L7 8.32l-2.7 1.5.52-3.01L2.63 4.68l3.02-.44L7 1.5z"/>
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-28 px-6" style={{ background: '#FFFFFF' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>Testimonials</div>
          <h2 className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            From Business Owners Like You
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: '#697386' }}>
            Feedback from beta preview attendees who shaped this curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {testimonials.map((t) => (
            <div key={t.name}
              className="glass glass-hover rounded-2xl p-7 flex flex-col"
              style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              <Stars />
              <blockquote className="text-sm leading-relaxed flex-1 mb-7 italic"
                style={{ color: '#425466', fontStyle: 'normal' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-5"
                style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-xs text-white"
                  style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm" style={{ color: '#1e3a5c' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#697386' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { stat: '100%', label: 'Hands-on' },
            { stat: '40', label: 'Max seats' },
            { stat: '90-day', label: 'AI plan included' },
            { stat: '$697', label: 'All-in investment' },
          ].map(s => (
            <div key={s.stat} className="glass rounded-2xl px-7 py-5 text-center min-w-[130px]">
              <p className="font-display font-bold text-2xl gradient-text mb-1">{s.stat}</p>
              <p className="text-xs" style={{ color: '#697386' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
