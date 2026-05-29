import { AdminInventoryPage } from '@/features/admin/admin-inventory'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Inventory — LUXÉ Admin' }
export default function InventoryPage() { return <AdminInventoryPage /> }

export const dynamic = 'force-dynamic'
