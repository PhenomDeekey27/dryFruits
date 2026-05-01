'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type EditorialProduct = {
  id: string
  index: string
  name: string
  series: string
  origin: string
  notes: string
  imageUrl: string
  price: string
  category?: string
  productId?: string
}

const FALLBACK_PRODUCTS: EditorialProduct[] = [
  {
    id: 'almonds',
    index: '01',
    name: 'Almonds',
    series: 'Signature Reserve',
    origin: 'California · Spring Harvest',
    notes: 'Buttery · Unblanched · Whole',
    imageUrl:
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
    price: '₹1,280',
  },
  {
    id: 'cashews',
    index: '02',
    name: 'Cashews',
    series: 'Royal Selection',
    origin: 'Goa Coast · Rain Sun',
    notes: 'Creamy · W240 Grade · Quiet sweet',
    imageUrl:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80',
    price: '₹1,460',
  },
  {
    id: 'pistachios',
    index: '03',
    name: 'Pistachios',
    series: 'Emerald Grade',
    origin: 'Kerman Valley · Iran',
    notes: 'Verdant · Lightly salted · Open shell',
    imageUrl:
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=900&q=80',
    price: '₹2,080',
  },
  {
    id: 'mixed',
    index: '04',
    name: 'Mixed Reserve',
    series: 'Luxury Blend',
    origin: 'Cross-Sourced · Vol. 01',
    notes: 'Walnut · Almond · Pistachio · Raisin',
    imageUrl:
      'https://images.unsplash.com/photo-1585329543716-b9bc99f1a55c?auto=format&fit=crop&w=900&q=80',
    price: '₹1,920',
  },
]

export default function EditorialProductGrid({
  products,
}: {
  products?: EditorialProduct[]
}) {
  const list = products?.length ? products : FALLBACK_PRODUCTS
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16"
      style={{ background: 'var(--color-surface-container-low, #f6f3f2)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <header className="mb-16 sm:mb-20 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div
              className="text-[12px] uppercase tracking-[0.32em] mb-4"
              style={{ color: 'var(--color-on-surface-variant, #504441)' }}
            >
              03 — The Edition
            </div>
            <h2
              className="font-extrabold leading-[0.98] tracking-[-0.025em]"
              style={{
                fontFamily: 'Epilogue, sans-serif',
                color: 'var(--color-on-surface, #1b1c1c)',
                fontSize: 'clamp(36px, 6vw, 76px)',
              }}
            >
              Four lots,<br />
              <em className="italic font-light">one season</em>.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.28em] border-b pb-1 transition-opacity hover:opacity-60"
            style={{
              color: 'var(--color-on-surface, #1b1c1c)',
              borderColor: 'var(--color-on-surface, #1b1c1c)',
            }}
          >
            View Full Catalogue
            <span aria-hidden>→</span>
          </Link>
        </header>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-14 sm:gap-y-20"
        >
          {list.map((p, i) => {
            let linkHref = `/products`
            if (p.productId) {
              linkHref = `/products/${p.productId}`
            } else if (p.category) {
              linkHref = `/products?category=${encodeURIComponent(p.category)}`
            } else {
              linkHref = `/products?q=${encodeURIComponent(p.name)}`
            }
            return (
            <Link
              key={p.id}
              href={linkHref}
              className="group block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.85s cubic-bezier(.2,.8,.2,1) ${i * 0.09}s`,
              }}
            >
              {/* Image */}
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6"
                style={{ background: 'var(--color-surface-dim, #dcd9d9)' }}
              >
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Index */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    color: 'var(--color-on-surface, #1b1c1c)',
                  }}
                >
                  No. {p.index}
                </div>

                {/* Hover band */}
                <div
                  className="absolute inset-x-0 bottom-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out backdrop-blur-md"
                  style={{
                    background: 'rgba(28,28,28,0.78)',
                    color: '#fff',
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">
                    {p.notes}
                  </p>
                </div>
              </div>

              {/* Type block */}
              <div className="flex items-baseline justify-between mb-2 gap-3">
                <h3
                  className="text-[20px] sm:text-[24px] font-bold leading-tight"
                  style={{
                    fontFamily: 'Epilogue, sans-serif',
                    color: 'var(--color-on-surface, #1b1c1c)',
                  }}
                >
                  {p.name}
                </h3>
                <span
                  className="text-[14px] font-semibold whitespace-nowrap"
                  style={{ color: 'var(--color-primary, #74554b)' }}
                >
                  {p.price}
                </span>
              </div>
              <p
                className="text-[12px] uppercase tracking-[0.22em] mb-1"
                style={{ color: 'var(--color-secondary, #775a19)' }}
              >
                {p.series}
              </p>
              <p
                className="text-[13px]"
                style={{ color: 'var(--color-on-surface-variant, #504441)' }}
              >
                {p.origin}
              </p>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
