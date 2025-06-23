import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

function hasLocalePrefix(pathname: string) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the path does not start with a locale, redirect to default locale
  if (!hasLocalePrefix(pathname)) {
    // Special case: root path
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, req.url));
    }
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url)
    );
  }

  // Otherwise, let next-intl handle it
  return intlMiddleware(req);
}

// Specify the routes to match
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
