'use client'
import { useReveal } from '@/hooks/useReveal'

export default function Community() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Also Available</div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}>
          <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
            <circle cx="9" cy="9" r="4" stroke="#2563EB" strokeWidth="1.5"/>
            <circle cx="19" cy="9" r="4" stroke="#2563EB" strokeWidth="1.5"/>
            <path d="M3 23c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h3 className="font-display font-bold mb-4 leading-tight"
          style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
          Zero to Fluent{' '}
          <span className="gradient-text">Community</span>
        </h3>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: '#425466' }}>
          Continue learning after the workshop with monthly AI office hours, a private member forum, new prompt packs every month, and peer accountability from DFW business owners.
        </p>

        {/* Pricing callout */}
        <div className="inline-flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2 mb-8 px-6 py-3 rounded-xl"
          style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)' }}>
          <span className="font-display font-bold text-2xl" style={{ color: '#0A2540' }}>$99/mo</span>
          <span className="text-sm text-center sm:text-left" style={{ color: '#697386' }}>first 30 days, then $199/mo — cancel anytime</span>
        </div>

        {/* CTA */}
        <div>
          <a href="/community"
            className="inline-flex items-center gap-2.5 font-display font-bold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: '#FFFFFF', color: '#2563EB', padding: '16px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)' }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.12)' }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)' }}>
            Learn more about the community
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

      </div>
    </section>
  )
}
