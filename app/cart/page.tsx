import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartContent from './CartContent'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function CartPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-[#1b1c1c] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Your Cart
            </h1>
            <p className="text-[#504441] mb-8">Sign in to view and manage your shopping cart.</p>
            <Link href="/login" className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const [cartResult, productsResult] = await Promise.all([
    supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        products:product_id (
          id,
          name,
          category,
          product_images (image_url)
        ),
        product_variants:variant_id (
          id,
          weight,
          price
        )
      `)
      .eq('user_id', user.id),
    supabase
      .from('products')
      .select('id, name, category, product_variants (price), product_images (image_url)')
      .limit(4),
  ])

  type RawCartItem = {
    id: string
    quantity: number
    products: { id: string; name: string; category: string; product_images: { image_url: string }[] } | { id: string; name: string; category: string; product_images: { image_url: string }[] }[]
    product_variants: { id: string; weight: string; price: number } | { id: string; weight: string; price: number }[]
  }

  const cartItems = (cartResult.data ?? [])
    .map((item) => {
      const raw = item as unknown as RawCartItem
      const products = Array.isArray(raw.products) ? raw.products[0] : raw.products
      const product_variants = Array.isArray(raw.product_variants) ? raw.product_variants[0] : raw.product_variants
      return { id: raw.id, quantity: raw.quantity, products, product_variants }
    })
    .filter((item) => item.products && item.product_variants) as {
      id: string
      quantity: number
      products: { id: string; name: string; category: string; product_images: { image_url: string }[] }
      product_variants: { id: string; weight: string; price: number }
    }[]

  const suggestedProducts = (productsResult.data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: (p.product_variants as { price: number }[])?.[0]?.price ?? 0,
    image: (p.product_images as { image_url: string }[])?.[0]?.image_url ?? '',
  }))

  return (
    <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        <header className="mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#775a19] font-semibold uppercase tracking-widest text-[11px] mb-2 block">
            Your Curation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            Shopping Bag
          </h1>
        </header>

        <CartContent cartItems={cartItems} suggestedProducts={suggestedProducts} />
      </main>
      <Footer />
    </div>
  )
}
