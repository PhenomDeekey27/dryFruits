import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFeaturedCards, updateFeaturedCard } from '@/app/actions/featured-cards'
import FeaturedCardForm from '@/components/admin/FeaturedCardForm'

export default async function EditFeaturedCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cards = await getFeaturedCards()
  const card = cards.find(c => c.id === id)
  if (!card) notFound()

  const action = updateFeaturedCard.bind(null, id)

  return (
    <div className="min-h-screen bg-[#fcf9f8] px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 animate-fade-in">
          <Link href="/admin/featured" className="text-[12px] text-[#9c8679] hover:text-[#3d2314] transition-colors flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Featured Cards
          </Link>
          <span className="text-[#d4c4bb] text-[12px]">/</span>
          <span className="text-[12px] text-[#3d2314] font-medium">Edit Card</span>
        </div>
        <h1 className="text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1" style={{ fontWeight: 800 }}>
          Edit: {card.name}
        </h1>
      </div>

      <div className="max-w-2xl bg-white rounded-2xl p-8 animate-fade-in stagger-3" style={{ boxShadow: '0 2px 16px rgba(61,35,20,0.08)' }}>
        <FeaturedCardForm action={action} defaultValues={card} submitLabel="Save Changes" />
      </div>
    </div>
  )
}
