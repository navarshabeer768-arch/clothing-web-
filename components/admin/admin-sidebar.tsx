'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Tag, Image, Settings, Bell, Layers, ClipboardList, TrendingUp,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    section: 'Catalog',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package },
      { label: 'Categories', href: '/admin/categories', icon: Layers },
      { label: 'Inventory', href: '/admin/inventory', icon: ClipboardList },
      { label: 'Banners', href: '/admin/banners', icon: Image },
    ],
  },
  {
    section: 'Sales',
    items: [
      { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { label: 'Customers', href: '/admin/customers', icon: Users },
      { label: 'Coupons', href: '/admin/coupons', icon: Tag },
      { label: 'Reviews', href: '/admin/reviews', icon: TrendingUp },
    ],
  },
  {
    section: 'System',
    items: [
      { label: 'Notifications', href: '/admin/notifications', icon: Bell },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'bg-white border-r border-luxury-100 flex flex-col transition-all duration-300 sticky top-0 h-screen',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center border-b border-luxury-100 flex-shrink-0', collapsed ? 'justify-center p-4' : 'px-6 py-5')}>
        {collapsed ? (
          <span className="text-lg font-light tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>L</span>
        ) : (
          <div>
            <div className="text-xl font-light tracking-[0.2em]" style={{ fontFamily: 'var(--font-display)' }}>LUXÉ</div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Admin Panel</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((group) => (
          <div key={group.section} className="mb-4">
            {!collapsed && (
              <p className="px-4 py-2 text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60">
                {group.section}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'admin-sidebar-link mx-2 mb-0.5',
                    collapsed && 'justify-center px-0',
                    isActive && 'active'
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" strokeWidth={isActive ? 2 : 1.5} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-luxury-100 p-3 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn('w-full flex items-center gap-2 p-2 hover:bg-luxury-50 rounded-sm text-muted-foreground hover:text-foreground transition-colors', collapsed && 'justify-center')}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
