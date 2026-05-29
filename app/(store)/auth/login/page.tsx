import { LoginPage } from '@/features/auth/login-page'
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Sign In — LUXÉ' }
export default function Login() { return <LoginPage /> }
