'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FRAME_COUNT = 240
const FRAME_PATH = (i: number) =>
  `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

export default function EditorialHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Preload frames (priority decoding for first ~30, lazy for rest)
  useEffect(() => {
    const mq = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
    if (mq?.matches) setReducedMotion(true)

    const imgs: HTMLImageElement[] = []
    let cancelled = false

    const loadBatch = (start: number, end: number) =>
      Promise.all(
        Array.from({ length: end - start }, (_, k) => {
          const i = start + k + 1
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.decoding = 'async'
            img.src = FRAME_PATH(i)
            img.onload = () => {
              imgs[i - 1] = img
              if (!cancelled) setLoaded((n) => n + 1)
              resolve()
            }
            img.onerror = () => resolve()
          })
        }),
      )

    ;(async () => {
      // Critical first batch — render hero immediately
      await loadBatch(0, 24)
      framesRef.current = imgs
      drawFrame(0)
      // Background batches
      await loadBatch(24, 80)
      await loadBatch(80, 160)
      await loadBatch(160, FRAME_COUNT)
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Canvas sizing — DPR-aware, responsive
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawFrame(currentFrameRef.current)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(idx)))]
    if (!img) return

    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    ctx.clearRect(0, 0, cw, ch)

    // cover-fit
    const ir = img.width / img.height
    const cr = cw / ch
    let dw = cw, dh = ch, dx = 0, dy = 0
    if (ir > cr) {
      dh = ch
      dw = ch * ir
      dx = (cw - dw) / 2
    } else {
      dw = cw
      dh = cw / ir
      dy = (ch - dh) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  // Scroll handling — rAF loop with eased frame scrubbing
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const p = total > 0 ? scrolled / total : 0
      setProgress(p)
      targetFrameRef.current = p * (FRAME_COUNT - 1)
    }

    const tick = () => {
      const target = targetFrameRef.current
      const current = currentFrameRef.current
      // Ease toward target — feels cinematic, dampens jitter
      const next = reducedMotion ? target : current + (target - current) * 0.18
      if (Math.abs(next - current) > 0.01 || reducedMotion) {
        currentFrameRef.current = next
        drawFrame(next)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    onScroll()
    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  const loadPct = Math.round((loaded / FRAME_COUNT) * 100)

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: '300vh',
        background: 'var(--color-inverse-surface, #1b1c1c)',
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — cinematic frame stage */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />

        {/* Vignette overlay for cinematic blend */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Top gradient — for navbar legibility */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)',
          }}
        />

        {/* Editorial type — fades / shifts based on scroll */}
        <div className="absolute inset-0 flex items-end pointer-events-none">
          <div className="w-full px-6 sm:px-10 md:px-16 pb-16 sm:pb-20 md:pb-28">
            <div
              className="max-w-7xl mx-auto"
              style={{
                opacity: 1 - progress * 1.4,
                transform: `translateY(${progress * 30}px)`,
                transition: 'opacity 60ms linear',
              }}
            >
              <span
                className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/70 mb-4 sm:mb-6"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                — A Curated Edition · Vol. 01
              </span>
              <h1
                className="text-white font-extrabold leading-[0.95] tracking-[-0.03em] mb-6 sm:mb-8"
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: 'clamp(40px, 9vw, 132px)',
                }}
              >
                The Quiet Art<br />
                <span className="italic font-light text-white/90">of</span>{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, var(--color-secondary-fixed, #ffdea5), var(--color-primary-fixed, #ffdbd0))',
                  }}
                >
                  Sourcing.
                </span>
              </h1>
              <p
                className="text-white/75 max-w-xl text-[15px] sm:text-[17px] leading-relaxed"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Almonds, cashews, pistachios, walnuts — chosen one farm at a
                time, kept whole, and sent forward without compromise.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center gap-3 text-white/60 text-[10px] uppercase tracking-[0.3em] pointer-events-none"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            opacity: 1 - progress * 2,
          }}
        >
          <span>Scroll</span>
          <div className="w-12 h-px bg-white/40 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Loading indicator (early scroll only) */}
        {loadPct < 30 && (
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-white/50 text-[10px] uppercase tracking-[0.3em]"
               style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Composing · {loadPct}%
          </div>
        )}

        {/* CTA — appears as scroll progresses */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none"
          style={{
            opacity: Math.max(0, (progress - 0.55) * 3),
          }}
        >
          <div className="text-center px-6 pointer-events-auto">
            <p
              className="text-white/70 text-[11px] uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              The Collection Awaits
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'var(--color-surface, #fcf9f8)',
                color: 'var(--color-on-surface, #1b1c1c)',
                fontFamily: 'Epilogue, sans-serif',
              }}
            >
              Shop Premium Dry Fruits
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
