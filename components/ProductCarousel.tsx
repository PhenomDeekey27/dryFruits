'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { PublicProduct } from '@/lib/products'

export default function ProductCarousel({ products }: { products: PublicProduct[] }) {
  const [page, setPage] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const perPage = 4
  const totalPages = Math.ceil(products.length / perPage)

  const scrollTo = (direction: 'prev' | 'next') => {
    const newPage = direction === 'next'
      ? Math.min(page + 1, totalPages - 1)
      : Math.max(page - 1, 0)
    setPage(newPage)
    if (gridRef.current) {
      gridRef.current.scrollTo({ left: newPage * gridRef.current.offsetWidth, behavior: 'smooth' })
    }
  }

  return (
    <section id="products" className="py-24 bg-[#fcf9f8]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-14 gap-4">
          <div>
            <span className="text-[#775a19] font-semibold uppercase tracking-[0.22em] text-[11px] mb-2 block">
              What&apos;s in season
            </span>
            <h2
              className="text-[36px] md:text-[42px] font-bold tracking-tight text-[#1b1c1c]"
              style={{ fontFamily: 'Epilogue, sans-serif' }}
            >
              The Seasonal Edit
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo('prev')}
              disabled={page === 0}
              className="w-11 h-11 rounded-full bg-[#f0eded] flex items-center justify-center text-[#504441] hover:bg-[#e5e2e1] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={() => scrollTo('next')}
              disabled={page === totalPages - 1}
              className="w-11 h-11 rounded-full bg-[#f0eded] flex items-center justify-center text-[#504441] hover:bg-[#e5e2e1] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable product grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 overflow-hidden"
        >
          {products.slice(page * perPage, page * perPage + perPage).map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i); if (gridRef.current) gridRef.current.scrollTo({ left: 0 }) }}
                className={`rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 h-2 bg-[#74554b]' : 'w-2 h-2 bg-[#d4c3be]'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#74554b] hover:text-[#1b1c1c] transition-colors group"
          >
            View entire collection
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="group-hover:translate-x-1 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
