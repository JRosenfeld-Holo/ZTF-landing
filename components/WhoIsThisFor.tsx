'use client'
import { useReveal } from '@/hooks/useReveal'


const forList = [
  'You own or run a small business with 1–50 employees',
  'You have zero to basic AI experience',
  'You learn better in person than from online courses',
  'You want to apply AI to YOUR specific business problems',
  "You're in DFW and can attend October 21–22 in Frisco",
  "You're ready to invest in learning that pays dividends immediately",
]

const notForList = [
  'Developers or technical professionals (you already have this)',
  "Enterprise employees attending on company's behalf",
  'People looking for a passive lecture — this is a hands-on workshop',
  'Anyone not ready to open their laptop and do the work',
]

export default function WhoIsThisFor() {
  const ref = useReveal()

  return (
    <section id="who" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #040C18 0%, #0A1628 55%, #0D1F3C 100%)' }}>


      {/* Subtle radial glow for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />

      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(99,179,237,0.3)', color: '#93C5FD' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#60A5FA' }} />
            Who Is This For
          </div>

          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#FFFFFF' }}>
            Is This Workshop{' '}
            <span style={{ color: '#38BDF8' }}>Right for You?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* For */}
          <div className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 4px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9l3.5 3.5 7.5-8" stroke="#22C55E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-base" style={{ color: '#0A2540' }}>This IS for you if…</h3>
            </div>
            <ul className="space-y-3.5">
              {forList.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#425466' }}>
                  <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="rgba(34,197,94,0.1)"/>
                    <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#22C55E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 4px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)' }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 5l8 8M13 5l-8 8" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-base" style={{ color: '#0A2540' }}>This is NOT for you if…</h3>
            </div>
            <ul className="space-y-3.5">
              {notForList.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#425466' }}>
                  <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="rgba(239,68,68,0.08)"/>
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#EF4444" strokeWidth="1.25" strokeLinecap="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
