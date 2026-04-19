import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getProfileRole } from '@/lib/supabase-admin'
import { logout } from '@/app/actions/auth'

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()

  // Use auth.getUser() for the auth check — this makes a server-side network
  // call and is always reliable, even when the DB/RLS has a hiccup.
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Use service role client for reliable role resolution (bypasses RLS)
  const role = await getProfileRole(user.id, supabase)

  // Admins should never land here — send them to their dashboard
  if (role === 'admin') redirect('/admin/dashboard')

  // Profile is supplementary data — use user-level fallbacks if it's missing.
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const email = profile?.email ?? user.email ?? ''
  const createdAt = profile?.created_at ?? user.created_at ?? new Date().toISOString()

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#c4956a] to-[#3d2314] rounded-2xl mx-auto mb-5
            flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h1 className="text-[22px] text-[#1a1007] tracking-tight" style={{ fontWeight: 800 }}>
            My Account
          </h1>
          <p className="text-[13px] text-[#9c8679] mt-1">Annamalai Dates</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 space-y-6" style={{ boxShadow: '0 4px 24px rgba(61,35,20,0.10)' }}>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-[#9c8679] uppercase tracking-widest mb-1">Email</p>
              <p className="text-[14px] text-[#1a1007]">{email}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#9c8679] uppercase tracking-widest mb-1">Role</p>
              <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold ${
                role === 'admin'
                  ? 'bg-[#fef3c7] text-[#92400e]'
                  : 'bg-[#f6f3f2] text-[#6b5a52]'
              }`}>
                {role === 'admin' ? 'Administrator' : 'Customer'}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#9c8679] uppercase tracking-widest mb-1">Member Since</p>
              <p className="text-[14px] text-[#1a1007]">
                {new Date(createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {role === 'admin' && (
            <a
              href="/admin/dashboard"
              className="block w-full py-3 rounded-xl text-center text-[14px] font-semibold text-white
                bg-gradient-to-br from-[#7c4a2d] to-[#3d2314]
                hover:from-[#8d5535] hover:to-[#4a2a18]
                transition-all duration-200 shadow-sm"
            >
              Go to Admin Dashboard
            </a>
          )}

          <form action={logout}>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-[14px] font-semibold text-[#7c4a2d]
                bg-[#f6f3f2] hover:bg-[#ede8e5] transition-all duration-200"
            >
              Sign out
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#b8a49a] mt-6">© 2024 Annamalai Dates</p>
      </div>
    </div>
  )
}
