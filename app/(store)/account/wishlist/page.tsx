import { WishlistPage } from '@/features/account/wishlist-page'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'My Wishlist — LUXÉ' }
export default function Wishlist() { return <WishlistPage /> }

export const dynamic = 'force-dynamic'
