'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="bg-white/80 px-4 py-3 rounded-lg text-[14px] text-[#74554b] font-semibold">
        ✓ You&apos;re on the list — welcome to the harvest!
      </div>
    )
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-white px-4 py-3 rounded-lg text-[14px] text-[#1b1c1c] placeholder:text-[#827470] outline-none focus:ring-2 focus:ring-[#775a19]/30 transition-all"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white py-3 rounded-lg font-semibold text-[14px] hover:from-[#5d4037] hover:to-[#74554b] transition-all active:scale-95"
      >
        Subscribe
      </button>
    </form>
  )
}
