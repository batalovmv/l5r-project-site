'use client'

import { useEffect, useState } from 'react'

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reduceMotion) return

    let raf = 0

    const update = () => {
      raf = 0
      const el = document.documentElement
      const scrollTop = window.scrollY || el.scrollTop || 0

      const docsRoot = document.querySelector<HTMLElement>('[data-scroll-progress-root="docs"]')
      if (docsRoot) {
        const rect = docsRoot.getBoundingClientRect()
        const start = rect.top + scrollTop
        const height = Math.max(1, rect.height)
        const viewport = window.innerHeight || el.clientHeight || 0
        const max = Math.max(1, height - viewport)
        setProgress(clamp01((scrollTop - start) / max))
        return
      }

      const scrollHeight = el.scrollHeight || 0
      const clientHeight = el.clientHeight || window.innerHeight || 0
      const max = Math.max(1, scrollHeight - clientHeight)
      setProgress(clamp01(scrollTop / max))
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
