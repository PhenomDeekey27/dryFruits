'use client'

import { useActionState, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import VariantManager, { type Variant } from './VariantManager'
import ImageUploader from './ImageUploader'

const CATEGORIES = ['Dates', 'Nuts', 'Dried Fruits', 'Seeds', 'Mixed', 'Premium Gift', 'Other']

type FormAction = (prevState: { error: string }, formData: FormData) => Promise<{ error: string }>

type Props = {
  action: FormAction
  defaultValues?: {
    name?: string
    category?: string
    description?: string
    variants?: Variant[]
    images?: string[]
  }
  submitLabel?: string
}

export default function ProductForm({ action, defaultValues = {}, submitLabel = 'Save Product' }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: '' })
  const [variants, setVariants] = useState<Variant[]>(defaultValues.variants ?? [])
  const [images, setImages] = useState<string[]>(defaultValues.images ?? [])

  return (
    <form
      action={async (formData: FormData) => {
        formData.set('variants', JSON.stringify(variants))
        images.forEach(url => formData.append('image_urls', url))
        return formAction(formData)
      }}
      className="space-y-6 animate-fade-in"
    >
      {state.error?.length > 0 && (
        <div className="bg-[#fee2e2] text-[#b91c1c] text-[13px] px-4 py-3 rounded-lg animate-scale-in">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="col-span-1 sm:col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Product Name *
          </label>
          <input
            name="name"
            defaultValue={defaultValues.name}
            required
            placeholder="e.g. Premium Medjool Dates"
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all duration-200
              placeholder:text-[#b8a49a] hover:bg-[#f0ece9]"
            style={{ border: 'none' }}
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Category *
          </label>
          <select
            name="category"
            defaultValue={defaultValues.category}
            required
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] font-medium px-4 py-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all duration-200
              hover:bg-[#f0ece9] appearance-none cursor-pointer"
            style={{ border: 'none' }}
          >
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div className="col-span-1 sm:col-span-2 space-y-1.5">
          <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
            Description
          </label>
          <textarea
            name="description"
            defaultValue={defaultValues.description}
            rows={4}
            placeholder="Describe the product, sourcing, flavor profile..."
            className="w-full bg-[#f6f3f2] text-[14px] text-[#1a1007] px-4 py-3 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all duration-200
              placeholder:text-[#b8a49a] hover:bg-[#f0ece9] resize-none"
            style={{ border: 'none' }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f6f3f2]" />

      {/* Variants */}
      <VariantManager variants={variants} onChange={setVariants} />

      <div className="h-px bg-[#f6f3f2]" />

      {/* Images */}
      <ImageUploader images={images} onChange={setImages} />

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 py-3 rounded-xl text-[14px] font-semibold text-white
            bg-gradient-to-br from-[#7c4a2d] to-[#3d2314]
            hover:from-[#8d5535] hover:to-[#4a2a18]
            active:scale-[0.98] transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full animate-spin inline-block"
                style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
              Saving...
            </span>
          ) : submitLabel}
        </button>
      </div>
    </form>
  )
}
