'use client'
import { useState } from 'react'
import { showToast } from './Toast'

const questions = [
  {
    id: 'q1', text: 'How familiar are you with AI tools like ChatGPT or Claude?',
    type: 'single' as const,
    options: [
      { text: "I've never used one", pts: 0 },
      { text: "I've tried them once or twice", pts: 2 },
      { text: 'I use them occasionally', pts: 4 },
      { text: 'I use them regularly for work', pts: 6 },
    ],
  },
  {
    id: 'q2', text: 'Have you ever written a "prompt" to get output from an AI?',
    type: 'single' as const,
    options: [
      { text: "No — what's a prompt?", pts: 0 },
      { text: "I've typed questions but nothing specific", pts: 1 },
      { text: "I've tried a few techniques", pts: 3 },
      { text: 'Yes, I write detailed prompts', pts: 5 },
    ],
  },
  {
    id: 'q3', text: "Which best describes your business's current AI usage?",
    type: 'single' as const,
    options: [
      { text: 'We use no AI at all', pts: 0 },
      { text: 'One or two employees experiment with it', pts: 2 },
      { text: 'AI is used informally in a few tasks', pts: 3 },
      { text: 'We have some AI workflows in place', pts: 5 },
    ],
  },
  {
    id: 'q4', text: 'How confident are you explaining AI to your team?',
    type: 'single' as const,
    options: [
      { text: 'Not at all confident', pts: 0 },
      { text: 'Slightly — I know the basics', pts: 2 },
      { text: 'Moderately confident', pts: 3 },
      { text: 'Very confident', pts: 5 },
    ],
  },
  {
    id: 'q5', text: 'Which AI tools have you used? (select all that apply)',
    type: 'multi' as const,
    options: [
      { text: 'ChatGPT', pts: 1 },
      { text: 'Claude', pts: 1 },
      { text: 'Gemini', pts: 1 },
      { text: 'Perplexity', pts: 1 },
      { text: 'Midjourney / DALL-E', pts: 1 },
      { text: 'GitHub Copilot', pts: 1 },
      { text: 'None of these', pts: 0 },
    ],
  },
  {
    id: 'q6', text: "What's your primary goal for learning AI?",
    type: 'single' as const,
    options: [
      { text: 'Save time on repetitive tasks', pts: 3 },
      { text: 'Generate content and marketing materials', pts: 3 },
      { text: 'Automate business workflows', pts: 3 },
      { text: 'Understand AI so I can lead my team', pts: 3 },
    ],
  },
  {
    id: 'q7', text: 'How soon are you looking to implement AI in your business?',
    type: 'single' as const,
    options: [
      { text: "I'm just exploring for now", pts: 1 },
      { text: 'Within 3–6 months', pts: 2 },
      { text: 'Within the next month or two', pts: 3 },
      { text: 'Immediately — I need this now', pts: 4 },
    ],
  },
]

const tiers = [
  {
    max: 8, label: 'AI Beginner', badge: 'glass-badge--aqua',
    headline: "You're in the right place.",
    body: "Zero to Fluent was built exactly for where you are right now. You'll leave with practical skills you can use Monday morning — no prior experience required.",
  },
  {
    max: 14, label: 'AI Curious', badge: 'glass-badge--violet',
    headline: "You're ready to go deeper.",
    body: "You've dipped your toes in — now it's time to make AI work for your business. This workshop will fill the gaps and give you a real implementation plan.",
  },
  {
    max: 99, label: 'AI Aware', badge: 'glass-badge--lime',
    headline: "You know enough to know you need more.",
    body: "You're ahead of most business owners — but knowing about AI and using it systematically are very different things. Day 2 automation content will unlock the next level.",
  },
]

/* ── Option card style (reusable) ────────────────────────────── */
const optionCardBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(0,0,0,0.08)',
  background: 'rgba(0,0,0,0.02)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '14px',
  color: '#1e3a5c',
  lineHeight: '1.45',
}

const optionCardHover: React.CSSProperties = {
  ...optionCardBase,
  background: 'rgba(37,99,235,0.05)',
  borderColor: 'rgba(37,99,235,0.25)',
}

const optionCardSelected: React.CSSProperties = {
  ...optionCardBase,
  background: 'rgba(37,99,235,0.06)',
  borderColor: 'rgba(37,99,235,0.35)',
  boxShadow: '0 0 0 1px rgba(37,99,235,0.15)',
}

export default function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  const q = questions[step] || questions[0]
  const isLast = step === questions.length - 1

  const handleSingle = (pts: number) => {
    const updated = { ...answers, [q.id]: [pts] }
    setAnswers(updated)
    if (isLast) finish(updated)
    else setStep(s => s + 1)
  }

  const handleMulti = (idx: number, pts: number) => {
    const cur = answers[q.id] || []
    const exists = cur.includes(idx)
    setAnswers({ ...answers, [q.id]: exists ? cur.filter(p => p !== idx) : [...cur, idx] })
  }

  const advanceMulti = () => {
    const updated = { ...answers }
    if (!updated[q.id]) updated[q.id] = []
    if (isLast) finish(updated)
    else setStep(s => s + 1)
  }

  const finish = (ans: Record<string, number[]>) => {
    let total = 0
    questions.forEach(q => {
      if (q.type === 'multi') {
        // For multi-select, sum the actual pts of selected options
        const selectedIdxs = ans[q.id] || []
        const pts = selectedIdxs.reduce((sum, idx) => sum + (q.options[idx]?.pts || 0), 0)
        total += q.id === 'q5' ? Math.min(pts, 3) : pts
      } else {
        const pts = (ans[q.id] || []).reduce((a, b) => a + b, 0)
        total += pts
      }
    })
    setScore(total)
    setStep(questions.length)
  }

  const handleSubmit = () => {
    if (!email) return
    setSubmitted(true)
    showToast('success', 'Report sent!', `Your AI readiness results are on their way to ${email}`)
  }

  const tier = tiers.find(t => score <= t.max) || tiers[tiers.length - 1]
  const pct = Math.round((step / questions.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="relative w-full max-w-lg glass rounded-3xl overflow-hidden"
        style={{
          border: '1px solid rgba(37,99,235,0.2)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 60px rgba(37,99,235,0.08)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}>

        {/* Top accent stripe */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563EB, #0EA5E9, #06B6D4)' }} />

        <div className="p-8 md:p-10">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', color: '#697386' }}
            onMouseOver={e => (e.currentTarget.style.color = '#1e3a5c')}
            onMouseOut={e => (e.currentTarget.style.color = '#697386')}>
            ✕
          </button>

          {/* Progress bar */}
          {step < questions.length && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="glass-badge glass-badge--indigo">
                  Question {step + 1} of {questions.length}
                </span>
                <span className="text-xs font-display font-medium" style={{ color: '#697386' }}>{pct}% complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          {/* Question */}
          {step < questions.length && (
            <div>
              <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#0A2540' }}>{q.text}</h3>

              {q.type === 'single' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((opt, i) => {
                    const key = `${q.id}-${i}`
                    const isHovered = hoveredOption === key
                    return (
                      <div
                        key={opt.text}
                        role="button"
                        tabIndex={0}
                        style={isHovered ? optionCardHover : optionCardBase}
                        onMouseEnter={() => setHoveredOption(key)}
                        onMouseLeave={() => setHoveredOption(null)}
                        onClick={() => handleSingle(opt.pts)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSingle(opt.pts) }}
                      >
                        <span style={{
                          width: '18px', height: '18px', borderRadius: '50%',
                          border: isHovered ? '1.5px solid rgba(37,99,235,0.5)' : '1.5px solid rgba(0,0,0,0.2)',
                          background: isHovered ? 'rgba(37,99,235,0.06)' : 'rgba(0,0,0,0.03)',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                        }} />
                        {opt.text}
                      </div>
                    )
                  })}
                </div>
              )}

              {q.type === 'multi' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((opt, i) => {
                    const isSelected = (answers[q.id] || []).includes(i)
                    const key = `${q.id}-${i}`
                    const isHovered = hoveredOption === key
                    return (
                      <div
                        key={opt.text}
                        role="button"
                        tabIndex={0}
                        style={isSelected ? optionCardSelected : isHovered ? optionCardHover : optionCardBase}
                        onMouseEnter={() => setHoveredOption(key)}
                        onMouseLeave={() => setHoveredOption(null)}
                        onClick={() => handleMulti(i, opt.pts)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleMulti(i, opt.pts) }}
                      >
                        {/* Checkbox indicator */}
                        <span style={{
                          width: '18px', height: '18px', borderRadius: '5px',
                          border: isSelected ? 'none' : isHovered ? '1.5px solid rgba(37,99,235,0.5)' : '1.5px solid rgba(0,0,0,0.2)',
                          background: isSelected ? 'linear-gradient(135deg, #2563EB, #3B82F6)' : isHovered ? 'rgba(37,99,235,0.06)' : 'rgba(0,0,0,0.03)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 10px rgba(37,99,235,0.35)' : 'none',
                        }}>
                          {isSelected && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                              <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        {opt.text}
                      </div>
                    )
                  })}
                  <button onClick={advanceMulti}
                    className="w-full py-3.5 rounded-xl font-display font-semibold text-white transition-all duration-200 cursor-pointer mt-2 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', boxShadow: '0 0 24px rgba(37,99,235,0.3)' }}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(37,99,235,0.5), 0 4px 16px rgba(0,0,0,0.1)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.3)'}>
                    {isLast ? 'See My Results →' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {step === questions.length && (
            <div>
              <div className="text-center mb-8">
                <span className={`glass-badge ${tier.badge}`}>
                  <span className="glass-badge__dot" />
                  {tier.label}
                </span>
                <h3 className="font-display font-bold text-2xl mt-4 mb-3" style={{ color: '#0A2540' }}>{tier.headline}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#425466' }}>{tier.body}</p>

                {/* Score progress bar */}
                <div className="progress-wrap mt-6">
                  <div className="progress-label">
                    <span>Your AI Readiness Score</span>
                    <span className="font-bold" style={{ color: '#2563EB' }}>{score} / 27</span>
                  </div>
                  <div className="progress-bar" style={{ height: '10px' }}>
                    <div className="progress-bar__fill" style={{ width: `${Math.round((score / 27) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Primary CTA — always visible */}
              <a href="https://buy.stripe.com/placeholder" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center font-display font-bold text-lg text-white py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#2563EB 0%,#0EA5E9 50%,#06B6D4 100%)', boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(37,99,235,0.55), 0 8px 24px rgba(6,182,212,0.3)')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(37,99,235,0.4)')}>
                Reserve My Seat — $697 →
              </a>
              <p className="text-xs text-center mt-2 mb-6" style={{ color: '#697386' }}>Only 28 seats remaining · April 21–22, Frisco TX</p>

              {/* Divider */}
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent)', margin: '0 0 20px' }} />

              {/* Secondary — email capture for report */}
              {!submitted ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p className="text-xs font-display font-semibold text-center" style={{ color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>
                    Or get your full report emailed to you
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="glass-input-wrap" style={{ flex: 1 }}>
                      <input
                        type="email"
                        className="glass-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-label="Email address"
                      />
                    </div>
                    <button onClick={handleSubmit}
                      className="px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white transition-all duration-200 cursor-pointer hover:-translate-y-0.5 whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)', boxShadow: '0 0 16px rgba(37,99,235,0.25)' }}>
                      Send →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="glass-badge glass-badge--lime" style={{ display: 'inline-flex' }}>
                    <span className="glass-badge__dot" />
                    Report sent to {email}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
