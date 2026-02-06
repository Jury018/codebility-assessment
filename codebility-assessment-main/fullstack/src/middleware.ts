import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { generateCsrfToken, CSRF_HEADER } from '@/lib/csrf'

const CSRF_TOKEN_NAME = 'csrf-token'

export async function middleware(request: NextRequest) {
  // Update Supabase session
  const response = await updateSession(request)
  
  if (!(response instanceof NextResponse)) {
    return response
  }
  
  // Get existing CSRF token from cookies or generate new one
  let csrfToken = request.cookies.get(CSRF_TOKEN_NAME)?.value
  
  if (!csrfToken) {
    csrfToken = generateCsrfToken()
    response.cookies.set(CSRF_TOKEN_NAME, csrfToken, {
      httpOnly: false, // Allow JavaScript to read this
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
  }
  
  // Verify CSRF token for state-changing API requests
  if (request.method !== 'GET' && request.method !== 'HEAD' && request.nextUrl.pathname.startsWith('/api/')) {
    const headerToken = request.headers.get(CSRF_HEADER)
    const cookieToken = request.cookies.get(CSRF_TOKEN_NAME)?.value
    
    if (!headerToken || !cookieToken || headerToken !== cookieToken) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
