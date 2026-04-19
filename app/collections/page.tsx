'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getCollections, createCollection, deleteCollection } from '@/app/actions/collections'
import { createClient } from '@/lib/supabase'

interface Collection {
  id: string
  name: string
  created_at: string
  collection_items?: Array<any>
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        setIsLoggedIn(!!user)

        if (!user) {
          setLoading(false)
          return
        }

        const items = await getCollections()
        setCollections(items)
      } catch (err) {
        console.error('Error fetching collections:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCollectionName.trim()) return

    setIsCreating(true)
    try {
      const newCollection = await createCollection(newCollectionName)
      setCollections([newCollection, ...collections])
      setNewCollectionName('')
    } catch (err) {
      console.error('Error creating collection:', err)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async (collectionId: string) => {
    if (!confirm('Delete this collection?')) return

    setDeletingId(collectionId)
    try {
      await deleteCollection(collectionId)
      setCollections(items => items.filter(item => item.id !== collectionId))
    } catch (err) {
      console.error('Error deleting collection:', err)
    } finally {
      setDeletingId(null)
    }
  }

  if (!isLoggedIn && !loading) {
    return (
      <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-[#1b1c1c] mb-4" style={{ fontFamily: 'Epilogue, sans-serif' }}>
              My Collections
            </h1>
            <p className="text-[#504441] mb-8">Sign in to create and manage your collections.</p>
            <Link href="/login" className="inline-block px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ background: '#fcf9f8' }} className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#775a19] font-semibold uppercase tracking-widest text-[11px] mb-2 block">
            Curated Collections
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1c1c]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            My Collections
          </h1>
        </header>

        {/* Create Collection Form */}
        <div className="mb-16 max-w-2xl">
          <form onSubmit={handleCreateCollection} className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#775a19]">
              Create New Collection
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name..."
                className="flex-1 px-4 py-4 border border-[#d4c3be] rounded-xl text-sm focus:outline-none focus:border-[#74554b] focus:ring-1 focus:ring-[#74554b]/20"
              />
              <button
                type="submit"
                disabled={isCreating || !newCollectionName.trim()}
                className="px-8 py-4 bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white rounded-xl font-semibold text-sm hover:shadow-lg disabled:opacity-50 transition-all active:scale-95"
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#74554b]"></div>
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d4c3be" strokeWidth="1" className="mx-auto mb-6">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#1b1c1c] mb-2">No collections yet</h2>
            <p className="text-[#504441]">Create a collection above to start organizing your favorite items.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#1b1c1c] mb-1" style={{ fontFamily: 'Epilogue, sans-serif' }}>
                      {collection.name}
                    </h3>
                    <p className="text-sm text-[#827470]">
                      {collection.collection_items?.length || 0} items
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDelete(collection.id)
                    }}
                    disabled={deletingId === collection.id}
                    className="p-2 text-[#827470] hover:text-[#ba1a1a] hover:bg-[#fee2e2] rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>

                {collection.collection_items && collection.collection_items.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {collection.collection_items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-[#f6f3f2] rounded-lg overflow-hidden"
                      >
                        {item.products?.product_images?.[0] && (
                          <img
                            src={item.products.product_images[0].image_url}
                            alt={item.products.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                    {collection.collection_items.length > 3 && (
                      <div className="aspect-square bg-[#f6f3f2] rounded-lg flex items-center justify-center text-[#827470] font-semibold">
                        +{collection.collection_items.length - 3}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-[#d4c3be]/20">
                  <p className="text-sm font-semibold text-[#74554b] group-hover:translate-x-1 transition-transform">
                    View Collection →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
