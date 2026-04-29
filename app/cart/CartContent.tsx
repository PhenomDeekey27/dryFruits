'use client'

import Image from 'next/image'
import Link from 'next/link'
import CartItem from '@/components/CartItem'
import CartSummary from '@/components/CartSummary'

interface CartItemType {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    category: string
    product_images: Array<{ image_url: string }>
  }
  product_variants: {
    id: string
    weight: string
    price: number
  }
}

interface SuggestedProduct {
  id: string
  name: string
  category: string
  price: number
  image: string
}

interface Props {
  cartItems: CartItemType[]
  suggestedProducts: SuggestedProduct[]
}

export default function CartContent({ cartItems, suggestedProducts }: Props) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_variants.price * item.quantity,
    0,
  )
  const tax = subtotal * 0.08
  const isEmpty = cartItems.length === 0

  return (
    <>
      {isEmpty ? (
        <div className="text-center py-20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4c3be" strokeWidth="1" className="mx-auto mb-6">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h2 className="text-2xl font-bold text-[#1b1c1c] mb-2">Your cart is empty</h2>
          <p className="text-[#504441] mb-8">Explore our collection and add some items to your cart.</p>
          <Link href="/products" className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-grow">
            <div className="space-y-8 divide-y divide-[#d4c3be]/20">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  product={item.products}
                  variant={item.product_variants}
                  quantity={item.quantity}
                />
              ))}
            </div>

            {suggestedProducts.length > 0 && (
              <div className="mt-16 pt-16 border-t border-[#d4c3be]/20">
                <h3 className="text-lg font-bold text-[#1b1c1c] mb-6" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  Complete Your Curation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestedProducts.slice(0, 2).map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}
                      className="p-6 bg-[#f6f3f2] rounded-xl flex items-center gap-6 hover:shadow-lg hover:bg-[#eae7e7] transition-all group"
                    >
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} width={80} height={80} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#d4c3be]/10" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm text-[#1b1c1c]">{product.name}</p>
                        <p className="text-xs text-[#827470] mt-1">₹{product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <CartSummary subtotal={subtotal} tax={tax} items={cartItems} />
        </div>
      )}
    </>
  )
}
