'use client'

import { useEffect, useState } from 'react'

type Props = {
  title: string
  value: string
  badge?: string
  badgeType?: 'up' | 'down' | 'stable'
  subtitle?: string
  icon?: React.ReactNode
  delay?: number
}

export default function StatCard({ title, value, badge, badgeType = 'up', subtitle, icon, delay = 0 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const badgeColors = {
    up:     'bg-[#d4f0df] text-[#1a7a45]',
    down:   'bg-[#fde8e8] text-[#b91c1c]',
    stable: 'bg-[#e8f0fe] text-[#1e40af]',
  }

  return (
    <div
      className={`
        bg-white rounded-xl p-5 flex flex-col gap-3
        transition-all duration-300 hover:shadow-md cursor-default
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
      `}
      style={{
        boxShadow: '0 1px 8px rgba(61,35,20,0.07)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms, box-shadow 0.2s ease`,
      }}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[#f6f3f2] flex items-center justify-center text-[#7c4a2d]">
            {icon}
          </div>
        )}
        {badge && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[badgeType]}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-[12px] font-medium text-[#9c8679] uppercase tracking-wide">{title}</p>
        <p
          className="text-[26px] font-800 text-[#1a1007] tracking-tight leading-tight mt-0.5"
          style={{ fontWeight: 800 }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-[11px] text-[#b8a49a] mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
