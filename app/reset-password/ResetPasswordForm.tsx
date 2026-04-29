'use client'

import { useActionState, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { updatePassword } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase'

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

function ResetPasswordFormInner() {
  const searchParams = useSearchParams()
  const [state, formAction, pending] = useActionState(updatePassword, { error: '', success: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      setSessionError('Invalid or expired reset link. Please request a new one.')
      return
    }
    const supabase = createClient()
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setSessionError('This reset link has expired. Please request a new one.')
      } else {
        setSessionReady(true)
      }
    })
  }, [searchParams])

  if (sessionError) {
    return (
      <div className="space-y-5 text-center">
        <div className="bg-[#fee2e2] text-[#b91c1c] text-[13px] px-4 py-4 rounded-xl">
          {sessionError}
        </div>
        <a href="/forgot-password" className="block w-full h-12 rounded-xl text-[14px] font-bold text-white bg-gradient-to-br from-[#74554b] to-[#8f6d63] hover:opacity-90 transition-all flex items-center justify-center">
          Request New Link
        </a>
      </div>
    )
  }

  if (!sessionReady) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="w-6 h-6 rounded-full animate-spin" style={{ border: '2px solid #d4c3be', borderTopColor: '#74554b' }} />
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="bg-[#fee2e2] text-[#b91c1c] text-[12.5px] px-4 py-3 rounded-xl">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-[#504441] uppercase tracking-wider">
          New Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••"
            autoComplete="new-password"
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

      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-[#504441] uppercase tracking-wider">
          Confirm Password
        </label>
        <div className="relative">
          <input
            name="confirm"
            type={showConfirm ? 'text' : 'password'}
            required
            placeholder="••••••••"
            autoComplete="new-password"
            className="w-full h-12 bg-[#f6f3f2] text-[14px] text-[#1a1007] px-4 pr-11 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#775a19] transition-all duration-200
              placeholder:text-[#b8a49a] hover:bg-[#f0ece9] border border-[#d4c3be]/20"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9c8679] hover:text-[#3d2314] transition-colors"
          >
            <EyeIcon open={showConfirm} />
          </button>
        </div>
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
            Updating...
          </>
        ) : (
          <>
            Set New Password
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse bg-[#f6f3f2] rounded-xl" />}>
      <ResetPasswordFormInner />
    </Suspense>
  )
}
