'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WishlistButton from '@/components/WishlistButton'
import CollectionModal from '@/components/CollectionModal'
import { addToCart } from '@/app/actions/cart'

interface ProductVariant {
  id: string
  weight: string
  price: number
  stock: number
}

interface ProductImage {
  image_url: string
}

interface Product {
  id: string
  name: string
  category: string
  description: string
  created_at: string
  product_variants: ProductVariant[]
  product_images: ProductImage[]
}

interface RelatedProduct {
  id: string
  name: string
  category: string
  product_variants: ProductVariant[]
  product_images: ProductImage[]
}

interface Props {
  product: Product
  relatedProducts: RelatedProduct[]
  collections: { id: string; name: string }[]
}

export default function ProductDetailClient({ product, relatedProducts, collections }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.product_variants?.[0] ?? null as unknown as ProductVariant
  )
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [cartMsg, setCartMsg] = useState<string | null>(null)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)

  const mainImage = product.product_images?.[selectedImageIndex]?.image_url
  const rating = 4.8
  const reviews = 47

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setIsAddingToCart(true)
    setCartMsg(null)
    try {
      await addToCart(product.id, selectedVariant.id, 1)
      setCartMsg('Added to cart!')
      setTimeout(() => setCartMsg(null), 3000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setCartMsg(msg.includes('logged in') ? 'Please sign in to add items to cart' : `Error: ${msg}`)
      setTimeout(() => setCartMsg(null), 5000)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center flex-wrap gap-1.5 text-xs font-body uppercase tracking-widest text-[#827470]">
        <Link className="hover:text-[#74554b]" href="/products">Shop</Link>
        <span className="text-[10px]">›</span>
        <Link className="hover:text-[#74554b]" href={`/products?q=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span className="text-[10px]">›</span>
        <span className="text-[#1b1c1c] truncate max-w-[160px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-16 sm:mb-24 md:mb-32">
        {/* Gallery */}
        <div className="lg:col-span-7">
          {/* Mobile */}
          <div className="block md:hidden">
            <div className="aspect-[4/3] bg-[#f6f3f2] rounded-xl overflow-hidden relative mb-3">
              {mainImage ? (
                <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#827470]">No image</div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-[#775a19] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">{product.category}</span>
              </div>
            </div>
            {product.product_images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.product_images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${selectedImageIndex === idx ? 'ring-2 ring-[#775a19]' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img.image_url} alt={`${product.name} ${idx + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4">
            <div className="col-span-2 space-y-4">
              {product.product_images?.map((img, idx) => (
                <div key={idx} onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square bg-[#f6f3f2] rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImageIndex === idx ? 'ring-2 ring-[#775a19]' : 'hover:ring-2 hover:ring-[#775a19]'}`}
                >
                  <Image src={img.image_url} alt={`${product.name} ${idx + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="col-span-10">
              <div className="aspect-[4/5] bg-[#f6f3f2] rounded-xl overflow-hidden relative">
                {mainImage
                  ? <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
                  : <div className="w-full h-full flex items-center justify-center text-[#827470]">No image available</div>
                }
                <div className="absolute top-6 left-6">
                  <span className="bg-[#775a19] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Rating */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex text-[#775a19]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(rating) ? '#775a19' : 'none'} stroke="#775a19" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-body text-[#827470] uppercase tracking-wider">({reviews} Reviews)</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1c] mb-4 leading-[1.1] tracking-tight" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-6 sm:mb-8">
            <span className="text-2xl sm:text-3xl font-bold text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              ₹{selectedVariant?.price?.toLocaleString('en-IN') ?? 0}
            </span>
            {selectedVariant?.price && (
              <>
                <span className="text-lg text-[#827470] line-through" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                  ₹{Math.round(selectedVariant.price * 1.25).toLocaleString('en-IN')}
                </span>
                <span className="bg-[#fed488] text-[#261900] px-3 py-0.5 rounded text-xs font-bold uppercase">-20% OFF</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-[#504441] leading-relaxed mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {product.description || 'Premium quality product, hand-selected for excellence and consistency.'}
          </p>

          {/* Variant selector */}
          {product.product_variants?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-body uppercase tracking-widest text-[#827470] mb-4">Select Weight</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.product_variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex-1 min-w-[80px] py-3 sm:py-4 px-2 border-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-center ${
                      selectedVariant?.id === variant.id
                        ? 'border-[#74554b] bg-[#f0eded] text-[#1b1c1c]'
                        : 'border-[#d4c3be] bg-white text-[#504441] hover:border-[#74554b]'
                    }`}
                  >
                    {variant.weight}
                    <span className="block text-[10px] font-normal text-[#827470] mt-1">
                      ₹{variant.price?.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cart feedback */}
          {cartMsg && (
            <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${cartMsg.includes('sign in') ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#dcfce7] text-[#166534]'}`}>
              {cartMsg}
            </div>
          )}

          {/* Add to cart */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedVariant}
              className="flex-[3] text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg shadow-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all"
              style={{ background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)', fontFamily: 'Epilogue, sans-serif' }}
            >
              {isAddingToCart ? 'Adding…' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setIsCollectionModalOpen(true)}
              className="flex-1 bg-[#eae7e7] text-[#1b1c1c] py-4 sm:py-5 rounded-xl flex items-center justify-center hover:bg-[#e5e2e1] transition-colors"
              title="Save to Collection"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-center">
              <WishlistButton productId={product.id} size="md" />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 py-8 border-t border-[#d4c3be]/20">
            {[
              { icon: '✓', label: 'Quality Assured' },
              { icon: '✦', label: 'Premium Fresh' },
              { icon: '⇄', label: 'Easy Returns' },
              { icon: '⚡', label: 'Fast Dispatch' },
            ].map(feat => (
              <div key={feat.label} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#fed488] flex items-center justify-center text-[#261900] font-bold text-sm flex-shrink-0">
                  {feat.icon}
                </div>
                <span className="text-xs font-body uppercase tracking-tight">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promise section */}
      <section className="mb-16 sm:mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          <div className="md:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 italic" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              The {product.category} Promise
            </h2>
            <p className="text-[#504441] leading-relaxed" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Every product is hand-selected and processed with care, employing traditional methods that preserve natural integrity and nutritional density.
            </p>
          </div>
          <div className="md:col-span-8 bg-[#f6f3f2] rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {[
                { label: 'Origin', value: 'Premium Selection' },
                { label: 'Quality', value: 'Certified Fresh' },
                { label: 'Storage', value: 'Cool & Dry Place' },
                { label: 'Nutrition', value: 'Rich in Minerals' },
              ].map(item => (
                <div key={item.label}>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#775a19] mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{item.label}</h4>
                  <p className="text-[#1b1c1c] font-bold" style={{ fontFamily: 'Epilogue, sans-serif' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mb-16 sm:mb-24 md:mb-32">
          <div className="flex flex-wrap justify-between items-end mb-8 sm:mb-12 gap-3">
            <div>
              <span className="text-xs font-body uppercase tracking-widest text-[#775a19] mb-2 block">Curated Pairings</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                You May Also Enjoy
              </h2>
            </div>
            <Link href="/products" className="text-[#775a19] font-body uppercase text-sm tracking-widest border-b border-[#775a19] pb-1 hover:opacity-70 transition-all">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
            {relatedProducts.map(rp => {
              const rpPrice = rp.product_variants?.[0]?.price ?? 0
              const rpImage = rp.product_images?.[0]?.image_url
              return (
                <Link key={rp.id} href={`/products/${rp.id}`} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-[#f6f3f2] rounded-xl overflow-hidden mb-4 sm:mb-6">
                    {rpImage && (
                      <Image src={rpImage} alt={rp.name} width={300} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>{rp.name}</h3>
                  <p className="text-sm text-[#827470] font-body uppercase tracking-wider mb-2">{rp.category}</p>
                  <p className="font-bold text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>₹{rpPrice.toLocaleString('en-IN')}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <CollectionModal
        productId={product.id}
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        collections={collections}
      />
    </main>
  )
}
