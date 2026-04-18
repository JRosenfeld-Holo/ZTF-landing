'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Bullet = { text: string; sub?: string[] }
type Session = {
  time: string
  title: string
  bullets: Bullet[]
  break?: false
}
type Break = {
  time: string
  label: string
  icon: string
  break: true
}
type Item = Session | Break

const days: {
  label: string
  sub: string
  goal: string
  items: Item[]
}[] = [
  {
    label: 'Day 1',
    sub: 'Foundations',
    goal: 'By end of Day 1, every attendee can hold a productive conversation with Claude and ChatGPT, write effective prompts, and understand what AI can (and can\'t) do for their business.',
    items: [
      {
        time: '10:00 – 10:15 AM',
        title: 'Welcome & Introductions',
        bullets: [
          { text: 'Icebreaker: "What\'s the one thing you wish AI could do for your business?"' },
          { text: 'Set expectations for the 2 days' },
          { text: 'Quick tech check — make sure everyone\'s laptop is ready' },
        ],
      },
      {
        time: '10:15 – 11:15 AM',
        title: 'Session 1 — "AI Demystified"',
        bullets: [
          { text: 'What AI actually is (and isn\'t) — no jargon, plain English' },
          { text: 'The AI landscape in 2026: Claude, ChatGPT, Gemini, Copilot — what\'s what' },
          { text: 'Live demo: Watch AI solve a real business problem in real-time' },
          { text: 'Why small business owners have a MASSIVE advantage with AI right now' },
        ],
      },
      { time: '11:15 – 11:30 AM', label: 'Coffee Break', icon: '☕', break: true },
      {
        time: '11:30 AM – 12:30 PM',
        title: 'Session 2 — "Your First AI Conversation"',
        bullets: [
          { text: 'Hands-on: Setting up Claude and ChatGPT accounts' },
          { text: 'The anatomy of a great prompt — the CRISP framework (Context, Role, Instructions, Specifics, Parameters)' },
          { text: 'Workshop exercise: Write 5 prompts that solve YOUR actual business problems' },
          { text: 'Common mistakes that make AI give you garbage (and how to fix them)' },
        ],
      },
      { time: '12:30 – 1:30 PM', label: 'Lunch Break (Provided)', icon: '🍽️', break: true },
      {
        time: '1:30 – 2:30 PM',
        title: 'Session 3 — "AI for Your Business — Today"',
        bullets: [
          { text: 'Email & communication: Draft emails, proposals, and client responses in seconds' },
          { text: 'Content creation: Social media posts, blog outlines, marketing copy' },
          { text: 'Research & analysis: Competitive research, market analysis, summarizing documents' },
          { text: 'Customer service: Creating templates, FAQ responses, and scripts' },
          { text: 'Live exercise: Each attendee automates ONE task they do every week' },
        ],
      },
      { time: '2:30 – 2:45 PM', label: 'Coffee Break', icon: '☕', break: true },
      {
        time: '2:45 – 3:30 PM',
        title: 'Session 4 — "Day 1 Wrap-Up & Homework"',
        bullets: [
          { text: 'Group share: "What\'s the biggest thing you learned today?"' },
          { text: 'Homework assignment: Use AI for 3 real business tasks tonight' },
          { text: 'Preview of Day 2: "Tomorrow we go from comfortable to fluent"' },
          { text: 'Q&A' },
        ],
      },
    ],
  },
  {
    label: 'Day 2',
    sub: 'Applied AI',
    goal: 'By end of Day 2, attendees can build AI workflows, use AI for strategic decisions, and have a 90-day implementation plan for their business.',
    items: [
      {
        time: '10:00 – 10:15 AM',
        title: 'Day 2 Kickoff',
        bullets: [
          { text: 'Homework review: "What did you try last night? What worked?"' },
          { text: 'Recap Day 1 key concepts' },
          { text: 'Day 2 roadmap' },
        ],
      },
      {
        time: '10:15 – 11:15 AM',
        title: 'Session 5 — "Advanced Prompting & AI Workflows"',
        bullets: [
          { text: 'Chain-of-thought prompting: Getting AI to think step by step' },
          { text: 'Mega-prompts: Complex, multi-part instructions that produce professional output' },
          { text: 'Building reusable prompt templates for YOUR business' },
          { text: 'Workshop: Create a "prompt playbook" for your 5 most common tasks' },
        ],
      },
      { time: '11:15 – 11:30 AM', label: 'Coffee Break', icon: '☕', break: true },
      {
        time: '11:30 AM – 12:30 PM',
        title: 'Session 6 — "Vibecoding & AI-Built Tools"',
        bullets: [
          { text: 'What is vibecoding? Building apps and tools with AI — no coding required' },
          { text: 'Live demo: Build a simple business tool (calculator, form, dashboard) using AI in 15 minutes' },
          { text: 'Hands-on: Each attendee builds a simple tool for their business' },
          { text: 'The "build vs. buy" framework: When to use AI to build vs. when to buy software' },
        ],
      },
      { time: '12:30 – 1:30 PM', label: 'Lunch Break (Provided)', icon: '🍽️', break: true },
      {
        time: '1:30 – 2:30 PM',
        title: 'Session 7 — "AI Agents & Automation"',
        bullets: [
          { text: 'What are AI agents? (Autonomous AI that works for you while you sleep)' },
          { text: 'Real-world examples: Small businesses using agents for lead gen, scheduling, reporting' },
          { text: 'The AI automation stack: Connecting AI to your existing tools' },
          { text: 'Live demo: Set up a simple AI automation' },
          { text: 'When to hire an AI consultant vs. DIY' },
        ],
      },
      { time: '2:30 – 2:45 PM', label: 'Coffee Break', icon: '☕', break: true },
      {
        time: '2:45 – 3:30 PM',
        title: 'Session 8 — "Your 90-Day AI Plan & Graduation"',
        bullets: [
          {
            text: 'Workshop: Build your personal 90-Day AI Implementation Plan',
            sub: [
              'Week 1–2: Quick wins (tasks to automate immediately)',
              'Week 3–4: Intermediate projects (workflows, templates)',
              'Month 2–3: Strategic AI (agents, integrations, scaling)',
            ],
          },
          { text: 'Group share: Present your plan to your table' },
          { text: '"Graduation" — Certificate of Completion' },
          { text: 'Community invitation: How to continue learning' },
          { text: 'Closing & group photo' },
        ],
      },
    ],
  },
]

export default function Curriculum() {
  const [active, setActive] = useState(0)
  const ref = useReveal()

  const day = days[active]

  return (
    <section id="curriculum" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: 'rgba(246,249,252,0.85)' }}>
      <div ref={ref} className="reveal max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>Curriculum</div>
          <h2 className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Here&apos;s Exactly What You&apos;ll Learn
          </h2>
          <p className="text-lg" style={{ color: '#697386' }}>
            Two days. Eight sessions. One transformation.
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-3 mb-8 justify-center">
          {days.map((d, i) => (
            <button key={d.label} onClick={() => setActive(i)}
              className="font-display font-semibold px-4 sm:px-7 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-sm"
              style={active === i
                ? { background: 'linear-gradient(135deg,#2563EB,#06B6D4)', color: '#fff', boxShadow: '0 0 24px rgba(37,99,235,0.4)' }
                : { background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)', color: '#697386' }
              }>
              {d.label} — {d.sub}
            </button>
          ))}
        </div>

        {/* Day goal */}
        <div className="mb-8 px-5 py-4 rounded-2xl"
          style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#425466' }}>
            <span className="font-display font-semibold" style={{ color: '#2563EB' }}>Goal: </span>
            {day.goal}
          </p>
        </div>

        {/* Sessions */}
        <div className="space-y-2">
          {day.items.map((item) => {
            if (item.break) {
              return (
                <div key={item.time} className="flex flex-col sm:flex-row gap-2 sm:gap-5 px-4 sm:px-5 py-3 rounded-xl sm:items-center"
                  style={{ background: 'rgba(37,99,235,0.03)', border: '1px dashed rgba(0,0,0,0.08)' }}>
                  <div className="flex-shrink-0 sm:w-36 sm:text-right">
                    <span className="text-xs font-mono" style={{ color: '#8898aa' }}>{item.time}</span>
                  </div>
                  <div className="hidden sm:block w-px self-stretch" style={{ background: 'rgba(0,0,0,0.04)' }} />
                  <div className="flex items-center gap-2">
                    <span className="text-sm" aria-hidden="true">{item.icon}</span>
                    <span className="text-xs" style={{ color: '#697386' }}>{item.label}</span>
                  </div>
                </div>
              )
            }

            return (
              <div key={item.time} className="glass glass-hover flex flex-col sm:flex-row gap-2 sm:gap-5 p-4 sm:p-5 rounded-xl">
                <div className="flex-shrink-0 sm:w-36 sm:text-right pt-0.5">
                  <span className="text-xs font-mono font-medium leading-relaxed" style={{ color: '#2563EB' }}>
                    {item.time}
                  </span>
                </div>
                <div className="hidden sm:block w-px self-stretch" style={{ background: 'rgba(37,99,235,0.25)' }} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-sm mb-3" style={{ color: '#1e3a5c' }}>
                    {item.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi}>
                        <div className="flex gap-2 text-xs leading-relaxed" style={{ color: '#697386' }}>
                          <span className="flex-shrink-0 mt-0.5" style={{ color: '#1D4ED8' }}>›</span>
                          <span>{b.text}</span>
                        </div>
                        {b.sub && (
                          <ul className="mt-1.5 ml-4 space-y-1">
                            {b.sub.map((s, si) => (
                              <li key={si} className="flex gap-2 text-xs leading-relaxed" style={{ color: '#697386' }}>
                                <span className="flex-shrink-0" style={{ color: '#8898aa' }}>–</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
