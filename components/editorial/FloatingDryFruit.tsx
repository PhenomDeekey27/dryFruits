'use client'

import { useEffect, useRef, useState } from 'react'

type Variant = 'almond' | 'cashew' | 'pistachio' | 'walnut' | 'raisin'

const SHAPES: Record<Variant, { svg: React.ReactNode; aspect: number }> = {
  almond: {
    aspect: 1,
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="50" cy="50" rx="22" ry="42" transform="rotate(15 50 50)" />
        <ellipse cx="46" cy="48" rx="6" ry="22" fill="rgba(255,255,255,0.18)" transform="rotate(15 50 50)" />
      </svg>
    ),
  },
  cashew: {
    aspect: 1,
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M30 50 Q30 20 60 28 Q82 36 78 60 Q72 78 50 76 Q32 74 30 50Z" />
        <path d="M40 48 Q44 38 58 40" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  pistachio: {
    aspect: 1,
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="50" cy="52" rx="24" ry="32" />
        <path d="M44 30 Q50 22 56 30 L56 38 Q50 36 44 38 Z" fill="rgba(255,255,255,0.22)" />
      </svg>
    ),
  },
  walnut: {
    aspect: 1,
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="34" />
        <path d="M50 18 V82 M22 42 Q50 36 78 42 M22 60 Q50 66 78 60" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  raisin: {
    aspect: 1,
    svg: (
      <svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="50" cy="50" rx="20" ry="26" />
        <path d="M40 40 Q50 35 60 40 M40 55 Q50 60 60 55" stroke="rgba(0,0,0,0.22)" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
}

const VARIANT_COLOR: Record<Variant, string> = {
  almond: 'var(--color-primary, #74554b)',
  cashew: 'var(--color-secondary-fixed-dim, #e9c176)',
  pistachio: '#7e9a4a',
  walnut: 'var(--color-tertiary, #655b4c)',
  raisin: '#5a2e2a',
}

type Item = {
  variant: Variant
  size: number
  top: string
  left: string
  delay: number
  duration: number
  rotate: number
  drift: number
  opacity: number
}

const ITEMS: Item[] = [
  { variant: 'almond',    size: 56, top: '12%', left: '6%',  delay: 0,   duration: 8,  rotate: 12,  drift: 18, opacity: 0.16 },
  { variant: 'pistachio', size: 42, top: '24%', left: '88%', delay: 1.2, duration: 9.5, rotate: -8, drift: 14, opacity: 0.18 },
  { variant: 'cashew',    size: 64, top: '58%', left: '4%',  delay: 0.6, duration: 10, rotate: -16, drift: 22, opacity: 0.14 },
  { variant: 'walnut',    size: 48, top: '70%', left: '92%', delay: 2.0, duration: 11, rotate: 20,  drift: 16, opacity: 0.13 },
  { variant: 'raisin',    size: 32, top: '38%', left: '50%', delay: 1.8, duration: 7.5, rotate: 0,  drift: 12, opacity: 0.10 },
]

export default function FloatingDryFruit() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block"
    >
      {ITEMS.map((it, i) => {
        const shape = SHAPES[it.variant]
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: it.top,
              left: it.left,
              width: it.size,
              height: it.size * shape.aspect,
              color: VARIANT_COLOR[it.variant],
              opacity: it.opacity,
              animation: reduced
                ? 'none'
                : `float-${i} ${it.duration}s ease-in-out ${it.delay}s infinite`,
            }}
          >
            {shape.svg}
            <style jsx>{`
              @keyframes float-${i} {
                0%, 100% {
                  transform: translate3d(0, 0, 0) rotate(${it.rotate}deg);
                }
                50% {
                  transform: translate3d(${it.drift}px, ${-it.drift * 0.8}px, 0)
                    rotate(${it.rotate + (i % 2 ? 8 : -8)}deg);
                }
              }
            `}</style>
          </div>
        )
      })}
    </div>
  )
}
