import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CategoryGrid from '@/components/CategoryGrid'
import ProductCarousel from '@/components/ProductCarousel'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import { getFeaturedProducts } from '@/lib/products'

export const metadata = {
  title: 'Annamalai Dates — Premium Dry Fruits & Dates',
  description:
    'Shop premium quality dates, nuts, seeds, and dry fruits online. Handpicked for freshness and delivered across India.',
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
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
