import { Suspense } from 'react'
import ProductsClient from './ProductsClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <div style={{ background: '#fcf9f8', color: '#1b1c1c' }} className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="pt-32 pb-32" />}>
        <ProductsClient />
      </Suspense>
      <Footer />
    </div>
  )
}
