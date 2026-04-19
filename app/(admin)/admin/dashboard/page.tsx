import { getDashboardStats } from '@/app/actions/orders'
import { getRecentOrders } from '@/app/actions/orders'
import { getLowStockProducts } from '@/app/actions/products'
import StatCard from '@/components/admin/StatCard'
import OrdersTable from '@/components/admin/OrdersTable'
import InventoryAlerts from '@/components/admin/InventoryAlerts'
import HighlightCard from '@/components/admin/HighlightCard'
import DashboardHeader from './DashboardHeader'

const RevenueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)
const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const ProductsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0L20 17.73A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

export default async function DashboardPage() {
  const [stats, recentOrders, lowStock] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5),
    getLowStockProducts(),
  ])

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      {/* Header */}
      <DashboardHeader />

      {/* Content */}
      <div className="px-4 sm:px-8 pb-8 space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            badge="+12.4%"
            badgeType="up"
            subtitle={`Avg order: ₹${stats.avgOrderValue.toFixed(2)}`}
            icon={<RevenueIcon />}
            delay={0}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            badge="+5.2%"
            badgeType="up"
            subtitle="Avg order value"
            icon={<OrdersIcon />}
            delay={80}
          />
          <StatCard
            title="Active Products"
            value={String(stats.activeProducts)}
            badge="Stable"
            badgeType="stable"
            subtitle={`${lowStock.length} out of stock / low inventory`}
            icon={<ProductsIcon />}
            delay={160}
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Orders table — 2 cols on lg */}
          <div className="col-span-1 lg:col-span-2 space-y-5">
            <OrdersTable orders={recentOrders} showViewAll />
          </div>

          {/* Right column */}
          <div className="col-span-1 space-y-5">
            <InventoryAlerts items={lowStock as any} />
            <HighlightCard />
          </div>
        </div>
      </div>

    </div>
  )
}
