import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that require authentication
const PROTECTED_PATHS = ['/dashboard', '/vehicles', '/settings']
// Paths that should redirect to dashboard if already authenticated
const AUTH_PATHS = ['/login']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
    const isAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path))
    
    // Get the session cookie
    const sessionCookie = request.cookies.get('session')
    const isAuthenticated = !!sessionCookie?.value

    // If accessing a protected path without authentication
    if (isProtectedPath && !isAuthenticated) {
        const url = new URL('/login', request.url)
        url.searchParams.set('from', pathname)
        return NextResponse.redirect(url)
    }

    // If accessing login while already authenticated
    if (isAuthPath && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * 1. Paths starting with /api (API routes)
         * 2. Paths starting with /_next (Next.js internals)
         * 3. Paths containing static files (e.g. images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 