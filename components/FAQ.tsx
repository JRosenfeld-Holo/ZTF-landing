'use client'
import { useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

const faqs = [
  {
    q: 'Do I need any technical background or prior AI experience?',
    a: 'Absolutely not. Zero to Fluent is designed specifically for business owners starting from zero. If you can use a smartphone and a web browser, you have all the technical skills required. We start from the very beginning.',
  },
  {
    q: 'What should I bring to the workshop?',
    a: "Just your laptop (Mac or PC), a charger, and an open mind. We'll handle the rest — including setting up any accounts you need during the workshop. Lunch, coffee, and all materials are included.",
  },
  {
    q: 'Is this really different from watching YouTube tutorials?',
    a: "Fundamentally different. Online tutorials are passive — you watch someone else do it. This workshop is 100% hands-on. You'll build prompts, create workflows, and solve real problems with an instructor right there when you get stuck.",
  },
  {
    q: 'What if I can only attend one of the two days?',
    a: "We strongly recommend attending both days — they build on each other. Day 1 is foundation and fluency; Day 2 is automation and implementation. Session replays are included, so you won't miss anything permanently.",
  },
  {
    q: 'Is the $697 price per person or per business?',
    a: 'Per person. If you want to bring a team member or business partner, each attendee needs a seat. We do offer a group discount for 3+ attendees from the same organization — contact us to discuss.',
  },
  {
    q: "What's the refund policy?",
    a: 'We offer a full refund up to 14 days before the event (April 7, 2026). After that, we can transfer your seat to a colleague or a future event date, but cannot offer refunds within 14 days of the workshop.',
  },
  {
    q: 'Where exactly is the venue?',
    a: 'Caddo Office Reimagined in Frisco, TX — a professional conference facility with dedicated workshop space, reliable WiFi, and plenty of parking. Full address and directions are sent upon registration.',
  },
  {
    q: 'Will there be recordings or materials I can take home?',
    a: 'Yes. All attendees receive session replay recordings and a full digital resource library including the AI Prompt Library (100+ prompts tuned for SMBs), workshop slides, and your personalized 90-day implementation plan.',
  },
]

function AccordionItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className="glass rounded-xl overflow-hidden"
      style={{ border: isOpen ? '1px solid rgba(37,99,235,0.3)' : '1px solid rgba(0,0,0,0.05)', transition: 'border-color 0.25s ease' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-display font-semibold text-sm pr-6" style={{ color: isOpen ? '#2563EB' : '#1e3a5c', transition: 'color 0.2s ease' }}>
          {faq.q}
        </span>
        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? 'rgba(37,99,235,0.15)' : 'rgba(0,0,0,0.04)',
            transform: isOpen ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease',
          }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#3B82F6' : '#697386'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>
      <div
        ref={bodyRef}
        className="faq-body"
        style={{
          maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 400}px` : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-4 text-sm leading-relaxed"
          style={{ color: '#425466', borderTop: '1px solid rgba(37,99,235,0.08)' }}>
          {faq.a}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useReveal()

  return (
    <section id="faq" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>FAQ</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
