'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Search, Filter, Edit2, Trash2, Eye, MoreHorizontal,
  Upload, Tag, Package, ChevronDown, X, Check, Image as ImageIcon,
} from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Cashmere Wrap Coat', sku: 'CWC-001', category: "Women's Clothing", price: 2800, stock: 9, status: 'active', featured: true, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=80&q=70', created: 'Nov 12, 2024' },
  { id: '2', name: 'Silk Evening Gown', sku: 'SEG-002', category: "Women's Clothing", price: 4200, stock: 5, status: 'active', featured: true, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&q=70', created: 'Nov 10, 2024' },
  { id: '3', name: 'Chronograph Master', sku: 'CHR-001', category: 'Luxury Watches', price: 12500, stock: 3, status: 'active', featured: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=70', created: 'Oct 28, 2024' },
  { id: '4', name: 'Tailored Wool Blazer', sku: 'TWB-003', category: "Men's Clothing", price: 1650, stock: 12, status: 'active', featured: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=70', created: 'Oct 20, 2024' },
  { id: '5', name: 'Grand Complication', sku: 'GRC-002', category: 'Luxury Watches', price: 28900, stock: 2, status: 'active', featured: true, image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=80&q=70', created: 'Oct 15, 2024' },
  { id: '6', name: 'Linen Wide-Leg Trousers', sku: 'LWT-004', category: "Women's Clothing", price: 890, stock: 0, status: 'out_of_stock', featured: false, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a7e?w=80&q=70', created: 'Oct 08, 2024' },
  { id: '7', name: 'Merino Turtleneck', sku: 'MTN-005', category: "Men's Clothing", price: 620, stock: 1, status: 'low_stock', featured: false, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=70', created: 'Sep 30, 2024' },
  { id: '8', name: 'Italian Leather Trousers', sku: 'ILT-006', category: "Men's Clothing", price: 1890, stock: 7, status: 'active', featured: false, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=80&q=70', created: 'Sep 22, 2024' },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-700' },
  low_stock: { label: 'Low Stock', color: 'bg-orange-100 text-orange-700' },
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-600' },
}

export function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filtered = MOCK_PRODUCTS.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleSelect = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const toggleAll = () =>
    setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(p => p.id))

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{MOCK_PRODUCTS.length} total products</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-luxury-200 hover:border-luxury-400 text-xs font-medium rounded-sm transition-colors">
            <Upload className="h-3.5 w-3.5" />
            Import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-white hover:bg-black/90 text-xs font-medium rounded-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Products', value: '312', icon: Package, color: 'text-blue-500' },
          { label: 'Active', value: '294', icon: Check, color: 'text-green-500' },
          { label: 'Low Stock', value: '18', icon: Tag, color: 'text-orange-500' },
          { label: 'Out of Stock', value: '7', icon: X, color: 'text-red-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-sm p-4 border border-luxury-100 shadow-luxury-sm flex items-center gap-3">
            <stat.icon className={cn('h-4 w-4 flex-shrink-0', stat.color)} strokeWidth={1.5} />
            <div>
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-luxury-100">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products or SKU..."
              className="pl-9 pr-4 py-2.5 w-full text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 text-xs border border-luxury-200 focus:outline-none focus:border-luxury-400 bg-white rounded-sm cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Women's Clothing">Women's Clothing</option>
              <option value="Men's Clothing">Men's Clothing</option>
              <option value="Luxury Watches">Luxury Watches</option>
              <option value="Accessories">Accessories</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-muted-foreground" />
          </div>

          {/* Bulk actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground">{selectedIds.length} selected</span>
              <button className="px-3 py-2 text-xs border border-red-200 text-red-600 hover:bg-red-50 rounded-sm transition-colors">
                Delete
              </button>
              <button className="px-3 py-2 text-xs border border-luxury-200 hover:border-luxury-400 rounded-sm transition-colors">
                Export
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-luxury">
            <thead className="bg-luxury-50">
              <tr>
                <th className="w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded-sm cursor-pointer accent-black"
                  />
                </th>
                <th className="text-left">Product</th>
                <th className="text-left hidden md:table-cell">SKU</th>
                <th className="text-left hidden lg:table-cell">Category</th>
                <th className="text-right">Price</th>
                <th className="text-center hidden md:table-cell">Stock</th>
                <th className="text-left">Status</th>
                <th className="text-center hidden lg:table-cell">Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const status = statusConfig[product.status as keyof typeof statusConfig]
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-luxury-50/50 transition-colors"
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded-sm cursor-pointer accent-black"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm overflow-hidden bg-luxury-50 flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-[10px] text-muted-foreground">{product.created}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <span className="text-xs font-mono text-muted-foreground">{product.sku}</span>
                    </td>
                    <td className="hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                    </td>
                    <td className="text-right">
                      <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                    </td>
                    <td className="text-center hidden md:table-cell">
                      <span className={cn(
                        'text-xs font-medium tabular-nums',
                        product.stock === 0 ? 'text-red-600' : product.stock <= 2 ? 'text-orange-500' : 'text-foreground'
                      )}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={cn('inline-flex px-2 py-1 rounded-sm text-[10px] font-medium tracking-wider uppercase', status.color)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="text-center hidden lg:table-cell">
                      {product.featured ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-luxury-300">—</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors" title="View">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-luxury-100 rounded-sm transition-colors" title="Edit">
                          <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-sm transition-colors" title="Delete">
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
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
          <span className="text-xs text-muted-foreground">
            Showing {filtered.length} of {MOCK_PRODUCTS.length} products
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button
                key={i}
                className={cn(
                  'w-7 h-7 text-xs rounded-sm transition-colors',
                  page === 1 ? 'bg-black text-white' : 'hover:bg-luxury-100 text-muted-foreground'
                )}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}

function AddProductModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'basic' | 'variants' | 'media' | 'seo'>('basic')
  const [productType, setProductType] = useState<'clothing' | 'watch'>('clothing')

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-sm shadow-luxury-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-100 flex-shrink-0">
          <div>
            <h2 className="font-semibold text-sm">Add New Product</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Fill in the product details below</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-luxury-50 rounded-sm transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-luxury-100 px-6 flex-shrink-0">
          {(['basic', 'variants', 'media', 'seo'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-3 text-xs font-medium tracking-wider uppercase capitalize border-b-2 -mb-px transition-colors',
                activeTab === tab ? 'border-black text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Product Name *</label>
                  <input type="text" placeholder="e.g. Cashmere Wrap Coat" className="input-luxury" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Product Type *</label>
                  <div className="flex gap-2">
                    {(['clothing', 'watch'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setProductType(type)}
                        className={cn(
                          'flex-1 py-2.5 text-xs font-medium border rounded-sm capitalize transition-colors',
                          productType === type ? 'bg-black text-white border-black' : 'border-luxury-200 hover:border-black'
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Category *</label>
                  <select className="input-luxury">
                    <option value="">Select category</option>
                    <option>Women's Clothing</option>
                    <option>Men's Clothing</option>
                    <option>Luxury Watches</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Base Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <input type="number" placeholder="0.00" className="input-luxury pl-7" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Compare Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <input type="number" placeholder="0.00" className="input-luxury pl-7" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">SKU</label>
                  <input type="text" placeholder="Auto-generated if empty" className="input-luxury" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Gender</label>
                  <select className="input-luxury">
                    <option>Women</option>
                    <option>Men</option>
                    <option>Unisex</option>
                    <option>Kids</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Short Description</label>
                  <input type="text" placeholder="Brief product summary (shown in listings)" className="input-luxury" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Full Description</label>
                  <textarea rows={4} placeholder="Detailed product description..." className="input-luxury resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Tags</label>
                  <input type="text" placeholder="cashmere, coat, winter (comma separated)" className="input-luxury" />
                </div>

                {/* Clothing specific fields */}
                {productType === 'clothing' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Material</label>
                      <input type="text" placeholder="e.g. 100% Grade A Cashmere" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Country of Origin</label>
                      <input type="text" placeholder="e.g. Italy" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Fit Type</label>
                      <select className="input-luxury">
                        <option>Regular</option>
                        <option>Slim</option>
                        <option>Relaxed</option>
                        <option>Oversized</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Care Instructions</label>
                      <input type="text" placeholder="e.g. Dry clean only" className="input-luxury" />
                    </div>
                  </>
                )}

                {/* Watch specific fields */}
                {productType === 'watch' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Movement Type</label>
                      <select className="input-luxury">
                        <option>Automatic</option>
                        <option>Manual Wind</option>
                        <option>Quartz</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Case Material</label>
                      <input type="text" placeholder="e.g. Stainless Steel" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Case Diameter (mm)</label>
                      <input type="number" placeholder="40" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Water Resistance (ATM)</label>
                      <input type="number" placeholder="10" className="input-luxury" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Reference Number</label>
                      <input type="text" placeholder="e.g. REF-12345" className="input-luxury" />
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="limited" className="accent-black" />
                      <label htmlFor="limited" className="text-xs font-medium uppercase tracking-wider cursor-pointer">Limited Edition</label>
                    </div>
                  </>
                )}

                <div className="col-span-2 flex flex-wrap gap-4">
                  {[
                    { id: 'is_featured', label: 'Featured Product' },
                    { id: 'is_new_arrival', label: 'New Arrival' },
                    { id: 'is_active', label: 'Active (visible)' },
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={opt.id === 'is_active'} className="accent-black" />
                      <span className="text-xs font-medium uppercase tracking-wider">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'variants' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Product Variants</p>
                <button className="flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-600 font-medium">
                  <Plus className="h-3.5 w-3.5" /> Add Variant
                </button>
              </div>

              {/* Option groups */}
              <div className="space-y-4">
                {[
                  { label: 'Colors', values: ['Ivory', 'Camel', 'Black'] },
                  { label: 'Sizes', values: ['XS', 'S', 'M', 'L', 'XL'] },
                ].map(group => (
                  <div key={group.label} className="p-4 border border-luxury-100 rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-medium uppercase tracking-wider">{group.label}</label>
                      <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.values.map(val => (
                        <span key={val} className="flex items-center gap-1.5 px-3 py-1.5 bg-luxury-50 border border-luxury-200 text-xs rounded-sm">
                          {val}
                          <X className="h-3 w-3 cursor-pointer hover:text-red-500" />
                        </span>
                      ))}
                      <button className="px-3 py-1.5 border border-dashed border-luxury-300 text-xs text-muted-foreground hover:border-luxury-400 rounded-sm transition-colors">
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Variants will be auto-generated from the combinations above. You can set individual prices and stock quantities after saving.
              </p>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-5">
              <div className="border-2 border-dashed border-luxury-200 rounded-sm p-10 text-center hover:border-luxury-400 transition-colors cursor-pointer group">
                <ImageIcon className="h-8 w-8 text-luxury-300 mx-auto mb-3 group-hover:text-luxury-500 transition-colors" />
                <p className="text-sm font-medium mb-1">Drop images here or click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 10MB each. First image will be primary.</p>
                <button className="mt-4 px-6 py-2.5 bg-luxury-50 border border-luxury-200 text-xs font-medium rounded-sm hover:border-luxury-400 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">URL Slug</label>
                <input type="text" placeholder="auto-generated-from-name" className="input-luxury" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Meta Title</label>
                <input type="text" placeholder="SEO title (60 chars max)" className="input-luxury" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider">Meta Description</label>
                <textarea rows={3} placeholder="SEO description (160 chars max)" className="input-luxury resize-none" />
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-luxury-100 bg-luxury-50 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-xs font-medium border border-luxury-200 hover:border-luxury-400 rounded-sm transition-colors">
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 text-xs font-medium border border-luxury-200 hover:border-luxury-400 rounded-sm transition-colors">
              Save as Draft
            </button>
            <button className="px-5 py-2.5 bg-black text-white hover:bg-black/90 text-xs font-medium rounded-sm transition-colors">
              Publish Product
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
