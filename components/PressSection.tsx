'use client'
import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const HEADLINES = [
  {
    pub: 'Forbes',
    logo: '/press-forbes.png',
    headline: 'Why Small Business Owners Who Ignore AI Are Falling Behind — Fast',
    excerpt: 'A new wave of AI-fluent entrepreneurs is outpacing competitors on cost, speed, and customer experience. The gap is growing every quarter.',
  },
  {
    pub: 'Wall Street Journal',
    logo: '/press-wsj.png',
    headline: 'The AI Skills Gap Is Costing Small Businesses Thousands Per Month',
    excerpt: 'SMBs spending 40% more hours on tasks their AI-enabled competitors automate. Training — not tools — is the bottleneck.',
  },
  {
    pub: 'USA Today',
    logo: '/press-usatoday.png',
    headline: "America's Small Businesses Face a New Competitive Threat: AI Fluency",
    excerpt: 'From customer service to bookkeeping, AI is reshaping what it means to run an efficient small business in 2025.',
  },
  {
    pub: 'Bloomberg',
    logo: '/press-bloomberg.png',
    headline: 'SMBs That Adopted AI Early Are Reporting 35% Faster Growth',
    excerpt: 'Early data from 1,200 small businesses shows a clear correlation between AI adoption and revenue growth over 18 months.',
  },
]

export default function PressSection() {
  const ref = useReveal()

  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6" style={{ background: '#FFFFFF' }}>
      <div ref={ref} className="reveal max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#8898aa' }}>
            As Covered In
          </p>
          <h2 className="font-display font-semibold leading-tight"
            style={{ fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '-0.02em', color: '#1e3a5c' }}>
            What the Media Is Saying About AI and Small Business
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {HEADLINES.map(h => (
            <div key={h.headline}
              className="glass rounded-2xl overflow-hidden flex flex-col"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="px-5 pt-4 pb-3 flex items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <Image
                  src={h.logo}
                  alt={h.pub}
                  width={120}
                  height={28}
                  className="object-contain"
                  style={{ height: '22px', width: 'auto', filter: 'grayscale(100%) opacity(0.55)' }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="font-display font-semibold text-sm leading-snug mb-3" style={{ color: '#1e3a5c' }}>
                  &ldquo;{h.headline}&rdquo;
                </p>
                <p className="text-xs leading-relaxed mt-auto" style={{ color: '#697386' }}>{h.excerpt}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
