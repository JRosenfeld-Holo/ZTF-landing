'use client'
import { useReveal } from '@/hooks/useReveal'

const stats = [
  { stat: '88%', label: 'of SMB owners want to use AI but haven\'t started' },
  { stat: '10×', label: 'faster on routine tasks with AI fluency' },
  { stat: '6 mo', label: 'average time lost trying to self-teach AI' },
]

export default function Problem() {
  const ref = useReveal()

  return (
    <section id="problem" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mx-auto" style={{ display: 'inline-flex' }}>The Problem</div>
          <h2 className="font-display font-bold text-center leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            You Keep Hearing About AI.<br />
            <span className="gradient-text">But You&apos;re Not Using It.</span>
          </h2>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12">
          {stats.map(s => (
            <div key={s.stat} className="glass rounded-xl p-4 text-center glass-hover">
              <p className="font-display font-bold gradient-text mb-1.5"
                style={{ fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '-0.02em' }}>{s.stat}</p>
              <p className="text-xs leading-snug" style={{ color: '#697386' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-5 text-lg leading-relaxed" style={{ color: '#425466' }}>
          <p>Your competitors are using AI to write proposals in 10 minutes that used to take you 2 hours. They&apos;re generating marketing content, analyzing data, and responding to customers — while you&apos;re still figuring out which tool to try first.</p>
          <p>Your employees are waiting for <em className="not-italic font-semibold" style={{ color: '#1D4ED8' }}>you</em> to lead the way. They&apos;ve seen the headlines. They&apos;re wondering why your business hasn&apos;t moved on this yet.</p>
        </div>

        {/* Pull quote */}
        <blockquote className="my-8 px-6 py-5 rounded-2xl border-l-4 text-base"
          style={{ borderColor: '#2563EB', borderLeftWidth: '3px', background: 'rgba(37,99,235,0.04)' }}>
          <p className="font-display font-semibold leading-snug" style={{ color: '#1e3a5c', fontSize: 'clamp(16px,2vw,20px)' }}>
            &ldquo;You&apos;ve tried YouTube videos and online courses you never finished — because watching someone else use AI isn&apos;t the same as doing it yourself, with someone right there when you get stuck.&rdquo;
          </p>
        </blockquote>

        <div className="text-lg leading-relaxed" style={{ color: '#425466' }}>
          <p>The gap between businesses using AI and businesses ignoring it is growing every month. But that gap is closeable. <strong style={{ color: '#1D4ED8' }}>Two days</strong> is all it takes to go from falling behind to pulling ahead.</p>
        </div>

      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
