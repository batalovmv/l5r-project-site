'use client'

import { useEffect } from 'react'

function normalizeDelay(value: string | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (trimmed.endsWith('ms') || trimmed.endsWith('s')) return trimmed
  const n = Number(trimmed)
  if (!Number.isFinite(n)) return null
  return `${n}ms`
}

export default function ScrollEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const targets = new WeakSet<Element>()

    const elements = () => Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    const applyDelay = (el: HTMLElement) => {
      const delay = normalizeDelay(el.dataset.revealDelay)
      if (delay) el.style.setProperty('--reveal-delay', delay)
    }

    const revealNow = (el: HTMLElement) => {
      el.classList.add('reveal-in')
    }

    const observe = (observer: IntersectionObserver | null, el: HTMLElement) => {
      if (targets.has(el)) return
      targets.add(el)
      applyDelay(el)

      if (reduceMotion) {
        revealNow(el)
        return
      }

      observer?.observe(el)
    }

    const nodes = elements()
    if (nodes.length === 0) return

    // Avoid hiding above-the-fold content before we can mark it as revealed.
    const vh = window.innerHeight || document.documentElement.clientHeight || 0
    for (const el of nodes) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= vh * 0.9) revealNow(el)
    }

    document.documentElement.classList.add('reveal-ready')

    const observer = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries, obs) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue
              const el = entry.target as HTMLElement
              revealNow(el)
              obs.unobserve(el)
            }
          },
          { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
        )

    for (const el of nodes) observe(observer, el)

    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const added of Array.from(m.addedNodes)) {
          if (!(added instanceof HTMLElement)) continue
          if (added.matches?.('[data-reveal]')) observe(observer, added)
          const inner = added.querySelectorAll?.<HTMLElement>('[data-reveal]')
          inner?.forEach((el) => observe(observer, el))
        }
      }
    })

    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutation.disconnect()
      observer?.disconnect()
    }
  }, [])

  return null
}
