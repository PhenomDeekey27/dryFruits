import { createClient } from '@supabase/supabase-js'

// Server-only: uses the service role key which bypasses all RLS policies.
// Safe to call from server actions, route handlers, and proxy.ts (Node.js runtime).
// Returns null if SUPABASE_SERVICE_ROLE_KEY is not configured in .env.local.
export function createAdminSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) return null

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// Resolve a user's role — tries service role client first (bypasses RLS),
// falls back to the provided session client if service role key is absent.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getProfileRole(userId: string, sessionClient: any): Promise<string | null> {
  const admin = createAdminSupabaseClient()
  const { data: profile } = await (admin ?? sessionClient)
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()
  return profile?.role ?? null
}
