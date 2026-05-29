'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90',
    overline: 'New Collection 2025',
    title: 'Dressed\nfor the\nExtraordinary',
    subtitle: 'Discover curated luxury fashion and timepieces that define modern elegance.',
    cta: { label: 'Explore Collection', href: '/shop' },
    align: 'left',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
}

export function HeroSection() {
  const slide = heroSlides[0]

  return (
    <section className="relative h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt="Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container-luxury flex items-center">
        <motion.div
          className="max-w-xl text-white"
          initial="initial"
          animate="animate"
        >
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-overline text-gold-300 mb-6"
          >
            {slide.overline}
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="display-xl text-white mb-8 whitespace-pre-line"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.6 }}
            className="text-white/70 text-base font-light leading-relaxed mb-10 max-w-sm"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <Link
              href={slide.cta.href}
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-widest uppercase bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              {slide.cta.label}
            </Link>
            <Link
              href="/shop/watches"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-white hover:text-gold-300 transition-colors duration-200"
            >
              <span>View Watches</span>
              <span className="text-gold-400">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* Side stats */}
      <div className="absolute right-8 bottom-12 hidden lg:flex flex-col gap-6">
        {[
          { number: '500+', label: 'Luxury Pieces' },
          { number: '15K+', label: 'Happy Clients' },
          { number: '20+', label: 'Brands' },
        ].map((stat) => (
          <div key={stat.label} className="text-right text-white">
            <div className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
              {stat.number}
            </div>
            <div className="text-[10px] tracking-widest uppercase text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
