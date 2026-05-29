import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://besgwvezoeyiwseopdrt.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc2d3dmV6b2V5aXdzZW9wZHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNDQzOTYsImV4cCI6MjA5NTYyMDM5Nn0._YgLwVoHVvxzQ8FBcOnBS32TQ2WcMeBD3qcwG0SDWKg'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY

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
  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { cookies: cookieHandlers(cookieStore) })
}
