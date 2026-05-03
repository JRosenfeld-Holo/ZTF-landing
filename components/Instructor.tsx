'use client'
import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const INSTRUCTORS = [
  {
    name: 'Jonathan Rosenfeld',
    role: 'AI Implementation Consultant',
    photo: '/instructor.png',
    initials: null,
    gradient: null,
    bio: 'Jonathan has spent 5+ years implementing AI systems inside real businesses — from solo consultants to 50-person firms across DFW. He built Zero to Fluent for people who learn by doing, not watching.',
    tags: ['ChatGPT', 'Claude', 'n8n', 'Prompt Engineering'],
    available: true,
    location: 'Frisco, TX',
  },
  {
    name: 'Sundar',
    role: 'AI Workshop Facilitator',
    photo: null,
    initials: 'S',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    bio: 'AI workflow specialist and automation expert. Full bio and photo coming soon.',
    tags: ['Gemini', 'Zapier', 'Automation'],
    available: false,
    location: 'DFW, TX',
  },
  {
    name: 'Brian Cliette',
    role: 'Growth Strategist & AI Educator',
    photo: null,
    initials: 'BC',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
    bio: 'Growth strategist and AI educator. Full bio and credentials coming soon.',
    tags: ['AI Strategy', 'Growth Marketing', 'Perplexity'],
    available: false,
    location: 'DFW, TX',
  },
]

export default function Instructor() {
  const ref = useReveal()

  return (
    <section id="instructor" className="relative z-10 py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#F8FAFC' }}>
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label" style={{ display: 'inline-flex' }}>The Team</div>
          <h2 className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(28px,4.5vw,48px)', letterSpacing: '-0.025em', color: '#0A2540' }}>
            Meet Your Instructors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {INSTRUCTORS.map((inst) => (
            <div key={inst.name} className="card-premium">
              <div className="glass rounded-[23px] p-6 sm:p-8 flex flex-col items-center text-center h-full">

                {/* Avatar */}
                <div className="mb-5">
                  {inst.photo ? (
                    <div className="w-28 h-28 rounded-2xl overflow-hidden relative mx-auto"
                      style={{ border: '1px solid rgba(37,99,235,0.2)' }}>
                      <Image
                        src={inst.photo}
                        alt={`${inst.name} — instructor`}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-28 h-28 rounded-2xl flex items-center justify-center mx-auto"
                      style={{
                        background: inst.gradient ?? undefined,
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <span className="font-display font-bold text-white" style={{ fontSize: inst.initials && inst.initials.length > 2 ? '20px' : '32px' }}>
                        {inst.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status badge */}
                {inst.available && (
                  <div className="glass-badge glass-badge--lime mb-2">
                    <span className="glass-badge__dot" />
                    Available
                  </div>
                )}
                {!inst.available && (
                  <div className="glass-badge glass-badge--amber mb-2">
                    <span className="glass-badge__dot" />
                    Coming Soon
                  </div>
                )}

                {/* Name & role */}
                <h3 className="font-display font-bold text-xl mb-0.5" style={{ color: '#0A2540' }}>{inst.name}</h3>
                <p className="font-medium text-sm mb-4" style={{ color: '#3B82F6' }}>{inst.role}</p>

                {/* Bio */}
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#425466' }}>{inst.bio}</p>

                {/* Location */}
                {inst.location && (
                  <p className="text-xs mb-4" style={{ color: '#697386' }}>
                    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" className="inline-block mr-1 -mt-px">
                      <path d="M9 2C6 2 3.5 4.5 3.5 7.5c0 4 5.5 8.5 5.5 8.5s5.5-4.5 5.5-8.5C14.5 4.5 12 2 9 2z" stroke="#697386" strokeWidth="1.4"/>
                      <circle cx="9" cy="7.5" r="2" stroke="#697386" strokeWidth="1.4"/>
                    </svg>
                    {inst.location}
                  </p>
                )}

                {/* Tags */}
                {inst.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {inst.tags.map(tool => (
                      <span key={tool} className="glass-chip glass-chip--indigo">
                        <span className="glass-chip__label">{tool}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
