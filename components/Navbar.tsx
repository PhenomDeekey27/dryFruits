'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { getMyProfile } from '@/app/actions/profile'
import { logout } from '@/app/actions/auth'

interface UserProfile {
  id: string
  email: string
  role: 'admin' | 'user'
}

interface SearchResult {
  id: string
  name: string
  category: string
  product_images: { image_url: string }[]
  product_variants: { price: number }[]
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null | 'loading'>('loading')
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    async function load() {
      const p = await getMyProfile()
      setProfile(p)
    }
    load()

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      load()
    })
    return () => subscription.unsubscribe()
  }, [])

  // Fetch cart count — re-runs on every navigation so badge stays in sync
  useEffect(() => {
    async function fetchCount() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setCartCount(0); return }
      const { data } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id)
      const total = (data ?? []).reduce((sum, row) => sum + (row.quantity ?? 1), 0)
      setCartCount(total)
    }
    fetchCount()
  }, [pathname])

  // Search debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    const timer = setTimeout(async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('id, name, category, product_images(image_url), product_variants(price)')
        .ilike('name', `%${searchQuery.trim()}%`)
        .limit(6)
      setSearchResults((data as SearchResult[]) || [])
      setIsSearching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
    else { setSearchQuery(''); setSearchResults([]) }
  }, [searchOpen])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [searchOpen])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false)
      }
    }
    if (userDropdownOpen) document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [userDropdownOpen])

  const isLoading = profile === 'loading'
  const isLoggedIn = profile !== null && profile !== 'loading'
  const isAdmin = isLoggedIn && (profile as UserProfile).role === 'admin'
  const userEmail = isLoggedIn ? (profile as UserProfile).email : ''
  const userInitial = userEmail ? userEmail[0].toUpperCase() : '?'

  const navLinks = [
    { label: 'Shop', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fcf9f8]/90 shadow-[0_1px_20px_rgba(27,28,28,0.06)]'
          : 'bg-[#fcf9f8]/70'
      } backdrop-blur-md`}
    >
      <div className="flex justify-between items-center px-6 md:px-8 h-20 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <Image
            src="/logo.jpg"
            alt="Annamalai Dates"
            width={40}
            height={40}
            className="h-10 w-auto rounded-lg object-contain"
            priority
          />
          <span className="text-[17px] font-bold text-[#1b1c1c] tracking-tight group-hover:text-[#74554b] transition-colors" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            Annamalai Dates
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8" style={{ fontFamily: 'Epilogue, sans-serif' }}>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[14px] font-semibold text-[#504441] hover:text-[#74554b] transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#74554b] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold px-3 py-1.5 rounded-lg bg-[#74554b] text-white hover:bg-[#5d3d34] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Admin
            </Link>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(o => !o)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              searchOpen ? 'text-[#74554b] bg-[#f0eded]' : 'text-[#504441] hover:text-[#74554b] hover:bg-[#f0eded]'
            }`}
            aria-label="Search"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Cart */}
          <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center text-[#504441] hover:text-[#74554b] hover:bg-[#f0eded] rounded-full transition-all duration-200" aria-label="Cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#775a19] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* User button — desktop only, hidden while loading */}
          {!isLoading && (
            <div ref={userDropdownRef} className="relative hidden md:block">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setUserDropdownOpen(o => !o)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#74554b] to-[#8f6d63] text-white font-bold text-sm hover:opacity-90 transition-all"
                    aria-label="Account"
                  >
                    {userInitial}
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#f0eded] z-50 overflow-hidden">
                      {/* User info */}
                      <div className="px-5 py-4 border-b border-[#f0eded]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#74554b] to-[#8f6d63] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {userInitial}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-[#1b1c1c] truncate" style={{ fontFamily: 'Epilogue, sans-serif' }}>{userEmail}</p>
                            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
                              isAdmin ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#f0eded] text-[#504441]'
                            }`}>
                              {isAdmin ? 'Administrator' : 'Customer'}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Links */}
                      <div className="py-2">
                        {isAdmin && (
                          <Link href="/admin/dashboard" onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-[13px] font-semibold text-[#74554b] hover:bg-[#f6f3f2] transition-colors"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                            </svg>
                            Admin Dashboard
                          </Link>
                        )}
                        {!isAdmin && (
                          <Link href="/account" onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#504441] hover:bg-[#f6f3f2] transition-colors"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            My Account
                          </Link>
                        )}
                        <Link href="/cart" onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#504441] hover:bg-[#f6f3f2] transition-colors"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                          </svg>
                          Cart
                        </Link>
                      </div>
                      {/* Sign out */}
                      <div className="border-t border-[#f0eded] p-3">
                        <form action={logout}>
                          <button type="submit" className="w-full py-2.5 text-[13px] font-semibold text-[#ba1a1a] hover:bg-[#fff0f0] rounded-lg transition-colors">
                            Sign Out
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login" className="text-[13px] font-semibold text-[#504441] hover:text-[#74554b] px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          )}

          {/* Mobile menu */}
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-[#504441]" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div ref={searchContainerRef} className="border-t border-[#d4c3be]/30 bg-[#fcf9f8]/95 backdrop-blur-md px-6 md:px-8 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#827470]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') setSearchOpen(false)
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setSearchOpen(false)
                    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
                  }
                }}
                placeholder="Search products…"
                className="w-full pl-11 pr-10 py-3 bg-[#f6f3f2] border border-[#d4c3be]/40 rounded-xl text-[14px] text-[#1b1c1c] placeholder-[#827470] focus:outline-none focus:ring-2 focus:ring-[#74554b]/30 focus:border-[#74554b]/50"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#827470] hover:text-[#504441]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            {searchQuery.trim() && (
              <div className="mt-2 bg-white rounded-xl border border-[#d4c3be]/30 shadow-lg overflow-hidden">
                {isSearching ? (
                  <div className="px-4 py-5 text-center text-sm text-[#827470]">Searching…</div>
                ) : searchResults.length === 0 ? (
                  <div className="px-4 py-5 text-center text-sm text-[#827470]">No products found for &quot;{searchQuery}&quot;</div>
                ) : (
                  <>
                    {searchResults.map(result => {
                      const price = result.product_variants?.[0]?.price
                      const img = result.product_images?.[0]?.image_url
                      return (
                        <button key={result.id} onClick={() => { setSearchOpen(false); router.push(`/products/${result.id}`) }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f6f3f2] transition-colors text-left border-b border-[#f0eded] last:border-0"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#f6f3f2] flex-shrink-0 overflow-hidden">
                            {img
                              // eslint-disable-next-line @next/next/no-img-element
                              ? <img src={img} alt={result.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full bg-[#e5e2e1]" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[#1b1c1c] truncate" style={{ fontFamily: 'Epilogue, sans-serif' }}>{result.name}</p>
                            <p className="text-[11px] text-[#827470] uppercase tracking-wide">{result.category}</p>
                          </div>
                          {price != null && (
                            <span className="text-[13px] font-bold text-[#74554b] flex-shrink-0" style={{ fontFamily: 'Epilogue, sans-serif' }}>₹{price}</span>
                          )}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => { setSearchOpen(false); router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`) }}
                      className="w-full px-4 py-3 text-center text-[12px] font-semibold text-[#74554b] hover:bg-[#f6f3f2] transition-colors bg-[#fafafa]"
                    >
                      View all results for &quot;{searchQuery}&quot; →
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fcf9f8] border-t border-[#d4c3be]/30 px-6 py-5 space-y-4">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="block text-[15px] font-semibold text-[#504441] hover:text-[#74554b] py-1" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin/dashboard"
              className="flex items-center gap-2 text-[15px] font-bold text-white bg-[#74554b] hover:bg-[#5d3d34] px-3 py-2 rounded-lg w-fit transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Admin Panel
            </Link>
          )}
          {!isLoading && (
            <div className="pt-2 border-t border-[#d4c3be]/30">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-[12px] text-[#827470] px-1">{userEmail}</p>
                  {!isAdmin && (
                    <Link href="/account" className="block text-center py-2.5 text-[13px] font-semibold text-[#74554b] bg-[#f0eded] rounded-lg" onClick={() => setMenuOpen(false)}>
                      My Account
                    </Link>
                  )}
                  <form action={logout}>
                    <button type="submit" className="w-full py-2.5 text-[13px] font-semibold text-[#ba1a1a] bg-[#fff0f0] rounded-lg">Sign Out</button>
                  </form>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="flex-1 text-center py-2.5 text-[13px] font-semibold text-[#74554b] bg-[#f0eded] rounded-lg">Sign In</Link>
                  <Link href="/signup" className="flex-1 text-center py-2.5 text-[13px] font-semibold text-white bg-gradient-to-br from-[#74554b] to-[#8f6d63] rounded-lg">Sign Up</Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
