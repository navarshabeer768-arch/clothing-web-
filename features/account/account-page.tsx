'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react'
import { formatPrice, getOrderStatusColor, getOrderStatusLabel, cn } from '@/lib/utils'

const RECENT_ORDERS = [
  { id: 'LXE-010243', date: 'Nov 15, 2024', total: 4200, status: 'delivered', items: 1 },
  { id: 'LXE-010239', date: 'Nov 14, 2024', total: 6400, status: 'shipped', items: 3 },
  { id: 'LXE-010228', date: 'Oct 30, 2024', total: 1650, status: 'delivered', items: 1 },
]

const menuItems = [
  { icon: Package, label: 'My Orders', href: '/account/orders', count: '12' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist', count: '4' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses', count: null },
  { icon: Settings, label: 'Settings', href: '/account/settings', count: null },
]

export function AccountPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile'>('overview')

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-overline mb-1">My Account</p>
          <h1 className="display-md">Welcome back, Alexandra</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Profile card */}
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-luxury-100 flex items-center justify-center mx-auto mb-3">
                <User className="h-7 w-7 text-luxury-400" />
              </div>
              <h3 className="font-medium">Alexandra Whitmore</h3>
              <p className="text-xs text-muted-foreground mt-0.5">a.whitmore@email.com</p>
              <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-gold-50 text-gold-700 text-[10px] font-medium rounded-sm uppercase tracking-wider">
                VIP Member
              </span>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
              {menuItems.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-5 py-3.5 hover:bg-luxury-50 transition-colors group',
                    i < menuItems.length - 1 && 'border-b border-luxury-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="text-[10px] bg-luxury-100 text-muted-foreground px-1.5 py-0.5 rounded-full">{item.count}</span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
              <button className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-red-50 text-red-600 transition-colors">
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Orders', value: '12', icon: Package, color: 'text-blue-500' },
                { label: 'Wishlist', value: '4', icon: Heart, color: 'text-red-400' },
                { label: 'Total Spent', value: '$34,600', icon: null, color: '' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-5">
                  <div className="text-xl font-semibold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-100">
                <h3 className="font-medium text-sm">Recent Orders</h3>
                <Link href="/account/orders" className="text-xs text-gold-500 hover:text-gold-600 font-medium">
                  View All →
                </Link>
              </div>
              <div className="divide-y divide-luxury-50">
                {RECENT_ORDERS.map(order => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4 hover:bg-luxury-50/50 transition-colors">
                    <div>
                      <p className="text-xs font-mono text-gold-600 font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                      <span className={cn('px-2 py-1 rounded-sm text-[10px] font-medium uppercase tracking-wider', getOrderStatusColor(order.status))}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile section */}
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6">
              <h3 className="font-medium text-sm mb-5">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: 'Alexandra Whitmore' },
                  { label: 'Email', value: 'a.whitmore@email.com' },
                  { label: 'Phone', value: '+44 20 7946 0958' },
                  { label: 'Member Since', value: 'January 2023' },
                ].map(field => (
                  <div key={field.label} className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">{field.label}</label>
                    <p className="text-sm font-medium">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-luxury-100">
                <button className="btn-luxury-outline text-xs px-6 py-3">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
