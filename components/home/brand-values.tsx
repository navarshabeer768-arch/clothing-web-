'use client'

import { motion } from 'framer-motion'
import { Truck, RotateCcw, Shield, Star } from 'lucide-react'

const values = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    description: 'Free worldwide shipping on all orders over $500',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Hassle-free returns within 30 days of purchase',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Every piece is authenticated by our expert team',
  },
  {
    icon: Star,
    title: 'White Glove Service',
    description: 'Dedicated personal shopping assistance',
  },
]

export function BrandValues() {
  return (
    <section className="border-y border-luxury-100">
      <div className="container-luxury">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-luxury-100">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-6 py-8 hover:bg-luxury-50 transition-colors duration-200"
            >
              <value.icon className="h-5 w-5 text-gold-500 mb-3" strokeWidth={1.5} />
              <h3 className="text-xs font-medium tracking-wider uppercase mb-1.5">{value.title}</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
