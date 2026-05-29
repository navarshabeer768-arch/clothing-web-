import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only protect admin routes strictly - let everything else through
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // For admin routes, check session cookie exists
  // Full role check happens in the admin layout server component
  const cookieHeader = request.headers.get('cookie') || ''
  const hasSession = cookieHeader.includes('sb-') || cookieHeader.includes('supabase')

  if (!hasSession) {
    return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
