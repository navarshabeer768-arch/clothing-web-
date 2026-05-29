'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2, Star, ChevronDown, Truck, RotateCcw, Shield, ZoomIn } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { useWishlistStore } from '@/store/wishlist.store'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Mock product - in production, fetch from Supabase by slug
const MOCK_PRODUCT = {
  id: '1',
  name: 'Cashmere Wrap Coat',
  slug: 'cashmere-wrap-coat',
  description: `Crafted from the finest Grade A cashmere sourced from Inner Mongolia, this elegant wrap coat is the pinnacle of cold-weather luxury. The generous cut allows for easy layering while maintaining a supremely refined silhouette. The satin-finish interior lining adds a whisper of decadence against the skin.

Each coat is made-to-order with exceptional attention to detail — from the hand-stitched buttonholes to the subtly weighted hem that ensures the perfect drape.`,
  short_description: 'Finest Grade A cashmere wrap coat with satin lining.',
  base_price: 2800,
  compare_price: 3200,
  product_type: 'clothing',
  is_new_arrival: true,
  tags: ['cashmere', 'coat', 'luxury', 'winter'],
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=85', is_primary: true, alt_text: 'Front view' },
    { id: '2', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85', is_primary: false, alt_text: 'Detail view' },
    { id: '3', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85', is_primary: false, alt_text: 'Back view' },
    { id: '4', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85', is_primary: false, alt_text: 'Side view' },
  ],
  variants: [
    { id: 'v1', name: 'Ivory / XS', price: 2800, stock_quantity: 2, options: [{ option_name: 'Color', option_value: 'Ivory' }, { option_name: 'Size', option_value: 'XS' }] },
    { id: 'v2', name: 'Ivory / S', price: 2800, stock_quantity: 4, options: [{ option_name: 'Color', option_value: 'Ivory' }, { option_name: 'Size', option_value: 'S' }] },
    { id: 'v3', name: 'Ivory / M', price: 2800, stock_quantity: 3, options: [{ option_name: 'Color', option_value: 'Ivory' }, { option_name: 'Size', option_value: 'M' }] },
    { id: 'v4', name: 'Camel / XS', price: 2800, stock_quantity: 0, options: [{ option_name: 'Color', option_value: 'Camel' }, { option_name: 'Size', option_value: 'XS' }] },
    { id: 'v5', name: 'Camel / S', price: 2800, stock_quantity: 5, options: [{ option_name: 'Color', option_value: 'Camel' }, { option_name: 'Size', option_value: 'S' }] },
    { id: 'v6', name: 'Black / S', price: 2900, stock_quantity: 6, options: [{ option_name: 'Color', option_value: 'Black' }, { option_name: 'Size', option_value: 'S' }] },
    { id: 'v7', name: 'Black / M', price: 2900, stock_quantity: 4, options: [{ option_name: 'Color', option_value: 'Black' }, { option_name: 'Size', option_value: 'M' }] },
    { id: 'v8', name: 'Black / L', price: 2900, stock_quantity: 2, options: [{ option_name: 'Color', option_value: 'Black' }, { option_name: 'Size', option_value: 'L' }] },
  ],
  clothing_specs: {
    material: '100% Grade A Mongolian Cashmere',
    care_instructions: 'Dry clean only. Store folded.',
    fit_type: 'Relaxed',
    country_of_origin: 'Italy',
  },
  review_stats: { avg_rating: 4.9, review_count: 24, five_star: 20, four_star: 4, three_star: 0, two_star: 0, one_star: 0 },
}

const COLORS = ['Ivory', 'Camel', 'Black']
const SIZES = ['XS', 'S', 'M', 'L']

interface Props {
  slug: string
}

export function ProductDetailPage({ slug: _ }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Ivory')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description')

  const { addItem } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(MOCK_PRODUCT.id)

  const product = MOCK_PRODUCT

  const selectedVariant = product.variants.find(
    (v) =>
      v.options.some((o) => o.option_name === 'Color' && o.option_value === selectedColor) &&
      v.options.some((o) => o.option_name === 'Size' && o.option_value === selectedSize)
  )

  const isAvailable = (color: string, size: string) => {
    const variant = product.variants.find(
      (v) =>
        v.options.some((o) => o.option_name === 'Color' && o.option_value === color) &&
        v.options.some((o) => o.option_name === 'Size' && o.option_value === size)
    )
    return variant && variant.stock_quantity > 0
  }

  const currentPrice = selectedVariant?.price ?? product.base_price

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product as never, selectedVariant as never, quantity)
  }

  return (
    <div className="container-luxury py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <a href="/" className="hover:text-foreground">Home</a>
        <span>/</span>
        <a href="/shop" className="hover:text-foreground">Shop</a>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Images */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-luxury-50 rounded-sm group">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt_text ?? product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Zoom button */}
            <button className="absolute bottom-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-sm">
              <ZoomIn className="h-4 w-4" />
            </button>

            {/* New badge */}
            {product.is_new_arrival && (
              <span className="badge-new">New Arrival</span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-sm transition-all',
                  selectedImage === i ? 'ring-1 ring-black' : 'ring-1 ring-transparent hover:ring-luxury-300'
                )}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text ?? ''}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product info */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <p className="text-overline mb-2">New Arrival</p>
            <h1 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < Math.round(product.review_stats.avg_rating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-luxury-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.review_stats.avg_rating} ({product.review_stats.review_count} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl font-medium">{formatPrice(currentPrice)}</span>
            {product.compare_price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compare_price)}
              </span>
            )}
            {product.compare_price && (
              <span className="text-sm text-gold-500 font-medium">
                Save {formatPrice(product.compare_price - currentPrice)}
              </span>
            )}
          </div>

          {/* Color selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium tracking-widest uppercase">Color</span>
              <span className="text-sm text-muted-foreground">{selectedColor}</span>
            </div>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => { setSelectedColor(color); setSelectedSize('') }}
                  className={cn(
                    'px-4 py-2 text-xs border transition-all rounded-sm',
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-luxury-200 hover:border-luxury-400'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium tracking-widest uppercase">Size</span>
              <button className="text-xs text-gold-500 underline hover:text-gold-600">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((size) => {
                const available = isAvailable(selectedColor, size)
                return (
                  <button
                    key={size}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    className={cn(
                      'py-3 text-sm font-medium border transition-all rounded-sm',
                      selectedSize === size ? 'border-black bg-black text-white' : '',
                      !available ? 'border-luxury-100 text-luxury-300 line-through cursor-not-allowed' : 'border-luxury-200 hover:border-black',
                      selectedSize !== size && available ? '' : ''
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
            {!selectedSize && (
              <p className="text-xs text-muted-foreground mt-2">Please select a size</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <span className="text-xs font-medium tracking-widest uppercase block mb-3">Quantity</span>
            <div className="inline-flex items-center border border-luxury-200 rounded-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 hover:bg-luxury-50 transition-colors"
              >
                −
              </button>
              <span className="px-6 py-3 text-sm font-medium border-x border-luxury-200 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3 hover:bg-luxury-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                'w-full py-4 text-xs font-medium tracking-widest uppercase transition-all duration-200',
                selectedSize
                  ? 'bg-black text-white hover:bg-black/90'
                  : 'bg-luxury-200 text-luxury-400 cursor-not-allowed'
              )}
            >
              {selectedSize ? 'Add to Bag' : 'Select a Size'}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleItem(product.id)}
                className={cn(
                  'flex items-center justify-center gap-2 py-3.5 text-xs font-medium tracking-wider uppercase border transition-all',
                  wishlisted ? 'border-red-200 bg-red-50 text-red-600' : 'border-luxury-200 hover:border-black'
                )}
              >
                <Heart className={cn('h-3.5 w-3.5', wishlisted && 'fill-red-500 text-red-500')} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium tracking-wider uppercase border border-luxury-200 hover:border-black transition-all">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-8 py-5 border-y border-luxury-100">
            {[
              { icon: Truck, title: 'Free Shipping', sub: 'Orders $500+' },
              { icon: RotateCcw, title: '30-Day Returns', sub: 'Hassle-free' },
              { icon: Shield, title: 'Authentic', sub: 'Guaranteed' },
            ].map((badge) => (
              <div key={badge.title} className="flex flex-col items-center text-center gap-1">
                <badge.icon className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                <span className="text-xs font-medium">{badge.title}</span>
                <span className="text-[10px] text-muted-foreground">{badge.sub}</span>
              </div>
            ))}
          </div>

          {/* Accordion details */}
          <div className="space-y-2">
            {[
              {
                key: 'description',
                title: 'Description',
                content: product.description,
              },
              {
                key: 'details',
                title: 'Material & Care',
                content: `Material: ${product.clothing_specs.material}\nCare: ${product.clothing_specs.care_instructions}\nMade in: ${product.clothing_specs.country_of_origin}`,
              },
              {
                key: 'shipping',
                title: 'Shipping & Returns',
                content: 'Complimentary standard shipping on orders over $500. Express shipping available. Free returns within 30 days of delivery.',
              },
            ].map((item) => (
              <div key={item.key} className="border-b border-luxury-100">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === item.key ? null : item.key)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-xs font-medium tracking-widest uppercase">{item.title}</span>
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-200', activeAccordion === item.key && 'rotate-180')}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === item.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-foreground/70 font-light leading-relaxed pb-5 whitespace-pre-line">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
