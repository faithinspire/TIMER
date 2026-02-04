import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check for bypass mode cookie
  const bypassMode = req.cookies.get('bypass_mode')?.value === 'true'

  // Refresh session if expired - required for Server Components
  let session = null
  if (!bypassMode) {
    try {
      const { data } = await supabase.auth.getSession()
      session = data.session
    } catch {
      // Supabase connection failed
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/staff', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without session and NOT in bypass mode
  if (isProtectedRoute && !session && !bypassMode) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages (unless bypass mode)
  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Admin route protection - skip for bypass mode
  if (req.nextUrl.pathname.startsWith('/admin') && session && !bypassMode) {
    try {
      const { data: staff } = await supabase
        .from('staff')
        .select('role')
        .eq('id', session.user.id)
        .single()

      const adminRoles = ['Super Admin', 'Administrator', 'HR Manager']
      
      if (!staff || !adminRoles.includes(staff.role)) {
        return NextResponse.redirect(new URL('/staff/dashboard', req.url))
      }
    } catch {
      // Error checking admin access
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
