'use client'

import Image from 'next/image'
import { useState, useTransition } from 'react'
import { deleteFeaturedCard, toggleFeaturedCard, type FeaturedCard } from '@/app/actions/featured-cards'
import Link from 'next/link'

export default function FeaturedCardsClient({ cards }: { cards: FeaturedCard[] }) {
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleDelete(id: string) {
    if (!confirm('Delete this featured card?')) return
    setDeletingId(id)
    startTransition(async () => {
      await deleteFeaturedCard(id)
      setDeletingId(null)
    })
  }

  function handleToggle(id: string, current: boolean) {
    startTransition(async () => {
      await toggleFeaturedCard(id, !current)
    })
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-20 text-[#9c8679] animate-fade-in">
        <p className="text-[15px] mb-2">No featured cards yet.</p>
        <Link
          href="/admin/featured/new"
          className="text-[13px] text-[#7c4a2d] font-semibold underline"
        >
          Add your first card →
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 animate-fade-in">
      {cards.map((card, i) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl overflow-hidden flex flex-col animate-fade-in"
          style={{
            boxShadow: '0 2px 16px rgba(61,35,20,0.08)',
            animationDelay: `${i * 0.05}s`,
          }}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] bg-[#f6f3f2]">
            {card.image_url ? (
              <Image
                src={card.image_url}
                alt={card.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#9c8679] text-[12px]">
                No image
              </div>
            )}
            {/* Sort badge */}
            <div className="absolute top-3 left-3 bg-white/90 text-[#3d2314] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              No. {String(card.sort_order).padStart(2, '0')}
            </div>
            {/* Status */}
            <div className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${card.is_active ? 'bg-green-100 text-green-700' : 'bg-[#f6f3f2] text-[#9c8679]'}`}>
              {card.is_active ? 'Active' : 'Hidden'}
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-[15px] font-bold text-[#1a1007] mb-0.5 truncate">{card.name}</h3>
            {card.subtitle && (
              <p className="text-[11px] text-[#775a19] uppercase tracking-wider mb-1 truncate">{card.subtitle}</p>
            )}
            {card.origin && (
              <p className="text-[12px] text-[#6b5a52] mb-1 truncate">{card.origin}</p>
            )}
            {card.notes && (
              <p className="text-[11px] text-[#9c8679] truncate mb-2">{card.notes}</p>
            )}
            {card.price && (
              <p className="text-[13px] font-semibold text-[#74554b] mb-3">{card.price}</p>
            )}

            <div className="mt-auto flex gap-2">
              <Link
                href={`/admin/featured/${card.id}/edit`}
                className="flex-1 text-center py-2 rounded-lg text-[12px] font-semibold text-[#7c4a2d] bg-[#fef3c7] hover:bg-[#fde68a] transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleToggle(card.id, card.is_active)}
                disabled={isPending}
                className="flex-1 py-2 rounded-lg text-[12px] font-semibold text-[#6b5a52] bg-[#f6f3f2] hover:bg-[#ede9e6] transition-colors disabled:opacity-50"
              >
                {card.is_active ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                disabled={deletingId === card.id || isPending}
                className="py-2 px-3 rounded-lg text-[12px] font-semibold text-[#b91c1c] bg-[#fee2e2] hover:bg-[#fecaca] transition-colors disabled:opacity-50"
              >
                {deletingId === card.id ? '…' : '✕'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
