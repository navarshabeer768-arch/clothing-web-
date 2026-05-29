'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Truck, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react'
import { formatPrice, getOrderStatusColor, getOrderStatusLabel, cn } from '@/lib/utils'

const ORDERS = [
  { id: 'LXE-010243', date: 'Nov 15, 2024', total: 4200, status: 'delivered', items: [{ name: 'Silk Evening Gown', variant: 'Midnight / M', qty: 1, price: 4200, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&q=70' }] },
  { id: 'LXE-010239', date: 'Nov 14, 2024', total: 6400, status: 'shipped', tracking: '1Z999AA10123456784', items: [{ name: 'Cashmere Wrap Coat', variant: 'Ivory / S', qty: 1, price: 2800, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=120&q=70' }, { name: 'Merino Turtleneck', variant: 'Ivory / M', qty: 2, price: 1800, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=120&q=70' }] },
  { id: 'LXE-010228', date: 'Oct 30, 2024', total: 1650, status: 'delivered', items: [{ name: 'Tailored Wool Blazer', variant: 'Navy / M', qty: 1, price: 1650, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=70' }] },
  { id: 'LXE-010198', date: 'Sep 12, 2024', total: 12500, status: 'delivered', items: [{ name: 'Chronograph Master', variant: 'Silver / One Size', qty: 1, price: 12500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=70' }] },
]

export function OrdersPage() {
  const [expanded, setExpanded] = useState<string | null>('LXE-010239')

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10 max-w-3xl">
        <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
        </Link>
        <div className="mb-8">
          <p className="text-overline mb-1">My Account</p>
          <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>Order History</h1>
          <p className="text-muted-foreground text-sm mt-2 font-light">{ORDERS.length} orders placed</p>
        </div>

        <div className="space-y-3">
          {ORDERS.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden"
            >
              {/* Order header */}
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-luxury-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs font-mono text-gold-600 font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="text-sm font-medium">{order.items.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn('px-2 py-1 rounded-sm text-[10px] font-medium uppercase tracking-wider', getOrderStatusColor(order.status))}>
                    {getOrderStatusLabel(order.status)}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', expanded === order.id && 'rotate-180')} />
                </div>
              </button>

              {/* Order details */}
              {expanded === order.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="overflow-hidden border-t border-luxury-100"
                >
                  <div className="px-6 py-5 space-y-4">
                    {/* Items */}
                    {order.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-4">
                        <div className="w-16 h-18 bg-luxury-50 rounded-sm overflow-hidden flex-shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" style={{ height: '72px' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.variant} · Qty {item.qty}</p>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(item.price)}</span>
                      </div>
                    ))}

                    {/* Tracking */}
                    {order.tracking && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-sm">
                        <Truck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-blue-700">In Transit</p>
                          <p className="text-xs text-blue-600 font-mono">{order.tracking}</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 text-xs font-medium border border-luxury-200 hover:border-black rounded-sm transition-colors">
                          Write a Review
                        </button>
                      )}
                      <button className="px-4 py-2 text-xs font-medium border border-luxury-200 hover:border-black rounded-sm transition-colors">
                        View Invoice
                      </button>
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 text-xs font-medium text-gold-600 border border-gold-200 hover:bg-gold-50 rounded-sm transition-colors">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
