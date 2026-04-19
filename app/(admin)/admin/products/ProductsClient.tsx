'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { deleteProduct, type Product } from '@/app/actions/products'

type Props = { products: Product[] }

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

export default function ProductsClient({ products }: Props) {
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    startTransition(async () => {
      await deleteProduct(id)
      setDeleting(null)
    })
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 animate-fade-in stagger-2"
        style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.06)' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9c8679" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-[13px] text-[#1a1007] bg-transparent focus:outline-none placeholder:text-[#b8a49a]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-[#9c8679] hover:text-[#3d2314] transition-colors duration-150 text-[12px]">
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden animate-fade-in stagger-3"
        style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.07)' }}>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="bg-[#f6f3f2]">
              {['Product', 'Category', 'Variants', 'Stock', 'Actions'].map(col => (
                <th key={col} className="px-6 py-3.5 text-left text-[10.5px] font-600 text-[#9c8679] tracking-widest"
                  style={{ fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[13px] text-[#b8a49a]">
                  {search ? 'No products match your search' : 'No products yet. Add your first product!'}
                </td>
              </tr>
            ) : (
              filtered.map((product, i) => {
                const mainImage = product.product_images?.[0]?.image_url
                const totalStock = (product.product_variants ?? []).reduce((s, v) => s + v.stock, 0)
                const variantCount = (product.product_variants ?? []).length
                const isDeleting = deleting === product.id
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-[#fcf9f8] transition-colors duration-150 ${isDeleting ? 'opacity-40' : ''}`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f6f3f2] overflow-hidden flex-shrink-0">
                          {mainImage
                            ? <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                            : (
                              <div className="w-full h-full flex items-center justify-center text-[#c4956a]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                                  <polyline points="21 15 16 10 5 21"/>
                                </svg>
                              </div>
                            )
                          }
                        </div>
                        <p className="text-[13px] font-medium text-[#1a1007]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-medium text-[#9c8679] bg-[#f6f3f2] px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#6b5a52]">
                      {variantCount} {variantCount === 1 ? 'variant' : 'variants'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[12px] font-medium ${
                        totalStock === 0 ? 'text-[#b91c1c]' :
                        totalStock < 10 ? 'text-[#92400e]' : 'text-[#1a7a45]'
                      }`}>
                        {totalStock === 0 ? 'Out of stock' : `${totalStock} units`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-[#9c8679] hover:text-[#3d2314] hover:bg-[#f6f3f2]
                            rounded-lg transition-all duration-150 hover:scale-105"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting || isPending}
                          className="p-2 text-[#9c8679] hover:text-[#b91c1c] hover:bg-[#fee2e2]
                            rounded-lg transition-all duration-150 hover:scale-105
                            disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        </div>
      </div>

      <p className="text-[11px] text-[#b8a49a] text-right animate-fade-in">
        {filtered.length} of {products.length} products
      </p>
    </div>
  )
}
