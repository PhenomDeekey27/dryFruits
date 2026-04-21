'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  quantity: number
  products: { id: string; name: string; category: string; product_images: { image_url: string }[] }
  product_variants: { id: string; weight: string; price: number }
}

interface CartSummaryProps {
  subtotal: number
  tax?: number
  shipping?: string | number
  items: CartItem[]
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void }
  }
}

export default function CartSummary({ subtotal, tax = 0, shipping = 'Free', items }: CartSummaryProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const total = subtotal + (typeof tax === 'number' ? tax : 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError(null)

    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error('Failed to load Razorpay. Check your internet connection.')

      // Create Razorpay order on server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })

      if (!orderRes.ok) {
        const err = await orderRes.json()
        throw new Error(err.error ?? 'Failed to create payment order')
      }

      const { orderId, amount, currency } = await orderRes.json()

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Annamalai Dates',
        description: `Order of ${itemCount} item${itemCount > 1 ? 's' : ''}`,
        order_id: orderId,
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            // Verify payment and create order in DB
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: items,
                totalAmount: total,
              }),
            })

            const result = await verifyRes.json()

            if (!verifyRes.ok) throw new Error(result.error ?? 'Payment verification failed')

            // Navigate to success page
            router.push(`/order-success?id=${result.orderId}`)
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Payment verification failed')
            setLoading(false)
          }
        },
        prefill: {},
        theme: { color: '#74554b' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <aside className="w-full lg:w-96">
      <div className="bg-white rounded-2xl p-8 sticky top-32 shadow-[0_40px_60px_-15px_rgba(27,28,28,0.04)]">
        <h2 className="text-2xl font-bold text-[#1b1c1c] mb-8" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Order Summary
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-[#504441]">
            <span className="text-sm">Subtotal ({itemCount} items)</span>
            <span className="font-semibold text-[#1b1c1c]">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-[#504441]">
            <span className="text-sm">Shipping</span>
            <span className="font-semibold text-[#775a19]">
              {typeof shipping === 'number' ? `₹${shipping.toFixed(2)}` : shipping}
            </span>
          </div>

          {typeof tax === 'number' && tax > 0 && (
            <div className="flex justify-between text-[#504441]">
              <span className="text-sm">Estimated Tax</span>
              <span className="font-semibold text-[#1b1c1c]">₹{tax.toFixed(2)}</span>
            </div>
          )}

          <div className="pt-6 border-t border-[#d4c3be]/20 flex justify-between">
            <span className="font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>Total</span>
            <span className="font-bold text-2xl text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-[#ffdad6] text-[#ba1a1a] rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
          className="w-full text-white py-5 rounded-xl font-bold text-lg shadow-sm hover:shadow-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)', fontFamily: 'Epilogue, sans-serif' }}
        >
          {loading ? 'Processing…' : 'Proceed to Checkout'}
        </button>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3 text-sm text-[#504441]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#775a19" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 12 15 15 10" />
            </svg>
            <span>Payments secured by Razorpay</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-[#504441]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#775a19" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Sustainably sourced & plastic-free packaging</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
