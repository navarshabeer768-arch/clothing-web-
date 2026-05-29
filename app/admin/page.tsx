import { AdminDashboard } from '@/features/admin/admin-dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — LUXÉ Admin',
}

export default function AdminPage() {
  return <AdminDashboard />
}

export const dynamic = 'force-dynamic'
