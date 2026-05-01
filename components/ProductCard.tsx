'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { PublicProduct } from '@/lib/products'
import { addToCart } from '@/app/actions/cart'
import { useToast } from '@/components/Toast'

const BADGE_STYLES: Record<string, string> = {
  BESTSELLER: 'bg-[#fcf9f8]/90 text-[#775a19]',
  NEW: 'bg-[#fed488]/90 text-[#261900]',
  LIMITED: 'bg-[#1b1c1c]/80 text-white',
}

export default function ProductCard({ product }: { product: PublicProduct }) {
  const stars = Math.round(product.rating)
  const router = useRouter()
  const { toast } = useToast()
  const [adding, setAdding] = useState(false)

  async function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!product.variantId) {
      router.push(`/products/${product.id}`)
      return
    }

    setAdding(true)
    try {
      const result = await addToCart(product.id, product.variantId, 1)
      if (result.alreadyInCart) {
        toast('Already in your cart')
      } else {
        toast('Added to cart')
        window.dispatchEvent(new CustomEvent('cart:updated'))
        router.refresh()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('Must be logged in')) {
        toast('Please sign in to add to cart', 'error')
        router.push('/login')
      } else {
        toast('Could not add to cart', 'error')
      }
    } finally {
      setAdding(false)
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group flex flex-col cursor-pointer">
        {/* Image container */}
        <div className="relative overflow-hidden rounded-xl bg-[#f0eded] aspect-square mb-5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-3 right-3 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                BADGE_STYLES[product.badge] ?? BADGE_STYLES.NEW
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Quick Add — appears on hover */}
          <button
            onClick={handleQuickAdd}
            disabled={adding}
            className="absolute bottom-3 left-3 right-3 bg-[#1b1c1c]/90 backdrop-blur-sm text-white py-3 rounded-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-semibold text-[13px] hover:bg-[#74554b] active:scale-95 disabled:opacity-60"
          >
            {adding ? 'Adding…' : 'Quick Add'}
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1.5">
          <h3
            className="text-[16px] font-bold text-[#1b1c1c] leading-snug group-hover:text-[#74554b] transition-colors"
            style={{ fontFamily: 'Epilogue, sans-serif' }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={i < stars ? '#775a19' : 'none'}
                  stroke="#775a19"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#504441]">
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <p className="text-[15px] font-bold text-[#74554b] mt-0.5">
            {product.price > 0 ? `₹${product.price.toLocaleString()}` : 'View Options'}
          </p>
        </div>
      </div>
    </Link>
  )
}
