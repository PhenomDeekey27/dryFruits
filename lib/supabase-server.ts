import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  // In-memory token cache for this client instance.
  // When setAll is called (token refresh) but cookieStore.set throws
  // (Server Component context can't write cookies), we still need getAll to
  // return the refreshed tokens so subsequent DB queries on this same instance
  // use the new JWT — otherwise PostgREST gets an expired token, auth.uid()
  // returns null, and RLS blocks every query.
  const memoryOverride = new Map<string, string>()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const stored = cookieStore.getAll()
          if (memoryOverride.size === 0) return stored
          // Merge: in-memory refreshed tokens take priority over stored cookies
          const map = new Map(stored.map(c => [c.name, c.value]))
          memoryOverride.forEach((v, k) => map.set(k, v))
          return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
        },
        setAll(cookiesToSet) {
          // Always update in-memory cache first so this instance uses fresh tokens
          cookiesToSet.forEach(({ name, value }) => memoryOverride.set(name, value))
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — can't write cookies back to the browser here.
            // The proxy (proxy.ts) persists the refreshed session on the next request.
          }
        },
      },
    }
  )
}
