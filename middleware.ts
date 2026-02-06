import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Check for bypass mode cookie
  const bypassMode = req.cookies.get('bypass_mode')?.value === 'true'
  const isLocalhost = req.headers.get('host')?.includes('localhost') || req.headers.get('host')?.includes('127.0.0.1')

  // Only run Supabase auth if NOT in bypass mode and not on localhost
  let session = null
  if (!bypassMode && !isLocalhost) {
    try {
      const supabase = createMiddlewareClient({ req, res })
      const { data } = await supabase.auth.getSession()
      session = data.session
    } catch {
      // Supabase not configured, allow access
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/staff', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without session and NOT in bypass mode
  if (isProtectedRoute && !session && !bypassMode && !isLocalhost) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Allow bypass mode and localhost to access all routes
  if (bypassMode || isLocalhost) {
    return res
  }

  // Redirect authenticated users away from auth pages
  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
