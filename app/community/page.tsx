'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'

/* ─── data ─── */
const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="15" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 20c0-3 2.686-5 6-5h6c3.314 0 6 2 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Monthly AI Office Hours',
    desc: 'Live Q&A sessions with instructors. Bring your real business challenges and get answers.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 9h8M7 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Private Member Forum',
    desc: 'A focused community of DFW business owners sharing prompts, wins, and lessons learned.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="15" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M15.5 15l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'New Prompt Packs Monthly',
    desc: 'Curated prompt libraries for your industry — marketing, ops, finance, sales, and more.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.09 8.26L19 8.27L14.45 11.74L16.18 17L11 13.77L5.82 17L7.55 11.74L3 8.27L8.91 8.26L11 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Peer Accountability Groups',
    desc: 'Small groups of 4–6 DFW business owners meet weekly to share goals, progress, and blockers.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C7.5 2 4.5 5 4.5 8.5c0 5 6.5 11.5 6.5 11.5s6.5-6.5 6.5-11.5C17.5 5 14.5 2 11 2z" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="11" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    title: 'DFW Local Events',
    desc: 'In-person networking dinners and mini-workshops exclusively for community members in DFW.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Workshop Session Replays',
    desc: 'Full recordings from every Zero to Fluent workshop — reference them whenever you need a refresher.',
  },
]

const faqs = [
  {
    q: 'What happens after the first 30 days?',
    a: 'After your intro period at $99/month, your membership continues at $199/month. You can cancel anytime before the renewal — no questions asked.',
  },
  {
    q: 'Do I need to attend the workshop to join?',
    a: 'Workshop attendees get priority access and an intro rate. The community is also open to non-attendees at the standard $199/month rate. Contact us to join directly.',
  },
  {
    q: 'What if I want to cancel?',
    a: 'Cancel anytime via your member dashboard. Your access continues through the end of the billing period. No contracts, no penalties.',
  },
]

/* ─── FAQ accordion ─── */
function AccordionItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  return (
    <div className="glass rounded-xl overflow-hidden"
      style={{ border: isOpen ? '1px solid rgba(37,99,235,0.3)' : '1px solid rgba(0,0,0,0.05)', transition: 'border-color 0.25s ease' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer" aria-expanded={isOpen}>
        <span className="font-display font-semibold text-sm pr-6" style={{ color: isOpen ? '#2563EB' : '#1e3a5c', transition: 'color 0.2s ease' }}>
          {faq.q}
        </span>
        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: isOpen ? 'rgba(37,99,235,0.15)' : 'rgba(0,0,0,0.04)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#3B82F6' : '#697386'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>
      <div ref={bodyRef} className="faq-body"
        style={{ maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 400}px` : '0', opacity: isOpen ? 1 : 0 }}>
        <div className="px-6 pb-5 pt-4 text-sm leading-relaxed" style={{ color: '#425466', borderTop: '1px solid rgba(37,99,235,0.08)' }}>
          {faq.a}
        </div>
      </div>
    </div>
  )
}

/* ─── page ─── */
export default function CommunityPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>

      {/* ━━━ Nav ━━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/">
            <Image src="/logo-header-cropped.png" alt="Zero to Fluent" width={160} height={48} style={{ height: '32px', width: 'auto' }} />
          </a>
          <a href="/" className="text-sm font-medium flex items-center gap-1.5 transition-colors"
            style={{ color: '#425466' }}
            onMouseOver={e => (e.currentTarget.style.color = '#2563EB')}
            onMouseOut={e => (e.currentTarget.style.color = '#425466')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Workshop
          </a>
        </div>
      </nav>

      {/* ━━━ Hero — gradient bg matching homepage pattern ━━━ */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 35%, #0EA5E9 65%, #2563EB 100%)' }}>
        {/* Dark scrim */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute inset-0 pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF' }}>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Community Membership
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
            Zero to Fluent{' '}
            <br />
            <span style={{ color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>Community</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.75' }}>
            Continue your AI journey after the workshop. Monthly office hours, a private DFW business network, new prompt packs every month, and peer accountability that keeps you moving.
          </p>

          {/* Pricing card */}
          <div className="card-premium inline-block max-w-sm w-full">
            <div className="glass rounded-[23px] overflow-hidden" style={{ background: '#FFFFFF' }}>
              {/* Header band */}
              <div className="text-center py-2.5 text-xs font-bold uppercase tracking-[0.1em]"
                style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9)', color: '#FFFFFF' }}>
                Workshop Attendee Rate
              </div>
              <div className="p-8">
                <div className="flex items-baseline justify-center gap-3 mb-1.5">
                  <span className="text-slate-400 line-through text-xl font-medium">$199</span>
                  <span className="font-display font-bold text-6xl" style={{ color: '#0A2540' }}>$99</span>
                  <span className="text-base font-medium" style={{ color: '#697386' }}>/mo</span>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: '#059669' }}>
                  <span className="mr-1">✓</span>Intro rate for your first 30 days
                </p>
                <p className="text-xs mb-6" style={{ color: '#697386' }}>Then $199/month — cancel anytime</p>

                <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center font-display font-bold text-base text-white py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 28px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.15)' }}
                  onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(37,99,235,0.55), 0 8px 24px rgba(6,182,212,0.3)')}
                  onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 28px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.15)')}>
                  Join the Community — $99/mo
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Workshop attendees: use the link in your confirmation email for automatic discount.
          </p>
        </div>
      </section>

      {/* ━━━ What You Get — matches homepage white sections ━━━ */}
      <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
        <div className="gradient-divider absolute top-0 left-0 right-0" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label" style={{ display: 'inline-flex' }}>What You Get</div>
            <h2 className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
              Everything Included
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(b => (
              <div key={b.title} className="card-premium">
                <div className="glass rounded-[23px] p-7 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', color: '#2563EB' }}>
                    {b.icon}
                  </div>
                  <h3 className="font-display font-bold text-base mb-2" style={{ color: '#0A2540' }}>
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: '#425466' }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gradient-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ━━━ How It Works — inverse gradient ━━━ */}
      <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 35%, #06B6D4 65%, #22D3EE 100%)' }}>
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute inset-0 pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block opacity-60" />
            How It Works
          </div>
          <h2 className="font-display font-bold leading-tight mb-12"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#FFFFFF' }}>
            Three Steps to Stay Ahead
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Join', desc: 'Sign up and get instant access to the member forum, prompt library, and session archives.' },
              { step: '02', title: 'Engage', desc: 'Attend monthly office hours, join an accountability group, and connect with DFW peers.' },
              { step: '03', title: 'Grow', desc: 'Apply new AI skills each month. Track your progress. Stay ahead of the curve.' },
            ].map(s => (
              <div key={s.step} className="rounded-2xl p-7 text-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <div className="font-display font-bold text-4xl mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.step}</div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#FFFFFF' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━ */}
      <section className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label" style={{ display: 'inline-flex' }}>FAQ</div>
            <h2 className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Final CTA — teal→blue gradient ━━━ */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 35%, #0EA5E9 65%, #2563EB 100%)' }}>
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute inset-0 pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#FFFFFF' }}>
            Keep the Momentum Going
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
            The workshop gives you the foundation. The community keeps you accountable, current, and connected with DFW business owners on the same journey.
          </p>
          <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-display font-bold text-lg text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{ background: '#FFFFFF', color: '#2563EB', boxShadow: '0 4px 32px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)', padding: '18px 40px' }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 48px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'none' }}>
            Join for $99/month
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Then $199/month · Cancel anytime</p>
        </div>
      </section>

      {/* ━━━ Footer ━━━ */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="flex justify-center mb-3">
          <Image src="/logo-header-cropped.png" alt="Zero to Fluent" width={120} height={40} className="opacity-40" style={{ height: '24px', width: 'auto' }} />
        </div>
        <p className="text-xs" style={{ color: '#8898aa' }}>
          © 2026 Zero to Fluent. All rights reserved. ·{' '}
          <a href="mailto:hello@zerotofluent.ai" style={{ color: '#697386' }}>hello@zerotofluent.ai</a>
        </p>
      </footer>
    </div>
  )
}
