'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#problem',    label: 'Why AI'     },
  { href: '#instructor', label: 'Instructors' },
  { href: '#curriculum', label: 'Curriculum'  },
  { href: '#pricing',    label: 'Pricing'     },
  { href: '#faq',        label: 'FAQ'         },
  { href: '#venue',      label: 'Venue'       },
]

export default function Header({ onOpenQuiz: _onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 100
      let found = -1
      NAV_LINKS.forEach((link, i) => {
        const el = document.querySelector(link.href) as HTMLElement | null
        if (el && el.offsetTop <= y) found = i
      })
      setActiveIdx(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(0,0,0,0.04)',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Main bar */}
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 gap-6">

        {/* Logo */}
        <a href="#hero" aria-label="Zero to Fluent — back to top" className="flex-shrink-0">
          <Image
            src="/logo-header-cropped.png"
            alt="Zero to Fluent"
            width={240}
            height={46}
            className="object-contain"
            style={{ height: '32px', width: 'auto' }}
          />
        </a>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveIdx(i)}
              className="px-3 h-9 inline-flex items-center rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap font-display"
              style={{
                color: activeIdx === i ? '#2563EB' : 'rgba(10,28,60,0.5)',
                fontWeight: activeIdx === i ? 600 : 500,
              }}
              onMouseOver={e => { if (activeIdx !== i) e.currentTarget.style.color = 'rgba(10,28,60,0.85)' }}
              onMouseOut={e => { if (activeIdx !== i) e.currentTarget.style.color = 'rgba(10,28,60,0.5)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Reserve CTA — desktop */}
        <a
          href="#pricing"
          className="hidden md:inline-flex flex-shrink-0 items-center h-10 px-5 rounded-lg text-sm font-bold text-white font-display whitespace-nowrap transition-all duration-200 hover:-translate-y-px"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
          }}
          onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.45)')}
          onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)')}
        >
          Reserve Your Seat
        </a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 flex-shrink-0 cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          style={{ background: 'none', border: 'none' }}
        >
          <span className={`block h-px w-5 bg-slate-500 transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-slate-500 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-slate-500 transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mx-4 mb-2 p-2 flex flex-col gap-0.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium font-display transition-colors"
              style={{ color: 'rgba(10,28,60,0.6)' }}
              onMouseOver={e => (e.currentTarget.style.color = 'rgba(10,28,60,0.9)')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(10,28,60,0.6)')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-1 mx-1 text-center text-sm font-bold font-display text-white py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}
          >
            Reserve Your Seat
          </a>
        </div>
      )}
    </header>
  )
}
