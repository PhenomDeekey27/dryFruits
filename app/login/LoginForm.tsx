'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { login, signInWithGoogle, signInWithGithub } from '@/app/actions/auth'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const EyeIcon = ({ open }: { open: boolean }) => open ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const GithubIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

function LoginFormInner() {
  const searchParams = useSearchParams()
  const unauthorized = searchParams.get('error') === 'unauthorized'
  const [state, formAction, pending] = useActionState(login, { error: '' })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-5">
      {(state.error?.length > 0 || unauthorized) && (
        <div className="bg-[#fee2e2] text-[#b91c1c] text-[12.5px] px-4 py-3 rounded-xl">
          {unauthorized ? 'Access denied. You do not have permission to view that page.' : state.error}
        </div>
      )}

      {/* OAuth buttons */}
      <div className="grid grid-cols-2 gap-3">
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-xl bg-[#f6f3f2]
              hover:bg-[#eae7e7] transition-colors text-[13px] font-semibold text-[#1b1c1c]
              border border-[#d4c3be]/30"
          >
            <GoogleIcon />
            Google
          </button>
        </form>
        <form action={signInWithGithub}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-xl bg-[#f6f3f2]
              hover:bg-[#eae7e7] transition-colors text-[13px] font-semibold text-[#1b1c1c]
              border border-[#d4c3be]/30"
          >
            <GithubIcon />
            GitHub
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#d4c3be]/40" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
          <span className="bg-[#fcf9f8] px-4 text-[#504441]/60 font-semibold">Or continue with</span>
        </div>
      </div>

      {/* Email/Password form */}
      <form action={formAction} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#504441] uppercase tracking-wider">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            autoComplete="email"
            className="w-full h-12 bg-[#f6f3f2] text-[14px] text-[#1a1007] px-4 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#775a19] transition-all duration-200
              placeholder:text-[#b8a49a] hover:bg-[#f0ece9] border border-[#d4c3be]/20"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-semibold text-[#504441] uppercase tracking-wider">
              Password
            </label>
            <Link href="/forgot-password" className="text-[12px] text-[#775a19] font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full h-12 bg-[#f6f3f2] text-[14px] text-[#1a1007] px-4 pr-11 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-[#775a19] transition-all duration-200
                placeholder:text-[#b8a49a] hover:bg-[#f0ece9] border border-[#d4c3be]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9c8679] hover:text-[#3d2314] transition-colors"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 py-1">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-[#d4c3be] text-[#775a19] focus:ring-[#775a19] cursor-pointer"
          />
          <label htmlFor="remember" className="text-[13px] text-[#504441] cursor-pointer select-none">
            Remember this device
          </label>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full h-14 rounded-xl text-[15px] font-bold text-white
            bg-gradient-to-br from-[#74554b] to-[#8f6d63]
            hover:opacity-90 active:scale-[0.98] transition-all duration-200
            disabled:opacity-70 shadow-lg shadow-[#74554b]/20 flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <span className="w-4 h-4 rounded-full animate-spin inline-block"
                style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-[#f6f3f2] rounded-xl" />}>
      <LoginFormInner />
    </Suspense>
  )
}
