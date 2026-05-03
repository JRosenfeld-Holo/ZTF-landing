'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { showToast } from './Toast'

export default function EmailCapture() {
  const ref = useReveal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: replace with actual form endpoint (e.g. Mailchimp, ConvertKit, etc.)
    setSubmitted(true)
    showToast('info', "You're on the list!", 'Check your inbox — the AI Prompt Library is on its way.')
  }

  return (
    <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6" style={{ background: '#F8FAFC' }}>
      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">

        <div className="section-label mb-5" style={{ display: 'inline-flex' }}>Free Resource</div>

        <h2 className="font-display font-bold leading-tight mb-3"
          style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
          Not Ready to Register Yet?
        </h2>
        <p className="text-base leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: '#425466', lineHeight: '1.75' }}>
          Get our free <strong style={{ color: '#1D4ED8' }}>AI Prompt Library</strong> — 100+ prompts built specifically for small business owners. Yours free, no strings attached. We&apos;ll also notify you before early-bird pricing ends.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your business email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid rgba(37,99,235,0.2)',
                color: '#0A2540',
              }}
              onFocus={e => (e.currentTarget.style.border = '1.5px solid rgba(37,99,235,0.55)')}
              onBlur={e => (e.currentTarget.style.border = '1.5px solid rgba(37,99,235,0.2)')}
            />
            <button
              type="submit"
              className="font-display font-semibold text-sm text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#2563EB,#0EA5E9)', boxShadow: '0 4px 16px rgba(37,99,235,0.3)' }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.45)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.3)')}>
              Send Me the Library
            </button>
          </form>
        ) : (
          <div className="glass rounded-2xl px-8 py-5 max-w-md mx-auto"
            style={{ border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.04)' }}>
            <div className="flex items-center justify-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.12)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="#22C55E" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-display font-semibold text-sm" style={{ color: '#0A2540' }}>
                Check your inbox — the prompt library is on its way.
              </p>
            </div>
          </div>
        )}

        <p className="text-xs mt-4" style={{ color: '#8898aa' }}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
