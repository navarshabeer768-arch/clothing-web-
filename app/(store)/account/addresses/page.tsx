import { Metadata } from 'next'
import { AddressesPage } from '@/features/account/addresses-page'
export const metadata: Metadata = { title: 'Addresses — LUXÉ' }
export const dynamic = 'force-dynamic'
export default function Addresses() { return <AddressesPage /> }
