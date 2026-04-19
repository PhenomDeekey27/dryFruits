import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function CustomersPage() {
  const supabase = await createServerSupabaseClient()
  const { data: customers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'user')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#fcf9f8] px-4 sm:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] font-600 text-[#9c8679] uppercase tracking-widest mb-1 animate-fade-in"
          style={{ fontWeight: 600 }}>
          Users
        </p>
        <h1 className="text-[24px] sm:text-[28px] font-800 text-[#1a1007] tracking-tight animate-fade-in stagger-1"
          style={{ fontWeight: 800 }}>
          Customers
        </h1>
      </div>

      <div className="bg-white rounded-xl overflow-hidden animate-fade-in stagger-2"
        style={{ boxShadow: '0 1px 8px rgba(61,35,20,0.07)' }}>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="bg-[#f6f3f2]">
              {['Customer', 'Email', 'Role', 'Joined'].map(col => (
                <th key={col} className="px-6 py-3.5 text-left text-[10.5px] font-600 text-[#9c8679] tracking-widest"
                  style={{ fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!customers || customers.length === 0) ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[13px] text-[#b8a49a]">
                  No customers yet
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <tr key={c.id} className="hover:bg-[#fcf9f8] transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f6f3f2] flex items-center justify-center">
                        <span className="text-[11px] font-bold text-[#7c4a2d]">
                          {c.email?.[0]?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <span className="text-[13px] font-medium text-[#1a1007]">
                        {c.email?.split('@')[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#6b5a52]">{c.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-medium bg-[#f6f3f2] text-[#6b5a52] px-2.5 py-1 rounded-full">
                      {c.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[12px] text-[#9c8679]">
                    {c.created_at ? new Date(c.created_at).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
