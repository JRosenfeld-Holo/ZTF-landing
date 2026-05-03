import Image from 'next/image'

const tools: { name: string; by: string; src: string; brand: string }[] = [
  { name: 'Claude', by: 'Anthropic', src: '/tool-claude.svg', brand: '#CC785C' },
  { name: 'ChatGPT', by: 'OpenAI', src: '/chatgpt-logo.webp', brand: '#10A37F' },
  { name: 'Gemini', by: 'Google', src: '/tool-gemini.svg', brand: '#4285F4' },
  { name: 'Perplexity', by: 'AI Search', src: '/tool-perplexity.svg', brand: '#1FB8CD' },
  { name: 'Cursor', by: 'AI Editor', src: '/tool-cursor.svg', brand: '#1C1C1C' },
  { name: 'n8n', by: 'Automation', src: '/tool-n8n.svg', brand: '#EA4B71' },
  { name: 'Zapier', by: 'Automation', src: '/tool-zapier.svg', brand: '#FF4F00' },
]

function ToolCard({ t }: { t: typeof tools[0] }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 rounded-2xl mx-3"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)',
        borderTop: `2.5px solid ${t.brand}`,
      }}
      role="img"
      aria-label={`${t.name} — ${t.by}`}
    >
      <Image
        src={t.src}
        alt={t.name}
        width={28}
        height={28}
        className="object-contain flex-shrink-0"
        unoptimized
      />
      <div>
        <p className="font-display font-bold text-sm leading-none" style={{ color: '#0A2540' }}>{t.name}</p>
        <p className="text-[11px] mt-0.5" style={{ color: '#697386' }}>{t.by}</p>
      </div>
    </div>
  )
}

export default function ToolsCarousel() {
  return (
    <section
      aria-label="AI tools you will learn"
      className="relative z-10 py-14 overflow-hidden"
      style={{
        background: '#F8FAFC',
        borderTop: '1px solid rgba(37,99,235,0.06)',
        borderBottom: '1px solid rgba(37,99,235,0.06)',
      }}
    >
      <div className="text-center mb-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#697386' }}>
          Master the tools powering modern business
        </p>
        <div className="mx-auto mt-3" style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)' }} />
      </div>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex marquee-track" style={{ width: 'max-content' }}>
          {/* Two copies for seamless loop */}
          {[...tools, ...tools].map((t, i) => (
            <ToolCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
