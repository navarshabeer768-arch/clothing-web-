'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

const gallery = [
  { id: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' },
  { id: 2, url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80' },
  { id: 3, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 4, url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80' },
  { id: 5, url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80' },
  { id: 6, url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80' },
]

export function InstagramGallery() {
  return (
    <section className="section">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="h-4 w-4 text-gold-500" />
            <p className="text-overline">@luxefashion</p>
          </div>
          <h2 className="display-md">Follow Our Journey</h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative aspect-square overflow-hidden group rounded-sm cursor-pointer"
            >
              <Image
                src={item.url}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/luxefashion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-outline inline-flex items-center gap-2"
          >
            <Instagram className="h-3.5 w-3.5" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
