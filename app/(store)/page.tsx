import { HeroSection } from '@/components/home/hero-section'
import { CategoryBanner } from '@/components/home/category-banner'
import { FeaturedProducts } from '@/components/home/featured-products'
import { WatchesShowcase } from '@/components/home/watches-showcase'
import { PromoBanner } from '@/components/home/promo-banner'
import { NewArrivals } from '@/components/home/new-arrivals'
import { Testimonials } from '@/components/home/testimonials'
import { InstagramGallery } from '@/components/home/instagram-gallery'
import { BrandValues } from '@/components/home/brand-values'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandValues />
      <CategoryBanner />
      <FeaturedProducts />
      <PromoBanner />
      <WatchesShowcase />
      <NewArrivals />
      <Testimonials />
      <InstagramGallery />
    </>
  )
}

export const dynamic = 'force-dynamic'
