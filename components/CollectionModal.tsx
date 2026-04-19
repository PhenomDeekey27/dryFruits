'use client'

import { useState } from 'react'
import { addToCollection, createCollection, getCollections } from '@/app/actions/collections'

interface CollectionModalProps {
  productId: string
  isOpen: boolean
  onClose: () => void
  collections: any[]
}

export default function CollectionModal({ productId, isOpen, onClose, collections: initialCollections }: CollectionModalProps) {
  const [collections, setCollections] = useState(initialCollections)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isAdding, setIsAdding] = useState<string | null>(null)

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    setIsCreating(true)
    try {
      const newCollection = await createCollection(newCollectionName)
      setCollections([newCollection, ...collections])
      setNewCollectionName('')
      await addToCollection(newCollection.id, productId)
      setTimeout(onClose, 500)
    } catch (err) {
      console.error('Error creating collection:', err)
    } finally {
      setIsCreating(false)
    }
  }

  const handleAddToCollection = async (collectionId: string) => {
    setIsAdding(collectionId)
    try {
      await addToCollection(collectionId, productId)
      setTimeout(onClose, 500)
    } catch (err) {
      console.error('Error adding to collection:', err)
    } finally {
      setIsAdding(null)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#d4c3be]/20 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              Add to Collection
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#f6f3f2] rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Create New Collection */}
            <form onSubmit={handleCreateCollection} className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-widest text-[#775a19]">
                Create New Collection
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Collection name..."
                  className="flex-1 px-4 py-3 border border-[#d4c3be] rounded-lg text-sm focus:outline-none focus:border-[#74554b] focus:ring-1 focus:ring-[#74554b]/20"
                />
                <button
                  type="submit"
                  disabled={isCreating || !newCollectionName.trim()}
                  className="px-4 py-3 bg-[#74554b] text-white rounded-lg font-semibold text-sm hover:bg-[#5d4037] disabled:opacity-50 transition-colors"
                >
                  {isCreating ? '...' : 'Add'}
                </button>
              </div>
            </form>

            {/* Divider */}
            {collections.length > 0 && <div className="h-px bg-[#d4c3be]/20" />}

            {/* Existing Collections */}
            {collections.length > 0 ? (
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#775a19] block mb-3">
                  My Collections
                </label>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => handleAddToCollection(collection.id)}
                      disabled={isAdding === collection.id}
                      className="w-full text-left p-4 rounded-lg border border-[#d4c3be]/20 hover:border-[#74554b] hover:bg-[#fcf9f8] transition-all disabled:opacity-50"
                    >
                      <p className="font-semibold text-sm text-[#1b1c1c]">{collection.name}</p>
                      <p className="text-xs text-[#827470] mt-1">
                        {collection.collection_items?.length || 0} items
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[#827470]">No collections yet.</p>
                <p className="text-xs text-[#b8a49a] mt-1">Create one above to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
