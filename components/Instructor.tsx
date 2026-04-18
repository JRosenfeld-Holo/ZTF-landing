'use client'
import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const credentials = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.09 7.26L17 7.27L12.45 10.74L14.18 16L9 12.77L3.82 16L5.55 10.74L1 7.27L6.91 7.26L9 2Z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'AI Practitioner',
    sub: '5+ years implementing',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/>
      </svg>
    ),
    label: '100+ SMBs Trained',
    sub: 'Across DFW',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#2563EB" strokeWidth="1.4"/>
        <path d="M6 9l2 2 4-4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Hands-On Focus',
    sub: 'No lectures. Just doing.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6 2 3.5 4.5 3.5 7.5c0 4 5.5 8.5 5.5 8.5s5.5-4.5 5.5-8.5C14.5 4.5 12 2 9 2z" stroke="#2563EB" strokeWidth="1.4"/>
        <circle cx="9" cy="7.5" r="2" stroke="#2563EB" strokeWidth="1.4"/>
      </svg>
    ),
    label: 'Frisco, TX Local',
    sub: 'DFW business community',
  },
]

export default function Instructor() {
  const ref = useReveal()

  return (
    <section id="instructor" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>Your Instructor</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Who&apos;s Teaching This?
          </h2>
        </div>

        <div className="card-premium">
          <div className="glass rounded-[23px] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start">

            {/* Left — avatar + status */}
            <div className="flex-shrink-0 flex flex-col items-center gap-5 self-center md:self-start md:w-44">
              <div className="w-36 h-36 rounded-2xl overflow-hidden relative"
                style={{ border: '1px solid rgba(37,99,235,0.2)' }}>
                <Image
                  src="/instructor.png"
                  alt="Jonathan Rosenfeld — instructor"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="text-center">
                <div className="glass-badge glass-badge--lime mb-2">
                  <span className="glass-badge__dot" />
                  Available
                </div>
                <p className="text-xs" style={{ color: '#697386' }}>Frisco, TX</p>
              </div>
            </div>

            {/* Right — bio + credentials */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-2xl mb-0.5 text-center md:text-left" style={{ color: '#0A2540' }}>Jonathan Rosenfeld</h3>
              <p className="font-medium mb-6 text-sm text-center md:text-left" style={{ color: '#3B82F6' }}>AI Implementation Consultant</p>

              <div className="space-y-4 text-sm leading-relaxed mb-8" style={{ color: '#425466' }}>
                <p>Jonathan has spent the last 5+ years implementing AI systems inside real businesses — from solo consultants to 50-person firms across DFW. He&apos;s not an academic. He&apos;s a practitioner who&apos;s seen firsthand what works when small business owners try to adopt AI.</p>
                <p>After watching dozens of SMB owners waste months on YouTube tutorials they never finished, he built Zero to Fluent — a workshop for people who learn by <em className="not-italic font-semibold" style={{ color: '#1D4ED8' }}>doing</em>, not watching.</p>
              </div>

              {/* Credential 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {credentials.map(c => (
                  <div key={c.label} className="glass rounded-xl p-4 flex items-start gap-3"
                    style={{ border: '1px solid rgba(37,99,235,0.12)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)' }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm leading-tight" style={{ color: '#0A2540' }}>{c.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#697386' }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['ChatGPT', 'Claude', 'Gemini', 'n8n', 'Zapier', 'Prompt Engineering'].map(tool => (
                  <span key={tool} className="glass-chip glass-chip--indigo">
                    <span className="glass-chip__label">{tool}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
