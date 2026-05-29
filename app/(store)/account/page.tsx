import { AccountPage } from '@/features/account/account-page'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'My Account — LUXÉ' }
export default function Account() { return <AccountPage /> }

export const dynamic = 'force-dynamic'
