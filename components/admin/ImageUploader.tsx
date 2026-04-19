'use client'

import { useState, useRef } from 'react'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

type Props = {
  images: string[]
  onChange: (urls: string[]) => void
}

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setUploadError(null)

    try {
      const fileArray = Array.from(files).slice(0, 6 - images.length)
      const urls = await Promise.all(fileArray.map(uploadImageToCloudinary))
      onChange([...images, ...urls])
    } catch {
      setUploadError('Upload failed. Check your Cloudinary config.')
    } finally {
      setUploading(false)
    }
  }

  function removeImage(i: number) {
    onChange(images.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-3">
      <p className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
        Product Images
      </p>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        className={`
          relative flex flex-col items-center justify-center gap-2 p-8 rounded-xl cursor-pointer
          transition-all duration-200
          ${dragOver
            ? 'bg-[#f0e8e2] scale-[1.01]'
            : 'bg-[#f6f3f2] hover:bg-[#f0e8e2]'
          }
          ${uploading ? 'pointer-events-none' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <div className={`text-[#9c8679] transition-transform duration-200 ${dragOver ? 'scale-110' : ''}`}>
          <UploadIcon />
        </div>
        <p className="text-[13px] text-[#6b5a52] font-medium">
          {uploading ? 'Uploading...' : 'Drop images or click to upload'}
        </p>
        <p className="text-[11px] text-[#b8a49a]">PNG, JPG, WebP — up to {6 - images.length} more</p>
        {uploading && (
          <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 rounded-full animate-spin"
              style={{ border: '2px solid #f6f3f2', borderTopColor: '#7c4a2d' }} />
          </div>
        )}
      </div>

      {uploadError && (
        <p className="text-[12px] text-[#b91c1c] bg-[#fee2e2] px-3 py-2 rounded-lg">{uploadError}</p>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url, i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden aspect-square
              animate-scale-in"
              style={{ animationDelay: `${i * 50}ms` }}>
              <img src={url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full
                  flex items-center justify-center text-[#b91c1c]
                  opacity-0 group-hover:opacity-100 transition-all duration-150
                  hover:scale-110 shadow-sm"
              >
                <XIcon />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white
                  bg-[#3d2314]/70 px-1.5 py-0.5 rounded-full">
                  MAIN
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
