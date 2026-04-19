'use client'

import { useState } from 'react'

export type Variant = {
  id?: string
  weight: string
  price: number
  stock: number
}

type Props = {
  variants: Variant[]
  onChange: (variants: Variant[]) => void
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)

const WEIGHT_OPTIONS = ['100g', '200g', '250g', '500g', '750g', '1kg']

export default function VariantManager({ variants, onChange }: Props) {
  function addVariant() {
    onChange([...variants, { weight: '200g', price: 0, stock: 0 }])
  }

  function removeVariant(i: number) {
    onChange(variants.filter((_, idx) => idx !== i))
  }

  function updateVariant(i: number, field: keyof Variant, value: string | number) {
    onChange(variants.map((v, idx) => idx === i ? { ...v, [field]: value } : v))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
          Variants
        </p>
        <button
          type="button"
          onClick={addVariant}
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#7c4a2d] hover:text-[#3d2314]
            transition-colors duration-150 hover:bg-[#f6f3f2] px-2.5 py-1.5 rounded-lg"
        >
          <PlusIcon /> Add variant
        </button>
      </div>

      {variants.length === 0 && (
        <div className="text-[12px] text-[#b8a49a] bg-[#f6f3f2] rounded-lg p-4 text-center">
          No variants yet. Add at least one weight variant.
        </div>
      )}

      <div className="space-y-2">
        {variants.map((v, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center gap-2 p-3 bg-[#f6f3f2] rounded-lg
              animate-fade-in transition-all duration-200 hover:bg-[#f0ece9]"
          >
            {/* Weight */}
            <select
              value={v.weight}
              onChange={e => updateVariant(i, 'weight', e.target.value)}
              className="bg-white text-[13px] text-[#3d2314] font-medium px-2.5 py-1.5 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-[#c4956a] transition-all duration-150 flex-shrink-0"
              style={{ border: 'none' }}
            >
              {WEIGHT_OPTIONS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>

            {/* Price */}
            <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 flex-1 min-w-[80px]">
              <span className="text-[12px] text-[#9c8679]">₹</span>
              <input
                type="number"
                min={0}
                step={0.01}
                value={v.price}
                onChange={e => updateVariant(i, 'price', parseFloat(e.target.value) || 0)}
                placeholder="Price"
                className="w-full text-[13px] text-[#1a1007] bg-transparent focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 w-[80px] flex-shrink-0">
              <input
                type="number"
                min={0}
                value={v.stock}
                onChange={e => updateVariant(i, 'stock', parseInt(e.target.value) || 0)}
                placeholder="Qty"
                className="w-full text-[13px] text-[#1a1007] bg-transparent focus:outline-none"
              />
              <span className="text-[10px] text-[#9c8679] whitespace-nowrap">u</span>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="text-[#b8a49a] hover:text-[#b91c1c] transition-all duration-150
                hover:scale-110 p-1 rounded-lg hover:bg-[#fee2e2] flex-shrink-0 ml-auto"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
