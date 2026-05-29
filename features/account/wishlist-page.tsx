'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist.store'
import { useCartStore } from '@/store/cart.store'
import { formatPrice } from '@/lib/utils'

// Mock wishlisted products
const WISHLISTED_PRODUCTS = [
  { id: '1', name: 'Cashmere Wrap Coat', slug: 'cashmere-wrap-coat', base_price: 2800, compare_price: 3200, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80' },
  { id: '3', name: 'Chronograph Master', slug: 'chronograph-master', base_price: 12500, compare_price: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: '6', name: 'Structured Linen Blazer', slug: 'structured-linen-blazer', base_price: 1450, compare_price: null, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  { id: '8', name: 'Pleated Silk Blouse', slug: 'pleated-silk-blouse', base_price: 780, compare_price: null, image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80' },
]

export function WishlistPage() {
  const { productIds, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  const items = WISHLISTED_PRODUCTS.filter(p => productIds.includes(p.id))

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10">
        <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
        </Link>
        <div className="mb-8">
          <p className="text-overline mb-1">My Account</p>
          <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>My Wishlist</h1>
          <p className="text-muted-foreground text-sm mt-2 font-light">{items.length} saved items</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-16 text-center">
            <Heart className="h-12 w-12 text-luxury-200 mx-auto mb-4" />
            <h3 className="text-xl font-light mb-2" style={{ fontFamily: 'var(--font-display)' }}>Your wishlist is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">Save items you love to find them later</p>
            <Link href="/shop" className="btn-luxury inline-flex">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 overflow-hidden group"
              >
                {/* Image */}
                <Link href={`/shop/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-luxury-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); removeItem(product.id) }}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/shop/${product.slug}`} className="text-sm font-medium hover:underline line-clamp-1 block">
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">{formatPrice(product.base_price)}</span>
                    {product.compare_price && (
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compare_price)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addItem(product as never)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium tracking-wider uppercase border border-black hover:bg-black hover:text-white transition-colors rounded-sm"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
