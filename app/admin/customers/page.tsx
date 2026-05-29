import { AdminCustomersPage } from '@/features/admin/admin-customers'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Customers — LUXÉ Admin' }
export default function CustomersPage() { return <AdminCustomersPage /> }

export const dynamic = 'force-dynamic'
