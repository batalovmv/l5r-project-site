'use client'

import { useEffect } from 'react'

function shouldEnablePointerEffects(): boolean {
  if (typeof window === 'undefined') return false
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  const canHover = window.matchMedia?.('(hover: hover)')?.matches ?? false
  return !reduceMotion && canHover
}

export default function HeroPointerGlow() {
  useEffect(() => {
    if (!shouldEnablePointerEffects()) return

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.hero-surface'))
    if (nodes.length === 0) return

    const cleanups: Array<() => void> = []

    for (const el of nodes) {
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100
        const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100
        el.style.setProperty('--hx', `${x.toFixed(2)}%`)
        el.style.setProperty('--hy', `${y.toFixed(2)}%`)
        el.style.setProperty('--hglow', '1')
      }

      const onLeave = () => {
        el.style.setProperty('--hglow', '0')
      }

      el.addEventListener('pointermove', onMove, { passive: true })
      el.addEventListener('pointerleave', onLeave, { passive: true })

      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove as any)
        el.removeEventListener('pointerleave', onLeave as any)
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return null
}

