import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = 'https://topuuubhizhsyqfhxwdf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcHV1dWJoaXpoc3lxZmh4d2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzk4MjMsImV4cCI6MjA5NTcxNTgyM30.LT0djbhvtyWo4elgMfVafhW2ltp5pP4C-_mBqrA6Lqs'

function cookieHandlers(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return {
    get(name: string) { return cookieStore.get(name)?.value },
    set(name: string, value: string, options: CookieOptions) {
      try { cookieStore.set({ name, value, ...options }) } catch {}
    },
    remove(name: string, options: CookieOptions) {
      try { cookieStore.set({ name, value: '', ...options }) } catch {}
    },
  }
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, { cookies: cookieHandlers(cookieStore) })
}

export async function createAdminSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, { cookies: cookieHandlers(cookieStore) })
}
