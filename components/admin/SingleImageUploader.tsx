'use client'

import { useState, useRef } from 'react'
import { uploadImageToCloudinary } from '@/lib/cloudinary'
import Image from 'next/image'

type Props = {
  imageUrl: string
  onChange: (url: string) => void
  label?: string
}

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function SingleImageUploader({ imageUrl, onChange, label = 'Featured Card Image' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setUploadError(null)

    try {
      const file = files[0]
      const url = await uploadImageToCloudinary(file)
      onChange(url)
    } catch (err) {
      setUploadError('Upload failed. Check your Cloudinary config.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  function removeImage() {
    onChange('')
  }

  return (
    <div className="space-y-3">
      <label className="text-[12px] font-600 text-[#6b5a52] uppercase tracking-wide" style={{ fontWeight: 600 }}>
        {label} *
      </label>

      {imageUrl ? (
        /* Preview */
        <div className="relative group rounded-xl overflow-hidden aspect-[3/4] bg-[#f6f3f2] border-2 border-[#e0d5ce]">
          <Image
            src={imageUrl}
            alt="Featured card"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full
              flex items-center justify-center text-[#b91c1c]
              opacity-0 group-hover:opacity-100 transition-all duration-150
              hover:scale-110 shadow-md"
            title="Remove image"
          >
            <XIcon />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 left-3 right-3 py-2 bg-white/90 text-[#3d2314] text-[12px] font-semibold
              rounded-lg hover:bg-white transition-all duration-150
              flex items-center justify-center gap-1.5"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <div className="w-3 h-3 rounded-full animate-spin" style={{ border: '1.5px solid #f6f3f2', borderTopColor: '#7c4a2d' }} />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon />
                Change Image
              </>
            )}
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
          className={`
            relative flex flex-col items-center justify-center gap-2 p-8 rounded-xl cursor-pointer
            transition-all duration-200 aspect-[3/4]
            ${dragOver
              ? 'bg-[#f0e8e2] scale-[1.01] border-2 border-[#7c4a2d]'
              : 'bg-[#f6f3f2] hover:bg-[#f0e8e2] border-2 border-dashed border-[#d4c3be]'
            }
            ${uploading ? 'pointer-events-none' : ''}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
            disabled={uploading}
          />
          <div className={`text-[#9c8679] transition-transform duration-200 ${dragOver ? 'scale-110' : ''}`}>
            <UploadIcon />
          </div>
          <p className="text-[13px] text-[#6b5a52] font-medium text-center">
            {uploading ? 'Uploading...' : 'Drop image or click to upload'}
          </p>
          <p className="text-[11px] text-[#b8a49a] text-center">PNG, JPG, WebP</p>
          {uploading && (
            <div className="absolute inset-0 bg-white/60 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 rounded-full animate-spin"
                style={{ border: '2px solid #f6f3f2', borderTopColor: '#7c4a2d' }} />
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-[12px] text-[#b91c1c] bg-[#fee2e2] px-3 py-2 rounded-lg">{uploadError}</p>
      )}
    </div>
  )
}
