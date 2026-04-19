'use server'

import { createClient } from '@/lib/supabase'
import { revalidateTag } from 'next/cache'

export async function addToWishlist(productId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in')
  }

  const { error } = await supabase
    .from('wishlist')
    .insert({
      user_id: user.id,
      product_id: productId,
    })

  if (error && error.code !== '23505') throw error // Ignore duplicate error
  revalidateTag('wishlist')
}

export async function removeFromWishlist(productId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in')

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)

  if (error) throw error
  revalidateTag('wishlist')
}

export async function getWishlist() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

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

  return data || []
}

export async function isProductInWishlist(productId: string): Promise<boolean> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  return !!data
}
