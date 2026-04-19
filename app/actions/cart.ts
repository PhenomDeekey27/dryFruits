'use server'

import { createClient } from '@/lib/supabase'
import { revalidateTag } from 'next/cache'

export async function addToCart(productId: string, variantId: string, quantity: number = 1) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in')
  }

  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: productId,
      variant_id: variantId,
      quantity,
    }, {
      onConflict: 'user_id,product_id,variant_id'
    })

  if (error) throw error
  revalidateTag('cart')
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)

  if (error) throw error
  revalidateTag('cart')
}

export async function updateCartQuantity(cartItemId: string, quantity: number) {
  const supabase = createClient()
  if (quantity <= 0) {
    return removeFromCart(cartItemId)
  }

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)

  if (error) throw error
  revalidateTag('cart')
}

export async function getCart() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
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
    .eq('user_id', user.id)

  return data || []
}

export async function clearCart() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in')

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  if (error) throw error
  revalidateTag('cart')
}
