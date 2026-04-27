'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/app/actions/products'
import type { Product } from '@/app/actions/products'

const SORT_OPTIONS = [
  { label: 'Newest Additions', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name A–Z', value: 'name_asc' },
]

const ITEMS_PER_PAGE = 9

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    categoryParam ? [categoryParam] : []
  )
  const [maxPrice, setMaxPrice] = useState(10000)
  const [computedMax, setComputedMax] = useState(10000)
  const [sortBy, setSortBy] = useState('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Sync URL category param → filter state
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
      setPage(1)
    }
  }, [categoryParam])

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data)
        const prices = data.flatMap(p => (p.product_variants ?? []).map(v => v.price))
        if (prices.length > 0) {
          const max = Math.ceil(Math.max(...prices) / 100) * 100
          setComputedMax(max)
          setMaxPrice(max)
        }
      })
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setLoading(false))
  }, [])

  const allCategories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean))
    return Array.from(cats).sort()
  }, [products])

  const filtered = useMemo(() => {
    let list = [...products]

    if (searchQuery) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategories.length > 0) {
      list = list.filter(p => selectedCategories.includes(p.category))
    }

    if (maxPrice < computedMax) {
      list = list.filter(p => {
        const prices = (p.product_variants ?? []).map(v => v.price)
        const min = prices.length > 0 ? Math.min(...prices) : 0
        return min <= maxPrice
      })
    }

    switch (sortBy) {
      case 'price_asc':
        list.sort((a, b) => {
          const aMin = Math.min(...(a.product_variants ?? []).map(v => v.price), Infinity)
          const bMin = Math.min(...(b.product_variants ?? []).map(v => v.price), Infinity)
          return aMin - bMin
        })
        break
      case 'price_desc':
        list.sort((a, b) => {
          const aMin = Math.min(...(a.product_variants ?? []).map(v => v.price), Infinity)
          const bMin = Math.min(...(b.product_variants ?? []).map(v => v.price), Infinity)
          return bMin - aMin
        })
        break
      case 'name_asc':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return list
  }, [products, selectedCategories, maxPrice, computedMax, sortBy, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  function toggleCategory(cat: string) {
    setPage(1)
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  function clearFilters() {
    setSelectedCategories([])
    setMaxPrice(computedMax)
    setSortBy('newest')
    setPage(1)
  }

  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Sort'
  const hasActiveFilters = selectedCategories.length > 0 || maxPrice < computedMax

  const Sidebar = () => (
    <div className="space-y-10">
      <section>
        <h3 className="font-bold text-lg mb-5 tracking-tight text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Category
        </h3>
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-[#827470]">Loading…</p>
          ) : allCategories.length === 0 ? (
            <p className="text-sm text-[#827470]">No categories</p>
          ) : (
            allCategories.map(cat => (
              <label key={cat} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-[#d4c3be] mr-3 accent-[#775a19]"
                />
                <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-[#1b1c1c] font-semibold' : 'text-[#504441] group-hover:text-[#1b1c1c]'}`}>
                  {cat}
                </span>
              </label>
            ))
          )}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-lg mb-5 tracking-tight text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Price Range
        </h3>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={computedMax}
            step={Math.max(10, Math.ceil(computedMax / 100) * 5)}
            value={maxPrice}
            onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1) }}
            className="w-full h-1 bg-[#eae7e7] rounded-full appearance-none accent-[#775a19]"
          />
          <div className="flex justify-between mt-3 text-xs text-[#504441]">
            <span>₹0</span>
            <span className="font-semibold text-[#1b1c1c]">up to ₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </section>

      {hasActiveFilters && (
        <div className="pt-2 border-t border-[#d4c3be]/20">
          <button onClick={clearFilters} className="w-full py-3 bg-[#eae7e7] text-[#504441] text-sm rounded-lg hover:bg-[#e5e2e1] transition-colors">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Hero */}
      <header className="relative pt-20 h-56 flex items-center justify-center bg-[#f6f3f2] overflow-hidden">
        <div className="text-center z-10 px-4">
          <span className="text-[#775a19] font-semibold tracking-[0.2em] text-xs uppercase block mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Curated Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            All Products
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-sm md:text-base font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#3d2314' }}>
            Browse our full range of premium dates, nuts, seeds, and dry fruits — handpicked for quality and freshness.
          </p>
        </div>
        <div className="absolute inset-0 opacity-[0.04] bg-gradient-to-br from-[#74554b] to-[#8f6d63] pointer-events-none" />
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[#504441]">Search results for</span>
            <span className="text-sm font-bold text-[#1b1c1c]">&ldquo;{searchQuery}&rdquo;</span>
            <span className="text-sm text-[#827470]">({filtered.length} products)</span>
          </div>
        )}

        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28">
              <Sidebar />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#504441]">
                  {loading ? 'Loading products…' : (
                    <>Showing <span className="font-semibold text-[#1b1c1c]">{filtered.length}</span> products</>
                  )}
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-[#504441] bg-[#f0eded] px-3 py-2 rounded-lg"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortOpen(o => !o)}
                  className="flex items-center gap-2 bg-[#f6f3f2] border border-[#d4c3be]/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0eded] transition-colors"
                >
                  <span>{currentSort}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-[#d4c3be]/30 shadow-lg z-20 overflow-hidden">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); setPage(1) }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f6f3f2] transition-colors ${sortBy === opt.value ? 'font-semibold text-[#74554b]' : 'text-[#504441]'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-[#e5e2e1] rounded-xl mb-5" />
                    <div className="h-5 bg-[#e5e2e1] rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#e5e2e1] rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#827470] text-lg mb-4">
                  {filtered.length === 0 && products.length === 0
                    ? 'No products available yet.'
                    : 'No products match your filters.'}
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-sm text-[#74554b] underline">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {paginated.map(product => {
                  const img = (product.product_images ?? [])[0]?.image_url
                  const variants = product.product_variants ?? []
                  const lowestPrice = variants.length > 0 ? Math.min(...variants.map(v => v.price)) : null
                  const weights = variants.map(v => v.weight).filter(Boolean).slice(0, 3)

                  return (
                    <Link key={product.id} href={`/products/${product.id}`} className="group relative block">
                      <div className="aspect-[4/5] bg-[#f6f3f2] rounded-xl overflow-hidden mb-5 relative">
                        {img ? (
                          <Image
                            src={img}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#d4c3be]">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/>
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#775a19]">
                            {product.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#504441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-xl tracking-tight text-[#1b1c1c] group-hover:text-[#74554b] transition-colors leading-tight" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                            {product.name}
                          </h3>
                          {lowestPrice != null && (
                            <span className="font-bold text-lg text-[#74554b] flex-shrink-0" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                              ₹{lowestPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <p className="text-[#827470] text-sm line-clamp-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          {product.description || 'Premium quality, hand-selected for excellence.'}
                        </p>
                        {weights.length > 0 && (
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {weights.map(w => (
                              <span key={w} className="text-[11px] font-bold text-[#504441] bg-[#f0eded] px-2 py-1 rounded">
                                {w}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          className="w-full mt-3 py-3 text-white font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all text-sm"
                          style={{ background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          onClick={e => { e.preventDefault(); window.location.href = `/products/${product.id}` }}
                        >
                          View Product
                        </button>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <nav className="mt-20 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#d4c3be] hover:bg-[#f6f3f2] disabled:opacity-40 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const p = i + 1
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                        page === p ? 'text-white' : 'border border-[#d4c3be] hover:bg-[#f6f3f2] text-[#504441]'
                      }`}
                      style={page === p ? { background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)' } : {}}
                    >
                      {p}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#d4c3be] hover:bg-[#f6f3f2] disabled:opacity-40 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </nav>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-[#fcf9f8] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Epilogue, sans-serif' }}>Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-[#504441]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <Sidebar />
            <button onClick={() => setMobileFiltersOpen(false)} className="mt-8 w-full py-4 text-white font-bold rounded-xl" style={{ background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)' }}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  )
}
