import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      'https://topuuubhizhsyqfhxwdf.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcHV1dWJoaXpoc3lxZmh4d2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzk4MjMsImV4cCI6MjA5NTcxNTgyM30.LT0djbhvtyWo4elgMfVafhW2ltp5pP4C-_mBqrA6Lqs',
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value },
          set(name: string, value: string, options: CookieOptions) { try { cookieStore.set({ name, value, ...options }) } catch {} },
          remove(name: string, options: CookieOptions) { try { cookieStore.set({ name, value: '', ...options }) } catch {} },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_error`)
}
