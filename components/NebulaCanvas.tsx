'use client'
import { useEffect, useRef } from 'react'

const FRAMES = Array.from({ length: 8 }, (_, i) => `/nebula/frame-${String(i + 1).padStart(2, '0')}.webp`)

export default function NebulaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgsRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(0)
  const targetRef = useRef(0)   // fractional frame index from scroll
  const displayRef = useRef(0)  // smoothed fractional frame index
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const syncSize = () => {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }

    const drawBlended = (fractional: number) => {
      syncSize()
      const lo = Math.floor(fractional)
      const hi = Math.min(lo + 1, FRAMES.length - 1)
      const t = fractional - lo

      const imgLo = imgsRef.current[lo]
      const imgHi = imgsRef.current[hi]
      if (!imgLo?.complete || !imgLo.naturalWidth) return

      ctx.globalAlpha = 1
      ctx.drawImage(imgLo, 0, 0, canvas.width, canvas.height)

      if (t > 0 && imgHi?.complete && imgHi.naturalWidth) {
        ctx.globalAlpha = t
        ctx.drawImage(imgHi, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }
    }

    // Animation loop — lerp displayRef toward targetRef each frame
    const loop = () => {
      const delta = targetRef.current - displayRef.current
      if (Math.abs(delta) > 0.001) {
        displayRef.current += delta * 0.08  // ease factor: lower = smoother/slower
        drawBlended(displayRef.current)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    // Preload all frames
    const images = FRAMES.map((src, i) => {
      const img = new window.Image()
      img.src = src
      img.onload = () => {
        loadedRef.current++
        if (i === 0) drawBlended(0)
      }
      return img
    })
    imgsRef.current = images

    // Scroll → target fractional frame
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScroll = () => {
      if (reducedMotion) return
      const hero = document.getElementById('hero')
      if (!hero) return
      const progress = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.85), 0), 1)
      targetRef.current = progress * (FRAMES.length - 1)
    }

    const ro = new ResizeObserver(() => drawBlended(displayRef.current))
    ro.observe(canvas)
    window.addEventListener('scroll', onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  )
}
