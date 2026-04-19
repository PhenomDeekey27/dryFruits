import { getOrders } from '@/app/actions/orders'
import OrdersTable from '@/components/admin/OrdersTable'

export default async function OrdersPage() {
  const orders = await getOrders(100)

  const counts = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] font-600 text-[#9c8679] uppercase tracking-widest mb-1 animate-fade-in"
          style={{ fontWeight: 600 }}>
          Order Management
        </p>
        <h1 className="text-[24px] sm:text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1"
          style={{ fontWeight: 800 }}>
          Orders
        </h1>
      </div>

      {/* Status counts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {[
          { label: 'Total', value: counts.total, color: 'text-[#1a1007]', bg: 'bg-white' },
          { label: 'Pending', value: counts.pending, color: 'text-[#92400e]', bg: 'bg-[#fef3c7]' },
          { label: 'Processing', value: counts.processing, color: 'text-[#5b21b6]', bg: 'bg-[#ede9fe]' },
          { label: 'Shipped', value: counts.shipped, color: 'text-[#1a7a45]', bg: 'bg-[#d4f0df]' },
          { label: 'Delivered', value: counts.delivered, color: 'text-[#1e40af]', bg: 'bg-[#dbeafe]' },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`${s.bg} rounded-xl px-5 py-4 animate-fade-in`}
            style={{
              animationDelay: `${i * 60}ms`,
              boxShadow: '0 1px 6px rgba(61,35,20,0.06)',
            }}
          >
            <p className={`text-[22px] font-800 ${s.color}`} style={{ fontWeight: 800 }}>{s.value}</p>
            <p className="text-[11px] text-[#9c8679] font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
