'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { updateCartQuantity, removeFromCart } from '@/app/actions/cart'

interface CartItemProps {
  id: string
  product: {
    id: string
    name: string
    category: string
    product_images: Array<{ image_url: string }>
  }
  variant: {
    id: string
    weight: string
    price: number
  }
  quantity: number
}

export default function CartItem({ id, product, variant, quantity }: CartItemProps) {
  const router = useRouter()
  const [qty, setQty] = useState(quantity)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleQuantityChange = async (newQty: number) => {
    if (newQty <= 0) return
    setQty(newQty)
    await updateCartQuantity(id, newQty)
    window.dispatchEvent(new CustomEvent('cart:updated'))
    router.refresh()
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    await removeFromCart(id)
    window.dispatchEvent(new CustomEvent('cart:updated'))
    router.refresh()
  }

  const image = product.product_images?.[0]?.image_url
  const totalPrice = variant.price * qty

  return (
    <div className={`group flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center py-8 transition-opacity ${isRemoving ? 'opacity-50' : ''}`}>
      {/* Product Image */}
      <div className="w-full md:w-48 aspect-square rounded-lg overflow-hidden bg-[#f6f3f2] relative flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#827470]">
            No image
          </div>
        )}
      </div>

      {/* Product Info & Controls */}
      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            {product.name}
          </h3>
          <p className="text-sm text-[#504441]">
            {product.category} • {variant.weight}
          </p>

          {/* Quantity Controls */}
          <div className="pt-4 flex items-center gap-4">
            <div className="flex items-center bg-[#f6f3f2] rounded-lg h-10 px-1">
              <button
                onClick={() => handleQuantityChange(qty - 1)}
                disabled={qty <= 1}
                className="w-8 h-8 flex items-center justify-center text-[#1b1c1c] hover:text-[#74554b] disabled:opacity-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className="w-10 text-center font-semibold text-sm">{qty}</span>
              <button
                onClick={() => handleQuantityChange(qty + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#1b1c1c] hover:text-[#74554b] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleRemove}
              className="text-xs font-semibold uppercase tracking-widest text-[#827470]/60 hover:text-[#ba1a1a] transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="text-right md:text-left">
          <p className="font-bold text-xl text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            ₹{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full md:w-auto bg-[#d4c3be]/20 md:hidden" />
    </div>
  )
}
