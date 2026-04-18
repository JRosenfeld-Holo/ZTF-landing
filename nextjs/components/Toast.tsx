'use client'
import { useState, useCallback, useEffect, useRef } from 'react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: number
  variant: ToastVariant
  title: string
  desc?: string
  exiting?: boolean
}

const ICONS: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

let globalShow: ((variant: ToastVariant, title: string, desc?: string) => void) | null = null
export function showToast(variant: ToastVariant, title: string, desc?: string) {
  globalShow?.(variant, title, desc)
}

function ToastItem({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  return (
    <div
      className={`glass-toast glass-toast--${toast.variant} ${toast.exiting ? 'is-exiting' : ''}`}
      onClick={() => onDismiss(toast.id)}
      role="alert"
      aria-live="assertive"
    >
      <span className="glass-toast__icon">{ICONS[toast.variant]}</span>
      <div className="glass-toast__body">
        <div className="glass-toast__title">{toast.title}</div>
        {toast.desc && <div className="glass-toast__desc">{toast.desc}</div>}
      </div>
      <span className="glass-toast__close" aria-label="Dismiss">✕</span>
    </div>
  )
}

export default function ToastRegion() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 260)
  }, [])

  const show = useCallback((variant: ToastVariant, title: string, desc?: string) => {
    const id = ++counter.current
    setToasts(prev => [...prev, { id, variant, title, desc }])
    setTimeout(() => dismiss(id), 4000)
  }, [dismiss])

  useEffect(() => {
    globalShow = show
    return () => { globalShow = null }
  }, [show])

  return (
    <div className="glass-toast-region" aria-label="Notifications" role="region">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={dismiss} />)}
    </div>
  )
}
