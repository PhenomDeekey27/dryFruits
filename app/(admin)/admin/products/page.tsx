import Link from 'next/link'
import { getProducts, deleteProduct } from '@/app/actions/products'
import ProductsClient from './ProductsClient'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#fcf9f8] px-4 sm:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <p className="text-[11px] font-600 text-[#9c8679] uppercase tracking-widest mb-1 animate-fade-in"
            style={{ fontWeight: 600 }}>
            Inventory
          </p>
          <h1 className="text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1"
            style={{ fontWeight: 800 }}>
            Products
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-gradient-to-br from-[#7c4a2d] to-[#3d2314]
            text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl
            hover:from-[#8d5535] hover:to-[#4a2a18]
            active:scale-[0.97] transition-all duration-200 shadow-sm animate-fade-in stagger-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Product
        </Link>
      </div>

      <ProductsClient products={products} />
    </div>
  )
}
