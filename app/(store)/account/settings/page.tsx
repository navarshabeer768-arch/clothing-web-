import { Metadata } from 'next'
import { SettingsPage } from '@/features/account/settings-page'
export const metadata: Metadata = { title: 'Settings — LUXÉ' }
export const dynamic = 'force-dynamic'
export default function Settings() { return <SettingsPage /> }
