'use client'

import { Bell, Search, User, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/analytics': 'Analytics',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/inventory': 'Inventory',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/coupons': 'Coupons',
  '/admin/reviews': 'Reviews',
  '/admin/settings': 'Settings',
}

export function AdminHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Admin'

  return (
    <header className="bg-white border-b border-luxury-100 px-6 lg:px-8 h-16 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-9 pr-4 py-2 text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm w-52 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-luxury-50 rounded-sm transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 border-l border-luxury-100">
          <div className="w-8 h-8 rounded-full bg-luxury-100 flex items-center justify-center">
            <User className="h-4 w-4 text-luxury-500" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium">Admin User</p>
            <p className="text-[10px] text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
