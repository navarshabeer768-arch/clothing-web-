'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, TrendingUp, ShoppingBag, Star, Eye } from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

const CUSTOMERS = [
  { id: '1', name: 'Alexandra Whitmore', email: 'a.whitmore@email.com', country: 'UK', orders: 8, totalSpent: 34600, lastOrder: '2 days ago', status: 'vip', joined: 'Jan 2023' },
  { id: '2', name: 'James Thornton', email: 'j.thornton@email.com', country: 'US', orders: 5, totalSpent: 48200, lastOrder: '1 week ago', status: 'vip', joined: 'Mar 2023' },
  { id: '3', name: 'Sophie Laurent', email: 's.laurent@email.com', country: 'FR', orders: 12, totalSpent: 22800, lastOrder: '3 days ago', status: 'regular', joined: 'Jun 2022' },
  { id: '4', name: 'Marcus Chen', email: 'm.chen@email.com', country: 'SG', orders: 3, totalSpent: 4200, lastOrder: '2 weeks ago', status: 'regular', joined: 'Sep 2023' },
  { id: '5', name: 'Isabelle Moreau', email: 'i.moreau@email.com', country: 'FR', orders: 7, totalSpent: 18400, lastOrder: '3 days ago', status: 'regular', joined: 'Apr 2023' },
  { id: '6', name: 'William Ashford', email: 'w.ashford@email.com', country: 'US', orders: 2, totalSpent: 31400, lastOrder: '5 days ago', status: 'vip', joined: 'Aug 2024' },
  { id: '7', name: 'Mei-Ling Zhang', email: 'ml.zhang@email.com', country: 'HK', orders: 15, totalSpent: 62000, lastOrder: '1 week ago', status: 'vip', joined: 'Dec 2021' },
  { id: '8', name: 'Thomas Eriksson', email: 't.eriksson@email.com', country: 'SE', orders: 1, totalSpent: 620, lastOrder: '2 weeks ago', status: 'new', joined: 'Oct 2024' },
]

const statusConfig = {
  vip: { label: 'VIP', color: 'bg-gold-100 text-gold-700' },
  regular: { label: 'Regular', color: 'bg-blue-100 text-blue-700' },
  new: { label: 'New', color: 'bg-green-100 text-green-700' },
}

export function AdminCustomersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = CUSTOMERS.filter(c =>
    (statusFilter === 'all' || c.status === statusFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  )

  const totalRevenue = CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0)
  const avgOrderValue = totalRevenue / CUSTOMERS.reduce((s, c) => s + c.orders, 0)

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{CUSTOMERS.length} registered customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Customers', value: CUSTOMERS.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'VIP Customers', value: CUSTOMERS.filter(c => c.status === 'vip').length, icon: Star, color: 'text-gold-500', bg: 'bg-gold-50' },
          { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Avg Order Value', value: formatPrice(avgOrderValue), icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-sm p-4 border border-luxury-100 shadow-luxury-sm flex items-center gap-3">
            <div className={cn('p-2 rounded-sm', s.bg)}>
              <s.icon className={cn('h-4 w-4', s.color)} strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-lg font-semibold">{s.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-luxury-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2.5 w-full text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm"
            />
          </div>
          {['all', 'vip', 'regular', 'new'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-medium capitalize transition-colors border',
                statusFilter === s ? 'bg-black text-white border-black' : 'bg-white border-luxury-200 text-muted-foreground hover:border-luxury-400'
              )}
            >
              {s === 'all' ? 'All' : s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-luxury">
            <thead className="bg-luxury-50">
              <tr>
                <th className="text-left">Customer</th>
                <th className="text-left hidden md:table-cell">Country</th>
                <th className="text-center hidden md:table-cell">Orders</th>
                <th className="text-right">Total Spent</th>
                <th className="text-left hidden lg:table-cell">Last Order</th>
                <th className="text-left hidden lg:table-cell">Joined</th>
                <th className="text-left">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, i) => {
                const status = statusConfig[customer.status as keyof typeof statusConfig]
                return (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-luxury-50/50 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-luxury-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-luxury-600">{customer.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{customer.name}</p>
                          <p className="text-[10px] text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell"><span className="text-xs text-muted-foreground">{customer.country}</span></td>
                    <td className="text-center hidden md:table-cell"><span className="text-sm font-medium">{customer.orders}</span></td>
                    <td className="text-right"><span className="text-sm font-semibold">{formatPrice(customer.totalSpent)}</span></td>
                    <td className="hidden lg:table-cell"><span className="text-xs text-muted-foreground">{customer.lastOrder}</span></td>
                    <td className="hidden lg:table-cell"><span className="text-xs text-muted-foreground">{customer.joined}</span></td>
                    <td>
                      <span className={cn('inline-flex px-2 py-0.5 rounded-sm text-[10px] font-medium', status.color)}>
                        {customer.status === 'vip' && <Star className="h-2.5 w-2.5 mr-1 fill-current" />}
                        {status.label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
