'use client'

import { useTransition, useState } from 'react'

type LowStockItem = {
  id: string
  weight: string
  stock: number
  products: { name: string } | null
}

type Props = {
  items: LowStockItem[]
}

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

export default function InventoryAlerts({ items }: Props) {
  const [restocked, setRestocked] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()

  function handleRestock(id: string) {
    startTransition(async () => {
      // In a real app, this would open a restock modal or navigate
      setRestocked(prev => new Set([...prev, id]))
    })
  }

  return (
    <div
      className="bg-white rounded-xl p-5 animate-fade-in stagger-4"
      style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.07)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#e5572b]"><AlertIcon /></span>
        <h2 className="text-[14px] font-700 text-[#1a1007]" style={{ fontWeight: 700 }}>
          Inventory Alerts
        </h2>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-[12px] text-[#b8a49a] py-2">All items are well stocked</p>
        ) : (
          items.map((item, i) => {
            const done = restocked.has(item.id)
            return (
              <div
                key={item.id}
                className={`
                  flex items-center justify-between py-2 px-3 rounded-lg
                  transition-all duration-300
                  ${done ? 'opacity-50' : 'hover:bg-[#fcf9f8]'}
                `}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <p className="text-[13px] font-medium text-[#3d2314] leading-tight">
                    {item.products?.name ?? 'Unknown'}
                  </p>
                  <p className="text-[11px] text-[#b8a49a] mt-0.5">
                    {item.weight} · Only {item.stock} left
                  </p>
                </div>
                <button
                  onClick={() => handleRestock(item.id)}
                  disabled={done || isPending}
                  className={`
                    text-[11px] font-semibold px-3 py-1.5 rounded-lg
                    transition-all duration-150 active:scale-95
                    ${done
                      ? 'bg-[#d4f0df] text-[#1a7a45] cursor-default'
                      : 'bg-gradient-to-br from-[#7c4a2d] to-[#3d2314] text-white hover:from-[#8d5535] hover:to-[#4a2a18]'
                    }
                  `}
                >
                  {done ? 'Restocked' : 'Restock'}
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
