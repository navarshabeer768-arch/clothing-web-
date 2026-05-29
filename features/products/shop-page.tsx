'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import { ProductCard } from '@/components/shop/product-card'
import { cn } from '@/lib/utils'

const ALL_PRODUCTS = [
  { id: '1', name: 'Cashmere Wrap Coat', slug: 'cashmere-wrap-coat', base_price: 2800, compare_price: 3200, is_new_arrival: true, product_type: 'clothing', gender: 'women', tags: ['cashmere', 'coat', 'winter', 'outerwear'], images: [{ url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.9, review_count: 24 } },
  { id: '2', name: 'Silk Evening Gown', slug: 'silk-evening-gown', base_price: 4200, compare_price: null, is_new_arrival: false, product_type: 'clothing', gender: 'women', tags: ['silk', 'dress', 'evening', 'gown'], images: [{ url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 5.0, review_count: 12 } },
  { id: '3', name: 'Chronograph Master', slug: 'chronograph-master', base_price: 12500, compare_price: null, is_new_arrival: false, product_type: 'watches', gender: 'unisex', tags: ['watch', 'chronograph', 'automatic', 'sport'], images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.8, review_count: 18 } },
  { id: '4', name: 'Tailored Wool Blazer', slug: 'tailored-wool-blazer', base_price: 1650, compare_price: 2200, is_new_arrival: false, product_type: 'clothing', gender: 'men', tags: ['blazer', 'wool', 'suit', 'tailored'], images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.7, review_count: 38 } },
  { id: '5', name: 'Grand Complication Watch', slug: 'grand-complication', base_price: 28900, compare_price: null, is_new_arrival: true, product_type: 'watches', gender: 'men', tags: ['watch', 'manual', 'dress', 'luxury', 'limited'], images: [{ url: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 5.0, review_count: 6 } },
  { id: '6', name: 'Linen Wide-Leg Trousers', slug: 'linen-wide-leg-trousers', base_price: 890, compare_price: null, is_new_arrival: true, product_type: 'clothing', gender: 'women', tags: ['linen', 'trousers', 'summer'], images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a7e?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.6, review_count: 7 } },
  { id: '7', name: 'Merino Turtleneck', slug: 'merino-turtleneck', base_price: 620, compare_price: null, is_new_arrival: true, product_type: 'clothing', gender: 'men', tags: ['merino', 'knitwear', 'turtleneck', 'winter'], images: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.9, review_count: 19 } },
  { id: '8', name: 'Pleated Silk Blouse', slug: 'pleated-silk-blouse', base_price: 780, compare_price: null, is_new_arrival: true, product_type: 'clothing', gender: 'women', tags: ['silk', 'blouse', 'top'], images: [{ url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.7, review_count: 11 } },
  { id: '9', name: 'Cashmere Knit Cardigan', slug: 'cashmere-knit-cardigan', base_price: 1200, compare_price: null, is_new_arrival: true, product_type: 'clothing', gender: 'women', tags: ['cashmere', 'cardigan', 'knitwear'], images: [{ url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 5.0, review_count: 3 } },
  { id: '10', name: 'Sport Diver Pro Watch', slug: 'sport-diver-pro', base_price: 8400, compare_price: null, is_new_arrival: false, product_type: 'watches', gender: 'unisex', tags: ['watch', 'sport', 'diver', 'automatic'], images: [{ url: 'https://images.unsplash.com/photo-1616093875201-cc5075c0a48a?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.6, review_count: 22 } },
  { id: '11', name: 'Italian Leather Trousers', slug: 'italian-leather-trousers', base_price: 1890, compare_price: null, is_new_arrival: true, product_type: 'clothing', gender: 'men', tags: ['leather', 'trousers', 'italian'], images: [{ url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.8, review_count: 9 } },
  { id: '12', name: 'Structured Linen Blazer', slug: 'structured-linen-blazer', base_price: 1450, compare_price: null, is_new_arrival: false, product_type: 'clothing', gender: 'women', tags: ['linen', 'blazer', 'summer'], images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', is_primary: true }], review_stats: { avg_rating: 4.5, review_count: 14 } },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
]

export function ShopPage() {
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sort, setSort] = useState('newest')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [gridView, setGridView] = useState<'3' | '4'>('4')

  // Read URL params
  const searchQuery = searchParams.get('search') || ''
  const genderFilter = searchParams.get('gender') || ''
  const typeFilter = searchParams.get('type') || ''
  const filterParam = searchParams.get('filter') || ''

  // Filter products based on URL params + sidebar filters
  const filtered = ALL_PRODUCTS.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchName = p.name.toLowerCase().includes(q)
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q))
      if (!matchName && !matchTags) return false
    }
    if (genderFilter && p.gender !== genderFilter && p.gender !== 'unisex') return false
    if (typeFilter && p.product_type !== typeFilter) return false
    if (filterParam === 'new' && !p.is_new_arrival) return false
    return true
  }).sort((a, b) => {
    if (sort === 'price_asc') return a.base_price - b.base_price
    if (sort === 'price_desc') return b.base_price - a.base_price
    if (sort === 'rating') return (b.review_stats?.avg_rating ?? 0) - (a.review_stats?.avg_rating ?? 0)
    if (sort === 'popular') return (b.review_stats?.review_count ?? 0) - (a.review_stats?.review_count ?? 0)
    return 0
  })

  const pageTitle = searchQuery ? `Search: "${searchQuery}"` :
    genderFilter ? `${genderFilter.charAt(0).toUpperCase() + genderFilter.slice(1)}'s Collection` :
    typeFilter === 'watches' ? 'Luxury Watches' :
    filterParam === 'new' ? 'New Arrivals' : 'All Products'

  return (
    <div className="min-h-screen">
      <div className="bg-luxury-50 border-b border-luxury-100">
        <div className="container-luxury py-12">
          <p className="text-overline mb-2">Collection</p>
          <h1 className="display-md">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2 text-sm font-light">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} found
            {searchQuery && <span> for <em>"{searchQuery}"</em></span>}
          </p>
        </div>
      </div>

      <div className="container-luxury py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-luxury-200 hover:border-luxury-400 text-xs font-medium rounded-sm transition-colors">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline uppercase tracking-wider">Filter</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center border border-luxury-200 rounded-sm overflow-hidden">
              {(['3', '4'] as const).map((n) => (
                <button key={n} onClick={() => setGridView(n)}
                  className={cn('px-3 py-2 text-xs transition-colors',
                    gridView === n ? 'bg-luxury-100 text-foreground' : 'text-muted-foreground hover:bg-luxury-50')}>
                  {n}-col
                </button>
              ))}
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-xs font-medium tracking-wider uppercase border border-luxury-200 focus:outline-none bg-white rounded-sm cursor-pointer">
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-luxury-300 mx-auto mb-4" />
            <h3 className="text-xl font-light mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              No results for "{searchQuery}"
            </h3>
            <p className="text-muted-foreground text-sm mb-6">Try a different search term or browse our collection</p>
            <a href="/shop" className="btn-luxury inline-flex">Browse All Products</a>
          </div>
        )}

        {/* Products grid */}
        {filtered.length > 0 && (
          <div className={cn('grid gap-4 md:gap-6',
            gridView === '4' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3')}>
            {filtered.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}>
                <ProductCard product={product as never} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
