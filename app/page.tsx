import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EditorialHero from '@/components/editorial/EditorialHero'
import PrologueSection from '@/components/editorial/PrologueSection'
import EditorialProductGrid from '@/components/editorial/EditorialProductGrid'
import MetricsSection from '@/components/editorial/MetricsSection'
import QuoteSection from '@/components/editorial/QuoteSection'
import FeaturesSection from '@/components/editorial/FeaturesSection'
import FinalCTASection from '@/components/editorial/FinalCTASection'
import FloatingDryFruit from '@/components/editorial/FloatingDryFruit'
import { getActiveFeaturedCards } from '@/app/actions/featured-cards'
import type { EditorialProduct } from '@/components/editorial/EditorialProductGrid'

export const metadata = {
  title: 'Annamalai Dates — A Curated Edition of Dry Fruits',
  description:
    'A small editorial house for premium dry fruits — almonds, cashews, pistachios, walnuts and dates, sourced one grove at a time.',
}

export default async function HomePage() {
  let editorialProducts: EditorialProduct[] | undefined
  try {
    const cards = await getActiveFeaturedCards()
    if (cards.length > 0) {
      editorialProducts = cards.map(card => ({
        id: card.id,
        index: String(card.sort_order).padStart(2, '0'),
        name: card.name,
        category: card.category,
        productId: card.product_id,
        series: card.subtitle || '',
        origin: card.origin || '',
        notes: card.notes || '',
        imageUrl: card.image_url,
        price: card.price || '',
      }))
    }
  } catch {}

  return (
    <div
      className="relative min-h-screen"
      style={{ background: 'var(--color-surface, #fcf9f8)', color: 'var(--color-on-surface, #1b1c1c)' }}
    >
      <FloatingDryFruit />
      <Navbar />
      <main className="relative z-10">
        {/* 01 — Hero (cinematic frame canvas) */}
        <EditorialHero />

        {/* 02 — Prologue / Origin */}
        <PrologueSection />

        {/* 03 — Product grid */}
        <EditorialProductGrid products={editorialProducts} />

        {/* 04 — Standard / metrics */}
        <MetricsSection />

        {/* 05 — Grower quote */}
        <QuoteSection />

        {/* 06 — Features / promise */}
        <FeaturesSection />

        {/* 07 — Final invitation */}
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
