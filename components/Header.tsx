'use client'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#pricing',    label: 'Pricing'    },
  { href: '#faq',        label: 'FAQ'        },
  { href: '#venue',      label: 'Venue'      },
]

export default function Header({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [visible,   setVisible]   = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [pill,      setPill]      = useState({ w: 0, x: 0, show: false })
  const [glare,     setGlare]     = useState({ x: '50%', y: '50%' })

  const navItemsRef = useRef<HTMLDivElement>(null)
  const btnRefs     = useRef<(HTMLAnchorElement | null)[]>([])

  /* ── show/hide after hero ── */
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      setVisible(window.scrollY > (hero?.offsetHeight ?? 600) - 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── scroll-based active section ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
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

  /* ── update pill geometry ── */
  const updatePill = useCallback((idx: number) => {
    const btn = btnRefs.current[idx]
    const container = navItemsRef.current
    if (!btn || !container) { setPill(p => ({ ...p, show: false })); return }
    setPill({ w: btn.offsetWidth, x: btn.offsetLeft, show: true })
  }, [])

  useEffect(() => {
    if (activeIdx < 0) { setPill(p => ({ ...p, show: false })); return }
    updatePill(activeIdx)
  }, [activeIdx, updatePill])

  useEffect(() => {
    const onResize = () => { if (activeIdx >= 0) updatePill(activeIdx) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeIdx, updatePill])

  /* ── mouse glare ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlare({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` })
  }, [])

  const handleNavClick = (idx: number) => {
    setActiveIdx(idx)
    setMenuOpen(false)
  }

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '16px',
    left: '50%',
    transform: visible
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(-14px)',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    zIndex: 40,
    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
  }

  return (
    <header style={headerStyle}>
      <nav
        className="liq-nav"
        onMouseMove={handleMouseMove}
        aria-label="Main navigation"
      >
        {/* Mouse-tracking glare */}
        <div className="liq-glare-wrap">
          <div
            className="liq-glare"
            style={{ '--gx': glare.x, '--gy': glare.y } as React.CSSProperties}
          />
        </div>

        {/* Logo */}
        <a href="#hero" aria-label="Zero to Fluent — back to top"
          className="relative z-10 flex items-center pl-2 pr-3 h-9 flex-shrink-0">
          <Image src="/logo-nav.webp" alt="Zero to Fluent" width={140} height={64} className="object-contain" style={{ height: '28px', width: 'auto' }} />
        </a>

        {/* Divider */}
        <div className="liq-divider" />

        {/* Nav links — desktop */}
        <div ref={navItemsRef} className="hidden md:flex relative">
          {pill.show && (
            <div
              className="liq-pill"
              style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
            />
          )}
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={el => { btnRefs.current[i] = el }}
              className={`liq-btn ${activeIdx === i ? 'active' : ''}`}
              onClick={() => handleNavClick(i)}
            >
              <span className="liq-btn-inner">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Divider — desktop only */}
        <div className="liq-divider hidden md:block" />

        {/* Reserve CTA — desktop */}
        <a href="#pricing"
          className="hidden md:inline-flex items-center relative z-10 font-display font-bold text-sm text-white px-5 h-9 rounded-full flex-shrink-0 transition-all duration-200 hover:-translate-y-px"
          style={{
            background: 'linear-gradient(135deg,#2563EB,#06B6D4)',
            boxShadow: '0 0 16px rgba(249,115,22,0.35)',
          }}>
          Reserve — $697
        </a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden relative z-10 flex flex-col justify-center gap-[5px] w-9 h-9 ml-1 rounded-full cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          style={{ background: 'transparent', border: 'none' }}
        >
          <span className={`block mx-auto h-px bg-slate-600 transition-all duration-300 ${menuOpen ? 'w-4 translate-y-[6px] rotate-45' : 'w-4'}`}/>
          <span className={`block mx-auto w-4 h-px bg-slate-600 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block mx-auto h-px bg-slate-600 transition-all duration-300 ${menuOpen ? 'w-4 -translate-y-[6px] -rotate-45' : 'w-4'}`}/>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 p-2 flex flex-col gap-1 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}>
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 rounded-2xl font-display font-semibold text-sm transition-colors"
              style={{ color: 'rgba(0,20,60,0.55)' }}
              onMouseOver={e => (e.currentTarget.style.color = 'rgba(0,20,60,0.85)')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(0,20,60,0.55)')}>
              {link.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)}
            className="mt-1 mx-2 text-center font-display font-bold text-sm text-white py-3 rounded-2xl"
            style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}>
            Reserve Seat — $697
          </a>
        </div>
      )}
    </header>
  )
}
