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

  // Step 1: plain cart_items rows — no FK joins needed
  const { data: rawCart } = await supabase
    .from('cart_items')
    .select('id, quantity, product_id, variant_id')
    .eq('user_id', user.id)

  const cartRows = rawCart ?? []

  // Step 2: fetch products and variants in parallel using the collected IDs
  const productIds = [...new Set(cartRows.map(r => r.product_id))]
  const variantIds = [...new Set(cartRows.map(r => r.variant_id).filter(Boolean))]

  const [productsRes, variantsRes, suggestedRes] = await Promise.all([
    productIds.length > 0
      ? supabase
          .from('products')
          .select('id, name, category, product_images (image_url)')
          .in('id', productIds)
      : Promise.resolve({ data: [] }),
    variantIds.length > 0
      ? supabase
          .from('product_variants')
          .select('id, weight, price')
          .in('id', variantIds)
      : Promise.resolve({ data: [] }),
    supabase
      .from('products')
      .select('id, name, category, product_variants (price), product_images (image_url)')
      .limit(4),
  ])

  const productMap = Object.fromEntries((productsRes.data ?? []).map(p => [p.id, p]))
  const variantMap = Object.fromEntries((variantsRes.data ?? []).map(v => [v.id, v]))

  const cartItems = cartRows
    .map(row => ({
      id: row.id,
      quantity: row.quantity,
      products: productMap[row.product_id] as {
        id: string; name: string; category: string
        product_images: { image_url: string }[]
      },
      product_variants: variantMap[row.variant_id] as {
        id: string; weight: string; price: number
      },
    }))
    .filter(item => item.products && item.product_variants)

  const suggestedProducts = (suggestedRes.data ?? []).map(p => ({
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
