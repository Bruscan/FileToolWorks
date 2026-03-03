import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Enable large image previews in Google search results and Google Discover
  // max-image-preview:large = required for Google Discover eligibility
  // max-snippet:-1 = allow full-length text snippets
  // max-video-preview:-1 = allow full video previews
  response.headers.set(
    'X-Robots-Tag',
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  )

  return response
}

export const config = {
  matcher: [
    // Match all page routes, skip static assets and API routes
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff|woff2|ttf|otf)).*)',
  ],
}
