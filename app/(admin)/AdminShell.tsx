'use client'

import { useState } from 'react'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminShell({
  children,
  adminEmail,
}: {
  children: React.ReactNode
  adminEmail: string
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#fcf9f8] overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar adminEmail={adminEmail} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile topbar */}
        <div
          className="flex items-center gap-3 px-4 py-3 bg-white sticky top-0 z-30 lg:hidden"
          style={{ boxShadow: '0 1px 6px rgba(61,35,20,0.08)' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-[#6b5a52] hover:bg-[#f6f3f2] transition-colors active:scale-95"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span
            className="text-[15px] font-bold text-[#3d2314] tracking-tight"
            style={{ fontFamily: 'Epilogue, sans-serif' }}
          >
            Annamalai Admin
          </span>
        </div>

        {children}
      </main>
    </div>
  )
}
