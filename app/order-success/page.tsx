import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  let order = null
  let orderItems: { id: string; product_name: string; variant_weight: string; price: number; quantity: number }[] = []

  if (id && user) {
    const admin = createAdminSupabaseClient()
    if (admin) {
      const [orderRes, itemsRes] = await Promise.all([
        admin.from('orders').select('id, total, status, created_at, razorpay_payment_id').eq('id', id).eq('user_id', user.id).single(),
        admin.from('order_items').select('id, product_name, variant_weight, price, quantity').eq('order_id', id),
      ])
      order = orderRes.data
      orderItems = itemsRes.data ?? []
    }
  }

  return (
    <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-4 max-w-2xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1b1c1c] mb-2" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            Order Confirmed!
          </h1>
          <p className="text-[#504441]">Thank you for your purchase. We&apos;ll process your order shortly.</p>
          {order?.razorpay_payment_id && (
            <p className="text-xs text-[#827470] mt-2">Payment ID: {order.razorpay_payment_id}</p>
          )}
        </div>

        {order && (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                Order #{order.id.slice(0, 8).toUpperCase()}
              </h2>
              <span className="px-3 py-1 bg-[#dcfce7] text-[#166534] rounded-full text-xs font-bold uppercase tracking-wider">
                {order.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-[#f6f3f2] last:border-0">
                  <div>
                    <p className="font-semibold text-[#1b1c1c] text-sm">{item.product_name}</p>
                    <p className="text-xs text-[#827470]">{item.variant_weight} × {item.quantity}</p>
                  </div>
                  <span className="font-bold text-[#74554b]">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2 border-t border-[#d4c3be]/20">
              <span className="font-bold text-[#1b1c1c]">Total Paid</span>
              <span className="font-bold text-xl text-[#74554b]">₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-bold text-center hover:opacity-90 transition-all">
            Continue Shopping
          </Link>
          <Link href="/account" className="px-8 py-4 bg-[#f6f3f2] text-[#1b1c1c] rounded-xl font-bold text-center hover:bg-[#eae7e7] transition-all">
            View My Orders
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
