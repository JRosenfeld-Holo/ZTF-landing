'use client'
import { useReveal } from '@/hooks/useReveal'

const details = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C5.686 1 3 3.686 3 7c0 4 6 10 6 10s6-6 6-10c0-3.314-2.686-6-6-6z" stroke="#3B82F6" strokeWidth="1.4"/>
        <circle cx="9" cy="7" r="2" stroke="#3B82F6" strokeWidth="1.4"/>
      </svg>
    ),
    label: 'Location',
    value: 'Caddo Office Reimagined, Frisco, TX 75034',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="3" width="16" height="13" rx="2" stroke="#3B82F6" strokeWidth="1.4"/>
        <path d="M1 7h16M6 1v4M12 1v4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Parking',
    value: 'Free on-site parking for all attendees',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 6.5C2 4 4 2 9 2s7 2 7 4.5c0 3.5-3 4.5-7 9-4-4.5-7-5.5-7-9z" stroke="#3B82F6" strokeWidth="1.4"/>
        <path d="M5.5 8.5h2m3 0h2M7 10.5h4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'WiFi',
    value: 'High-speed dedicated workshop WiFi provided',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6 2 3.5 4 3.5 7c0 1.5.7 3.5 2 5l3.5 4 3.5-4c1.3-1.5 2-3.5 2-5C14.5 4 12 2 9 2z" stroke="#3B82F6" strokeWidth="1.4"/>
        <path d="M6.5 9.5h5M9 7.5v4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Catering',
    value: 'Lunch + coffee + refreshments both days',
  },
]

export default function Venue() {
  const ref = useReveal()

  return (
    <section id="venue" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>The Venue</div>
          <h2 className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            A Professional Space in Frisco
          </h2>
          <p style={{ color: '#697386' }}>Dedicated conference suite with everything you need to focus and learn.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Map */}
          <div className="glass rounded-2xl overflow-hidden min-h-[280px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.0!2d-96.82!3d33.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDA5JzAwLjAiTiA5NsKwNDknMTIuMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%" height="280" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Venue location"
            />
          </div>

          {/* Details */}
          <div className="glass rounded-2xl p-8">
            <h3 className="font-display font-bold text-lg mb-1" style={{ color: '#0A2540' }}>Caddo Office Reimagined</h3>
            <p className="text-sm mb-7" style={{ color: '#2563EB' }}>Frisco, TX · Professional Conference Suite</p>

            <ul className="space-y-5 mb-7">
              {details.map(d => (
                <li key={d.label} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.15)' }}>
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#697386' }}>{d.label}</p>
                    <p className="text-sm" style={{ color: '#2d4a6b' }}>{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-5" style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}>
              <p className="text-xs" style={{ color: '#697386' }}>Full address, parking directions & day-of logistics sent to registered attendees 7 days before the event.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
