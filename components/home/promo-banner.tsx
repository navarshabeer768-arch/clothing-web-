'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function PromoBanner() {
  return (
    <section className="section">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] md:h-[520px] overflow-hidden rounded-sm"
        >
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85"
            alt="Summer Collection"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

          <div className="absolute inset-0 flex items-end pb-14 px-10 md:px-16">
            <div className="text-white">
              <p className="text-overline text-gold-300 mb-3">Limited Time</p>
              <h2 className="display-lg text-white mb-4">
                Summer Sale<br />
                Up to <em className="text-gold-300">40% Off</em>
              </h2>
              <p className="text-white/70 mb-6 max-w-sm font-light">
                Exclusive discounts on our most coveted summer pieces.
                Offer ends July 31st.
              </p>
              <Link
                href="/shop?filter=sale"
                className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-widest uppercase bg-white text-black hover:bg-gold-400 hover:text-white transition-colors duration-300"
              >
                Shop the Sale
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
