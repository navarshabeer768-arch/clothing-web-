'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { useWishlistStore } from '@/store/wishlist.store'
import { cn } from '@/lib/utils'

const navigation = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  {
    label: 'Women', href: '/shop?gender=women',
    children: [
      { label: 'Dresses', href: '/shop?gender=women&cat=dresses' },
      { label: 'Tops', href: '/shop?gender=women&cat=tops' },
      { label: 'Trousers', href: '/shop?gender=women&cat=trousers' },
      { label: 'Outerwear', href: '/shop?gender=women&cat=outerwear' },
      { label: 'View All', href: '/shop?gender=women' },
    ],
  },
  {
    label: 'Men', href: '/shop?gender=men',
    children: [
      { label: 'Shirts', href: '/shop?gender=men&cat=shirts' },
      { label: 'Suits', href: '/shop?gender=men&cat=suits' },
      { label: 'Trousers', href: '/shop?gender=men&cat=trousers' },
      { label: 'View All', href: '/shop?gender=men' },
    ],
  },
  {
    label: 'Watches', href: '/shop?type=watches',
    children: [
      { label: 'Sport', href: '/shop?type=watches&style=sport' },
      { label: 'Dress', href: '/shop?type=watches&style=dress' },
      { label: 'Limited Edition', href: '/shop?type=watches&limited=true' },
      { label: 'View All', href: '/shop?type=watches' },
    ],
  },
  { label: 'Collections', href: '/shop' },
]

const POPULAR_SEARCHES = ['Cashmere Coat', 'Automatic Watch', 'Silk Dress', 'Wool Blazer', 'Chronograph']

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const { getItemCount, toggleCart } = useCartStore()
  const { getCount: getWishlistCount } = useWishlistStore()

  useEffect(() => { setMounted(true) }, [])

  const cartCount = mounted ? getItemCount() : 0
  const wishlistCount = mounted ? getWishlistCount() : 0

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close search on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleSearch = useCallback((q: string) => {
    if (!q.trim()) return
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/shop?search=${encodeURIComponent(q.trim())}`)
  }, [router])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2].map(n => (
            <span key={n} className="text-xs tracking-widest uppercase font-light mx-8">
              Complimentary shipping on orders over $500 · New collection now available · Free returns within 30 days
            </span>
          ))}
        </div>
      </div>

      <header className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_20px_rgba(0,0,0,0.06)]' : 'bg-white'
      )}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button className="md:hidden p-2 -ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <div key={item.label} className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}>
                  <Link href={item.href} className="nav-link flex items-center gap-1">
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white shadow-luxury border border-luxury-100 rounded-sm z-50">
                        {item.children.map((child, i) => (
                          <Link key={i} href={child.href}
                            className={cn('block px-5 py-3 text-xs tracking-widest uppercase font-medium text-foreground/70 hover:text-foreground hover:bg-luxury-50 transition-colors',
                              i < item.children!.length - 1 && 'border-b border-luxury-50',
                              i === item.children!.length - 1 && 'text-gold-500')}>
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-light tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-display)' }}>
              LUXÉ
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button onClick={() => setSearchOpen(true)}
                className="p-2.5 hover:bg-luxury-50 rounded-sm transition-colors" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
              <Link href="/account/wishlist" className="relative p-2.5 hover:bg-luxury-50 rounded-sm transition-colors">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-400 text-white text-[10px] flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/account" className="p-2.5 hover:bg-luxury-50 rounded-sm transition-colors hidden md:block">
                <User className="h-4 w-4" />
              </Link>
              <button onClick={toggleCart} className="relative p-2.5 hover:bg-luxury-50 rounded-sm transition-colors">
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-luxury-100 bg-white overflow-hidden">
              <nav className="container-luxury py-4 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.label} href={item.href}
                    className="block py-3 px-2 text-xs tracking-widest uppercase font-medium text-foreground/70 hover:text-foreground border-b border-luxury-50 last:border-0"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/account" className="block py-3 px-2 text-xs tracking-widest uppercase font-medium text-foreground/70"
                  onClick={() => setMobileOpen(false)}>Account</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/98 backdrop-blur-sm">
            <div className="container-luxury pt-24 pb-16">
              <button onClick={() => setSearchOpen(false)}
                className="absolute top-6 right-6 p-2.5 hover:bg-luxury-100 rounded-sm transition-colors">
                <X className="h-5 w-5" />
              </button>
              <div className="max-w-2xl mx-auto">
                <p className="text-overline mb-6 text-center">Search Collection</p>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search for products, watches, clothing..."
                      className="w-full pl-12 pr-16 py-4 text-lg border-b-2 border-luxury-200 focus:border-gold-400 focus:outline-none bg-transparent"
                    />
                    {searchQuery && (
                      <button type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-black text-white text-xs font-medium rounded-sm hover:bg-black/80 transition-colors">
                        Search
                      </button>
                    )}
                  </div>
                </form>
                <div className="mt-8">
                  <p className="text-overline mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((term) => (
                      <button key={term} onClick={() => handleSearch(term)}
                        className="px-4 py-2 text-xs tracking-wider uppercase border border-luxury-200 hover:border-black hover:bg-luxury-50 transition-colors rounded-sm">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
