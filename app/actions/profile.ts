'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getProfileRole } from '@/lib/supabase-admin'

export async function getMyProfile() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const role = await getProfileRole(user.id, supabase)
    return {
      id: user.id,
      email: user.email ?? '',
      role: (role ?? 'user') as 'admin' | 'user',
    }
  } catch {
    return null
  }
}
