import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductDetailClient from './ProductDetailClient'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Use admin client to bypass RLS — products are public catalogue data
  const adminClient = createAdminSupabaseClient()
  const db = adminClient ?? await createServerSupabaseClient()

  const productResult = await db.from('products')
    .select('*, product_variants(*), product_images(image_url)')
    .eq('id', id)
    .single()

  if (productResult.error || !productResult.data) notFound()

  const product = productResult.data

  // Fetch related products in same category
  const { data: relatedProducts } = await db
    .from('products')
    .select('id, name, category, product_variants(*), product_images(image_url)')
    .eq('category', product.category)
    .neq('id', id)
    .limit(4)

  return (
    <div style={{ background: '#fcf9f8', color: '#1b1c1c' }} className="min-h-screen">
      <Navbar />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts ?? []}
      />
      <Footer />
    </div>
  )
}
