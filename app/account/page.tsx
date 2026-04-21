import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getProfileRole, createAdminSupabaseClient } from '@/lib/supabase-admin'
import { logout } from '@/app/actions/auth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-[#fff3cd] text-[#856404]',
  processing: 'bg-[#cce5ff] text-[#004085]',
  shipped:    'bg-[#d4edda] text-[#155724]',
  delivered:  'bg-[#d4edda] text-[#155724]',
  cancelled:  'bg-[#f8d7da] text-[#721c24]',
}

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const role = await getProfileRole(user.id, supabase)
  if (role === 'admin') redirect('/admin/dashboard')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  const email = profile?.email ?? user.email ?? ''
  const createdAt = profile?.created_at ?? user.created_at ?? new Date().toISOString()

  // Fetch orders with items
  const admin = createAdminSupabaseClient()
  let orders: {
    id: string; total: number; status: string; created_at: string
    razorpay_payment_id?: string
    order_items: { product_name: string; variant_weight: string; price: number; quantity: number }[]
  }[] = []

  if (admin) {
    const { data } = await admin
      .from('orders')
      .select('id, total, status, created_at, razorpay_payment_id, order_items(product_name, variant_weight, price, quantity)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
    orders = (data ?? []) as typeof orders
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20 px-4 max-w-3xl mx-auto w-full">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#c4956a] to-[#3d2314] rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1a1007]" style={{ fontFamily: 'Epilogue, sans-serif' }}>My Account</h1>
              <p className="text-sm text-[#9c8679]">{email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#f6f3f2] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#9c8679] uppercase tracking-widest mb-1">Role</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#6b5a52]">Customer</span>
            </div>
            <div className="bg-[#f6f3f2] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#9c8679] uppercase tracking-widest mb-1">Member Since</p>
              <p className="text-sm text-[#1a1007] font-medium">
                {new Date(createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>

          <form action={logout}>
            <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold text-[#7c4a2d] bg-[#f6f3f2] hover:bg-[#ede8e5] transition-all">
              Sign out
            </button>
          </form>
        </div>

        {/* Order History */}
        <h2 className="text-2xl font-bold text-[#1b1c1c] mb-6" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4c3be" strokeWidth="1" className="mx-auto mb-4">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p className="text-[#827470] mb-4">No orders yet.</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#827470] font-mono mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-[#827470]">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 ${STATUS_STYLES[order.status] ?? 'bg-[#f6f3f2] text-[#504441]'}`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-[#74554b] text-lg" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {order.order_items?.length > 0 && (
                  <div className="border-t border-[#f6f3f2] pt-4 space-y-2">
                    {order.order_items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#504441]">
                          {item.product_name}
                          {item.variant_weight && <span className="text-[#827470]"> ({item.variant_weight})</span>}
                          <span className="text-[#827470]"> × {item.quantity}</span>
                        </span>
                        <span className="font-semibold text-[#1b1c1c]">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
