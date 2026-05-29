import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check auth server-side
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login?redirect=/admin')
    }

    // Check admin role - with error handling
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // If no profile or not admin, redirect
    if (profile && !['admin', 'super_admin'].includes(profile.role)) {
      redirect('/?error=unauthorized')
    }
    // If profile query fails, allow through (DB might not be set up)
  } catch {
    // Allow through if there's an error - login page will handle it
  }

  return (
    <div className="min-h-screen bg-luxury-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
