'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: "Women's\nCollection",
    subtitle: 'Spring/Summer 2025',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85',
    href: '/shop?gender=women',
    size: 'large',
  },
  {
    title: "Men's\nCollection",
    subtitle: 'Spring/Summer 2025',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=85',
    href: '/shop?gender=men',
    size: 'small',
  },
  {
    title: 'Luxury\nTimepieces',
    subtitle: 'Master Watchmaking',
    image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=85',
    href: '/shop/watches',
    size: 'small',
  },
]

export function CategoryBanner() {
  return (
    <section className="section">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-overline mb-3">Shop by Category</p>
          <h2 className="display-md">Curated Collections</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CategoryCard category={categories[0]} height="h-[600px]" />
          </motion.div>

          {/* Right stack */}
          <div className="flex flex-col gap-4">
            {categories.slice(1).map((cat, i) => (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <CategoryCard category={cat} height="h-[290px]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({
  category,
  height,
}: {
  category: (typeof categories)[0]
  height: string
}) {
  return (
    <Link href={category.href} className={`relative block ${height} overflow-hidden group rounded-sm`}>
      {/* Image */}
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-overline text-gold-300 mb-2">{category.subtitle}</p>
        <h3 className="text-white text-3xl font-light leading-tight whitespace-pre-line" style={{ fontFamily: 'var(--font-display)' }}>
          {category.title}
        </h3>
        <div className="mt-4 flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase font-medium">
          <span>Explore</span>
          <span className="w-8 h-px bg-white/60 group-hover:w-12 transition-all duration-300" />
        </div>
      </div>
    </Link>
  )
}
