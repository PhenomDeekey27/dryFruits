'use server'

import { createAdminSupabaseClient } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export type Order = {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  profiles?: { email: string }
}

function adminDb() {
  const client = createAdminSupabaseClient()
  if (!client) throw new Error('Service role key not configured — set SUPABASE_SERVICE_ROLE_KEY in .env.local')
  return client
}

export async function getOrders(limit = 50) {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('orders')
    .select(`*, profiles(email)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return data as Order[]
}

export async function getRecentOrders(limit = 5) {
  const supabase = adminDb()
  const { data, error } = await supabase
    .from('orders')
    .select(`*, profiles(email)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return data as Order[]
}

export async function getDashboardStats() {
  const supabase = adminDb()

  const [revenueResult, ordersResult, productsResult] = await Promise.all([
    supabase.from('orders').select('total').neq('status', 'cancelled'),
    supabase.from('orders').select('id', { count: 'exact' }),
    supabase.from('products').select('id', { count: 'exact' }),
  ])

  const totalRevenue = (revenueResult.data ?? []).reduce(
    (sum, o) => sum + (o.total ?? 0), 0
  )
  const totalOrders = ordersResult.count ?? 0
  const activeProducts = productsResult.count ?? 0

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return { totalRevenue, totalOrders, activeProducts, avgOrderValue }
}

export async function updateOrderStatus(
  id: string,
  status: Order['status']
) {
  const supabase = adminDb()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/orders')
  revalidatePath('/admin/dashboard')
}
