import Link from 'next/link'
import { createProduct } from '@/app/actions/products'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8] px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 animate-fade-in">
          <Link
            href="/admin/products"
            className="text-[12px] text-[#9c8679] hover:text-[#3d2314] transition-colors duration-150 flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Products
          </Link>
          <span className="text-[#d4c4bb] text-[12px]">/</span>
          <span className="text-[12px] text-[#3d2314] font-medium">New Product</span>
        </div>
        <h1 className="text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1"
          style={{ fontWeight: 800 }}>
          Add New Product
        </h1>
        <p className="text-[13px] text-[#9c8679] mt-1 animate-fade-in stagger-2">
          Fill in the details below to add a new product to your inventory
        </p>
      </div>

      {/* Form card */}
      <div className="max-w-2xl bg-white rounded-2xl p-8 animate-fade-in stagger-3"
        style={{ boxShadow: '0 2px 16px rgba(61,35,20,0.08)' }}>
        <ProductForm action={createProduct} submitLabel="Create Product" />
      </div>
    </div>
  )
}
