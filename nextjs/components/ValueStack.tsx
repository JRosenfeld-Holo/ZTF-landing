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

export default function ValueStack() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div ref={ref} className="reveal max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>Total Value</div>
          <h2 className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Everything You Get
          </h2>
          <p style={{ color: '#697386' }}>
            Total value: <span className="font-semibold" style={{ color: '#2563EB' }}>$3,147</span>. Your investment: <span className="font-semibold" style={{ color: '#FB923C' }}>just $697</span>.
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div key={item.label}
              className={`flex items-center justify-between px-4 sm:px-7 py-4 reveal reveal-delay-${Math.min(i, 4)} ${i < items.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(0,0,0,0.04)', background: item.highlight ? 'rgba(37,99,235,0.05)' : 'transparent' }}>
              <div className="flex items-center gap-3.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm" style={{ color: item.highlight ? '#1D4ED8' : '#425466' }}>{item.label}</span>
              </div>
              <span className="font-display font-semibold text-sm flex-shrink-0 ml-4" style={{ color: item.highlight ? '#3B82F6' : '#697386' }}>{item.value}</span>
            </div>
          ))}

          {/* Total row */}
          <div className="px-4 sm:px-7 py-6" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.08))', borderTop: '1px solid rgba(37,99,235,0.2)' }}>
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
    </section>
  )
}
