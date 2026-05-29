import { Metadata } from 'next'
import { ShopPage } from '@/features/products/shop-page'

export const metadata: Metadata = {
  title: 'Shop — Luxury Fashion & Timepieces',
  description: 'Browse our complete collection of luxury clothing and watches.',
}

export default function Shop() {
  return <ShopPage />
}

export const dynamic = 'force-dynamic'
