'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart.store'
import { useWishlistStore } from '@/store/wishlist.store'
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()

  useEffect(() => { setMounted(true) }, [])

  const wishlisted = mounted && isWishlisted(product.id)
  const primaryImage = product.images?.find((img) => img.is_primary) ?? product.images?.[0]
  const secondaryImage = product.images?.[1]
  const discountPercent = product.compare_price ? getDiscountPercentage(product.base_price, product.compare_price) : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product.id)
  }

  return (
    <div className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-luxury-50 rounded-sm">
          {primaryImage && (
            <Image src={primaryImage.url} alt={product.name} fill
              className={cn('object-cover transition-all duration-700',
                isHovered && secondaryImage ? 'opacity-0' : 'opacity-100')}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          )}
          {secondaryImage && (
            <Image src={secondaryImage.url} alt={product.name} fill
              className={cn('object-cover transition-all duration-700',
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100')}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
          )}
          {!primaryImage && (
            <div className="absolute inset-0 flex items-center justify-center text-luxury-300">
              <ShoppingBag className="h-12 w-12" strokeWidth={1} />
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new_arrival && <span className="badge-new">New</span>}
            {discountPercent && <span className="badge-sale">-{discountPercent}%</span>}
          </div>

          <div className={cn('absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 transition-all duration-300',
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
            <button onClick={handleAddToCart}
              className="w-full bg-white text-black text-xs font-medium tracking-widest uppercase py-3 hover:bg-black hover:text-white transition-colors duration-200">
              Add to Bag
            </button>
          </div>

          {mounted && (
            <button onClick={handleWishlist}
              className={cn('absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 z-10',
                wishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}>
              <Heart className={cn('h-3.5 w-3.5 transition-colors',
                wishlisted ? 'fill-red-500 text-red-500' : 'text-foreground')} />
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium leading-tight group-hover:text-gold-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.review_stats && product.review_stats.review_count > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('h-2.5 w-2.5',
                  i < Math.round(product.review_stats!.avg_rating) ? 'fill-gold-400 text-gold-400' : 'text-luxury-200')} />
              ))}
              <span className="text-[10px] text-muted-foreground ml-0.5">({product.review_stats.review_count})</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{formatPrice(product.base_price)}</span>
            {product.compare_price && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compare_price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
