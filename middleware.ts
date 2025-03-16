import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { COOKIE_KEY } from '@app/constants/storage'

export function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || 'en'
  const locales = ['en', 'fr', 'vi']
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale
  })
  const response = handleI18nRouting(request)

  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale)
  const cookie = request.cookies.get(COOKIE_KEY.kmapp)

  const url = request.nextUrl.clone()

  if (url.pathname.length === 3) {
    const locale = url.pathname.substring(1, 3)

    if (locales.includes(locale)) {
      url.pathname = `/${locale}/orders`

      return NextResponse.redirect(url)
    }
  }

  if (url.pathname === '') {
    url.pathname = `/${defaultLocale}/orders`

    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  // matcher: ['/((?!api|_next|.*\\..*).*)']
  matcher: ['/((?!api|auth|.well-known|_next/static|_next/image|favicon\\.ico|icon\\.png|icon\\.ico|.*\\.png$).*)']
}
