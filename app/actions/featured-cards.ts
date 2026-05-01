'use server'

import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function adminDb() {
  const client = createAdminSupabaseClient()
  if (!client) throw new Error('Service role key not configured')
  return client
}

export type FeaturedCard = {
  id: string
  sort_order: number
  name: string
  category?: string
  product_id?: string
  subtitle: string
  origin: string
  notes: string
  image_url: string
  price: string
  is_active: boolean
  created_at: string
}

export async function getFeaturedCards() {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('featured_cards')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as FeaturedCard[]
}

export async function getActiveFeaturedCards() {
  const supabase = adminDb()
  const { data } = await supabase
    .from('featured_cards')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  return (data ?? []) as FeaturedCard[]
}

export async function createFeaturedCard(prevState: { error: string }, formData: FormData) {
  const supabase = adminDb()

  const name = (formData.get('name') as string)?.trim()
  const category = (formData.get('category') as string)?.trim()
  const product_id = (formData.get('product_id') as string)?.trim()
  const subtitle = (formData.get('subtitle') as string)?.trim()
  const origin = (formData.get('origin') as string)?.trim()
  const notes = (formData.get('notes') as string)?.trim()
  const image_url = (formData.get('image_url') as string)?.trim()
  const price = (formData.get('price') as string)?.trim()
  const sort_order = parseInt(formData.get('sort_order') as string) || 0

  if (!name) return { error: 'Name is required' }
  if (!image_url) return { error: 'Image URL is required' }

  const { error } = await supabase.from('featured_cards').insert({
    name, category, product_id: product_id || null, subtitle, origin, notes, image_url, price, sort_order, is_active: true,
  })

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/featured')
  redirect('/admin/featured')
}

export async function updateFeaturedCard(id: string, prevState: { error: string }, formData: FormData) {
  const supabase = adminDb()

  const name = (formData.get('name') as string)?.trim()
  const category = (formData.get('category') as string)?.trim()
  const product_id = (formData.get('product_id') as string)?.trim()
  const subtitle = (formData.get('subtitle') as string)?.trim()
  const origin = (formData.get('origin') as string)?.trim()
  const notes = (formData.get('notes') as string)?.trim()
  const image_url = (formData.get('image_url') as string)?.trim()
  const price = (formData.get('price') as string)?.trim()
  const sort_order = parseInt(formData.get('sort_order') as string) || 0
  const is_active = formData.get('is_active') === 'true'

  if (!name) return { error: 'Name is required' }
  if (!image_url) return { error: 'Image URL is required' }

  const { error } = await supabase
    .from('featured_cards')
    .update({ name, category, product_id: product_id || null, subtitle, origin, notes, image_url, price, sort_order, is_active })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/featured')
  redirect('/admin/featured')
}

export async function deleteFeaturedCard(id: string) {
  const supabase = adminDb()
  const { error } = await supabase.from('featured_cards').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/admin/featured')
}

export async function toggleFeaturedCard(id: string, is_active: boolean) {
  const supabase = adminDb()
  const { error } = await supabase
    .from('featured_cards')
    .update({ is_active })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/admin/featured')
}
