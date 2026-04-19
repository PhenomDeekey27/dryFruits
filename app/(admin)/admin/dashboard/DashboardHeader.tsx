'use client'

import { useState, useRef, useEffect } from 'react'
import { getOrders } from '@/app/actions/orders'

const ExportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const DATE_OPTIONS = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'All Time']

function exportToCSV(orders: { id: string; created_at: string; total: number; status: string; profiles?: { email: string } | null }[]) {
  const headers = ['Order ID', 'Date', 'Customer Email', 'Total (₹)', 'Status']
  const rows = orders.map(o => [
    o.id,
    new Date(o.created_at).toLocaleDateString('en-IN'),
    o.profiles?.email ?? '',
    o.total.toFixed(2),
    o.status,
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orders_export_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function DashboardHeader() {
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleExport() {
    setExporting(true)
    try {
      const orders = await getOrders(500)
      exportToCSV(orders)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative z-20 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
      <p className="text-[11px] font-600 text-[#9c8679] uppercase tracking-widest mb-1 animate-fade-in"
        style={{ fontWeight: 600 }}>
        Dashboard Overview
      </p>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <h1 className="text-[26px] sm:text-[32px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1"
          style={{ fontWeight: 800 }}>
          Store Insights
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 animate-fade-in stagger-2 flex-wrap">

          {/* Custom date range dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 min-w-[150px]
                hover:bg-[#f6f3f2] transition-all duration-150 cursor-pointer"
              style={{ boxShadow: '0 1px 4px rgba(61,35,20,0.08)' }}
            >
              <span className="text-[#9c8679]"><CalendarIcon /></span>
              <span className="text-[13px] font-medium text-[#3d2314] flex-1 text-left">{dateRange}</span>
              <span className={`text-[#9c8679] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                <ChevronDown />
              </span>
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-[calc(100%+6px)] z-50 bg-white rounded-xl overflow-hidden min-w-[160px]"
                style={{ boxShadow: '0 4px 20px rgba(61,35,20,0.14)' }}
              >
                {DATE_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => { setDateRange(option); setDropdownOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors duration-100
                      ${dateRange === option
                        ? 'bg-[#7c4a2d] text-white'
                        : 'text-[#3d2314] hover:bg-[#f6f3f2]'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 bg-gradient-to-br from-[#7c4a2d] to-[#3d2314]
              text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg
              hover:from-[#8d5535] hover:to-[#4a2a18]
              active:scale-[0.97] transition-all duration-200 shadow-sm
              disabled:opacity-70 whitespace-nowrap"
          >
            {exporting ? (
              <span className="w-3.5 h-3.5 rounded-full animate-spin"
                style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block' }} />
            ) : <ExportIcon />}
            <span className="hidden sm:inline">{exporting ? 'Exporting...' : 'Export Orders'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
