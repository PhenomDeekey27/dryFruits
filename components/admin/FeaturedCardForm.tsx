'use client'

import { useActionState, useState, useEffect } from 'react'
import type { FeaturedCard } from '@/app/actions/featured-cards'
import type { Product } from '@/app/actions/products'
import { getProducts } from '@/app/actions/products'
import SingleImageUploader from './SingleImageUploader'

type FormAction = (prevState: { error: string }, formData: FormData) => Promise<{ error: string }>

type Props = {
  action: FormAction
  defaultValues?: Partial<FeaturedCard>
  submitLabel?: string
}

export default function FeaturedCardForm({ action, defaultValues = {}, submitLabel = 'Save Card' }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: '' })
  const [imageUrl, setImageUrl] = useState(defaultValues.image_url ?? '')
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState((defaultValues as any).product_id ?? '')
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(err => console.error('Failed to load products:', err))
      .finally(() => setLoadingProducts(false))
  }, [])

  return (
    <form
      action={(formData: FormData) => {
        formData.set('image_url', imageUrl)
        if (selectedProductId) {
          formData.set('product_id', selectedProductId)
        }
        return formAction(formData)
      }}
      className="space-y-5 animate-fade-in"
    >
      {state.error?.length > 0 && (
        <div className="bg-[#fee2e2] text-[#b91c1c] text-[13px] px-4 py-3 rounded-lg animate-scale-in">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Product Name *
          </label>
          <input
            id="card-name"
            name="name"
            defaultValue={defaultValues.name}
            required
            placeholder="e.g. Almonds"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Linked Product */}
        <div className="col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Link to Product (Optional)
          </label>
          <select
            value={selectedProductId}
            onChange={e => {
              setSelectedProductId(e.target.value)
              const product = products.find(p => p.id === e.target.value)
              if (product) {
                // Auto-populate fields from selected product
                document.getElementById('card-name')?.setAttribute('value', product.name)
                document.getElementById('card-category')?.setAttribute('value', product.category)
              }
            }}
            disabled={loadingProducts}
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all hover:bg-[#f0ece9] appearance-none"
            style={{ border: 'none' }}
          >
            <option value="">{loadingProducts ? 'Loading products...' : 'Select a product to link'}</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.category})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-[#9c8679]">When users click this card, they'll go directly to this product's detail page</p>
        </div>

        {/* Category */}
        <div className="col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Category (auto-filled if product selected)
          </label>
          <select
            id="card-category"
            name="category"
            defaultValue={defaultValues.category || ''}
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all hover:bg-[#f0ece9] appearance-none"
            style={{ border: 'none' }}
          >
            <option value="">Select a category (optional)</option>
            <option value="Dates">Dates</option>
            <option value="Nuts">Nuts</option>
            <option value="Dried Fruits">Dried Fruits</option>
            <option value="Seeds">Seeds</option>
            <option value="Mixed">Mixed</option>
            <option value="Premium Gift">Premium Gift</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Subtitle / Series */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Subtitle / Series
          </label>
          <input
            name="subtitle"
            defaultValue={defaultValues.subtitle}
            placeholder="e.g. Signature Reserve"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Origin */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Origin
          </label>
          <input
            name="origin"
            defaultValue={defaultValues.origin}
            placeholder="e.g. California · Spring Harvest"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Notes (hover text) */}
        <div className="col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Hover Notes
          </label>
          <input
            name="notes"
            defaultValue={defaultValues.notes}
            placeholder="e.g. Buttery · Unblanched · Whole"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Image uploader */}
        <div className="col-span-2">
          {!imageUrl && (
            <div className="bg-[#f6f3f2] p-4 rounded-xl mb-3">
              <p className="text-[11px] text-[#6b5a52] font-medium">Images will be uploaded to Cloudinary automatically</p>
            </div>
          )}
          <SingleImageUploader
            imageUrl={imageUrl}
            onChange={setImageUrl}
            label="Featured Card Image"
          />
          {!imageUrl && (
            <input type="hidden" name="image_url" value="" />
          )}
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Display Price
          </label>
          <input
            name="price"
            defaultValue={defaultValues.price}
            placeholder="e.g. ₹1,280"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Sort order */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Display Order (No.)
          </label>
          <input
            name="sort_order"
            defaultValue={defaultValues.sort_order ?? 1}
            type="number"
            min={1}
            placeholder="1"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Is active */}
        {defaultValues.id && (
          <div className="col-span-2 space-y-1.5">
            <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
              Visibility
            </label>
            <select
              name="is_active"
              defaultValue={defaultValues.is_active !== false ? 'true' : 'false'}
              className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all hover:bg-[#f0ece9] appearance-none"
              style={{ border: 'none' }}
            >
              <option value="true">Active (visible on homepage)</option>
              <option value="false">Hidden</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || !imageUrl}
          className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-white bg-gradient-to-br from-[#7c4a2d] to-[#3d2314] hover:from-[#8d5535] hover:to-[#4a2a18] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          title={!imageUrl ? 'Please upload an image first' : ''}
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full animate-spin inline-block" style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
              Saving...
            </span>
          ) : submitLabel}
        </button>
      </div>
    </form>
  )
}
