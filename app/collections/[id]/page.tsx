'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getCollection, removeFromCollection } from '@/app/actions/collections'

interface Product {
  id: string
  name: string
  category: string
  product_variants: Array<{ id: string; price: number }>
  product_images: Array<{ image_url: string }>
}

interface CollectionItem {
  id: string
  products: Product
}

interface Collection {
  id: string
  name: string
  collection_items: CollectionItem[]
}

export default function CollectionDetailPage() {
  const params = useParams()
  const collectionId = params.id as string

  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await getCollection(collectionId)
        setCollection(data)
      } catch (err) {
        console.error('Error fetching collection:', err)
      } finally {
        setLoading(false)
      }
    }

    if (collectionId) {
      fetchCollection()
    }
  }, [collectionId])

  const handleRemoveProduct = async (productId: string) => {
    setRemovingId(productId)
    try {
      await removeFromCollection(collectionId, productId)
      setCollection(prev => {
        if (!prev) return null
        return {
          ...prev,
          collection_items: prev.collection_items.filter(
            item => item.products.id !== productId
          )
        }
      })
    } catch (err) {
      console.error('Error removing from collection:', err)
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) {
    return (
      <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74554b]"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!collection) {
    return (
      <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-[#1b1c1c] mb-4">Collection Not Found</h1>
            <p className="text-[#504441] mb-8">The collection you're looking for doesn't exist.</p>
            <Link
              href="/collections"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold"
            >
              Back to Collections
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
        <div className="mb-12 sm:mb-14 md:mb-16 flex items-center justify-between">
          <header>
            <span className="text-[#775a19] font-semibold uppercase tracking-widest text-[11px] mb-2 block">
              Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              {collection.name}
            </h1>
          </header>
          <Link
            href="/collections"
            className="hidden sm:flex items-center gap-2 text-[#74554b] font-semibold hover:text-[#1b1c1c] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </Link>
        </div>

        {collection.collection_items.length === 0 ? (
          <div className="text-center py-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4c3be" strokeWidth="1" className="mx-auto mb-6">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#1b1c1c] mb-2">This collection is empty</h2>
            <p className="text-[#504441] mb-8">Start adding products to organize your favorites.</p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collection.collection_items.map((item) => {
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
                    <div className="mt-auto space-y-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="block w-full py-3 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white text-center rounded-xl font-semibold text-sm hover:shadow-lg transition-all active:scale-95"
                      >
                        View Product
                      </Link>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        disabled={removingId === product.id}
                        className="w-full py-2 text-[#827470] border border-[#d4c3be] rounded-lg text-xs font-semibold hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors disabled:opacity-50"
                      >
                        Remove
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
