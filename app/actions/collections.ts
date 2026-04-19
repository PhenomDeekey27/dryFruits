'use server'

import { createClient } from '@/lib/supabase'
import { revalidateTag } from 'next/cache'

export async function createCollection(name: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in')

  const { data, error } = await supabase
    .from('collections')
    .insert({
      user_id: user.id,
      name,
    })
    .select()
    .single()

  if (error) throw error
  revalidateTag('collections', 'max')
  return data
}

export async function addToCollection(collectionId: string, productId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('collection_items')
    .insert({
      collection_id: collectionId,
      product_id: productId,
    })

  if (error && error.code !== '23505') throw error // Ignore duplicate
  revalidateTag('collections', 'max')
}

export async function removeFromCollection(collectionId: string, productId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('collection_items')
    .delete()
    .eq('collection_id', collectionId)
    .eq('product_id', productId)

  if (error) throw error
  revalidateTag('collections', 'max')
}

export async function deleteCollection(collectionId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId)

  if (error) throw error
  revalidateTag('collections', 'max')
}

export async function getCollections() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data || []
}

export async function getCollection(collectionId: string) {
  const supabase = createClient()

  const { data } = await supabase
    .from('collections')
    .select(`
      id,
      name,
      created_at,
      collection_items (
        id,
        products:product_id (
          id,
          name,
          category,
          product_variants (id, price),
          product_images (image_url)
        )
      )
    `)
    .eq('id', collectionId)
    .single()

  return data
}
