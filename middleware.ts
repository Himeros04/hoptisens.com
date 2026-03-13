import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Translate all paths except API, _next/static, _next/image, favicon.ico
  matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
