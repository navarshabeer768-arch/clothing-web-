import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = 'https://topuuubhizhsyqfhxwdf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcHV1dWJoaXpoc3lxZmh4d2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzk4MjMsImV4cCI6MjA5NTcxNTgyM30.LT0djbhvtyWo4elgMfVafhW2ltp5pP4C-_mBqrA6Lqs'

let _client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (_client) return _client
  _client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  return _client
}
