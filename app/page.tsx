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

export const metadata = {
  title: 'Annamalai Dates — A Curated Edition of Dry Fruits',
  description:
    'A small editorial house for premium dry fruits — almonds, cashews, pistachios, walnuts and dates, sourced one grove at a time.',
}

export default function HomePage() {
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
        <EditorialProductGrid />

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
