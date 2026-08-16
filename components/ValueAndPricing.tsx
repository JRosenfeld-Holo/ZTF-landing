'use client'
import { useReveal } from '@/hooks/useReveal'

const items = [
  { label: '2-Day In-Person Workshop', value: '$1,400', highlight: true },
  { label: '90-Day AI Implementation Plan', value: '$500' },
  { label: 'All Workshop Materials & Resources', value: '$297' },
  { label: 'Catered Lunch (Both Days)', value: '$120' },
  { label: '30-Day Community Access', value: '$199' },
  { label: 'Post-Workshop Email Support', value: '$250' },
  { label: 'Recorded Session Replays', value: '$197' },
  { label: 'Bonus: AI Prompt Library (100+ prompts)', value: '$184' },
]

const includes = [
  'Both days of in-person training (October 21–22)',
  'Catered lunch both days + coffee all day',
  'All workshop materials and AI Prompt Library (100+ prompts)',
  'Personalized 90-day AI implementation roadmap',
  '30 days of community access post-workshop',
  'Session replay recordings',
  'Post-workshop email support',
]

export default function ValueAndPricing({ onOpenQuiz, seatsRemaining = 28 }: { onOpenQuiz: () => void; seatsRemaining?: number }) {
  const ref = useReveal()
  const seatsLeft = seatsRemaining
  const seatsClaimed = 40 - seatsLeft

  return (
    <section id="pricing" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#F8FAFC' }}>
      <div ref={ref} className="reveal max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="section-label" style={{ display: 'inline-flex' }}>Pricing</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Reserve Your Seat
          </h2>
        </div>

        {/* 50/50 grid — items-stretch ensures equal column heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-stretch">

          {/* LEFT — Everything You Get */}
          <div className="flex flex-col">
            <div className="card-premium flex-1 flex flex-col">
              <div className="glass rounded-[23px] overflow-hidden flex-1 flex flex-col">

                {/* Card header (mirrors early bird banner height) */}
                <div className="px-7 py-3.5 flex items-center justify-between"
                  style={{ background: 'rgba(37,99,235,0.04)', borderBottom: '1px solid rgba(37,99,235,0.1)' }}>
                  <p className="font-display font-bold text-lg" style={{ color: '#0A2540' }}>Everything You Get</p>
                  <p className="text-sm font-medium" style={{ color: '#697386' }}>
                    Value: <span className="font-semibold" style={{ color: '#2563EB' }}>$3,147</span>
                  </p>
                </div>

                {/* Items — flex-1 so this area grows */}
                <div className="flex-1">
                  {items.map((item, i) => (
                    <div key={item.label}
                      className={`flex items-center justify-between px-5 sm:px-7 py-4 ${i < items.length - 1 ? 'border-b' : ''}`}
                      style={{ borderColor: 'rgba(0,0,0,0.04)', background: item.highlight ? 'rgba(37,99,235,0.05)' : 'transparent' }}>
                      <div className="flex items-center gap-3.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[13px] sm:text-[15px] leading-snug" style={{ color: item.highlight ? '#1D4ED8' : '#425466' }}>{item.label}</span>
                      </div>
                      <span className="font-display font-semibold text-[13px] sm:text-[15px] flex-shrink-0 ml-3 sm:ml-4" style={{ color: item.highlight ? '#3B82F6' : '#697386' }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Total row — pinned to bottom */}
                <div className="px-5 sm:px-7 py-6" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.08))', borderTop: '1px solid rgba(37,99,235,0.2)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm" style={{ color: '#697386' }}>Total Value</span>
                    <span className="font-medium line-through" style={{ color: '#697386' }}>$3,147</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-xl" style={{ color: '#0A2540' }}>Your Investment</p>
                      <p className="text-xs mt-0.5" style={{ color: '#059669' }}>You save $2,450 (78% off)</p>
                    </div>
                    <span className="font-display font-bold text-4xl gradient-text">$697</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT — Pricing card */}
          <div className="flex flex-col">
            <div className="card-premium flex-1 flex flex-col">
              <div className="glass rounded-[23px] overflow-hidden flex-1 flex flex-col">

                {/* Early bird banner */}
                <div className="text-center py-3.5 text-xs font-bold uppercase tracking-[0.1em]"
                  style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9)', color: '#FFFFFF' }}>
                  Early Bird Rate — Ends October 14
                </div>

                {/* Card body — grows to fill, CTA pushed to bottom */}
                <div className="p-7 md:p-8 flex-1 flex flex-col">

                  {/* Price */}
                  <div className="text-center mb-7">
                    <div className="flex items-baseline justify-center gap-3 mb-1.5">
                      <span className="text-slate-500 line-through text-xl font-medium">$897</span>
                      <span className="font-display font-bold text-6xl" style={{ color: '#0A2540' }}>$697</span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#059669' }}>
                      <span className="mr-1">✓</span>You save $200 with early bird pricing
                    </p>
                  </div>

                  {/* Seat scarcity */}
                  <div className="mb-7 p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)' }}>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span style={{ color: '#425466' }}>{seatsLeft} of 40 seats remaining</span>
                      <span className="font-semibold" style={{ color: '#FB923C' }}>{seatsClaimed} seats claimed</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.05)' }}>
                      <div className="h-full rounded-full"
                        style={{ width: `${(seatsClaimed / 40) * 100}%`, background: 'linear-gradient(90deg, #2563EB, #F97316)', boxShadow: '0 0 8px rgba(249,115,22,0.4)' }} />
                    </div>
                  </div>

                  {/* Includes — grows to fill available space */}
                  <ul className="space-y-3 flex-1">
                    {includes.map(item => (
                      <li key={item} className="flex items-start gap-3 text-[15px] leading-snug" style={{ color: '#425466' }}>
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#2563EB" strokeWidth="1"/>
                          <path d="M5 8l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA — pinned to bottom */}
                  <div className="mt-7">
                    <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center font-display font-bold text-lg text-white py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 32px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.3)' }}
                      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65), 0 8px 24px rgba(6,182,212,0.3), 0 4px 16px rgba(0,0,0,0.2)')}
                      onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45), 0 4px 16px rgba(0,0,0,0.3)')}>
                      Reserve My Seat — $697 →
                    </a>

                    <div className="flex items-center justify-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: '#697386' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <rect x="2" y="5" width="8" height="6" rx="1" stroke="#059669" strokeWidth="1.2"/>
                          <path d="M4 5V3.5a2 2 0 014 0V5" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        Secure checkout
                      </span>
                      <span style={{ color: '#d1d5db' }}>·</span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: '#697386' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M6 1L2 3v3.5C2 9 3.8 10.8 6 11c2.2-.2 4-2 4-4.5V3L6 1z" stroke="#059669" strokeWidth="1.2" strokeLinejoin="round"/>
                          <path d="M4 6l1.5 1.5L8 4.5" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Full refund before July 29
                      </span>
                    </div>

                    <div className="gradient-divider my-5" />

                    <button onClick={onOpenQuiz}
                      className="w-full text-center text-sm py-2 rounded-lg transition-colors cursor-pointer"
                      style={{ color: '#3B82F6' }}
                      onMouseOver={e => (e.currentTarget.style.color = '#1D4ED8')}
                      onMouseOut={e => (e.currentTarget.style.color = '#3B82F6')}>
                      Not sure yet? Check your AI readiness first →
                    </button>

                    <p className="text-center text-xs mt-4" style={{ color: '#697386' }}>
                      October 21–22, 2026 · Frisco, TX · 10am–3:30pm each day
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
