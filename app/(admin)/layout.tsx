import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AdminShell from './AdminShell'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  // auth.getUser() is a network-level check and always reliable.
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Profile may fail transiently (RLS / token refresh race).
  // The proxy already verified admin role before this layout runs —
  // only block if the profile definitively says non-admin.
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email')
    .eq('id', user.id)
    .single()

  // If profile loaded and is NOT admin → reject.
  // If profile is null (transient DB issue), trust the proxy's check.
  if (profile && profile.role !== 'admin') redirect('/login?error=unauthorized')

  const adminEmail = profile?.email ?? user.email ?? ''

  return (
    <AdminShell adminEmail={adminEmail}>
      {children}
    </AdminShell>
  )
}
