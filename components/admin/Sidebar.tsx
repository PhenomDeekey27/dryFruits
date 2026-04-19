'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { logout } from '@/app/actions/auth'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)
const InventoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21.73a2 2 0 0 0 2 0L20 17.73A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const CustomersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)
const StoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: <OverviewIcon /> },
  { label: 'Inventory', href: '/admin/products', icon: <InventoryIcon /> },
  { label: 'Orders', href: '/admin/orders', icon: <OrdersIcon /> },
  { label: 'Customers', href: '/admin/customers', icon: <CustomersIcon /> },
]

type Props = {
  adminEmail?: string
  onClose?: () => void
}

export default function Sidebar({ adminEmail, onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loggingOut, setLoggingOut] = useState(false)

  function handleLogout() {
    setLoggingOut(true)
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <aside className="w-[220px] h-full min-h-screen bg-white flex flex-col"
      style={{ boxShadow: '2px 0 12px rgba(61,35,20,0.06)' }}>
      {/* Brand + Mobile close */}
      <div className="px-5 pt-6 pb-5 flex items-start justify-between">
        <div>
          <p className="text-[15px] font-800 text-[#3d2314] tracking-tight leading-none">Annamalai Dates</p>
          <p className="text-[11px] text-[#9c8679] mt-1 font-medium">Admin Control</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden -mr-1 -mt-1 p-1.5 rounded-lg text-[#9c8679] hover:bg-[#f6f3f2] transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium
                transition-all duration-200 group
                stagger-${i + 1} animate-fade-in
                ${isActive
                  ? 'bg-[#f6f3f2] text-[#3d2314]'
                  : 'text-[#6b5a52] hover:bg-[#fcf9f8] hover:text-[#3d2314]'
                }
              `}
            >
              <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#7c4a2d]' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 space-y-3">
        {/* View storefront */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[13px] font-semibold
            text-[#7c4a2d] bg-[#fef3c7] hover:bg-[#fde68a]
            active:scale-[0.97] transition-all duration-200"
        >
          <StoreIcon />
          View Store
        </Link>

        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[13px] font-semibold text-white
            bg-gradient-to-br from-[#7c4a2d] to-[#3d2314]
            hover:from-[#8d5535] hover:to-[#4a2a18]
            active:scale-[0.97] transition-all duration-200 shadow-sm"
        >
          <PlusIcon />
          Add New Product
        </Link>

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-[#f6f3f2] transition-colors duration-150 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c4956a] to-[#7c4a2d] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[11px] font-bold">
              {adminEmail ? adminEmail[0].toUpperCase() : 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-600 text-[#3d2314] leading-none truncate">AdminUser</p>
            <p className="text-[10px] text-[#9c8679] mt-0.5 truncate">{adminEmail ?? 'SUPER ADMIN'}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut || isPending}
            className="text-[#9c8679] hover:text-[#3d2314] transition-colors duration-150 opacity-0 group-hover:opacity-100"
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  )
}
