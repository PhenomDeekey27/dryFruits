'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { updateOrderStatus, type Order } from '@/app/actions/orders'

const statusConfig = {
  shipped:    { label: 'SHIPPED',    bg: 'bg-[#d4f0df]', text: 'text-[#1a7a45]' },
  pending:    { label: 'PENDING',    bg: 'bg-[#fef3c7]', text: 'text-[#92400e]' },
  processing: { label: 'PROCESSING', bg: 'bg-[#ede9fe]', text: 'text-[#5b21b6]' },
  delivered:  { label: 'DELIVERED',  bg: 'bg-[#dbeafe]', text: 'text-[#1e40af]' },
  cancelled:  { label: 'CANCELLED',  bg: 'bg-[#fee2e2]', text: 'text-[#b91c1c]' },
}

function getInitials(email: string) {
  return email ? email.slice(0, 2).toUpperCase() : '??'
}

function avatarColor(email: string) {
  const colors = ['#c4956a', '#7c4a2d', '#a0785a', '#d4a574', '#8b6355']
  const idx = (email?.charCodeAt(0) ?? 0) % colors.length
  return colors[idx]
}

function formatOrderId(id: string) {
  return '#ORD-' + id.slice(0, 4).toUpperCase()
}

function formatCustomerName(email: string) {
  if (!email) return 'Unknown'
  const name = email.split('@')[0]
  return name.charAt(0).toUpperCase() + name.slice(1)
}

type Props = {
  orders: Order[]
  showViewAll?: boolean
}

export default function OrdersTable({ orders, showViewAll = false }: Props) {
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  function handleStatusChange(id: string, status: Order['status']) {
    setUpdatingId(id)
    startTransition(async () => {
      await updateOrderStatus(id, status)
      setUpdatingId(null)
    })
  }

  return (
    <div className="bg-white rounded-xl animate-fade-in stagger-3" style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.07)' }}>
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-[15px] font-700 text-[#1a1007]" style={{ fontWeight: 700 }}>Recent Orders</h2>
        {showViewAll && (
          <Link
            href="/admin/orders"
            className="text-[12px] font-medium text-[#7c4a2d] hover:text-[#3d2314] transition-colors duration-150"
          >
            View All →
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f6f3f2]">
              {['ORDER ID', 'CUSTOMER', 'AMOUNT', 'STATUS', 'ACTION'].map(col => (
                <th key={col} className="px-6 py-3 text-left text-[10.5px] font-600 text-[#9c8679] tracking-widest"
                  style={{ fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-[13px] text-[#b8a49a]">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order, i) => {
                const email = order.profiles?.email ?? ''
                const cfg = statusConfig[order.status] ?? statusConfig.pending
                const isUpdating = updatingId === order.id
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-[#fcf9f8] transition-colors duration-150 group"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td className="px-6 py-3.5 text-[13px] font-medium text-[#3d2314]">
                      {formatOrderId(order.id)}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: avatarColor(email) + '33' }}
                        >
                          <span className="text-[10px] font-bold" style={{ color: avatarColor(email) }}>
                            {getInitials(email)}
                          </span>
                        </div>
                        <span className="text-[13px] text-[#3d2314] font-medium">
                          {formatCustomerName(email)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-[13px] font-semibold text-[#1a1007]">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-3.5">
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                        disabled={isUpdating || isPending}
                        className={`
                          text-[10.5px] font-700 px-2.5 py-1 rounded-full appearance-none cursor-pointer
                          transition-all duration-150 hover:opacity-80
                          ${cfg.bg} ${cfg.text}
                        `}
                        style={{ fontWeight: 700, border: 'none', outline: 'none' }}
                      >
                        {Object.entries(statusConfig).map(([val, { label }]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-[#9c8679] hover:text-[#3d2314] transition-all duration-150
                          hover:scale-110 inline-block"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
