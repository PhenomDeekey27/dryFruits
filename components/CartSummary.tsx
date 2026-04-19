'use client'

interface CartSummaryProps {
  subtotal: number
  tax?: number
  shipping?: string | number
  items: any[]
}

export default function CartSummary({ subtotal, tax = 0, shipping = 'Calculated at checkout', items }: CartSummaryProps) {
  const total = subtotal + (typeof tax === 'number' ? tax : 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <aside className="w-full lg:w-96">
      <div className="bg-white rounded-2xl p-8 sticky top-32 shadow-[0_40px_60px_-15px_rgba(27,28,28,0.04)]">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#1b1c1c] mb-8" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Order Summary
        </h2>

        {/* Summary Lines */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-[#504441]">
            <span className="text-sm">Subtotal ({itemCount} items)</span>
            <span className="font-semibold text-[#1b1c1c]">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-[#504441]">
            <span className="text-sm">Shipping</span>
            <span className="font-semibold text-[#1b1c1c]">
              {typeof shipping === 'number' ? `₹${shipping.toFixed(2)}` : shipping}
            </span>
          </div>

          {typeof tax === 'number' && tax > 0 && (
            <div className="flex justify-between text-[#504441]">
              <span className="text-sm">Estimated Tax</span>
              <span className="font-semibold text-[#1b1c1c]">₹{tax.toFixed(2)}</span>
            </div>
          )}

          {/* Total */}
          <div className="pt-6 border-t border-[#d4c3be]/20 flex justify-between">
            <span className="font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Total
            </span>
            <span className="font-bold text-2xl text-[#74554b]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <button
            className="w-full text-white py-5 rounded-xl font-bold text-lg shadow-sm hover:shadow-lg hover:opacity-90 transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #74554b 0%, #8f6d63 100%)',
              fontFamily: 'Epilogue, sans-serif',
            }}
          >
            Proceed to Checkout
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d4c3be]/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-semibold tracking-widest bg-white px-4 text-[#827470]">
              Express Pay
            </div>
          </div>

          <button className="w-full bg-[#1b1c1c] text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#2a2b2b] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
            Pay
          </button>
        </div>

        {/* Trust Elements */}
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-3 text-sm text-[#504441]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#775a19" strokeWidth="2" className="flex-shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 12 15 15 10" />
            </svg>
            <span>Secure editorial-grade transactions</span>
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
