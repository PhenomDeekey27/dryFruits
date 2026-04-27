'use client'

import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    n: '01',
    t: 'Freshness, kept.',
    d: 'Sealed within hours of sorting — no transit ovens, no inert gases. The fruit arrives still warm from its origin.',
  },
  {
    n: '02',
    t: 'Handpicked, always.',
    d: 'Sorted on linen-covered tables. Up to a third of every harvest is set aside before reaching you.',
  },
  {
    n: '03',
    t: 'Quietly packaged.',
    d: 'Linen pouches, untreated card, soy ink. The package weighs almost nothing — the fruit speaks for itself.',
  },
  {
    n: '04',
    t: 'Sourced with care.',
    d: 'Fourteen named partners. Every pouch traces back to a single grove, a single farmer, a single afternoon.',
  },
]

export default function FeaturesSection() {
  const ref = useRef<HTMLElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.18 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16"
      style={{ background: 'var(--color-surface, #fcf9f8)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Header */}
          <div className="lg:col-span-5">
            <div
              className="text-[12px] uppercase tracking-[0.32em] mb-4"
              style={{ color: 'var(--color-on-surface-variant, #504441)' }}
            >
              06 — The Promise
            </div>
            <h2
              className="font-extrabold leading-[0.98] tracking-[-0.025em] mb-8"
              style={{
                fontFamily: 'Epilogue, sans-serif',
                color: 'var(--color-on-surface, #1b1c1c)',
                fontSize: 'clamp(36px, 5.2vw, 64px)',
              }}
            >
              Four <em className="italic font-light">small</em> commitments.
            </h2>
            <p
              className="text-[15px] sm:text-[16px] leading-[1.7] max-w-md"
              style={{ color: 'var(--color-on-surface-variant, #504441)' }}
            >
              Nothing radical. Just the way it ought to be done — kept slowly
              and carefully, all the way to your kitchen.
            </p>
          </div>

          {/* Right: Accordion-styled feature list */}
          <div className="lg:col-span-7">
            <div
              className="border-t"
              style={{ borderColor: 'var(--color-outline-variant, #d4c3be)' }}
            >
              {FEATURES.map((f, i) => {
                const active = activeIdx === i
                return (
                  <div
                    key={f.n}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    className="border-b cursor-pointer group"
                    style={{
                      borderColor: 'var(--color-outline-variant, #d4c3be)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.7s cubic-bezier(.2,.8,.2,1) ${
                        i * 0.08
                      }s`,
                    }}
                  >
                    <div className="flex items-baseline gap-6 sm:gap-8 py-6 sm:py-7">
                      <span
                        className="text-[13px] font-medium pt-1"
                        style={{
                          fontFamily: 'Epilogue, sans-serif',
                          color: active
                            ? 'var(--color-secondary, #775a19)'
                            : 'var(--color-on-surface-variant, #504441)',
                          transition: 'color 0.4s',
                        }}
                      >
                        {f.n}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="text-[22px] sm:text-[28px] md:text-[32px] font-bold leading-tight tracking-[-0.015em]"
                          style={{
                            fontFamily: 'Epilogue, sans-serif',
                            color: active
                              ? 'var(--color-on-surface, #1b1c1c)'
                              : 'var(--color-outline, #827470)',
                            transition: 'color 0.4s',
                          }}
                        >
                          {f.t}
                        </h3>
                        <div
                          className="overflow-hidden"
                          style={{
                            maxHeight: active ? '200px' : '0px',
                            opacity: active ? 1 : 0,
                            transition:
                              'max-height 0.55s cubic-bezier(.2,.8,.2,1), opacity 0.4s',
                          }}
                        >
                          <p
                            className="text-[14px] sm:text-[15px] leading-[1.7] mt-4 max-w-xl"
                            style={{
                              color: 'var(--color-on-surface-variant, #504441)',
                            }}
                          >
                            {f.d}
                          </p>
                        </div>
                      </div>
                      <span
                        aria-hidden
                        className="text-[20px] pt-1"
                        style={{
                          color: active
                            ? 'var(--color-secondary, #775a19)'
                            : 'var(--color-outline, #827470)',
                          transform: active ? 'rotate(45deg)' : 'rotate(0)',
                          transition: 'all 0.4s cubic-bezier(.2,.8,.2,1)',
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
