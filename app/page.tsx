import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CategoryGrid from '@/components/CategoryGrid'
import ProductCarousel from '@/components/ProductCarousel'
import SubscriptionBanner from '@/components/SubscriptionBanner'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { getFeaturedProducts } from '@/lib/products'

export const metadata = {
  title: 'Annamalai Dates — Premium Dry Fruits & Dates',
  description:
    'Experience the architectural beauty of sun-cured Medjool dates and hand-polished artisan dry fruits. Sourced from the world\'s finest agrarian regions.',
}

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <div className="min-h-screen" style={{ background: '#fcf9f8', color: '#1b1c1c' }}>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <CategoryGrid />
        <ProductCarousel products={products} />
        <SubscriptionBanner />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
