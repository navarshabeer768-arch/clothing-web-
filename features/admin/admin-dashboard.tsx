'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, ShoppingCart, Users, Package, DollarSign,
  AlertCircle, ArrowRight, Eye, MoreHorizontal,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts'
import { formatPrice, getOrderStatusColor, getOrderStatusLabel } from '@/lib/utils'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const revenueData = [
  { month: 'Jan', revenue: 48200, orders: 42 },
  { month: 'Feb', revenue: 52800, orders: 48 },
  { month: 'Mar', revenue: 61400, orders: 55 },
  { month: 'Apr', revenue: 58900, orders: 51 },
  { month: 'May', revenue: 72300, orders: 63 },
  { month: 'Jun', revenue: 85600, orders: 74 },
  { month: 'Jul', revenue: 91200, orders: 82 },
  { month: 'Aug', revenue: 87500, orders: 77 },
  { month: 'Sep', revenue: 94100, orders: 86 },
  { month: 'Oct', revenue: 108400, orders: 95 },
  { month: 'Nov', revenue: 132700, orders: 118 },
  { month: 'Dec', revenue: 158900, orders: 143 },
]

const categoryData = [
  { name: "Women's", value: 42, color: '#c9a96e' },
  { name: "Men's", value: 28, color: '#1a1a1a' },
  { name: 'Watches', value: 22, color: '#a28b6a' },
  { name: 'Accessories', value: 8, color: '#ddd6c6' },
]

const recentOrders = [
  { id: 'LXE-010243', customer: 'Alexandra Whitmore', amount: 4200, status: 'delivered', date: '2 hours ago', items: 1 },
  { id: 'LXE-010242', customer: 'James Thornton', amount: 12500, status: 'shipped', date: '5 hours ago', items: 1 },
  { id: 'LXE-010241', customer: 'Sophie Laurent', amount: 2800, status: 'processing', date: '8 hours ago', items: 2 },
  { id: 'LXE-010240', customer: 'Marcus Chen', amount: 890, status: 'paid', date: '1 day ago', items: 1 },
  { id: 'LXE-010239', customer: 'Isabelle Moreau', amount: 6400, status: 'pending', date: '1 day ago', items: 3 },
]

const topProducts = [
  { name: 'Cashmere Wrap Coat', sales: 48, revenue: 134400, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=80&q=70' },
  { name: 'Chronograph Master', sales: 12, revenue: 150000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=70' },
  { name: 'Silk Evening Gown', sales: 22, revenue: 92400, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=70' },
  { name: 'Grand Complication', sales: 5, revenue: 144500, image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=80&q=70' },
]

const lowStockItems = [
  { name: 'Cashmere Wrap Coat — Camel/XS', stock: 0, sku: 'CWC-CA-XS' },
  { name: 'Merino Turtleneck — Ivory/S', stock: 1, sku: 'MTN-IV-S' },
  { name: 'Chronograph Master', stock: 2, sku: 'CHR-001' },
]

const statCards = [
  {
    title: 'Total Revenue',
    value: '$1,152,400',
    change: '+18.2%',
    positive: true,
    icon: DollarSign,
    sub: 'vs last year',
    color: 'bg-gold-50',
    iconColor: 'text-gold-500',
  },
  {
    title: 'Total Orders',
    value: '934',
    change: '+12.5%',
    positive: true,
    icon: ShoppingCart,
    sub: 'vs last year',
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Active Customers',
    value: '2,841',
    change: '+8.1%',
    positive: true,
    icon: Users,
    sub: 'vs last year',
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Products Listed',
    value: '312',
    change: '-2.1%',
    positive: false,
    icon: Package,
    sub: '18 low stock',
    color: 'bg-red-50',
    iconColor: 'text-red-500',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
}

export function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white rounded-sm p-5 shadow-luxury-sm border border-luxury-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn('p-2.5 rounded-sm', card.color)}>
                <card.icon className={cn('h-4 w-4', card.iconColor)} strokeWidth={1.5} />
              </div>
              <span className={cn(
                'flex items-center gap-1 text-xs font-medium',
                card.positive ? 'text-green-600' : 'text-red-500'
              )}>
                {card.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-semibold mb-1">{card.value}</div>
            <div className="text-xs text-muted-foreground">
              {card.title} · <span className="text-foreground/60">{card.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="xl:col-span-2 bg-white rounded-sm p-6 shadow-luxury-sm border border-luxury-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-sm">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue for 2024</p>
            </div>
            <select className="text-xs border border-luxury-200 px-2.5 py-1.5 rounded-sm bg-white focus:outline-none">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a96e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#c9a96e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#a28b6a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#a28b6a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ fontSize: 11, border: '1px solid #ddd6c6', borderRadius: 4, boxShadow: 'none' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c9a96e" strokeWidth={2} fill="url(#colorRevenue)" dot={false} activeDot={{ r: 4, fill: '#c9a96e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-sm p-6 shadow-luxury-sm border border-luxury-100"
        >
          <h3 className="font-medium text-sm mb-1">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mb-6">Revenue distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{ fontSize: 11, border: '1px solid #ddd6c6', borderRadius: 4 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-foreground/70">{item.name}</span>
                </div>
                <span className="text-xs font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Orders + top products row */}
      <div className="grid xl:grid-cols-3 gap-4">
        {/* Recent orders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="xl:col-span-2 bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-100">
            <div>
              <h3 className="font-medium text-sm">Recent Orders</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest 5 transactions</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-gold-500 hover:text-gold-600 flex items-center gap-1 font-medium">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full table-luxury">
            <thead className="bg-luxury-50">
              <tr>
                <th className="text-left">Order</th>
                <th className="text-left">Customer</th>
                <th className="text-left hidden md:table-cell">Amount</th>
                <th className="text-left hidden lg:table-cell">Date</th>
                <th className="text-left">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-luxury-50/50 transition-colors">
                  <td>
                    <span className="text-xs font-mono text-gold-600">{order.id}</span>
                  </td>
                  <td>
                    <span className="text-sm">{order.customer}</span>
                    <div className="text-xs text-muted-foreground">{order.items} item{order.items > 1 ? 's' : ''}</div>
                  </td>
                  <td className="hidden md:table-cell">
                    <span className="text-sm font-medium">{formatPrice(order.amount)}</span>
                  </td>
                  <td className="hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </td>
                  <td>
                    <span className={cn('inline-flex px-2 py-1 rounded-sm text-[10px] font-medium tracking-wider uppercase', getOrderStatusColor(order.status))}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top products */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-sm p-5 shadow-luxury-sm border border-luxury-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm">Top Products</h3>
              <Link href="/admin/products" className="text-xs text-gold-500 hover:text-gold-600">View all</Link>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground w-4">{i + 1}</span>
                  <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-sm bg-luxury-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{product.sales} sold</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 flex-shrink-0">{formatPrice(product.revenue)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Low stock alerts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="bg-white rounded-sm p-5 shadow-luxury-sm border border-luxury-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <h3 className="font-medium text-sm">Low Stock Alerts</h3>
              </div>
              <Link href="/admin/inventory" className="text-xs text-gold-500 hover:text-gold-600">Manage</Link>
            </div>
            <div className="space-y-2.5">
              {lowStockItems.map((item) => (
                <div key={item.sku} className="flex items-center justify-between p-3 bg-red-50 rounded-sm">
                  <div>
                    <p className="text-xs font-medium truncate max-w-[160px]">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.sku}</p>
                  </div>
                  <span className={cn('text-xs font-bold', item.stock === 0 ? 'text-red-600' : 'text-orange-500')}>
                    {item.stock === 0 ? 'Out' : `${item.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Monthly orders bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white rounded-sm p-6 shadow-luxury-sm border border-luxury-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-medium text-sm">Order Volume</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Number of orders per month</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={revenueData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#a28b6a' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#a28b6a' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #ddd6c6', borderRadius: 4 }} />
            <Bar dataKey="orders" fill="#1a1a1a" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
