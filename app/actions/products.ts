'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// All admin data actions use the service role client to bypass RLS entirely.
// The proxy already enforces that only authenticated admins can reach these actions.
function adminDb() {
  const client = createAdminSupabaseClient()
  if (!client) throw new Error('Service role key not configured — set SUPABASE_SERVICE_ROLE_KEY in .env.local')
  return client
}

export type ProductVariant = {
  id?: string
  weight: string
  price: number
  stock: number
}

export type Product = {
  id: string
  name: string
  category: string
  description: string
  created_at: string
  product_variants?: ProductVariant[]
  product_images?: { image_url: string }[]
}

export async function getProducts() {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants(*),
      product_images(image_url)
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Product[]
}

export async function getProduct(id: string) {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants(*),
      product_images(image_url)
    `)
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data as Product
}

export async function createProduct(prevState: { error: string }, formData: FormData) {
  const supabase = adminDb()

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const variantsJson = formData.get('variants') as string
  const imageUrls = formData.getAll('image_urls') as string[]

  if (!name || !category) {
    return { error: 'Name and category are required' as string }
  }

  // Insert product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({ name, category, description })
    .select()
    .single()

  if (productError) return { error: productError.message }

  // Insert variants
  if (variantsJson) {
    const variants: ProductVariant[] = JSON.parse(variantsJson)
    if (variants.length > 0) {
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variants.map(v => ({
          product_id: product.id,
          weight: v.weight,
          price: v.price,
          stock: v.stock,
        })))
      if (variantError) return { error: variantError.message }
    }
  }

  // Insert images
  if (imageUrls.filter(Boolean).length > 0) {
    const { error: imageError } = await supabase
      .from('product_images')
      .insert(imageUrls.filter(Boolean).map(url => ({
        product_id: product.id,
        image_url: url,
      })))
    if (imageError) return { error: imageError.message }
  }

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function updateProduct(id: string, prevState: { error: string }, formData: FormData) {
  const supabase = adminDb()

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const variantsJson = formData.get('variants') as string
  const imageUrls = formData.getAll('image_urls') as string[]

  const { error: updateError } = await supabase
    .from('products')
    .update({ name, category, description })
    .eq('id', id)

  if (updateError) return { error: updateError.message }

  // Replace variants
  await supabase.from('product_variants').delete().eq('product_id', id)
  if (variantsJson) {
    const variants: ProductVariant[] = JSON.parse(variantsJson)
    if (variants.length > 0) {
      await supabase.from('product_variants').insert(
        variants.map(v => ({ product_id: id, weight: v.weight, price: v.price, stock: v.stock }))
      )
    }
  }

  // Replace images if new ones provided
  if (imageUrls.filter(Boolean).length > 0) {
    await supabase.from('product_images').delete().eq('product_id', id)
    await supabase.from('product_images').insert(
      imageUrls.filter(Boolean).map(url => ({ product_id: id, image_url: url }))
    )
  }

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}/edit`)
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = adminDb()

  await supabase.from('product_variants').delete().eq('product_id', id)
  await supabase.from('product_images').delete().eq('product_id', id)
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

export async function getLowStockProducts() {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('product_variants')
    .select('*, products(name)')
    .lt('stock', 10)
    .order('stock', { ascending: true })
    .limit(5)

  if (error) return []
  return data
}
