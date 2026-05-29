import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://besgwvezoeyiwseopdrt.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc2d3dmV6b2V5aXdzZW9wZHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNDQzOTYsImV4cCI6MjA5NTYyMDM5Nn0._YgLwVoHVvxzQ8FBcOnBS32TQ2WcMeBD3qcwG0SDWKg'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
