import Link from 'next/link'
import { createFeaturedCard } from '@/app/actions/featured-cards'
import FeaturedCardForm from '@/components/admin/FeaturedCardForm'

export default function NewFeaturedCardPage() {
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
          <span className="text-[12px] text-[#3d2314] font-medium">New Card</span>
        </div>
        <h1 className="text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1" style={{ fontWeight: 800 }}>
          Add Featured Card
        </h1>
        <p className="text-[13px] text-[#9c8679] mt-1 animate-fade-in stagger-2">
          This card will appear in the homepage grid once saved and activated.
        </p>
      </div>

      <div className="max-w-2xl bg-white rounded-2xl p-8 animate-fade-in stagger-3" style={{ boxShadow: '0 2px 16px rgba(61,35,20,0.08)' }}>
        <FeaturedCardForm action={createFeaturedCard} submitLabel="Create Card" />
      </div>
    </div>
  )
}
