'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, Eye, Printer, Download, RefreshCw,
  Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, X,
} from 'lucide-react'
import { formatPrice, formatDate, getOrderStatusColor, getOrderStatusLabel, cn } from '@/lib/utils'

const MOCK_ORDERS = [
  { id: 'LXE-010243', customer: 'Alexandra Whitmore', email: 'a.whitmore@email.com', items: 1, total: 4200, status: 'delivered', payment: 'paid', date: '2024-11-15', country: 'UK' },
  { id: 'LXE-010242', customer: 'James Thornton', email: 'j.thornton@email.com', items: 1, total: 12500, status: 'shipped', payment: 'paid', date: '2024-11-15', country: 'US' },
  { id: 'LXE-010241', customer: 'Sophie Laurent', email: 's.laurent@email.com', items: 2, total: 2800, status: 'processing', payment: 'paid', date: '2024-11-14', country: 'FR' },
  { id: 'LXE-010240', customer: 'Marcus Chen', email: 'm.chen@email.com', items: 1, total: 890, status: 'paid', payment: 'paid', date: '2024-11-14', country: 'SG' },
  { id: 'LXE-010239', customer: 'Isabelle Moreau', email: 'i.moreau@email.com', items: 3, total: 6400, status: 'pending', payment: 'pending', date: '2024-11-14', country: 'FR' },
  { id: 'LXE-010238', customer: 'William Ashford', email: 'w.ashford@email.com', items: 1, total: 28900, status: 'processing', payment: 'paid', date: '2024-11-13', country: 'US' },
  { id: 'LXE-010237', customer: 'Mei-Ling Zhang', email: 'ml.zhang@email.com', items: 2, total: 3450, status: 'shipped', payment: 'paid', date: '2024-11-13', country: 'HK' },
  { id: 'LXE-010236', customer: 'Nicolas Dubois', email: 'n.dubois@email.com', items: 1, total: 1650, status: 'cancelled', payment: 'refunded', date: '2024-11-12', country: 'BE' },
  { id: 'LXE-010235', customer: 'Priya Sharma', email: 'p.sharma@email.com', items: 4, total: 8920, status: 'delivered', payment: 'paid', date: '2024-11-11', country: 'IN' },
  { id: 'LXE-010234', customer: 'Thomas Eriksson', email: 't.eriksson@email.com', items: 1, total: 620, status: 'refunded', payment: 'refunded', date: '2024-11-10', country: 'SE' },
]

const statusIcons = {
  pending: Clock,
  paid: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
  refunded: RefreshCw,
}

const orderStatuses = ['all', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const

export function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null)

  const filtered = MOCK_ORDERS.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()))
  )

  // Revenue calculation
  const totalRevenue = filtered.reduce((sum, o) => o.payment === 'paid' ? sum + o.total : sum, 0)

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{MOCK_ORDERS.length} total orders</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-luxury-200 hover:border-luxury-400 text-xs font-medium rounded-sm transition-colors">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div className="flex gap-2 flex-wrap">
        {orderStatuses.map(status => {
          const count = status === 'all' ? MOCK_ORDERS.length : MOCK_ORDERS.filter(o => o.status === status).length
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-medium capitalize transition-colors border',
                statusFilter === status
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-luxury-200 text-muted-foreground hover:border-luxury-400 hover:text-foreground'
              )}
            >
              {status === 'all' ? 'All' : getOrderStatusLabel(status)} ({count})
            </button>
          )
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-luxury-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order ID or customer..."
              className="pl-9 pr-4 py-2.5 w-full text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm transition-colors"
            />
          </div>
          <div className="ml-auto text-xs text-muted-foreground hidden md:block">
            Revenue shown: <span className="font-semibold text-foreground">{formatPrice(totalRevenue)}</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-luxury">
            <thead className="bg-luxury-50">
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Customer</th>
                <th className="text-center hidden md:table-cell">Items</th>
                <th className="text-right">Total</th>
                <th className="text-left hidden lg:table-cell">Payment</th>
                <th className="text-left">Status</th>
                <th className="text-left hidden lg:table-cell">Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-luxury-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td>
                      <span className="text-xs font-mono text-gold-600 font-medium">{order.id}</span>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-[10px] text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="text-center hidden md:table-cell">
                      <span className="text-sm">{order.items}</span>
                    </td>
                    <td className="text-right">
                      <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span className={cn(
                        'inline-flex px-2 py-0.5 rounded-sm text-[10px] font-medium capitalize',
                        order.payment === 'paid' ? 'bg-green-100 text-green-700' :
                          order.payment === 'refunded' ? 'bg-gray-100 text-gray-600' :
                            'bg-yellow-100 text-yellow-700'
                      )}>
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className={cn('h-3.5 w-3.5 flex-shrink-0',
                          order.status === 'delivered' ? 'text-green-500' :
                            order.status === 'cancelled' ? 'text-red-500' :
                              order.status === 'shipped' ? 'text-blue-500' : 'text-gold-500'
                        )} />
                        <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded-sm', getOrderStatusColor(order.status))}>
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors">
                          <Printer className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-luxury-100">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} orders</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={cn('w-7 h-7 text-xs rounded-sm transition-colors', p === 1 ? 'bg-black text-white' : 'hover:bg-luxury-100 text-muted-foreground')}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order detail panel */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-luxury-xl flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-100 flex-shrink-0">
                <div>
                  <h3 className="font-semibold text-sm">Order {selectedOrder.id}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedOrder.date}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-luxury-50 rounded-sm transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Customer */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-muted-foreground">Customer</h4>
                  <div className="bg-luxury-50 rounded-sm p-4 space-y-1">
                    <p className="text-sm font-medium">{selectedOrder.customer}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrder.email}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrder.country}</p>
                  </div>
                </div>

                {/* Order summary */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-muted-foreground">Order Summary</h4>
                  <div className="bg-luxury-50 rounded-sm p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items ({selectedOrder.items})</span>
                      <span className="font-medium">{formatPrice(selectedOrder.total * 0.92)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">{formatPrice(selectedOrder.total * 0.08)}</span>
                    </div>
                    <div className="border-t border-luxury-200 pt-3 flex justify-between">
                      <span className="font-semibold text-sm">Total</span>
                      <span className="font-semibold text-sm">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Status update */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider mb-3 text-muted-foreground">Update Status</h4>
                  <div className="space-y-2">
                    <select className="input-luxury text-sm">
                      {['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map(s => (
                        <option key={s} value={s} selected={selectedOrder.status === s}>{getOrderStatusLabel(s)}</option>
                      ))}
                    </select>
                    <input type="text" placeholder="Tracking number (optional)" className="input-luxury text-xs" />
                    <textarea rows={2} placeholder="Admin notes..." className="input-luxury text-xs resize-none" />
                    <button className="w-full py-3 bg-black text-white text-xs font-medium tracking-wider uppercase rounded-sm hover:bg-black/90 transition-colors">
                      Update Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Panel footer */}
              <div className="border-t border-luxury-100 p-4 flex items-center gap-2 flex-shrink-0">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-luxury-200 hover:border-luxury-400 text-xs font-medium rounded-sm transition-colors">
                  <Printer className="h-3.5 w-3.5" />
                  Print Invoice
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium rounded-sm transition-colors">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refund
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
