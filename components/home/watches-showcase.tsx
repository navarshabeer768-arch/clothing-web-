'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const watches = [
  {
    id: '1',
    name: 'Chronograph Master',
    movement: 'Automatic',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85',
    slug: 'chronograph-master',
  },
  {
    id: '2',
    name: 'Grand Complication',
    movement: 'Manual Wind',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&q=85',
    slug: 'grand-complication',
  },
  {
    id: '3',
    name: 'Sport Diver Pro',
    movement: 'Automatic',
    price: 8400,
    image: 'https://images.unsplash.com/photo-1616093875201-cc5075c0a48a?w=600&q=85',
    slug: 'sport-diver-pro',
  },
]

export function WatchesShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={ref} className="section bg-[#1a1a1a] overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-overline text-gold-400 mb-4">Horology Collection</p>
            <h2 className="display-lg text-white mb-6">
              Masterpieces of<br />
              <em>Timekeeping</em>
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-8 max-w-md">
              Each timepiece in our collection represents centuries of watchmaking tradition,
              combined with modern precision engineering. For those who understand that
              a watch is never just about time.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: '150+', label: 'Timepieces' },
                { value: '25+', label: 'Brands' },
                { value: '100%', label: 'Authentic' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/40 tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/shop/watches"
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-widest uppercase border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Timepieces
            </Link>
          </motion.div>

          {/* Right: Watch cards */}
          <div className="relative">
            <motion.div
              style={{ y }}
              className="grid grid-cols-3 gap-3"
            >
              {watches.map((watch, i) => (
                <motion.div
                  key={watch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={i === 1 ? 'mt-8' : ''}
                >
                  <Link href={`/shop/${watch.slug}`} className="block group">
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-[#2a2a2a]">
                      <Image
                        src={watch.image}
                        alt={watch.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-[10px] text-white/40 tracking-widest uppercase">{watch.movement}</p>
                      <p className="text-white text-sm font-light mt-0.5 truncate">{watch.name}</p>
                      <p className="text-gold-400 text-sm font-medium mt-1">
                        ${watch.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
