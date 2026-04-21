import { createServerClient } from '@supabase/ssr'
import { getProfileRole } from '@/lib/supabase-admin'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Helper: redirect while forwarding any refreshed session cookies
  const redirect = (path: string) => {
    const res = NextResponse.redirect(new URL(path, request.url))
    supabaseResponse.cookies.getAll().forEach(({ name, value, ...rest }) => {
      res.cookies.set(name, value, rest as Parameters<typeof res.cookies.set>[2])
    })
    return res
  }

  // Protect /admin routes — must be logged in AND have admin role
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return redirect('/login')
    }

    const role = await getProfileRole(user.id, supabase)
    if (role !== 'admin') {
      return redirect('/login?error=unauthorized')
    }
  }

  // Protect /account — must be logged in
  if (pathname.startsWith('/account') || pathname === '/account') {
    if (!user) {
      return redirect('/login')
    }
    // Redirect admin users away from /account to their dashboard
    const role = await getProfileRole(user.id, supabase)
    if (role === 'admin') {
      return redirect('/admin/dashboard')
    }
  }

  // Redirect already-logged-in users away from /login and /signup
  if ((pathname === '/login' || pathname === '/signup') && user) {
    const role = await getProfileRole(user.id, supabase)
    if (role === 'admin') {
      return redirect('/admin/dashboard')
    }
    return redirect('/account')
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
