'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getProfileRole } from '@/lib/supabase-admin'
import { getSiteUrl } from '@/lib/get-site-url'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(prevState: { error: string }, formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' as string }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: 'Login failed' }
  }

  // Use service role client (bypasses RLS) for reliable role check
  const role = await getProfileRole(data.user.id, supabase)

  if (role === 'admin') {
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
  }

  // Regular users go to account page
  redirect('/account')
}

export async function signInWithGoogle(): Promise<void> {
  const supabase = await createServerSupabaseClient()
  const siteUrl = getSiteUrl()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
      skipBrowserRedirect: true,
    },
  })

  if (error) throw new Error(error.message)
  if (data.url) redirect(data.url)
}

export async function signInWithGithub(): Promise<void> {
  const supabase = await createServerSupabaseClient()
  const siteUrl = getSiteUrl()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
      skipBrowserRedirect: true,
    },
  })

  if (error) throw new Error(error.message)
  if (data.url) redirect(data.url)
}

export async function logout() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function signup(prevState: { error: string; success: string }, formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!email || !password) {
    return { error: 'Email and password are required', success: '' }
  }

  if (password !== confirm) {
    return { error: 'Passwords do not match', success: '' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters', success: '' }
  }

  const siteUrl = getSiteUrl()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message, success: '' }
  }

  return {
    error: '',
    success: `We've sent a confirmation email to ${email}. Click the link in the email to activate your account, then sign in.`,
  }
}

async function ensureProfile(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
  user: { id: string; email?: string }
) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile) return profile

  // Profile row missing — the DB trigger may not have run yet.
  // Create it now with the default 'user' role.
  // ignoreDuplicates: true — never overwrite an existing row (would reset role to 'user')
  const { data: created } = await supabase
    .from('profiles')
    .upsert(
      { id: user.id, email: user.email ?? '', role: 'user' },
      { onConflict: 'id', ignoreDuplicates: true }
    )
    .select()
    .single()

  return created
}

export async function getAdminUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return ensureProfile(supabase, user)
}

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return ensureProfile(supabase, user)
}
