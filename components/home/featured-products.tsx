'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/shop/product-card'
import Link from 'next/link'

// Mock data - in production, fetch from Supabase
const featuredProducts = [
  {
    id: '1',
    name: 'Cashmere Wrap Coat',
    slug: 'cashmere-wrap-coat',
    base_price: 2800,
    compare_price: 3200,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.9, review_count: 24 },
  },
  {
    id: '2',
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    base_price: 4200,
    compare_price: null,
    is_new_arrival: false,
    images: [{ url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 5.0, review_count: 12 },
  },
  {
    id: '3',
    name: 'Tailored Wool Blazer',
    slug: 'tailored-wool-blazer',
    base_price: 1650,
    compare_price: 2200,
    is_new_arrival: false,
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.7, review_count: 38 },
  },
  {
    id: '4',
    name: 'Italian Leather Trousers',
    slug: 'italian-leather-trousers',
    base_price: 1890,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.8, review_count: 9 },
  },
]

export function FeaturedProducts() {
  return (
    <section className="section bg-luxury-50">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-overline mb-3">Handpicked for You</p>
            <h2 className="display-md">Featured Pieces</h2>
          </div>
          <Link
            href="/shop?filter=featured"
            className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            View All <span className="text-gold-500">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product as never} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
