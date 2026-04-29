'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { sendPasswordResetEmail } from '@/app/actions/auth'

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(sendPasswordResetEmail, { error: '', success: '' })

  if (state.success) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p className="text-[15px] font-semibold text-[#1b1c1c] mb-1">Check your inbox</p>
          <p className="text-[13px] text-[#504441]">{state.success}</p>
        </div>
        <Link href="/login" className="block w-full h-12 rounded-xl text-[14px] font-bold text-[#74554b] bg-[#f0eded] hover:bg-[#eae7e7] transition-colors flex items-center justify-center">
          Back to Sign In
        </Link>
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
            Sending...
          </>
        ) : 'Send Reset Link'}
      </button>

      <p className="text-center text-[13px] text-[#504441]">
        Remember your password?{' '}
        <Link href="/login" className="text-[#775a19] font-bold hover:underline transition-colors">
          Sign In
        </Link>
      </p>
    </form>
  )
}
