'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/shop/product-card'
import { cn } from '@/lib/utils'

const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: [
    'Cashmere Wrap Coat', 'Silk Evening Gown', 'Tailored Wool Blazer',
    'Italian Leather Trousers', 'Linen Wide-Leg Trousers', 'Structured Linen Blazer',
    'Merino Turtleneck', 'Pleated Silk Blouse', 'Cashmere Knit Cardigan',
    'Velvet Midi Dress', 'Herringbone Overcoat', 'Satin Slip Skirt',
  ][i],
  slug: ['cashmere-wrap-coat', 'silk-evening-gown', 'tailored-wool-blazer',
    'italian-leather-trousers', 'linen-wide-leg-trousers', 'structured-linen-blazer',
    'merino-turtleneck', 'pleated-silk-blouse', 'cashmere-knit-cardigan',
    'velvet-midi-dress', 'herringbone-overcoat', 'satin-slip-skirt'][i],
  base_price: [2800, 4200, 1650, 1890, 890, 1450, 620, 780, 1200, 960, 3200, 680][i],
  compare_price: i % 3 === 0 ? [3200, null, 2200, null, null, null, null, null, null, 1200, 4000, null][i] : null,
  is_new_arrival: i < 4,
  is_featured: i < 6,
  images: [{
    url: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4a7e?w=600&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80',
    ][i],
    is_primary: true,
  }],
  review_stats: { avg_rating: 4.5 + Math.random() * 0.5, review_count: Math.floor(Math.random() * 40) + 2 },
}))

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
]

const filters = {
  categories: ['Coats & Jackets', 'Dresses', 'Tops & Blouses', 'Trousers', 'Knitwear', 'Skirts'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'White', 'Ivory', 'Camel', 'Navy', 'Bordeaux', 'Forest Green'],
  price: { min: 0, max: 10000 },
}

export function ShopPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sort, setSort] = useState('newest')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [gridView, setGridView] = useState<'3' | '4'>('4')

  const toggleFilter = useCallback((arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
  }, [])

  const activeFilterCount = selectedCategories.length + selectedSizes.length + selectedColors.length

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-luxury-50 border-b border-luxury-100">
        <div className="container-luxury py-12">
          <p className="text-overline mb-2">Collection</p>
          <h1 className="display-md">All Products</h1>
          <p className="text-muted-foreground mt-2 text-sm font-light">
            Showing {MOCK_PRODUCTS.length} luxury pieces
          </p>
        </div>
      </div>

      <div className="container-luxury py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-luxury-200 hover:border-luxury-400 text-sm transition-colors rounded-sm relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline text-xs tracking-wider uppercase font-medium">Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold-400 text-white text-[9px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active filter pills */}
            {activeFilterCount > 0 && (
              <div className="flex gap-2 flex-wrap">
                {[...selectedCategories, ...selectedSizes, ...selectedColors].map((f) => (
                  <span key={f} className="flex items-center gap-1 px-2.5 py-1 bg-luxury-100 text-xs rounded-sm">
                    {f}
                    <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
                  </span>
                ))}
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedSizes([]); setSelectedColors([]) }}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Grid toggle */}
            <div className="hidden md:flex items-center border border-luxury-200 rounded-sm overflow-hidden">
              {(['3', '4'] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => setGridView(n)}
                  className={cn(
                    'px-3 py-2 text-xs transition-colors',
                    gridView === n ? 'bg-luxury-100 text-foreground' : 'text-muted-foreground hover:bg-luxury-50'
                  )}
                >
                  {n}-col
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 text-xs font-medium tracking-wider uppercase border border-luxury-200 focus:outline-none focus:border-luxury-400 bg-white rounded-sm cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          {sidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block w-56 flex-shrink-0"
            >
              <FilterSection title="Category">
                {filters.categories.map((cat) => (
                  <FilterCheckbox
                    key={cat}
                    label={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="Size">
                <div className="grid grid-cols-3 gap-1.5">
                  {filters.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                      className={cn(
                        'py-1.5 text-xs font-medium border transition-colors rounded-sm',
                        selectedSizes.includes(size)
                          ? 'bg-black text-white border-black'
                          : 'border-luxury-200 hover:border-luxury-400'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Color">
                {filters.colors.map((color) => (
                  <FilterCheckbox
                    key={color}
                    label={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                  />
                ))}
              </FilterSection>
            </motion.aside>
          )}

          {/* Products grid */}
          <div className="flex-1">
            <div
              className={cn(
                'grid gap-4 md:gap-6',
                gridView === '4' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'
              )}
            >
              {MOCK_PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <ProductCard product={product as never} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-6 border-b border-luxury-100 pb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-xs font-medium tracking-widest uppercase">{title}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  )
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={cn(
          'w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors',
          checked ? 'bg-black border-black' : 'border-luxury-300 group-hover:border-luxury-400'
        )}
      >
        {checked && <div className="w-2 h-1.5 border-b border-l border-white -rotate-45 mb-0.5" />}
      </div>
      <span className="text-xs text-foreground/70 group-hover:text-foreground transition-colors">{label}</span>
    </label>
  )
}
