'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { removeFromWishlist } from '@/app/actions/wishlist'
import { addToCart } from '@/app/actions/cart'
import { createClient } from '@/lib/supabase'

interface WishlistProduct {
  id: string
  products: {
    id: string
    name: string
    category: string
    product_variants: Array<{ id: string; price: number }>
    product_images: Array<{ image_url: string }>
  }
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        setIsLoggedIn(!!user)

        if (!user) return

        // Query directly from the browser client so the user's session is available
        const { data } = await supabase
          .from('wishlist')
          .select(`
            id,
            products:product_id (
              id,
              name,
              category,
              product_variants (id, price),
              product_images (image_url)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        setWishlistItems((data as unknown as WishlistProduct[]) || [])
      } catch (err) {
        console.error('Error fetching wishlist:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemove = async (productId: string) => {
    setRemovingId(productId)
    try {
      await removeFromWishlist(productId)
      setWishlistItems(items => items.filter(item => item.products.id !== productId))
    } catch (err) {
      console.error('Error removing from wishlist:', err)
    } finally {
      setRemovingId(null)
    }
  }

  const handleAddToCart = async (productId: string, variantId: string) => {
    try {
      await addToCart(productId, variantId, 1)
      alert('Added to cart!')
    } catch (err) {
      console.error('Error adding to cart:', err)
    }
  }

  if (!isLoggedIn && !loading) {
    return (
      <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-[#1b1c1c] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              My Wishlist
            </h1>
            <p className="text-[#504441] mb-8">Sign in to save your favorite items.</p>
            <Link href="/login" className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#775a19] font-semibold uppercase tracking-widest text-[11px] mb-2 block">
            Saved Items
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            My Wishlist
          </h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74554b]"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4c3be" strokeWidth="1" className="mx-auto mb-6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#1b1c1c] mb-2">Your wishlist is empty</h2>
            <p className="text-[#504441] mb-8">Start adding items to save them for later.</p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {wishlistItems.map((item) => {
              const product = item.products
              const variant = product.product_variants?.[0]
              const image = product.product_images?.[0]?.image_url

              return (
                <div
                  key={product.id}
                  className={`group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                    removingId === product.id ? 'opacity-50' : ''
                  }`}
                >
                  {/* Image */}
                  <Link href={`/products/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#f6f3f2]">
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
                  </Link>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <Link href={`/products/${product.id}`} className="group-hover:text-[#74554b] transition-colors">
                      <h3 className="font-bold text-lg text-[#1b1c1c] mb-1" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#827470] uppercase tracking-widest mb-4">
                      {product.category}
                    </p>

                    {variant && (
                      <p className="font-bold text-[#74554b] mb-6" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                        ₹{variant.price.toFixed(2)}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="space-y-2 mt-auto">
                      <button
                        onClick={() => variant && handleAddToCart(product.id, variant.id)}
                        className="w-full py-3 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all active:scale-95"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        disabled={removingId === product.id}
                        className="w-full py-2 text-[#827470] border border-[#d4c3be] rounded-lg text-xs font-semibold hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors disabled:opacity-50"
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
