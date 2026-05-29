import { CheckoutPage } from '@/features/checkout/checkout-page'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Checkout — LUXÉ' }
export default function Checkout() { return <CheckoutPage /> }

export const dynamic = 'force-dynamic'
