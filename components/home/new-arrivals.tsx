'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/shop/product-card'
import Link from 'next/link'

const newArrivals = [
  {
    id: '5',
    name: 'Linen Wide-Leg Trousers',
    slug: 'linen-wide-leg-trousers',
    base_price: 890,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a7e?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.6, review_count: 7 },
  },
  {
    id: '6',
    name: 'Structured Linen Blazer',
    slug: 'structured-linen-blazer',
    base_price: 1450,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.8, review_count: 5 },
  },
  {
    id: '7',
    name: 'Merino Turtleneck',
    slug: 'merino-turtleneck',
    base_price: 620,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.9, review_count: 19 },
  },
  {
    id: '8',
    name: 'Pleated Silk Blouse',
    slug: 'pleated-silk-blouse',
    base_price: 780,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 4.7, review_count: 11 },
  },
  {
    id: '9',
    name: 'Cashmere Knit Cardigan',
    slug: 'cashmere-knit-cardigan',
    base_price: 1200,
    compare_price: null,
    is_new_arrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80', is_primary: true }],
    review_stats: { avg_rating: 5.0, review_count: 3 },
  },
]

export function NewArrivals() {
  return (
    <section className="section">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-overline mb-3">Just Arrived</p>
            <h2 className="display-md">New Arrivals</h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="text-xs font-medium tracking-widest uppercase text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            View All New <span className="text-gold-500">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {newArrivals.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <ProductCard product={product as never} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
