'use client'
import { Fragment } from 'react'
import { useReveal } from '@/hooks/useReveal'

const steps = [
  {
    num: '01',
    label: 'Check Your Readiness',
    sub: 'Take the free 2-min quiz',
    badge: { text: 'Free', variant: 'glass-badge--indigo' },
    state: 'complete',
  },
  {
    num: '02',
    label: 'Reserve Your Seat',
    sub: '$697 · only 40 spots',
    badge: { text: '28 left', variant: 'glass-badge--amber' },
    state: 'active',
  },
  {
    num: '03',
    label: 'Attend the Workshop',
    sub: 'April 21–22 in Frisco',
    badge: { text: '2 days', variant: 'glass-badge--violet' },
    state: 'upcoming',
  },
  {
    num: '04',
    label: 'Transform Your Business',
    sub: '90-day AI roadmap included',
    badge: { text: 'Outcome', variant: 'glass-badge--lime' },
    state: 'upcoming',
  },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function nodeStyle(state: string): React.CSSProperties {
  if (state === 'active') return {
    background: 'linear-gradient(135deg,#2563EB,#06B6D4)',
    boxShadow: '0 0 28px rgba(37,99,235,0.45)',
    color: '#fff',
  }
  if (state === 'complete') return {
    background: 'rgba(37,99,235,0.12)',
    border: '2px solid rgba(37,99,235,0.45)',
    color: '#3B82F6',
  }
  return {
    background: 'rgba(0,0,0,0.025)',
    border: '2px solid rgba(0,0,0,0.08)',
    color: '#697386',
  }
}

function labelColor(state: string) {
  if (state === 'active') return '#2563EB'
  if (state === 'complete') return '#425466'
  return '#697386'
}

export default function RegistrationSteps() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-28 px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label" style={{ display: 'inline-flex' }}>How It Works</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Four Steps to AI Fluency
          </h2>
        </div>

        {/* Desktop: two-row horizontal layout */}
        <div className="hidden md:block">
          {/* Row 1: alternating nodes + connectors */}
          <div className="flex items-center mb-7 px-10">
            {steps.map((step, i) => (
              <Fragment key={step.num}>
                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-sm"
                  style={nodeStyle(step.state)}>
                  {step.state === 'complete' ? <CheckIcon /> : step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-3" style={{
                    height: '2px',
                    background: i === 0
                      ? 'linear-gradient(90deg, rgba(37,99,235,0.55), rgba(0,0,0,0.05))'
                      : 'rgba(0,0,0,0.05)',
                    borderRadius: '1px',
                  }} />
                )}
              </Fragment>
            ))}
          </div>

          {/* Row 2: label grid aligned under nodes */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="text-center px-2">
                <p className="font-display font-semibold text-sm mb-1.5" style={{ color: labelColor(step.state) }}>
                  {step.label}
                </p>
                <p className="text-xs mb-3" style={{ color: '#8898aa' }}>{step.sub}</p>
                <span className={`glass-badge ${step.badge.variant}`}>{step.badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical layout */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                  style={nodeStyle(step.state)}>
                  {step.state === 'complete' ? <CheckIcon /> : step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px my-2" style={{
                    minHeight: '32px',
                    flex: 1,
                    background: i === 0 ? 'rgba(37,99,235,0.35)' : 'rgba(0,0,0,0.05)',
                  }} />
                )}
              </div>
              <div className={`flex-1 ${i < steps.length - 1 ? 'pb-6' : ''}`}>
                <div className="flex items-center gap-2 mt-2 mb-0.5">
                  <p className="font-display font-semibold text-sm" style={{ color: labelColor(step.state) }}>
                    {step.label}
                  </p>
                  <span className={`glass-badge ${step.badge.variant}`}>{step.badge.text}</span>
                </div>
                <p className="text-xs" style={{ color: '#8898aa' }}>{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
