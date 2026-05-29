import { OrdersPage } from '@/features/account/orders-page'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'My Orders — LUXÉ' }
export default function Orders() { return <OrdersPage /> }

export const dynamic = 'force-dynamic'
