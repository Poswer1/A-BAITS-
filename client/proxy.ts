import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const language = request.nextUrl.pathname.split('/')[1]
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-language', language)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/uk', '/uk/:path*', '/ru', '/ru/:path*'],
}
