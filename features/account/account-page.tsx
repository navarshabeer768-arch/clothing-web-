'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const RECENT_ORDERS = [
  { id: 'LXE-010243', date: 'Nov 15, 2024', total: 4200, status: 'delivered' },
  { id: 'LXE-010239', date: 'Nov 14, 2024', total: 6400, status: 'shipped' },
  { id: 'LXE-010228', date: 'Oct 30, 2024', total: 1650, status: 'delivered' },
]

const statusColors: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  pending: 'bg-yellow-100 text-yellow-700',
}

export function AccountPage() {
  const [user, setUser] = useState<{ email: string; full_name?: string; role?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        router.push('/auth/login?redirect=/account')
        return
      }
      
      // Try to get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', authUser.id)
        .single()

      setUser({
        email: authUser.email ?? '',
        full_name: profile?.full_name ?? authUser.user_metadata?.full_name ?? authUser.email?.split('@')[0] ?? 'User',
        role: profile?.role ?? 'customer',
      })
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName = user.full_name || user.email.split('@')[0]
  const isAdmin = user.role === 'admin' || user.role === 'super_admin'

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10">
        <div className="mb-8">
          <p className="text-overline mb-1">My Account</p>
          <h1 className="display-md">Welcome back, {displayName}</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-luxury-100 flex items-center justify-center mx-auto mb-3">
                <User className="h-7 w-7 text-luxury-400" />
              </div>
              <h3 className="font-medium">{displayName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{user.email}</p>
              {isAdmin ? (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-black text-white text-[10px] font-medium rounded-sm uppercase tracking-wider">
                  <Shield className="h-3 w-3" /> Admin
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-gold-50 text-gold-700 text-[10px] font-medium rounded-sm uppercase tracking-wider">
                  Member
                </span>
              )}
            </div>

            <nav className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
              {[
                { icon: Package, label: 'My Orders', href: '/account/orders' },
                { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
                { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
                { icon: Settings, label: 'Settings', href: '/account/settings' },
              ].map((item, i, arr) => (
                <Link key={item.label} href={item.href}
                  className={cn('flex items-center justify-between px-5 py-3.5 hover:bg-luxury-50 transition-colors group',
                    i < arr.length - 1 && 'border-b border-luxury-50')}>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin"
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gold-50 transition-colors group border-t border-luxury-50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                    <span className="text-sm text-gold-600 font-medium">Admin Panel</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-gold-400" />
                </Link>
              )}
              <button onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-5 py-3.5 hover:bg-red-50 text-red-600 transition-colors border-t border-luxury-50">
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
                { label: 'Orders', value: '0', icon: Package },
                { label: 'Wishlist', value: '0', icon: Heart },
                { label: 'Member Since', value: new Date().getFullYear().toString(), icon: null },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-5">
                  <div className="text-xl font-semibold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Profile card */}
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6">
              <h3 className="font-medium text-sm mb-5">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Name</label>
                  <p className="text-sm font-medium">{displayName}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Email</label>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">Role</label>
                  <p className="text-sm font-medium capitalize">{user.role}</p>
                </div>
              </div>
              {isAdmin && (
                <div className="mt-6 pt-5 border-t border-luxury-100">
                  <Link href="/admin" className="btn-luxury inline-flex items-center gap-2 text-xs px-6 py-3">
                    <Shield className="h-3.5 w-3.5" /> Go to Admin Panel
                  </Link>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6">
              <h3 className="font-medium text-sm mb-5">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/shop" className="flex items-center gap-3 p-4 border border-luxury-100 hover:border-luxury-300 rounded-sm transition-colors">
                  <Package className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                  <span className="text-sm">Shop Collection</span>
                </Link>
                <Link href="/account/wishlist" className="flex items-center gap-3 p-4 border border-luxury-100 hover:border-luxury-300 rounded-sm transition-colors">
                  <Heart className="h-4 w-4 text-red-400" strokeWidth={1.5} />
                  <span className="text-sm">My Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
