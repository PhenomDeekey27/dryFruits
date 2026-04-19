export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8] px-8 py-8">
      <div className="mb-8">
        <p className="text-[11px] font-600 text-[#9c8679] uppercase tracking-widest mb-1"
          style={{ fontWeight: 600 }}>Configuration</p>
        <h1 className="text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in"
          style={{ fontWeight: 800 }}>Settings</h1>
      </div>

      <div className="max-w-xl space-y-5">
        {[
          { title: 'Store Information', desc: 'Update your store name, contact details and logo' },
          { title: 'Notification Preferences', desc: 'Configure email and in-app notifications' },
          { title: 'Payment Settings', desc: 'Manage payment gateways and tax configuration' },
          { title: 'Shipping & Fulfillment', desc: 'Set up shipping zones, rates and carriers' },
        ].map((s, i) => (
          <div
            key={s.title}
            className="bg-white rounded-xl px-6 py-5 flex items-center justify-between
              cursor-pointer hover:shadow-md transition-all duration-200 animate-fade-in"
            style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.06)', animationDelay: `${i * 60}ms` }}
          >
            <div>
              <p className="text-[14px] font-600 text-[#1a1007]" style={{ fontWeight: 600 }}>{s.title}</p>
              <p className="text-[12px] text-[#9c8679] mt-0.5">{s.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c8679" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
