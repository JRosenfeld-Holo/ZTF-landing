'use client'
import { useReveal } from '@/hooks/useReveal'

export default function Community() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-16 px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center"
          style={{ border: '1px solid rgba(37,99,235,0.18)' }}>
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="9" cy="9" r="4" stroke="#3B82F6" strokeWidth="1.5"/>
              <circle cx="19" cy="9" r="4" stroke="#3B82F6" strokeWidth="1.5"/>
              <path d="M3 23c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2563EB' }}>Also Available</span>
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', border: '1px solid rgba(37,99,235,0.2)' }}>Optional</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#0A2540' }}>Zero to Fluent Community</h3>
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#425466' }}>
              Continue learning after the workshop with monthly AI office hours, a private member forum, new prompt packs every month, and peer accountability from DFW business owners.{' '}
              <strong className="font-semibold" style={{ color: '#1e3a5c' }}>$199/month</strong> — cancel anytime.
            </p>
            <p className="text-xs" style={{ color: '#697386' }}>Workshop attendees receive their first 30 days free.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
