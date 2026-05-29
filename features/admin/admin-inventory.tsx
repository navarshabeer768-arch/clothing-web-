'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertTriangle, TrendingDown, Package, Plus, ArrowUpDown, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const INVENTORY = [
  { id: '1', name: 'Cashmere Wrap Coat', sku: 'CWC-001', variant: 'Ivory / XS', category: "Women's", stock: 2, threshold: 3, price: 2800, lastUpdated: '2h ago' },
  { id: '2', name: 'Cashmere Wrap Coat', sku: 'CWC-002', variant: 'Ivory / S', category: "Women's", stock: 4, threshold: 3, price: 2800, lastUpdated: '2h ago' },
  { id: '3', name: 'Cashmere Wrap Coat', sku: 'CWC-003', variant: 'Camel / XS', category: "Women's", stock: 0, threshold: 3, price: 2800, lastUpdated: '1d ago' },
  { id: '4', name: 'Chronograph Master', sku: 'CHR-001', variant: 'Silver / One Size', category: 'Watches', stock: 3, threshold: 5, price: 12500, lastUpdated: '3d ago' },
  { id: '5', name: 'Merino Turtleneck', sku: 'MTN-001', variant: 'Ivory / S', category: "Men's", stock: 1, threshold: 5, price: 620, lastUpdated: '5h ago' },
  { id: '6', name: 'Silk Evening Gown', sku: 'SEG-001', variant: 'Midnight / M', category: "Women's", stock: 6, threshold: 3, price: 4200, lastUpdated: '1d ago' },
  { id: '7', name: 'Grand Complication', sku: 'GRC-001', variant: 'Rose Gold / One Size', category: 'Watches', stock: 2, threshold: 5, price: 28900, lastUpdated: '1w ago' },
  { id: '8', name: 'Tailored Wool Blazer', sku: 'TWB-001', variant: 'Navy / M', category: "Men's", stock: 8, threshold: 5, price: 1650, lastUpdated: '2d ago' },
  { id: '9', name: 'Italian Leather Trousers', sku: 'ILT-001', variant: 'Black / 32', category: "Men's", stock: 0, threshold: 3, price: 1890, lastUpdated: '4d ago' },
  { id: '10', name: 'Sport Diver Pro', sku: 'SDP-001', variant: 'Black / One Size', category: 'Watches', stock: 7, threshold: 5, price: 8400, lastUpdated: '3d ago' },
]

const LOGS = [
  { id: 1, action: 'Stock Updated', product: 'Cashmere Wrap Coat — Ivory/S', change: '+10', reason: 'Restock', admin: 'Admin User', time: '2 hours ago' },
  { id: 2, action: 'Sale', product: 'Chronograph Master — Silver', change: '-1', reason: 'Order LXE-010242', admin: 'System', time: '5 hours ago' },
  { id: 3, action: 'Stock Updated', product: 'Merino Turtleneck — Ivory/S', change: '+5', reason: 'Restock', admin: 'Admin User', time: '1 day ago' },
  { id: 4, action: 'Out of Stock', product: 'Italian Leather Trousers — Black/32', change: '-3', reason: 'Order LXE-010239', admin: 'System', time: '4 days ago' },
]

type Filter = 'all' | 'low' | 'out' | 'ok'

export function AdminInventoryPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editVal, setEditVal] = useState<string>('')

  const filtered = INVENTORY.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' ? true :
        filter === 'out' ? item.stock === 0 :
          filter === 'low' ? item.stock > 0 && item.stock <= item.threshold :
            item.stock > item.threshold
    return matchSearch && matchFilter
  })

  const stats = {
    total: INVENTORY.length,
    out: INVENTORY.filter(i => i.stock === 0).length,
    low: INVENTORY.filter(i => i.stock > 0 && i.stock <= i.threshold).length,
    ok: INVENTORY.filter(i => i.stock > i.threshold).length,
  }

  return (
    <div className="space-y-5 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Inventory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time stock management</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-luxury-200 hover:border-luxury-400 text-xs font-medium rounded-sm transition-colors">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-black text-white hover:bg-black/90 text-xs font-medium rounded-sm transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Bulk Restock
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total SKUs', value: stats.total, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', filter: 'all' as Filter },
          { label: 'In Stock', value: stats.ok, icon: Package, color: 'text-green-500', bg: 'bg-green-50', filter: 'ok' as Filter },
          { label: 'Low Stock', value: stats.low, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50', filter: 'low' as Filter },
          { label: 'Out of Stock', value: stats.out, icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50', filter: 'out' as Filter },
        ].map(card => (
          <button
            key={card.label}
            onClick={() => setFilter(card.filter)}
            className={cn(
              'bg-white rounded-sm p-4 border shadow-luxury-sm text-left transition-all',
              filter === card.filter ? 'border-black ring-1 ring-black' : 'border-luxury-100 hover:border-luxury-300'
            )}
          >
            <div className={cn('inline-flex p-2 rounded-sm mb-3', card.bg)}>
              <card.icon className={cn('h-4 w-4', card.color)} strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-semibold">{card.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{card.label}</div>
          </button>
        ))}
      </div>

      {/* Main table */}
      <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-luxury-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search product or SKU..."
              className="pl-9 pr-4 py-2.5 w-full text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-luxury">
            <thead className="bg-luxury-50">
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left hidden md:table-cell">SKU</th>
                <th className="text-left hidden lg:table-cell">Category</th>
                <th className="text-center">Stock</th>
                <th className="text-center hidden md:table-cell">Threshold</th>
                <th className="text-left">Status</th>
                <th className="text-left hidden lg:table-cell">Last Updated</th>
                <th className="text-center">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const isOut = item.stock === 0
                const isLow = !isOut && item.stock <= item.threshold
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={cn('hover:bg-luxury-50/50 transition-colors', isOut && 'bg-red-50/30')}
                  >
                    <td>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.variant}</p>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </td>
                    <td className="text-center">
                      {editingId === item.id ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            value={editVal}
                            onChange={e => setEditVal(e.target.value)}
                            className="w-16 text-center text-xs border border-luxury-300 rounded-sm py-1 focus:outline-none focus:border-black"
                            autoFocus
                          />
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-xs px-2 py-1 bg-black text-white rounded-sm"
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <span className={cn(
                          'text-sm font-semibold tabular-nums',
                          isOut ? 'text-red-600' : isLow ? 'text-orange-500' : 'text-green-600'
                        )}>
                          {item.stock}
                        </span>
                      )}
                    </td>
                    <td className="text-center hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{item.threshold}</span>
                    </td>
                    <td>
                      <span className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-medium uppercase tracking-wider',
                        isOut ? 'bg-red-100 text-red-700' : isLow ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                      )}>
                        {isOut ? (
                          <><TrendingDown className="h-3 w-3" /> Out of Stock</>
                        ) : isLow ? (
                          <><AlertTriangle className="h-3 w-3" /> Low Stock</>
                        ) : (
                          <>In Stock</>
                        )}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => { setEditingId(item.id); setEditVal(String(item.stock)) }}
                        className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors"
                        title="Edit stock"
                      >
                        <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory log */}
      <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-luxury-100">
          <h3 className="font-medium text-sm">Inventory Activity Log</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Recent stock changes</p>
        </div>
        <div className="divide-y divide-luxury-50">
          {LOGS.map(log => (
            <div key={log.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-luxury-50/50 transition-colors">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold',
                log.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              )}>
                {log.change}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{log.product}</p>
                <p className="text-xs text-muted-foreground">{log.reason} · {log.admin}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
