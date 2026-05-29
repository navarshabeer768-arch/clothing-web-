'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Whitmore',
    role: 'Creative Director, London',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    text: 'LUXÉ has completely transformed my wardrobe. Every piece I\'ve purchased has been absolutely exquisite — the quality, the craftsmanship, the attention to detail. It\'s luxury fashion done right.',
  },
  {
    id: 2,
    name: 'James Thornton',
    role: 'Investment Banker, New York',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    text: 'The watch I purchased is beyond exceptional. The packaging, the personal touch, the after-sale service — everything reflects the premium nature of the brand. My go-to destination for timepieces.',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Architect, Paris',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 5,
    text: 'I was searching for something truly special for a gala, and LUXÉ delivered beyond my expectations. The silk gown I received was breathtaking. The customer service was also impeccable.',
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className="section bg-luxury-50">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-overline mb-3">Client Stories</p>
          <h2 className="display-md">What Our Clients Say</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-sm p-10 md:p-14 shadow-luxury text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl md:text-2xl font-light leading-relaxed text-foreground/80 mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 border border-luxury-200 hover:border-luxury-400 rounded-sm transition-colors duration-150"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold-400 w-6' : 'bg-luxury-300'
                }`}
              />
            ))}

            <button
              onClick={next}
              className="p-2.5 border border-luxury-200 hover:border-luxury-400 rounded-sm transition-colors duration-150"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
